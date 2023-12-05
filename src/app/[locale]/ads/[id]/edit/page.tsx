"use client";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";

import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedAd, setUpdatedAd] = useState<Partial<adType>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<AdResponse>({
        queryKey: ["ad", id],
        queryFn: () => getAdById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedAd({
                title: data?.data?.title,
                discount: data?.data?.discount,
                description: data?.data?.description,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateAd(id, updatedAd),
        onSuccess: () => {
            router.push("/ads");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    if (!data) return <div className="modal-content">{t('loading')}</div>;

    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center "
                onSubmit={handelSubmit}
            >
                <Head content={t("ads.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("ads.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedAd((prev: any) => ({ ...prev, image: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedAd?.image) : data?.data?.image} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("ads.title"),
                            required: true,
                            placeholder: t("ads.title"),
                            value: updatedAd?.title || "",
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
                            value: updatedAd?.discount || "",
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
                            value: updatedAd?.description || "",
                            setValue: setUpdatedAd,
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
