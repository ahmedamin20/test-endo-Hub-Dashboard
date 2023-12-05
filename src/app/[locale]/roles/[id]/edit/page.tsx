"use client";
import { PermissionsResponse, RoleBody, RoleResponse } from "@/api/interfaces/Roles";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { getPermissions, getRoleById, postRole, updateRole } from "@/api/queries/roles.query";
import { getSections, getSelectSections } from "@/api/queries/sections.queries";
import { addMember } from "@/api/queries/teams.queries";
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

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedRole, setUpdatedRole] = useState<RoleBody>({
        name: '',
        permissions: []
    });
    const { data: roleData, isSuccess: isRoleDataSuccess } = useQuery<RoleResponse>({
        queryKey: [API_ENDPOINTS.ROLES, id],
        queryFn: () => getRoleById(id),
    });
    useEffect(() => {
        if (isRoleDataSuccess) {
            setUpdatedRole({
                name: roleData?.data?.name,
                permissions: roleData?.data?.permissions?.map((perm) => perm.id)
            })
        }
    }, [isRoleDataSuccess, roleData])

    const t = useTranslations();
    const router = useRouter();
    const { data, isSuccess } = useQuery<PermissionsResponse>({
        queryKey: [API_ENDPOINTS.PERMISSIONS],
        queryFn: () => getPermissions(),
    });


    const { mutate, isPending } = useMutation({
        mutationFn: () => updateRole(id, updatedRole!),
        onSuccess: () => {
            router.push("/roles");
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
                <Head content={t("roles.create")} />
                <div className="form-wrapper">


                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("roles.name"),
                            required: true,
                            placeholder: t("roles.name"),
                            value: updatedRole?.name || "",
                            setValue: setUpdatedRole,
                        }}
                    />

                    <div className='flex flex-col gap-[10px]'>
                        <div className=' grid grid-cols-2 md:grid-cols-2 gap-[10px]'>
                            {data?.data?.map((perm, index: number) => (
                                <div key={index} className=' dark:bg-[var(--main-bg-dark)] bg-[var(--main-background-gray)] rounded-md p-[5px] flex items-center gap-[5px]'>
                                    <input type='checkbox' checked={updatedRole?.permissions?.includes(perm.id)} onClick={(e) => setUpdatedRole({
                                        name: updatedRole?.name,
                                        permissions: updatedRole.permissions.includes(perm.id) ? updatedRole.permissions.filter((permissionId: any) => permissionId != perm.id) : [...updatedRole.permissions, perm.id]
                                    })} />
                                    <label>{perm.name}</label>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <MainButton disabled={isPending} type="submit" className="form-submit-button">
                    {t("create")}
                </MainButton>
            </form>
        </main>
    );
}
