"use client";
import { Member } from "@/api/interfaces/Teams";
import { getSections, getSelectSections, postSection } from "@/api/queries/sections.queries";
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
    const [createdSection, setUpdatedSection] = useState<{ title: string }>();
    const t = useTranslations();
    const router = useRouter()
    const { mutate, isPending } = useMutation({
        mutationFn: () => postSection(createdSection!),
        onSuccess: () => {
            router.push("/sections");
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
                <Head content={t("sections.create")} />
                <div className="form-wrapper">
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("sections.title"),
                            required: true,
                            placeholder: t("sections.title"),
                            value: createdSection?.title || "",
                            setValue: setUpdatedSection,
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
