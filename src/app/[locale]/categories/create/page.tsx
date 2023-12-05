"use client";
import { Category } from "@/api/interfaces/Categories";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { postCategory, updateCategory } from "@/api/queries/categories.query";
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
    const [createdCategory, setCreatedCategory] = useState<Category>();


    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postCategory(createdCategory!),
        onSuccess: () => {
            router.push("/categories");
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
                <Head content={t("categories.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("ads.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedCategory((prev: any) => ({ ...prev, image: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdCategory?.image && <Image src={URL.createObjectURL(createdCategory?.image)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("categories.name"),
                            required: true,
                            placeholder: t("categories.name"),
                            value: createdCategory?.name || "",
                            setValue: setCreatedCategory,
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
