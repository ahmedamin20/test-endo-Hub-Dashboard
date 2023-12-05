"use client";
import { Member, MemberResponse, SectionResponse } from "@/api/interfaces/Teams";
import { getSectionById, getSections, updateSection } from "@/api/queries/sections.queries";
import { getMember, updateMember } from "@/api/queries/teams.queries";
import FormSelect from "@/components/Form/FormSelect";
import ImageUpload from "@/components/Form/ImageUpload";
import FormInput from "@/components/Form/ObjFormInput";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const [updatedSection, setUpdatedSection] = useState<Partial<{ title: string }>>({});



    const { data, isSuccess, isLoading } = useQuery<SectionResponse>({
        queryKey: ["sections", id],
        queryFn: () => getSectionById(id),
    });

    useEffect(() => {
        if (isSuccess && !isLoading) {
            setUpdatedSection({
                title: data?.data?.title
            })
        }
    }, [data, isSuccess, isLoading])

    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updateSection(id, updatedSection),
        onSuccess: () => {
            router.push("/sections");
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
                <Head content={t("sections.edit")} />
                <div className="form-wrapper">
                    <FormInput
                        className=""
                        input={{
                            name: "title",
                            type: "text",
                            content: t("sections.title"),
                            placeholder: t("sections.title"),
                            value: updatedSection.title || "",
                            setValue: setUpdatedSection,
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
