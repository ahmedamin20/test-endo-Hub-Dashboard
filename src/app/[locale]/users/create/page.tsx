"use client";
import { Member, adType } from "@/api/interfaces/Teams";
import { User } from "@/api/interfaces/Users";
import { postAd } from "@/api/queries/ads.query";
import { getSections, getSelectSections } from "@/api/queries/sections.queries";
import { addMember } from "@/api/queries/teams.queries";
import { getRoles, postUser } from "@/api/queries/users.query";
import FormSelect from "@/components/Form/FormSelect";
import ImageUpload from "@/components/Form/ImageUpload";
import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { API_ENDPOINTS } from "@/constants/Constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
    const [createdUser, setCreatedUser] = useState<User>();
    const [role, setRole] = useState<any>()
    const setRoleId = (role: any) => {
        setRole(role)
        console.log(role)
        setCreatedUser({
            ...createdUser!,
            role_id: role.value,
        })
    }
    const t = useTranslations();
    const router = useRouter();
    const { data, refetch, isLoading, isSuccess } = useQuery<any>({
        queryKey: [API_ENDPOINTS.PERMISSIONS],
        queryFn: () => getRoles(),
    });
    const [roles, setRoles] = useState<any>([])
    useEffect(() => {
        if (isSuccess && !isLoading) {
            setRoles(data?.data)
        }
    }, [data, isLoading, isSuccess])
    console.log(data)
    const { mutate, isPending } = useMutation({
        mutationFn: () => postUser(createdUser!),
        onSuccess: () => {
            router.push("/users");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };



    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-3 w-full justify-center"
                onSubmit={handelSubmit}
            >
                <Head content={t("users.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("users.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedUser((prev: any) => ({ ...prev, avatar: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdUser?.avatar && <Image src={URL.createObjectURL(createdUser?.avatar)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("users.name"),
                            required: true,
                            placeholder: t("users.name"),
                            value: createdUser?.name || "",
                            setValue: setCreatedUser,
                        }}
                    />

                    <FormInput
                        className=""
                        input={{
                            name: "email",
                            type: "text",
                            content: t("users.email"),
                            placeholder: t("users.email"),
                            value: createdUser?.email || "",
                            setValue: setCreatedUser,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "password",
                            type: "text",
                            content: t("users.password"),
                            placeholder: t("users.password"),
                            value: createdUser?.password || "",
                            setValue: setCreatedUser,
                        }}
                    />

                    <FormSelect
                        input={{
                            name: t("users.type"),
                            content: t("users.type"),
                            placeholder: t("users.type"),
                            value: role,
                            setValue: setRoleId,
                            defaultValue: t("users.type"),
                            options: roles,
                            idKey: "id",
                            contentKey: "name",
                            required: true,


                        }}
                    />


                </div>
                <MainButton disabled={isPending} type="submit" className="form-submit-button">
                    {t("create")}
                </MainButton>
            </form>
        </main>
    );
}
