import React from "react";
import MainButton from "./MainButton";
import { cn } from "@/utilities/cn";
import { useLocale } from "next-intl";
import { dir } from "i18next";

export default function PaginationFooter({
  page,
  lastPage,
  isLoading,
  nextFunction,
  prevFunction,
}: {
  page: number;
  lastPage: number;
  isLoading?: boolean;
  nextFunction: () => void;
  prevFunction: () => void;
}) {
  return (
    <footer>
      <div className="flex gap-2 items-center rtl:flex-row-reverse">
        <MainButton
          dir="ltr"
          className="w-fit rounded-full p-2"
          onClick={() => {
            if (!isLoading) if (page !== 1) prevFunction();
          }}
        >
          &lt;
        </MainButton>
        <div className="flex gap-1 " dir="ltr">
          <span
            className={cn(
              "bg-black border-2 border-black p-1 h-[1px] rounded-full rtl:flex-row-reverse",
              {
                "bg-white  ": page === 1,
              }
            )}
          ></span>
          <span
            className={cn(
              "bg-black border-2 border-black p-1 h-[1px] rounded-full",
              {
                "bg-white  ": page > 1 && page < lastPage,
              }
            )}
          ></span>
          <span
            className={cn(
              "bg-black border-2 border-black p-1 h-[1px] rounded-full",
              {
                "bg-white  ": page === lastPage,
              }
            )}
          ></span>
        </div>
        <MainButton
          dir="ltr"
          className="w-fit rounded-full p-2 "
          onClick={() => {
            if (!isLoading) if (page !== lastPage) nextFunction();
          }}
        >
          &gt;
        </MainButton>
      </div>
    </footer>
  );
}
