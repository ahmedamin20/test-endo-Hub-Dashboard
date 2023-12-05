"use client";
import { AboutUs, AboutUsResponse } from "@/api/interfaces/AboutUs";
import { getAboutUs, updateAboutUs } from "@/api/queries/about-us.query";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import FormInput from "@/components/Form/ObjFormInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
export default function Home() {
  const [aboutUs, setAboutUs] = useState<AboutUs>({
    youtube_video_url: "",
    name: "",
    description: "",
  });
  const [imageUpdated, setImageUpdated] = useState(false)
  const { data } = useQuery<AboutUsResponse>({
    queryKey: ["aboutUs"],
    queryFn: () => getAboutUs(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateAboutUs(aboutUs!),
    onSuccess(data, variables, context) { },
  });

  useEffect(() => {
    if (data) {
      setAboutUs({
        youtube_video_url: data.data.youtube_video_url,
        name: data.data.name,

        description: data.data.description,
      });
    }
  }, [data]);

  const t = useTranslations();

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <main className="flex flex-col  justify-center items-center p-10 w-4/5">
      <form
        className="flex flex-col gap-10 w-4/5 justify-center"
        onSubmit={handelSubmit}
      >
        <Head content={t("aboutUs.head")} />
        <div className="form-wrapper">
          <FormInput
            className=""
            input={{
              name: "name",
              type: "text",
              content: t("aboutUs.name"),
              placeholder: t("aboutUs.name"),
              value: aboutUs?.name,
              setValue: setAboutUs,
              required: true,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "description",
              type: "text",
              content: t("aboutUs.description"),
              placeholder: t("aboutUs.description"),
              value: aboutUs?.description,
              setValue: setAboutUs,
              required: true,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "youtube_video_url",
              type: "text",
              content: t("aboutUs.youtube_video_url"),
              placeholder: t("aboutUs.youtube_video_url"),
              value: aboutUs?.youtube_video_url,
              setValue: setAboutUs,
              required: true,
            }}
          />
          <div className='flex flex-col gap-[10px] w-full'>
            <label
              className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
            >
              {t("aboutUs.image")}
            </label>
            <input type='file' onChange={(e: any) => {
              setAboutUs((prev: any) => ({ ...prev, image: e.target.files[0] }))
              setImageUpdated(true)
            }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
          </div>
          <Image src={imageUpdated ? URL.createObjectURL(aboutUs?.image) : data?.data?.image} alt="" width={100} height={100} />
          { /*    <FormInput
            className=""
            input={{
              name: "image",
              type: "text",
              content: t("aboutUs.image"),
              placeholder: t("aboutUs.image"),
              value: aboutUs?.image,
              setValue: setAboutUs,
              required: true,
            }}
          />*/}
        </div>{" "}
        <MainButton disabled={isPending} type="submit" className="form-submit-button">
          {t("update")}
        </MainButton>
      </form>
    </main>
  );
}
