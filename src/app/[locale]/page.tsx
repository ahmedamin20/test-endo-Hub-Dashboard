"use client";
import { login } from "@/api/queries/auth.query";
import FormInput from "@/components/Form/FormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useState } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/Constants";
import logo from '@/../public/lastLogo.png'
import Image from "next/image";
import { useParams } from "next/navigation";
import { CiLock, CiUser } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import medicalImage from '@/../public/bgMedical.png'
export default function Login() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { locale } = useParams()
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess(data, variables, context) {
      localStorage.setItem(ACCESS_TOKEN, data.data.token);
      Cookies.set(ACCESS_TOKEN, data.data.token);
      router.push("/home");
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <main className={`w-full h-screen flex flex-col relative  items-center bg-[${medicalImage}]`} style={{ backgroundImage: `url(@/../public/bgMedical.png)`, }} >
      <div className="absolute  -z-10 w-full h-full bg-gradient-to-t to-gray-800 from-gray-700" style={{}}>
        <Image
          src={medicalImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt=""
        />
      </div>
      <form className="flex flex-col bg-gray-700 w-[80%] gap-[20px] mt-[9%]" onSubmit={onSubmit}>
        <Image className=" flex items-center justify-center mx-auto" src={logo} alt="logo" width={300} height={300} />
        <Head className=" mb-5" content={t("login")} />
        <div className="form-wrapper w-[75%]  mx-auto">
          <div className=" relative">
            <FormInput
              className=""
              input={{
                name: t("email"),
                type: "text",
                content: t("email"),
                placeholder: t("email"),
                setValue: setEmail,
                required: true,

              }}
            />
            <CiUser size='20px' color='gray' className={`text-black absolute top-[43px] ${locale == 'ar' ? 'left-1 ' : 'right-1 '}`} />
          </div>
          <div className=" relative">
            <FormInput
              className=""
              input={{
                name: t("password"),
                type: `${showPassword ? 'text' : 'password'}`,
                content: t("password"),
                placeholder: t("password"),
                setValue: setPassword,
                required: true,
              }}
            />
            <div className={`text-black absolute top-[43px] ${locale == 'ar' ? 'left-1 ' : 'right-1 '}`}>
              {!showPassword ? <IoMdEye className=' cursor-pointer ' size='20px' color='gray' onClick={() => setShowPassword(!showPassword)} /> : <IoIosEyeOff className=' cursor-pointer ' color='gray' size='20px' onClick={() => setShowPassword(!showPassword)} />}
            </div>
          </div>
        </div>{" "}
        <MainButton disabled={isPending || isSuccess} type="submit" className="form-submit-button w-[75%] mx-auto flex items-center justify-center">
          {t("login")}
        </MainButton>
      </form>
    </main>
  );
}
