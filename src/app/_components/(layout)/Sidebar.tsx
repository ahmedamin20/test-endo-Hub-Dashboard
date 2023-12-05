"use client";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import Image from "next/image";
import { AiOutlineInfoCircle, AiOutlineTeam } from "react-icons/ai";

import { MdScheduleSend } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

import ContactUsLink from "./sidebarLinks/ContactUsLink";
import AboutUsLink from "./sidebarLinks/AboutUsLink";
import OurTeamLink from "./sidebarLinks/OurTeamLink";
import TesteminialsLink from "./sidebarLinks/TestemonialsLink";
import AppointmentLink from "./sidebarLinks/AppointmentLink";
import SettingsLink from "./sidebarLinks/SettingsLink";
import SectionsLink from "./sidebarLinks/SectionsLink";
import AdsLink from "./sidebarLinks/AdsLink";
import WorkingHoursLink from "./sidebarLinks/WorkingHoursLink";
import BlogsLink from "./sidebarLinks/BlogLink";
import PartentersLink from "./sidebarLinks/PartnersLink";
import CategoriesLink from "./sidebarLinks/CategorisLink";
import path from "path";
import PricePlanLink from "./sidebarLinks/PricePlanLink";
import UsersLink from "./sidebarLinks/UsersLink";
import StaticsLink from "./sidebarLinks/StaticsLink";
import RolesLink from "./sidebarLinks/RolesLink";
import ProductsLink from "./sidebarLinks/ProductsLink";
import ServicesLink from "./sidebarLinks/ServicesLink";

export default function Sidebar({ minimize }: { minimize: boolean }) {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "transition-all duration-500 ease-in-out flex flex-col w-[250px] bg-third py-5 min-h-screen max-h-screen overflow-y-scroll items-center text-lg z-10 fixed  ",
        {
          "ltr:left-0 rtl:right-0": !minimize,
          "rtl:-right-[250px] ltr:-left-[250px]": minimize,
        }
      )}
    >
      <div className=" flex flex-col justify-between w-full">
        <Link href={"/home"} className="flex justify-center w-full  ">
          <Image
            alt="EndoHub Logo"
            src={"/lastLogo.png"}
            width={150}
            height={80}
            className="cursor-pointer "
          />
        </Link>
        <hr className="w-full" />
      </div>
      <StaticsLink pathname={pathname} />
      <SectionsLink pathname={pathname} />


      <OurTeamLink pathname={pathname} />
      { /*<TesteminialsLink pathname={pathname} />*/}
      <AdsLink pathname={pathname} />
      <PartentersLink pathname={pathname} />
      <PricePlanLink pathname={pathname} />
      <RolesLink pathname={pathname} />
      <UsersLink pathname={pathname} />
      <ServicesLink pathname={pathname} />
      <BlogsLink pathname={pathname} />

      <CategoriesLink pathname={pathname} />

      <ProductsLink pathname={pathname} />
      <WorkingHoursLink pathname={pathname} />
      <AppointmentLink pathname={pathname} />

      <SettingsLink pathname={pathname} />
      <ContactUsLink pathname={pathname} />
      <AboutUsLink pathname={pathname} />

      {  /*   */}
    </aside>
  );
}
