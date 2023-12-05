"use client";
import { StaticsReponse } from "@/api/interfaces/Dashbord";
import { PartnersResponse } from "@/api/interfaces/Partners";
import { getPartners } from "@/api/queries/partner.query";
import { getStatics } from "@/api/queries/statics.query";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import StaticsCard from "@/app/_components/(dashbord)/StaticsCard";
import Head from "@/components/Head";
import { SiMinetest } from "react-icons/si";
import { API_ENDPOINTS } from "@/constants/Constants";
import useAuth from "@/middlewares/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { RxSection } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaBlog } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
export default function Home() {
  useAuth();
  const { data, refetch, isLoading } = useQuery<StaticsReponse>({
    queryKey: [API_ENDPOINTS.STATICS],
    queryFn: () => getStatics(),
  });
  const t = useTranslations()
  return (
    <main className="flex flex-col gap-[30px] w-full py-10 px-[5px]">
      <div className="bg-primary shadow-md p-[10px] gap-[15px] grid sm:grid-cols-3 grid-cols-1 items-center">
        <StaticsCard value={data?.data[0]?.ads} label={t('statics.ads')}>
          <RiAdvertisementLine size={'30px'} />
        </StaticsCard>
        <StaticsCard value={data?.data[0]?.blogs} label={t('statics.blogs')}>
          <FaBlog size={'30px'} />
        </StaticsCard>
        <StaticsCard value={data?.data[0]?.categories} label={t('statics.categories')}>
          <BiCategory size={'30px'} />
        </StaticsCard>
      </div>

      <div className="bg-primary shadow-md p-[10px] gap-[15px] grid sm:grid-cols-3 grid-cols-1 items-center">
        <StaticsCard value={data?.data[0]?.products} label={t('statics.products')}>
          <MdOutlineProductionQuantityLimits size={'30px'} />
        </StaticsCard>
        <StaticsCard value={data?.data[0]?.sections} label={t('statics.sections')}>
          <RxSection size={'30px'} />
        </StaticsCard>
        <StaticsCard value={data?.data[0]?.ourTeam} label={t('statics.ourTeams')}>
          <PiMicrosoftTeamsLogoLight size={'30px'} />
        </StaticsCard>
      </div>

      <div className="bg-primary shadow-md p-[10px] gap-[15px] grid sm:grid-cols-2 grid-cols-1 items-center">
        <StaticsCard value={data?.data[0]?.messages} label={t('statics.messages')}>
          <AiOutlineMessage size={'30px'} />
        </StaticsCard>
        {     /*   <StaticsCard value={data?.data[0]?.testimonials} label={t('statics.testimonials')}>
          <SiMinetest size={'30px'} />
  </StaticsCard>*/}
        <StaticsCard value={data?.data[0]?.users} label={t('statics.users')}>
          <CiUser size={'30px'} />
        </StaticsCard>
      </div>



    </main>

  );
}
