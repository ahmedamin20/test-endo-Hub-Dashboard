import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { CiSettings } from 'react-icons/ci';

function SettingsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/settings",
            })}
        >
            <Link href={"/settings"} className="sidebar-item-link">
                <CiSettings className="" />
                <span> {t("sidebar.settings")}</span>
            </Link>
        </div>
    )
}

export default SettingsLink