"use client";
import { Blogs } from "@/api/interfaces/Blogs";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { postBlog } from "@/api/queries/blogs.query";
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
    const [createdBlog, setCreatedBlog] = useState<Blogs>();


    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postBlog(createdBlog!),
        onSuccess: () => {
            router.push("/blogs");
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
                <Head content={t("blogs.create")} />
                <div className="form-wrapper">

                    <div className='flex flex-col gap-[10px] w-full'>
                        <label
                            className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
                        >
                            {t("ads.image")}
                        </label>
                        <input type='file' onChange={(e: any) => setCreatedBlog((prev: any) => ({ ...prev, blog_image: e.target.files[0] }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
                    </div>
                    {createdBlog?.blog_image && <Image src={URL.createObjectURL(createdBlog?.blog_image)} alt="" width={100} height={100} />}
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("blogs.title"),
                            required: true,
                            placeholder: t("blogs.title"),
                            value: createdBlog?.title || "",
                            setValue: setCreatedBlog,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("blogs.description"),
                            placeholder: t("blogs.description"),
                            value: createdBlog?.description || "",
                            setValue: setCreatedBlog,
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
