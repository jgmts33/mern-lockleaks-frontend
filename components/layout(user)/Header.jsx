"use client";
import React, { useEffect } from "react";
import Image from 'next/image';
import { YellowStar, Search, Dot, Pencil, Trash, Control, Window, LogOut, AccountSetting, Star } from "@/components/utils/Icons";
import { useState } from 'react';
import {
  Button, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Link,
  Avatar,
  ScrollShadow,
  Spinner
} from '@nextui-org/react';
import UserAvatar from '@/public/assets/background/Avatar.svg';
import { usePathname, useRouter } from 'next/navigation';
import { Poppins } from "next/font/google";
import { setTokensExpired, getCookieValue } from "@/axios/token";
import { GoogleTranslate } from "../translater";
import { useSelector } from "react-redux";
import { userInfo as info } from '@/lib/auth/authSlice';
import { clearNotifications, getNotifications } from "@/axios/user";
import { io } from "socket.io-client";
import { ENDPOINT } from "@/config/config";
import moment from "moment";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

const UserHeader = ({ show, setter }) => {

  const router = useRouter();
  const currentPath = usePathname();
  const [prefLangCookie, setPrefLangCookie] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const userInfo = useSelector(info);

  const icons = {
    yellowstar: <YellowStar />,
    search: <Search fill="currentColor" size={8} />,
    dot: <Dot />,
    pencil: <Pencil />,
    trash: <Trash />,
    control: <Control />,
    window: <Window />,
    logout: <LogOut />,
    accountsetting: <AccountSetting />,
    star: <Star />,
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
    router.push("/app/settings")
  }

  const [notifications, setNotifications] = useState([]);

  const handleLogOut = () => {
    window.open("/auth/login", '_self');
    setTokensExpired();
  }

  const getNotificationsInfo = async () => {
    const res = await getNotifications();
    if (res.status == 'success') setNotifications(res.data);
  }

  const handleClearNotifications = async () => {
    setIsProcessing(true);
    const res = await clearNotifications();
    if (res.status == 'success') {
      setNotifications([]);
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    getPrefLangCookie();
    getNotificationsInfo();

    const socket = io(ENDPOINT);

    socket.on(`notification_${userInfo.id}`, (value) => {
      console.log("notification:", value);
      setNotifications(p => ([value, ...p]))
    })

    return () => {
      socket.disconnect();
    }

  }, [userInfo])


  return (
    <Navbar
      isBordered
      className="bg-transparent z-30"
      maxWidth="full"
    >
      {currentPath.includes("kyc-submit") ? <NavbarContent>
        <div className="flex w-full px-3 py-3">
          {
            currentPath.includes("admin") ?
              <Link className="text-white cursor-pointer" href="/admin/dashboard">
                <Image src="/assets/logo.svg" width={150} height={50} alt="logo" />
              </Link>
              :
              <Link className="text-white cursor-pointer" href="/app/dashboard">
                <Image src="/assets/logo.svg" width={150} height={50} alt="logo" />
              </Link>
          }
        </div>
      </NavbarContent> : <></>}
      {!currentPath.includes("kyc-submit") ? <NavbarContent>
        <NavbarBrand>
          <Button radius="sm" isIconOnly className="bg-transparent text-white px-3 hidden items-center max-lg:block" size='sm' onClick={() => { setter(oldVal => !oldVal); }}>
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </NavbarBrand>
      </NavbarContent> : <></>}
      <NavbarContent justify="end">
        <NavbarItem className="text-white flex max-sm:hidden">
          {prefLangCookie && !currentPath.includes('admin') ? <GoogleTranslate prefLangCookie={prefLangCookie} /> : <></>}
        </NavbarItem>
        <NavbarItem className="text-white">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="items-center mt-1 cursor-pointer">
                <Badge color="danger" content={notifications.length} shape="circle">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              className="text-white max-h-[300px] overflow-y-auto max-w-[240px] m-2"
            >
              {notifications.length ? <DropdownItem
                isReadOnly
                className="mt-2 "
              >
                <div
                  className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg py-2 w-full h-full flex justify-center rounded-lg"
                  onClick={() => {
                    if (isProcessing) return;
                    handleClearNotifications();
                  }}
                >
                  {isProcessing ? <Spinner size="sm" className="mx-auto" /> : <p className="font-bold text-center">Clear Notifications</p>}
                </div>
              </DropdownItem> : <DropdownItem isReadOnly><p className="font-bold text-center">Notifications is not yet.</p></DropdownItem>}
              {
                notifications.map((item, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => {
                        if (item.content == "Search Engines Scan finished!") {
                          router.push("/app/dashboard")
                        }
                        if (item.content == "Agent responded. Check tickets.") {
                          router.push("/app/personal-agent/ticket-detail")
                        }
                        if (item.content.includes('Ticket')) {
                          router.push("/admin/personal-agent")
                        }
                        if (item.content.includes('New Order Google & Bing')) {
                          router.push("/admin/google-bing")
                        }
                        if (item.content.includes('New Order AI FACE')) {
                          router.push("/admin/ai-face")
                        }
                        if (item.content.includes('New Order R&R')) {
                          router.push("/admin/ruser-content")
                        }
                        if (item.content.includes('New Order Scanner')) {
                          router.push("/admin/scanner")
                        }
                        if (item.content.includes('New KYC Submission!')) {
                          router.push("/admin/contract-copyright")
                        }
                      }}
                    >
                      <div className={"max-w-[300px] flex w-full flex-col " + poppins.className}>
                        <div className="font-bold text-wrap">{item.content}</div>
                        <p className="text-gray-500">{moment(item.createdAt).fromNow()}</p>
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
              <div className="flex items-center text-white cursor-pointer gap-2">
                {userInfo?.name ? <div className="flex flex-col max-sm:hidden text-right notranslate">
                  <span className="font-semibold text-sm">{userInfo?.name}</span>
                  <span className="font-normal text-xs">{userInfo?.email}</span>
                </div> : <></>}
                <Badge content="" color="success" shape="circle" placement="bottom-right">
                  <Avatar alt="useravatar" />
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              className="text-white"
            >
              {userInfo?.roles.find(p => p == 'user') ? <DropdownItem>
                <div className={"flex w-full space-x-1 mx-auto " + poppins.className} onClick={handleUserSetting}>
                  <span>{icons.accountsetting}</span>
                  <span>Account Settings</span>
                </div>
              </DropdownItem> : null}
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