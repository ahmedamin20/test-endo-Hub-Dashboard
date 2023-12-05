import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';
import Link from 'next-intl/link'

function AboutUsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/about-us",
            })}
        >
            <Link href={"/about-us"} className="sidebar-item-link">
                <AiOutlineInfoCircle className="" />
                <span> {t("sidebar.about-us")}</span>
            </Link>
        </div>
    )
}

export default AboutUsLink