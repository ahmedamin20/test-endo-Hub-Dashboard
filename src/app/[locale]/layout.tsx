import { languages } from "@/i18n/settings";
import { dir } from "i18next";
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../_components/(layout)/Loader";
import Wrapper from "../_components/(layout)/Wrapper";
import { ReactQueryProvider } from "../_providers/react.query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const poppins = Playfair_Display({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Endohub",
  description: "Generated by create next app",
};
export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body className={`${poppins.className} text-white theme bg-theme9`} >
        <Suspense fallback={<Loader />}>
          <ReactQueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Wrapper>{children}</Wrapper>
              <ToastContainer />
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}