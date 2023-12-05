import { cn } from "@/utilities/cn";
import React from "react";
import FormSelect from "../Form/FormSelect";
import MainButton from "../MainButton";

export default function TablePaginationFooter({
  page,
  lastPage,
  isLoading,
  perPage,
  setPerPage,
  nextFunction,
  prevFunction,
}: {
  page: number;
  lastPage: number;
  isLoading?: boolean;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  nextFunction: () => void;
  prevFunction: () => void;
}) {
  return (
    <footer className="flex items-center justify-between w-full z-20">
      <FormSelect
        input={{
          name: "perPage",
          value: { value: perPage, label: perPage },
          options: [5, 10, 15, 20, 30],
          setValue: setPerPage,
        }}
        menuPlacement={'top'}
      />
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
