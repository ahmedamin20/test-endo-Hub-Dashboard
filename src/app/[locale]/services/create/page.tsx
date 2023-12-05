"use client";
import { Service } from "@/api/interfaces/Services";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { getSections, getSelectSections } from "@/api/queries/sections.queries";
import { postService } from "@/api/queries/services.query";
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
    const [createdService, setCreatedService] = useState<Service>();


    const t = useTranslations();
    const router = useRouter();

    const { isIdle, mutate, isPending } = useMutation({
        mutationFn: () => postService(createdService!),
        onSuccess: () => {
            router.push("/services");
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
                <Head content={t("services.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("services.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedService((prev: any) => ({ ...prev, image: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdService?.image && <Image src={URL.createObjectURL(createdService?.image)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("services.name"),
                            required: true,
                            placeholder: t("services.name"),
                            value: createdService?.name || "",
                            setValue: setCreatedService,
                        }}
                    />

                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("services.price"),
                            placeholder: t("services.price"),
                            value: createdService?.price || "",
                            setValue: setCreatedService,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("ads.description"),
                            placeholder: t("ads.description"),
                            value: createdService?.description || "",
                            setValue: setCreatedService,
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
