'use client'
import { Poppins } from "next/font/google";
import { useEffect, useState } from 'react';
import "./globals.css";
import Header from "@/components/layout/Header";
import UserHeader from "@/components/layout(user)/Header";
import Sidebar from "@/components/layout(user)/Sidebar";
import Footer from "@/components/layout/Footer";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Link
} from '@nextui-org/react';


const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentPath = usePathname();
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);


  return (
    <html lang="en">
      <body className={poppins.className + " dark"}>
        <div className="flex flex-col min-h-screen">
          {
            currentPath.includes("/userpanel") || currentPath.includes("/adminpanel")
              ?
              <div className="flex w-full">
                <Sidebar isSidebarOpen = {isSidebarOpen} setIsSidebarOpen = { setIsSidebarOpen } />
                <div className="flex flex-col w-full gradiant-background">
                  <UserHeader setIsSidebarOpen = { setIsSidebarOpen } isSidebarOpen = {isSidebarOpen} />
                    {children}
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
      </body>
    </html>
  );
}
