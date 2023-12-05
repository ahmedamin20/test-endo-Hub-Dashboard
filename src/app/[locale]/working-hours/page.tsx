"use client";
import { Setting, SettingResponse } from "@/api/interfaces/Settings";
import { getSettings, updateSettings } from "@/api/queries/setting.query";
import Head from "@/components/Head";
import MainButton from "@/components/MainButton";
import FormInput from "@/components/Form/ObjFormInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getWorkingHOurs, updateWorkingHours } from "@/api/queries/workingHours.query";
import { WorkingHours, WorkingHoursResponse } from "@/api/interfaces/WorkingHours";
export default function Home() {
    const [workingHours, setWorkingHours] = useState<WorkingHours>({
        saturday: '',
        sunday: '',
        monday: '',
        tuseday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        tuesday: ''
    });

    const { data, isError, isLoading } = useQuery<WorkingHoursResponse>({
        queryKey: ["workingHours"],
        queryFn: () => getWorkingHOurs(),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: () => updateWorkingHours(workingHours!),
        onSuccess(data, variables, context) { },
    });

    useEffect(() => {
        if (data) setWorkingHours(data.data);
    }, [data]);

    const t = useTranslations();

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };
    return (
        <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
            <form
                className="flex flex-col gap-10 w-full justify-center"
                onSubmit={handelSubmit}
            >
                <Head content={t("workingHours.head")} />
                <div className="form-wrapper">
                    <FormInput
                        className=""
                        input={{
                            name: "saturday",
                            type: "text",
                            content: t("workingHours.saturday"),
                            placeholder: t("workingHours.saturday"),
                            value: workingHours?.saturday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "sunday",
                            type: "text",
                            content: t("workingHours.sunday"),
                            placeholder: t("workingHours.sunday"),
                            value: workingHours?.sunday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "monday",
                            type: "text",
                            content: t("workingHours.monday"),
                            placeholder: t("workingHours.monday"),
                            value: workingHours?.monday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "tuesday",
                            type: "text",
                            content: t("workingHours.tuesday"),
                            placeholder: t("workingHours.tuesday"),
                            value: workingHours?.tuesday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "wednesday",
                            type: "text",
                            content: t("workingHours.wednesday"),
                            placeholder: t("workingHours.wednesday"),
                            value: workingHours?.wednesday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "thursday",
                            type: "text",
                            content: t("workingHours.thursday"),
                            placeholder: t("workingHours.thursday"),
                            value: workingHours?.thursday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />
                    <FormInput
                        className=""
                        input={{
                            name: "friday",
                            type: "text",
                            content: t("workingHours.friday"),
                            placeholder: t("workingHours.friday"),
                            value: workingHours?.friday,
                            setValue: setWorkingHours,
                            required: true,
                        }}
                    />



                </div>
                <MainButton disabled={isPending} type="submit" className="form-submit-button ">
                    {t("update")}
                </MainButton>
            </form>
        </main>
    );
}
