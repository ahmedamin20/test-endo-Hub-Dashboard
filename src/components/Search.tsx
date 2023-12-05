"use client";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

export default function Search({
  placeholder,
  onChange,
  onClick,
  className,
}: React.HtmlHTMLAttributes<HTMLInputElement | HTMLButtonElement>) {
  const t = useTranslations();
  return (
    <div className={cn("relative w-fit ", className)}>
      <button
        className="absolute top-3 ltr:right-3 rtl:left-3  "
        onClick={onClick}
      >
        <BiSearchAlt />
      </button>
      <input
        type="text"
        className="form-control rounded-full px-4 py-2 ltr:pr-10 rtl:pl-10 w-full border border-black"
        placeholder={placeholder || t("search")}
        onChange={onChange}
      ></input>
    </div>
  );
}
