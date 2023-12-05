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
import { Password, Profile, ProfileResponse } from "@/api/interfaces/Profile";
import { API_ENDPOINTS } from "@/constants/Constants";
import { getProfile, updatePassword, updateProfile } from "@/api/queries/profile.query";
import Image from "next/image";
export default function Home() {
    const [profile, setProfile] = useState<Profile>({
        id: 1,
        name: '',
        email: '',
        avatar: ''
    });
    const [password, setPassword] = useState<Password>({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    })
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data } = useQuery<ProfileResponse>({
        queryKey: [API_ENDPOINTS.PROFILE],
        queryFn: () => getProfile(),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateProfile(profile!),
        onSuccess(data, variables, context) { },
    });
    const { mutate: passwordUpdate, isPending: isPasswordLoading } = useMutation({
        mutationFn: () => updatePassword(password!),
        onSuccess(data, variables, context) { },
    });

    useEffect(() => {
        if (data) setProfile({
            id: data?.data?.id,
            name: data?.data?.name,
            email: data?.data?.email,
        });
    }, [data]);

    const t = useTranslations();

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        passwordUpdate();
    };
    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center"
                onSubmit={handelSubmit}
            >
                <Head content={t("profile.head")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("profile.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setProfile((prev: any) => ({ ...prev, avatar: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(profile?.avatar) : data?.data?.avatar} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("profile.name"),
                            placeholder: t("profile.name"),
                            value: profile?.name,
                            setValue: setProfile,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "email",
                            type: "text",
                            content: t("profile.email"),
                            placeholder: t("profile.email"),
                            value: profile?.email,
                            setValue: setProfile,
                            required: true,
                        }}
                    />
                </div>
                <MainButton disabled={isPending} type="submit" className="form-submit-button ">
                    {t("update")}
                </MainButton>
            </form>
            <form
                className="flex flex-col gap-10 w-full justify-center mt-[25px]"
                onSubmit={handlePasswordSubmit}
            >
                <Head content={t("profile.passwordHead")} />
                <div className="form-wrapper">


                    <FormInput
                        className=""
                        input={{
                            name: "old_password",
                            type: "text",
                            content: t("profile.old_password"),
                            placeholder: t("profile.old_password"),
                            value: password?.old_password,
                            setValue: setPassword,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "new_password",
                            type: "text",
                            content: t("profile.new_password"),
                            placeholder: t("profile.new_password"),
                            value: password?.new_password,
                            setValue: setPassword,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "new_password_confirmation",
                            type: "text",
                            content: t("profile.new_password_confirmation"),
                            placeholder: t("profile.new_password_confirmation"),
                            value: password?.new_password_confirmation,
                            setValue: setPassword,
                            required: true,
                        }}
                    />
                </div>
                <MainButton disabled={isPasswordLoading} type="submit" className="form-submit-button ">
                    {t("update")}
                </MainButton>
            </form>
        </main>
    );
}
