'use client'
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import UserHeader from "@/components/layout(user)/Header";
import Sidebar from "@/components/layout(user)/Sidebar";
import Footer from "@/components/layout/Footer";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Link, ScrollShadow
} from '@nextui-org/react';
import { AlertProvider } from "next-alert";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentPath = usePathname();

  return (
    <html lang="en">
      <body className={poppins.className + " dark"}>
        <AlertProvider>
          <div className="flex flex-col min-h-screen">
            {
              currentPath.includes("/userpanel") || currentPath.includes("/adminpanel")
                ?
                <div className="flex w-full">
                  <Sidebar />
                  <div className="flex flex-col">
                    <UserHeader />
                    <div className="h-[calc(100vh-58px)] gradiant-background">
                      <ScrollShadow className="h-[890px]">
                        {children}
                      </ScrollShadow>
                    </div>
                  </div>
                </div>
                :
                <div className="">
                  {
                    !currentPath.includes("/auth")
                      ?
                      <Header />
                      :
                      <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center'>
                        <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
                      </div>
                  }
                  <div className="flex w-full">
                    <div className="mx-auto">
                      {children}
                    </div>
                  </div>
                  {
                    !currentPath.includes("/auth")
                      ?
                      <Footer />
                      :
                      false
                  }
                </div>
            }
          </div>
        </AlertProvider>
      </body>
    </html>
  );
}
