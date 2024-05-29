"use client";
import React, { useEffect } from "react";
import Image from 'next/image';
import { YellowStar, Search, Dot, Pencil, Trash, Control, Window, LogOut, AccountSetting, Star } from "@/components/utils/Icons";
import { useState } from 'react';
import {
  Button, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarContent, NavbarItem
} from '@nextui-org/react';
import UserAvatar from '@/public/assets/background/Avatar.svg';
import { usePathname, useRouter } from 'next/navigation';
import { Poppins } from "next/font/google";
import { setTokensExpired } from "@/axios/token";
import { GoogleTranslate } from "../translater";
import { getCookieValue } from "../../axios/token";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

const UserHeader = ({ show, setter }) => {

  const router = useRouter();
  const currentPath = usePathname();
  const [prefLangCookie, setPrefLangCookie] = useState('');

  const icons = {
    yellowstar: <YellowStar fill="currentColor" size={16} />,
    search: <Search fill="currentColor" size={8} />,
    dot: <Dot fill="currentColor" size={16} />,
    pencil: <Pencil fill="currentColor" size={16} />,
    trash: <Trash fill="currentColor" size={16} />,
    control: <Control fill="currentColor" size={16} />,
    window: <Window fill="currentColor" size={16} />,
    logout: <LogOut fill="currentColor" size={16} />,
    accountsetting: <AccountSetting fill="currentColor" size={16} />,
    star: <Star fill="currentColor" size={16} />,
  };

  const getPrefLangCookie = async () => {
    try {
      // Step 1: Fetch user's IP address
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();

      // Step 2: Determine location based on IP
      const geoResponse = await fetch(`https://ipinfo.io/widget/demo/${ip}`);
      const geoData = await geoResponse.json();
      const countryCode = geoData.data.country;

      // Step 3: Set cookie based on location
      let lang;
      switch (countryCode) {
        case 'US':
          lang = 'en';
          break;
        case 'IT':
          lang = 'it';
          break;
        case 'RO':
          lang = 'ro';
          break;
        case 'ES':
          lang = 'es';
          break;
        case 'RU':
          lang = 'ru';
          break;
        // Add more cases as needed
        default:
          lang = 'en'; // Default to English if unknown
      }

      setPrefLangCookie(getCookieValue("googtrans") ? getCookieValue("googtrans") : `/auto/${lang}`);

    } catch (error) {
      console.error('Error getting preferred language:', error);
      return 'en'; // Fallback to English if there's an error
    }
  };

  const handleUserSetting = () => {
    router.push("/app/setting")
  }

  const notifications = [
    {
      title: "Good News",
    }, {
      title: "Good News",
    }, {
      title: "Good News",
    }, {
      title: "Good News",
    }, {
      title: "Good News",
    }
  ]

  const handleLogOut = () => {
    window.open("/auth/login", '_self');
    setTokensExpired();
  }

  useEffect(() => {
    getPrefLangCookie();
  }, [])


  return (
    <Navbar
      isBordered
      className="bg-transparent z-30"
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarBrand>
          <Button radius="sm" isIconOnly className="bg-transparent text-white px-3 hidden items-center max-lg:block" size='sm' onClick={() => { setter(oldVal => !oldVal); }}>
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="text-white flex max-sm:hidden">
          {prefLangCookie && !currentPath.includes('admin') ? <GoogleTranslate prefLangCookie={prefLangCookie} /> : <></>}
        </NavbarItem>
        <NavbarItem className="text-white">
          <Dropdown>
            <DropdownTrigger>
              <div className="items-center mt-1 cursor-pointer">
                <Badge color="danger" content={5} shape="circle">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              className="text-white max-w-full"
            >
              {
                notifications.map((item, index) => {
                  return (
                    <DropdownItem key={index}>
                      <div className={"max-w-[300px] flex w-full flex-col " + poppins.className}>
                        <div><span>{item.title}</span></div>
                      </div>
                    </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Dropdown className="text-white">
            <DropdownTrigger>
              <div className="flex items-center text-white cursor-pointer">
                <div className="flex flex-col max-sm:hidden">
                  <span className="font-semibold text-sm">Emilia Clarke</span>
                  <span className="font-normal text-xs">EC@gmail.com</span>
                </div>
                <Badge content="" color="success" shape="circle" placement="bottom-right">
                  <Image src={UserAvatar} width={35} height={35} className="" alt="useravatar" />
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              className="text-white"
            >
              <DropdownItem>
                <div className={"flex w-full space-x-1 mx-auto " + poppins.className} onClick={handleUserSetting}>
                  <span>{icons.accountsetting}</span>
                  <span>Account Settings</span>
                </div>
              </DropdownItem>
              <DropdownItem>
                <div className={"flex w-full space-x-2 mx-auto pl-1 " + poppins.className} onClick={handleLogOut}>
                  <span>{icons.logout}</span>
                  <span>Log out</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default UserHeader;