import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { AiOutlineInfoCircle, AiOutlineTeam } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';

function OurTeamLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/teams",
            })}
        >
            <Link href={"/teams"} className="sidebar-item-link">
                <AiOutlineTeam className="" />
                <span> {t("sidebar.team")}</span>
            </Link>
        </div>
    )
}

export default OurTeamLink