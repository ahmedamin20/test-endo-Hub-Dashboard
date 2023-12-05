import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai';
import { LiaBlogSolid } from "react-icons/lia";
function StaticsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/home",
            })}
        >
            <Link href={"/home"} className="sidebar-item-link">
                <AiOutlineDashboard className="" />
                <span> {t("sidebar.statics")}</span>
            </Link>
        </div>
    )
}

export default StaticsLink