import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link'
import React from 'react'
import { LiaBlogSolid } from "react-icons/lia";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
function ProductsLink({ pathname }: { pathname: string }) {
    const t = useTranslations();

    return (
        <div
            className={cn("sidebar-item", {
                "sidebar-active border-white": pathname === "/products",
            })}
        >
            <Link href={"/products"} className="sidebar-item-link">
                <MdOutlineProductionQuantityLimits className="" />
                <span> {t("sidebar.products")}</span>
            </Link>
        </div>
    )
}

export default ProductsLink