import { cn } from "@/utilities/cn";
import Link from "next-intl/link";
import React from "react";

export default function MainLink({
  className,
  children,
  href,
  ...rest
}: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) {
  return (
    <Link
      href={href ?? ""}
      className={cn(
        " primary-bg-gradient flex items-center gap-[4px] text-white justify-center border ",
        className
      )}
    >
      {children}
    </Link>
  );
}
