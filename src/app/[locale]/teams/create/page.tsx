"use client";
import { Member } from "@/api/interfaces/Teams";
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
  const [createdMember, setUpdatedMember] = useState<any>();

  const [section, setSection] = useState<any>();

  const setSectionId = (section: any) => {
    setSection(section);
    setUpdatedMember({
      ...createdMember!,
      section: { id: section.value, title: section.label },
    });
  };

  const t = useTranslations();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addMember(createdMember!),
    onSuccess: () => {
      router.push("/teams");
    },
  });

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  const [sections, setSections] = useState<any>([]);
  const [perPage, setPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);
  const { data: dataSections, isLoading } = useQuery<any>({
    queryKey: ["select-sections", perPage],
    queryFn: () => getSelectSections(perPage),
  });
  useEffect(() => {
    if (dataSections)
      if (!isLoading) {
        setSections(dataSections?.data);
        setLastPage(dataSections?.meta?.last_page);
      }
  }, [dataSections, isLoading]);

  return (
    <main className="flex flex-col  justify-center items-center px-[5px] py-10 w-full">
      <form
        className="flex flex-col gap-3 w-full justify-center"
        onSubmit={handelSubmit}
      >
        <Head content={t("teams.create")} />
        <div className="form-wrapper">
          {   /*   <ImageUpload
            input={{
              name: "teamMemberPhoto",
              content: t("teams.teamMemberPhoto"),
            }}
            images={
              createdMember?.teamMemberPhoto || [{ data_url: "/default.jpg" }]
            }
            onChange={(imageList: any) => {
              setUpdatedMember({
                ...createdMember!,
                teamMemberPhoto: imageList,
              });
            }}
          />*/}
          <div className='flex flex-col gap-[10px] w-full'>
            <label
              className="before:content[' '] before:border-2 before:border-secondary-light-1 gap-2 flex flex-row font-bold"
            >
              {t("teams.teamMemberPhoto")}
            </label>
            <input type='file' onChange={(e: any) => setUpdatedMember((prev: any) => ({ ...prev, team_member: e.target.files[0], }))} name='image' required className='border-gray-300 border w-full p-[5px] rounded-md' />
          </div>
          {createdMember?.team_member && <Image src={URL.createObjectURL(createdMember?.team_member)} alt="" width={100} height={100} />}
          <FormInput
            className=""
            input={{
              name: "name",
              type: "text",
              content: t("teams.name"),
              required: true,
              placeholder: t("teams.name"),
              value: createdMember?.name || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormSelect
            input={{
              name: t("teams.service"),
              content: t("teams.service"),
              placeholder: t("teams.service"),
              value: section,
              setValue: setSectionId,
              defaultValue: t("teams.service"),
              options: sections,
              idKey: "id",
              contentKey: "title",
              required: true,
              onScroll: () => {
                if (lastPage > 1 && !isLoading) setPerPage(perPage + 10);
              },
              isLoading,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "twitter",
              type: "text",
              content: t("teams.twitter"),
              placeholder: t("teams.twitter"),
              value: createdMember?.twitter || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "facebook",
              type: "text",
              content: t("teams.facebook"),
              placeholder: t("teams.facebook"),
              value: createdMember?.facebook || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "instagram",
              type: "text",
              content: t("teams.instagram"),
              placeholder: t("teams.instagram"),
              value: createdMember?.instagram || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "youtube",
              type: "text",
              content: t("teams.youtube"),
              placeholder: t("teams.youtube"),
              value: createdMember?.youtube || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormInput
            className=""
            input={{
              name: "linkedin",
              type: "text",
              content: t("teams.linkedin"),
              placeholder: t("teams.linkedin"),
              value: createdMember?.linkedin || "",
              setValue: setUpdatedMember,
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
