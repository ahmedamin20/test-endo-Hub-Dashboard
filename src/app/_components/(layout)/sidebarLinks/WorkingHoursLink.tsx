import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { AiOutlineInfoCircle, AiOutlineTeam } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { Ri24HoursLine } from 'react-icons/ri';

function WorkingHoursLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/working-hours",
            })}
        >
            <Link href={"/working-hours"} className="sidebar-item-link">
                <Ri24HoursLine className="" />
                <span> {t("sidebar.workingHours")}</span>
            </Link>
        </div>
    )
}

export default WorkingHoursLink