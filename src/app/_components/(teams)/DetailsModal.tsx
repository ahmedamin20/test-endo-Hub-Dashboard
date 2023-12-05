import { MemberResponse } from "@/api/interfaces/Teams";
import { getMember } from "@/api/queries/teams.queries";
import Head from "@/components/Head";
import SocialMedia from "@/components/SocialMedia";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function DetailsModal({
  id,
  closeModal,
  onDelete,
}: {
  id: number;
  closeModal: any;
  onDelete?: Dispatch<SetStateAction<number | undefined>>;
}) {
  const t = useTranslations();
  const { data } = useQuery<MemberResponse>({
    queryKey: ["teamMember", id],
    queryFn: () => getMember(id),
  });
  if (!data) return <div className="modal-content">loading...</div>;
  return (
    <div className="modal-content ">
      <Head content={t("teams.card")} />
      <div className="flex flex-row-reverse gap-2 justify-around w-full items-center h-full">
        <div className="flex flex-col gap-3">
          <span className="font-bold">{t("teams.teamMemberPhoto")}</span>
          <Image
            className="w-auto h-auto"
            src={data.data.teamMemberPhoto}
            width={200}
            height={300}
            unoptimized
            alt="member photo"
          />
        </div>
        <div className="flex flex-col ">
          <div>
            <span className="font-bold">{t("teams.id")} : </span>
            {data.data.id}
          </div>
          <div>
            <span className="font-bold">{t("teams.name")} : </span>
            {data.data.name}
          </div>
          <div>
            <span className="font-bold">{t("teams.section.title")} : </span>
            {data.data.section.title}
          </div>
          <div>
            <SocialMedia
              facebook={data.data.facebook}
              instagram={data.data.instagram}
              linkedin={data.data.linkedin}
              twitter={data.data.twitter}
              youtube={data.data.youtube}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Link
          onClick={closeModal}
          href={`/teams/${data.data.id}/edit`}
          className="bg-update text-white font-bold p-2 rounded-lg"
        >
          {t("edit")}
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="bg-delete text-white font-bold p-2 rounded-lg"
          >
            {t("delete")}
          </button>
        )}{" "}
      </div>
      <button
        onClick={closeModal}
        className="absolute ltr:right-0 top-3 bg-delete text-white font-bold p-2 px-4 rounded-full"
      >
        X
      </button>
    </div>
  );
}
