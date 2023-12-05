import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';

function ContactUsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/contact-us",
            })}
        >
            <Link href={"/contact-us"} className="sidebar-item-link">
                <GrContact className="" />
                <span> {t("sidebar.contact-us")}</span>
            </Link>
        </div>
    )
}

export default ContactUsLink