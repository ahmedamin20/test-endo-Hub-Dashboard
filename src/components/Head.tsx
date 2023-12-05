import { cn } from "@/utilities/cn";
import React from "react";

export default function Head({
  content,
  className,
  h2,
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
  h2?: React.HTMLAttributes<HTMLHeadingElement>;
}) {
  return (
    <div className={cn("", className)}>
      <h2
        className={cn(
          "flex flex-col after:content-[' '] after:h-1 after:w-6 after:bg-secondary-light-1 items-center",
          h2?.className
        )}
      >
        {content}
      </h2>
    </div>
  );
}
