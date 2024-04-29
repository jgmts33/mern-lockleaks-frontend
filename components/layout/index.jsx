'use client'
import { Poppins } from "next/font/google";
import { useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import UserHeader from "@/components/layout(user)/Header";
import Sidebar from "@/components/layout(user)/Sidebar";
import Footer from "@/components/layout/Footer";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Link, Button
} from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import { useSelector } from "react-redux";
import { userInfo as info } from '@/lib/auth/authSlice';
import { useRouter } from "next/router";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentPath = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  const userInfo = useSelector(info);

  useEffect(() => {
    if (!userInfo && (currentPath?.includes("/app") || (currentPath?.includes("/admin")))) {
      router.push("/auth/login");
    }
  }, [userInfo]);

  return (
    <div className={poppins.className + (currentPath?.includes("/app") || currentPath?.includes("/admin") ? "overflow-hidden !p-0" : "")}>
      <div className="flex flex-col">
        {
          currentPath?.includes("/app") || currentPath?.includes("/admin")
            ?
            <div className="flex ">
              <Sidebar show={showSidebar} setter={setShowSidebar} />
              <div className="w-full gradiant-background">
                <UserHeader setter={setShowSidebar} />
                <div className="flex flex-col flex-grow w-screen md:w-full h-[calc(100vh-65px)] overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                  {children}
                </div>
              </div>
            </div>
            :
            <div className="relative">
              {
                !currentPath?.includes("/auth")
                  ?
                  <Header />
                  :
                  <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center'>
                    <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
                  </div>
              }
              <div className="flex w-full">
                <div className="mx-auto max-sm:w-full">
                  <NextTopLoader
                    color="#2299DD"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    template='<div class="bar absolute" role="bar"><div class="peg"></div></div> 
                        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                    zIndex={1600}
                    showAtBottom={false}
                  />
                  {children}
                </div>
              </div>
              {
                !currentPath?.includes("/auth")
                  ?
                  <Footer />
                  :
                  false
              }
            </div>
        }
      </div>
    </div>
  );
}