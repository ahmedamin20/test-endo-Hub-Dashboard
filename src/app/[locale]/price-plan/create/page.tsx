"use client";
import { PricePlan } from "@/api/interfaces/PricePlan";
import { Member, adType } from "@/api/interfaces/Teams";
import { postAd } from "@/api/queries/ads.query";
import { postPricePlan } from "@/api/queries/pricePlan.query";
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
    const [createdPricePlan, setCreatedPricePlan] = useState<PricePlan>();


    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postPricePlan(createdPricePlan!),
        onSuccess: () => {
            router.push("/price-plan");
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

                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("price-plan.name"),
                            required: true,
                            placeholder: t("price-plan.name"),
                            value: createdPricePlan?.name || "",
                            setValue: setCreatedPricePlan,
                        }}
                    />

                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("price-plan.price"),
                            placeholder: t("price-plan.price"),
                            value: createdPricePlan?.price,
                            setValue: setCreatedPricePlan,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("ads.description"),
                            placeholder: t("ads.description"),
                            value: createdPricePlan?.description || "",
                            setValue: setCreatedPricePlan,
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
