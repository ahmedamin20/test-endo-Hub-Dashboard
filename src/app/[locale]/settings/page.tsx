"use client";
import { Setting, SettingResponse } from "@/api/interfaces/Settings";
import { getSettings, updateSettings } from "@/api/queries/setting.query";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import FormInput from "@/components/Form/ObjFormInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Home() {
  const [settings, setSettings] = useState<Setting>({
    address: "",
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    title: "",
    twitter: "",
    whatsapp: "",
    working_hours: "",
    youtube: "",
    phone: "",
  });

  const { data } = useQuery<SettingResponse>({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateSettings(settings!),
    onSuccess(data, variables, context) { },
  });

  useEffect(() => {
    if (data) setSettings(data.data);
  }, [data]);

  const t = useTranslations();

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
      <form
        className="flex flex-col gap-10 w-full justify-center"
        onSubmit={handelSubmit}
      >
        <Head content={t("settings.head")} />
        <div className="form-wrapper">
          <FormInput
            className=""
            input={{
              name: "title",
              type: "text",
              content: t("settings.title"),
              placeholder: t("settings.title"),
              value: settings?.title,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "address",
              type: "text",
              content: t("settings.address"),
              placeholder: t("settings.address"),
              value: settings?.address,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "email",
              type: "text",
              content: t("settings.email"),
              placeholder: t("settings.email"),
              value: settings?.email,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "twitter",
              type: "text",
              content: t("settings.twitter"),
              placeholder: t("settings.twitter"),
              value: settings?.twitter,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "instagram",
              type: "text",
              content: t("settings.instagram"),
              placeholder: t("settings.instagram"),
              value: settings?.instagram,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "linkedin",
              type: "text",
              content: t("settings.linkedin"),
              placeholder: t("settings.linkedin"),
              value: settings?.linkedin,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "facebook",
              type: "text",
              content: t("settings.facebook"),
              placeholder: t("settings.facebook"),
              value: settings?.facebook,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "whatsapp",
              type: "text",
              content: t("settings.whatsapp"),
              placeholder: t("settings.whatsapp"),
              value: settings?.whatsapp,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "phone",
              type: "text",
              content: t("settings.phone"),
              placeholder: t("settings.phone"),
              value: settings?.phone,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "youtube",
              type: "text",
              content: t("settings.youtube"),
              placeholder: t("settings.youtube"),
              value: settings?.youtube,
              setValue: setSettings,

            }}
          />
          <FormInput
            className=""
            input={{
              name: "working_hours",
              type: "text",
              content: t("settings.working_hours"),
              placeholder: t("settings.working_hours"),
              value: settings?.working_hours,
              setValue: setSettings,

            }}
          />
        </div>
        <MainButton disabled={isPending} type="submit" className="form-submit-button ">
          {t("update")}
        </MainButton>
      </form>
    </main>
  );
}
