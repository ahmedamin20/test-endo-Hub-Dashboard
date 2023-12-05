import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { RiAdvertisementLine } from "react-icons/ri";
function AdsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/ads",
            })}
        >
            <Link href={"/ads"} className="sidebar-item-link">
                <RiAdvertisementLine className="" />
                <span> {t("sidebar.ads")}</span>
            </Link>
        </div>
    )
}

export default AdsLink