"use client";
import { Service, ServiceResponse } from "@/api/interfaces/Services";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getServiceById, updateService } from "@/api/queries/services.query";

import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedService, setUpdatedService] = useState<Partial<Service>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<ServiceResponse>({
        queryKey: ["services", id],
        queryFn: () => getServiceById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedService({
                name: data?.data?.name,
                price: data?.data?.price,
                description: data?.data?.description,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateService(id, updatedService),
        onSuccess: () => {
            router.push("/services");
        },
    });

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    if (!data) return <div >{t('loading')}</div>;

    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center "
                onSubmit={handelSubmit}
            >
                <Head content={t("services.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("services.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedService((prev: any) => ({ ...prev, image: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedService?.image) : data?.data?.image} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("services.name"),
                            required: true,
                            placeholder: t("services.name"),
                            value: updatedService?.name || "",
                            setValue: setUpdatedService,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("services.price"),
                            placeholder: t("services.price"),
                            value: updatedService?.price || "",
                            setValue: setUpdatedService,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("services.description"),
                            placeholder: t("services.description"),
                            value: updatedService?.description || "",
                            setValue: setUpdatedService,
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
