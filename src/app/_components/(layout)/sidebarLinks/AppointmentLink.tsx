import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { MdScheduleSend } from 'react-icons/md';

function AppointmentLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/appointments",
            })}
        >
            <Link href={"/appointments"} className="sidebar-item-link">
                <MdScheduleSend className="" />
                <span> {t("sidebar.appointments")}</span>
            </Link>
        </div>
    )
}

export default AppointmentLink