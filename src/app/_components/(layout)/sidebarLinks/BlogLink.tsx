import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { LiaBlogSolid } from "react-icons/lia";
function BlogsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/blogs",
            })}
        >
            <Link href={"/blogs"} className="sidebar-item-link">
                <LiaBlogSolid className="" />
                <span> {t("sidebar.blogs")}</span>
            </Link>
        </div>
    )
}

export default BlogsLink