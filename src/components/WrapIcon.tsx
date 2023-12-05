import { cn } from "@/utilities/cn";
import React from "react";

export default function WrapIcon({
  children,
  className,
  link,
}: React.HtmlHTMLAttributes<HTMLDivElement> & { link?: string }) {
  return (
    <div className="flex flex-row gap-3 items-center group cursor-pointer">
      <a
        href={link}
        className={cn(
          "group-hover:rounded-full group-hover:primary-bg-gradient bg-primary-light-1 p-4 ",
          className
        )}
        target="_blank"
      >
        {children}
      </a>
    </div>
  );
}
