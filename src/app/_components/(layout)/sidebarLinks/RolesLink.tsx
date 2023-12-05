import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { LiaBlogSolid } from "react-icons/lia";
import { SiWebauthn } from 'react-icons/si';
function RolesLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/roles",
            })}
        >
            <Link href={"/roles"} className="sidebar-item-link">
                <SiWebauthn className="" />
                <span> {t("sidebar.roles")}</span>
            </Link>
        </div>
    )
}

export default RolesLink