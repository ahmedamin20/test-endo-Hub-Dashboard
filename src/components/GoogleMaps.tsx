import { cn } from "@/utilities/cn";
import React, { IframeHTMLAttributes } from "react";

export function GoogleMaps({
  width,
  height,
  src,
  className,
}: IframeHTMLAttributes<HTMLIFrameElement>) {
  return (
    <iframe
      className={cn("", className)}
      src={src}
      width={width}
      height={height}
      style={{ border: 0 }}
      loading="lazy"
    />
  );
}

GoogleMaps;
