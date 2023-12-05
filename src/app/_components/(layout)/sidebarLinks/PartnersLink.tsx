import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { MdOutline6FtApart, MdScheduleSend } from 'react-icons/md';

function PartentersLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/partners",
            })}
        >
            <Link href={"/partners"} className="sidebar-item-link">
                <MdOutline6FtApart className="" />
                <span> {t("sidebar.partners")}</span>
            </Link>
        </div>
    )
}

export default PartentersLink