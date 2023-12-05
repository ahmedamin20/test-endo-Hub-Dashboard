import { cn } from "@/utilities/cn";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  flag: boolean;
  openModal: () => void;
  closeModal: () => void;
  activeSectionClassName?: string;
}

export default function Modal({
  flag,
  className,
  openModal,
  closeModal,
  children,
  activeSectionClassName,
  ...props
}: Props) {
  if (flag) openModal();

  return (
    <>
      {flag && (
        <main
          className={cn(
            "w-screen h-screen z-20 fixed top-0 right-0 ",
            className
          )}
          onClick={() => {
            closeModal();
          }}
          {...props}
        >
          <div
            className={cn("flex w-fit", activeSectionClassName)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </main>
      )}
    </>
  );
}
