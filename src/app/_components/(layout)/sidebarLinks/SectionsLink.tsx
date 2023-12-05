import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { BsFillSignIntersectionYFill } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { MdScheduleSend } from 'react-icons/md';

function SectionsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/sections",
            })}
        >
            <Link href={"/sections"} className="sidebar-item-link">
                <BsFillSignIntersectionYFill className="" />
                <span> {t("sidebar.sections")}</span>
            </Link>
        </div>
    )
}

export default SectionsLink