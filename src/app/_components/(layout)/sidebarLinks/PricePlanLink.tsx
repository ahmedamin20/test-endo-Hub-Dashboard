import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { LiaBlogSolid } from "react-icons/lia";
function PricePlanLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/price-plan",
            })}
        >
            <Link href={"/price-plan"} className="sidebar-item-link">
                <LiaBlogSolid className="" />
                <span> {t("sidebar.pricePlan")}</span>
            </Link>
        </div>
    )
}

export default PricePlanLink