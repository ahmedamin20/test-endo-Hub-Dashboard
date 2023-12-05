import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { GrContact } from 'react-icons/gr';

function CategoriesLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/categories",
            })}
        >
            <Link href={"/categories"} className="sidebar-item-link">
                <BiCategory className="" />
                <span> {t("sidebar.categories")}</span>
            </Link>
        </div>
    )
}

export default CategoriesLink