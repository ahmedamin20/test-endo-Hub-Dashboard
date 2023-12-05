"use client";
import { BlogResponse, Blogs } from "@/api/interfaces/Blogs";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getBlogById, updateBlog } from "@/api/queries/blogs.query";

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
    const [updatedBlog, setUpdatedBlog] = useState<Partial<Blogs>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<BlogResponse>({
        queryKey: [API_ENDPOINTS.BLOGS, id],
        queryFn: () => getBlogById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedBlog({
                title: data?.data?.title,
                description: data?.data?.description,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateBlog(id, updatedBlog),
        onSuccess: () => {
            router.push("/blogs");
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
                <Head content={t("blogs.edit")} />
                <div className="form-wrapper">
                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("blogs.blogImage")}
                        </label>
                        <input type='file' onChange={(e: any) => {
                            setUpdatedBlog((prev: any) => ({ ...prev, blog_image: e.target.files[0] }))
                            setImageUpdated(true)
                        }} name='image' className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    <Image src={imageUpdated ? URL.createObjectURL(updatedBlog?.blog_image) : data?.data?.blogImage} alt="" width={100} height={100} />
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("blogs.title"),
                            required: true,
                            placeholder: t("blogs.title"),
                            value: updatedBlog?.title || "",
                            setValue: setUpdatedBlog,
                        }}
                    />



                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("blogs.description"),
                            placeholder: t("blogs.description"),
                            value: updatedBlog?.description || "",
                            setValue: setUpdatedBlog,
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
