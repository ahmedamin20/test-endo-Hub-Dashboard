import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { BsFillSignIntersectionYFill } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { GrBusinessService, GrContact } from 'react-icons/gr';
import { MdScheduleSend } from 'react-icons/md';

function ServicesLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/services",
            })}
        >
            <Link href={"/services"} className="sidebar-item-link">
                <GrBusinessService className="" />
                <span> {t("sidebar.services")}</span>
            </Link>
        </div>
    )
}

export default ServicesLink