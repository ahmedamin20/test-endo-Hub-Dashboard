"use client";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { User, UserResponse } from "@/api/interfaces/Users";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getRoles, getUserById, updateUser } from "@/api/queries/users.query";
import FormSelect from "@/components/Form/FormSelect";

import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { API_ENDPOINTS } from "@/constants/Constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<UserResponse>({
        queryKey: [API_ENDPOINTS.USERS, id],
        queryFn: () => getUserById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedUser({
                name: data?.data?.name,
                email: data?.data?.email,
            })
        }
    }, [data, isSuccess])
    const [role, setRole] = useState<any>()
    const setRoleId = (role: any) => {
        setRole(role)
        console.log(role)
        setUpdatedUser({
            ...updatedUser!,
            role_id: role.value,
        })
    }
    const { data: rolesData, refetch, isLoading, isSuccess: isGetRoleDataSuccess } = useQuery<any>({
        queryKey: [API_ENDPOINTS.PERMISSIONS],
        queryFn: () => getRoles(),
    });
    const [roles, setRoles] = useState<any>([])
    useEffect(() => {
        if (isGetRoleDataSuccess && !isLoading) {
            setRoles(rolesData?.data)
        }
    }, [rolesData, isLoading, isGetRoleDataSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateUser(id, updatedUser),
        onSuccess: () => {
            router.push("/users");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    if (!data) return <div>{t('loading')}</div>;

    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center "
                onSubmit={handelSubmit}
            >
                <Head content={t("users.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("users.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedUser((prev: any) => ({ ...prev, avatar: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedUser?.avatar) : data?.data?.avatar} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("users.name"),
                            required: true,
                            placeholder: t("users.name"),
                            value: updatedUser?.name || "",
                            setValue: setUpdatedUser,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "email",
                            type: "text",
                            content: t("users.email"),
                            placeholder: t("users.email"),
                            value: updatedUser?.email || "",
                            setValue: setUpdatedUser,
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


                </div>{" "}
                <MainButton disabled={isPending} type="submit" className="form-submit-button ">
                    {t("update")}
                </MainButton>
            </form>
        </main>
    );
}
