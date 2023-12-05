"use client";
import { Member, MemberResponse } from "@/api/interfaces/Teams";
import { getSections } from "@/api/queries/sections.queries";
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
  const [updatedMember, setUpdatedMember] = useState<Partial<Member>>({});

  const [section, setSection] = useState<any>({
    value: undefined,
    label: undefined,
  });

  const { data } = useQuery<MemberResponse>({
    queryKey: ["teamMember", id],
    queryFn: () => getMember(id),
  });

  useEffect(() => {
    if (data) {
      setSection({
        value: data.data.section.id,
        label: data.data.section.title,
      });
    }
    setUpdatedMember({
      name: data?.data?.name,
      // teamMemberPhoto: data?.data?.teamMemberPhoto,
      twitter: data?.data?.twitter,
      facebook: data?.data?.facebook,
      instagram: data?.data?.instagram,
      youtube: data?.data?.youtube,
      linkedin: data?.data?.linkedin,
    })
  }, [data]);

  const setSectionId = (section: any) => {
    setSection(section);
    setUpdatedMember({
      ...updatedMember,
      section: { id: section.value, title: section.label },
    });
  };

  const t = useTranslations();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateMember(id, {
      ...updatedMember,
      section_id: section.value
    }),
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
    queryKey: ["sections"],
    queryFn: () => getSections(),
  });
  useEffect(() => {
    if (dataSections)
      if (!isLoading) {
        setSections(dataSections?.data);
        setLastPage(dataSections?.meta?.last_page);
      }
  }, [dataSections, isLoading]);

  if (!data) return <div className="modal-content">loading...</div>;

  return (
    <main className="flex flex-col  justify-center items-center p-10 w-4/5">
      <form
        className="flex flex-col gap-10 w-4/5 justify-center "
        onSubmit={handelSubmit}
      >
        <Head content={t("teams.edit")} />
        <div className="form-wrapper">
          <ImageUpload
            input={{
              name: "teamMemberPhoto",
              content: t("teams.teamMemberPhoto"),
            }}
            images={
              updatedMember.teamMemberPhoto || [
                { data_url: data.data.teamMemberPhoto },
              ]
            }
            onChange={(imageList: any) => {
              setUpdatedMember({
                ...updatedMember,
                teamMemberPhoto: imageList,
              });
            }}
          />
          <FormInput
            className=""
            input={{
              name: "name",
              type: "text",
              content: t("teams.name"),
              required: true,
              placeholder: t("teams.name"),
              value: updatedMember.name || "",
              setValue: setUpdatedMember,
            }}
          />
          <FormSelect
            input={{
              name: t("appointmentForm.service"),
              content: t("appointmentForm.service"),
              placeholder: t("appointmentForm.service"),
              value: section,
              setValue: setSectionId,
              defaultValue: t("appointmentForm.service"),
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
              value: updatedMember.twitter || "",
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
              value: updatedMember.facebook || "",
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
              value: updatedMember.instagram || "",
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
              value: updatedMember.youtube || "",
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
              value: updatedMember.linkedin || "",
              setValue: setUpdatedMember,
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
