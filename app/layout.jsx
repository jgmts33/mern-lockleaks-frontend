'use client'
// import { NextUIProvider } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from 'next/image';

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentPath = usePathname();

  return (
    <html lang="en">
      <body className={poppins.className + " dark"}>
        <div className="flex items-center flex-col min-h-screen">
          {/* <NextUIProvider> */}
          {
            !currentPath.includes("/auth")
              ?
              <Header />
              :
              <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center'>
                <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
              </div>
          }
          {children}
          {
            !currentPath.includes("/auth")
              ?
              <Footer />
              :
              false
          }
          {/* </NextUIProvider> */}
        </div>
      </body>
    </html>
  );
}
