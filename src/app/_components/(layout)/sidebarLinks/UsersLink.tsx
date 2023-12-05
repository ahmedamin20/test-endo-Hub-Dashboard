import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { AiOutlineInfoCircle, AiOutlineTeam } from 'react-icons/ai';
import { CiSettings, CiUser } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { VscFeedback } from 'react-icons/vsc';

function UsersLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/users",
            })}
        >
            <Link href={"/users"} className="sidebar-item-link">
                <CiUser className="" />
                <span> {t("sidebar.users")}</span>
            </Link>
        </div>
    )
}

export default UsersLink