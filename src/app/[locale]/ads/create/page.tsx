"use client";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
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
    const [createdAd, setUpdatedAd] = useState<adType>();


    const t = useTranslations();
    const router = useRouter();

    const { isIdle, mutate, isPending } = useMutation({
        mutationFn: () => postAd(createdAd!),
        onSuccess: () => {
            router.push("/ads");
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
                <Head content={t("ads.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("ads.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setUpdatedAd((prev: any) => ({ ...prev, image: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdAd?.image && <Image src={URL.createObjectURL(createdAd?.image)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("ads.title"),
                            required: true,
                            placeholder: t("ads.title"),
                            value: createdAd?.title || "",
                            setValue: setUpdatedAd,
                        }}
                    />

                    <FormInput
                        className=""
                        input={{
                            name: "discount",
                            type: "text",
                            content: t("ads.discount"),
                            placeholder: t("ads.discount"),
                            value: createdAd?.discount || "",
                            setValue: setUpdatedAd,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("ads.description"),
                            placeholder: t("ads.description"),
                            value: createdAd?.description || "",
                            setValue: setUpdatedAd,
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
