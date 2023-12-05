import { cn } from '@/utilities/cn';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { CgProfile } from "react-icons/cg";
function ProfileLink({ image, name, email }: { image: any, name: any, email: any }) {
    const t = useTranslations();
    const pathname = usePathname();
    return (
        <div
            className=''
        >
            <Link href={"/profile"} className="sidebar-item-link">
                <Image className=' rounded-full' src={image} alt='' width={25} height={25} />
                <span> {name} <span className=' text-sm'>{email}</span></span>
            </Link>
        </div>
    )
}

export default ProfileLink