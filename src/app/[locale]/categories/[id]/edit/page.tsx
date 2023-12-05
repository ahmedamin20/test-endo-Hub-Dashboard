"use client";
import { CategoriesResponse, Category, CategoryResponse } from "@/api/interfaces/Categories";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getCategoryById, updateCategory } from "@/api/queries/categories.query";

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
    const [updatedCategory, setUpdatedCategory] = useState<Partial<Category>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<CategoryResponse>({
        queryKey: [API_ENDPOINTS.CATEGORIES, id],
        queryFn: () => getCategoryById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedCategory({
                name: data?.data?.name,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateCategory(id, updatedCategory),
        onSuccess: () => {
            router.push("/categories");
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
                <Head content={t("categories.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("ads.image")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedCategory((prev: any) => ({ ...prev, image: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedCategory?.image) : data?.data?.image} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("categories.name"),
                            required: true,
                            placeholder: t("categories.name"),
                            value: updatedCategory?.name || "",
                            setValue: setUpdatedCategory,
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
