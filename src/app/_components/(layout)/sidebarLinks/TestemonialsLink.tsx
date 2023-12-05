import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { AiOutlineInfoCircle, AiOutlineTeam } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import { VscFeedback } from 'react-icons/vsc';

function TesteminialsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/testimonials",
            })}
        >
            <Link href={"/testimonials"} className="sidebar-item-link">
                <VscFeedback className="" />
                <span> {t("sidebar.testimonials")}</span>
            </Link>
        </div>
    )
}

export default TesteminialsLink