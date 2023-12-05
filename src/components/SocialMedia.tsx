import { cn } from "@/utilities/cn";
import React from "react";
import WrapIcon from "./WrapIcon";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";

export default function SocialMedia({
  whatsapp,
  twitter,
  instagram,
  linkedin,
  facebook,
  youtube,
  className,
}: {
  whatsapp?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  className?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row gap-2 text-white", className)}>
      {facebook && (
        <WrapIcon link={facebook}>
          <BsFacebook />
        </WrapIcon>
      )}{" "}
      {whatsapp && (
        <WrapIcon link={whatsapp}>
          <BsWhatsapp />
        </WrapIcon>
      )}{" "}
      {twitter && (
        <WrapIcon link={twitter}>
          <BsTwitter />
        </WrapIcon>
      )}{" "}
      {instagram && (
        <WrapIcon link={instagram}>
          <BsInstagram />
        </WrapIcon>
      )}{" "}
      {youtube && (
        <WrapIcon link={youtube}>
          <BsYoutube />
        </WrapIcon>
      )}{" "}
      {linkedin && (
        <WrapIcon link={linkedin}>
          <BsLinkedin />
        </WrapIcon>
      )}{" "}
    </div>
  );
}
