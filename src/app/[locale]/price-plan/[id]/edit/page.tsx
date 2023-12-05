"use client";
import { PricePlan, PricePlanResponse } from "@/api/interfaces/PricePlan";
import { AdResponse, Member, MemberResponse, adType } from "@/api/interfaces/Teams";
import { getAdById, updateAd } from "@/api/queries/ads.query";
import { getPricePlanById, updatePricePlan } from "@/api/queries/pricePlan.query";

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
    const [updatedPricePlan, setUpdatedPricePlan] = useState<Partial<PricePlan>>({});
    const [imageUpdated, setImageUpdated] = useState(false)

    const { data, isSuccess } = useQuery<PricePlanResponse>({
        queryKey: [API_ENDPOINTS.PRICE_PLANS, id],
        queryFn: () => getPricePlanById(id),
    });

    useEffect(() => {
        if (isSuccess) {
            setUpdatedPricePlan({
                name: data?.data?.name,
                price: data?.data?.price,
                description: data?.data?.description,
            })
        }
    }, [data, isSuccess])
    const t = useTranslations();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: () => updatePricePlan(id, updatedPricePlan),
        onSuccess: () => {
            router.push("/price-plan");
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
                <Head content={t("price-plan.edit")} />
                <div className="form-wrapper">

                    <FormInput
                        className=""
                        input={{
                            name: "name",
                            type: "text",
                            content: t("price-plan.name"),
                            required: true,
                            placeholder: t("price-plan.name"),
                            value: updatedPricePlan?.name || "",
                            setValue: setUpdatedPricePlan,
                        }}
                    />


                    <FormInput
                        className=""
                        input={{
                            name: "price",
                            type: "text",
                            content: t("price-plan.price"),
                            placeholder: t("price-plan.price"),
                            value: updatedPricePlan?.price || "",
                            setValue: setUpdatedPricePlan,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "description",
                            type: "longText",
                            content: t("price-plan.description"),
                            placeholder: t("price-plan.description"),
                            value: updatedPricePlan?.description || "",
                            setValue: setUpdatedPricePlan,
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
