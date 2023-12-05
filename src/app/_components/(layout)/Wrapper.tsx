"use client";
import { usePathname } from "next-intl/client";
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/utilities/cn";
import Theme from "./Theme";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [minimize, setMinimize] = useState(false);

  if (pathName === "/") return <>
    <Theme />

    {children}
  </>;
  return (
    <div className="flex flex-row gap-3 ">
      <Sidebar minimize={minimize} />
      <Header minimize={minimize} setMinimize={setMinimize} />
      <Theme />
      <main
        className={cn(
          "transition-all duration-500 ease-in-out flex w-full justify-center overflow-hidden pt-[70px]",
          {
            "ltr:ml-[250px] rtl:mr-[250px]": !minimize,
          }
        )}
      >
        {children}
      </main>
    </div>
  );
}
