"use client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import Logout from "../(profile)/Logout";
import { cn } from "@/utilities/cn";
import { HiOutlineMenu } from "react-icons/hi";
import ProfileLink from "../(profile)/ProfileLink";
import usa from "@/../public/usa.svg"
import france from '@/../public/france.svg'
import emaratFlag from '@/../public/emaratFlag.png'
import Image from "next/image";
import { useParams } from "next/navigation";
import { ProfileResponse } from "@/api/interfaces/Profile";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/constants/Constants";
import { getProfile } from "@/api/queries/profile.query";
export default function Header({
  minimize,
  setMinimize,
}: {
  minimize: boolean;
  setMinimize: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [profile, setProfile] = useState(false);
  const [theme, setTheme] = useState(false);
  const [language, setLanguage] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();
  const { locale } = useParams()
  const { data } = useQuery<ProfileResponse>({
    queryKey: [API_ENDPOINTS.PROFILE],
    queryFn: () => getProfile(),
  });

  const router = useRouter();
  const changeLanguage = (locale: "ar" | "en" | 'fr') =>
    router.replace(pathname, { locale });
  const wrapperRef = useRef(null);
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setLanguage(false);
          setProfile(false);
          setTheme(false);

        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <header
      className={cn(
        "bg-third flex flex-row justify-between w-full items-center p-5 gap-5 fixed h-[60px]"
      )}
    >
      <div
        className={cn({
          "transition-all duration-500 ease-in-out ltr:ml-[250px] rtl:mr-[250px]":
            !minimize,
        })}
      >
        <HiOutlineMenu
          className="cursor-pointer "
          onClick={() => setMinimize(!minimize)}
        />
      </div>
      <div ref={wrapperRef} className="flex flex-row gap-4">
        <div className="flex relative">

          <Image className="cursor-pointer  rounded-full"

            onClick={() => {
              setLanguage(false);
              setProfile(!profile);
              setTheme(true);
            }} width={30} height={30} alt="" src={data?.data.avatar} />
          {profile &&
            <div
              className="flex flex-col gap-3 absolute top-9 rtl:left-4 ltr:right-4 w-[250px] bg-black p-3 rounded-b-xl"
              onClick={() => {
                setLanguage(false);
                setProfile(!profile);
                setTheme(true);
              }}
            >
              <ProfileLink image={data?.data?.avatar} name={data?.data?.name} email={data?.data?.email} />
              <Logout />
            </div>
          }
        </div>
        <div className="flex relative">

          <Image className="cursor-pointer rounded-full"
            onClick={() => {
              setLanguage(!language);
              setProfile(false);
              setTheme(true);
            }} src={locale == 'ar' ? emaratFlag : locale == 'en' ? usa : france} alt='' width={35} height={35} />
          {language && <div
            className="flex flex-col gap-5 absolute top-9 ltr:right-5 rtl:left-10 w-[200px]  bg-black p-3 rounded-b-xl"
          >
            <span className={`cursor-pointer flex items-center gap-[5px] p-[5px] ${locale == 'ar' ? 'bg-primary rounded-md' : ''}`} onClick={() => changeLanguage("ar")}>
              <Image src={emaratFlag} alt='' width={30} height={30} />
              {t("arabic")}
            </span>
            <span className={`cursor-pointer flex items-center gap-[5px] p-[5px] ${locale == 'en' ? 'bg-primary rounded-md' : ''}`} onClick={() => changeLanguage("en")}>
              <Image src={usa} alt='' width={30} height={30} />
              {t("english")}
            </span>
            <span className={`cursor-pointer flex items-center gap-[5px] p-[5px] ${locale == 'fr' ? 'bg-primary rounded-md' : ''}`} onClick={() => changeLanguage("fr")}>
              <Image src={france} alt='' width={30} height={30} />
              {t("france")}
            </span>
          </div>}
        </div>
      </div>
    </header>
  );
}
