import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center bg-[#4FB49A]  h-full">
      <Image
        className="w-full h-full"
        src={"/loaders/heart-loading2.gif"}
        alt="loading"
        width={2000}
        height={2000}
        unoptimized
      ></Image>
    </div>
  );
}
