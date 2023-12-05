"use client";
import { Partner } from "@/api/interfaces/Partners";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { postPartner } from "@/api/queries/partner.query";
import { getSections, getSelectSections } from "@/api/queries/sections.queries";
import { addMember } from "@/api/queries/teams.queries";
import FormSelect from "@/components/Form/FormSelect";
import ImageUpload from "@/components/Form/ImageUpload";
import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
    const [createdPartner, setCreatedPartner] = useState<Partner>();


    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postPartner(createdPartner!),
        onSuccess: () => {
            router.push("/partners");
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
                <Head content={t("partners.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("partners.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedPartner((prev: any) => ({ ...prev, logo: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdPartner?.logo && <Image src={URL.createObjectURL(createdPartner?.logo)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("partners.name"),
                            required: true,
                            placeholder: t("partners.name"),
                            value: createdPartner?.name || "",
                            setValue: setCreatedPartner,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "link",
                            type: "text",
                            content: t("partners.link"),
                            required: true,
                            placeholder: t("partners.link"),
                            value: createdPartner?.link || "",
                            setValue: setCreatedPartner,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("partners.description"),
                            placeholder: t("partners.description"),
                            value: createdPartner?.description || "",
                            setValue: setCreatedPartner,
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
