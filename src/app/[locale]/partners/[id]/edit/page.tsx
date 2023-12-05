"use client";
import { Partner, PartnerResponse } from "@/api/interfaces/Partners";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getPartnerById, updatePartner } from "@/api/queries/partner.query";

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
    const [updatedPartner, setUpdatedPartner] = useState<Partial<Partner>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<PartnerResponse>({
        queryKey: [API_ENDPOINTS.PARTNERS, id],
        queryFn: () => getPartnerById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedPartner({
                name: data?.data?.name,
                description: data?.data?.description,
                link: data?.data?.link,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updatePartner(id, updatedPartner),
        onSuccess: () => {
            router.push("/partners");
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
                <Head content={t("partners.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("partners.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedPartner((prev: any) => ({ ...prev, logo: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedPartner?.logo) : data?.data?.logo} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("partners.name"),
                            required: true,
                            placeholder: t("partners.name"),
                            value: updatedPartner?.name || "",
                            setValue: setUpdatedPartner,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "link",
                            type: "text",
                            content: t("partners.link"),
                            placeholder: t("partners.link"),
                            value: updatedPartner?.link || "",
                            setValue: setUpdatedPartner,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("partners.description"),
                            placeholder: t("partners.description"),
                            value: updatedPartner?.description || "",
                            setValue: setUpdatedPartner,
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
