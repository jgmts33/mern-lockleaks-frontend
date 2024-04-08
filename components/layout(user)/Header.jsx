"use client";
import React from "react";
import Image from 'next/image';
import { YellowStar, Search, Dot, Pencil, Trash, Control, Window, LogOut, AccountSetting, Star } from "@/components/utils/Icons";
import { useCallback, useEffect, useState } from 'react';
import {
  Button, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input
} from '@nextui-org/react';
import Flag from '@/public/assets/background/download.svg';
import UserAvatar from '@/public/assets/background/Avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserHeader = ({ setter}) => {
  const router = useRouter();
  const userData = useSelector((state) => state.auth);
  const [isSearch, setSearch] = useState(false);

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

  const handleUserSetting = () => {
    router.push("/userpanel/accountsetting")
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
    router.push("/auth/login")
  }

  return (
    <nav className="flex bg-[#0a0a0a] items-center max-w-screen justify-between h-14 z-30">
      <div className="flex px-2 items-center max-sm:justify-center max-sm:px-0">
        <Button radius="sm" isIconOnly className="bg-transparent text-white px-3 hidden items-center max-lg:block" size='sm' onClick={() => { setter(oldVal => !oldVal); }}>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
        <Button radius="lg" className="bg-transparent text-white flex items-center" size='sm' onClick={() => { setSearch(isSearch ? false : true) }}>
          {icons.search}
        </Button>
        <div className={("flex duration-1000 pb-2 ") + (!isSearch ? "opacity-0" : "opacity-100")}>
          <Input type="text" label="Search" className="h-7 w-80 max-md:w-32" />
        </div>
      </div>
      <div className="flex px-5 text-white gap-5 items-center">
        <div className="flex gap-5">
          <div className="flex items-center max-sm:hidden">
            <Image src={Flag} width={15} height={15} alt="flag" />
            <span>En</span>
          </div>
          <div className="flex text-white cursor-pointer z-0">
            <Dropdown>
              <DropdownTrigger>
                <div>
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
                        <div className="max-w-[300px] flex w-full flex-col">
                          <div><span>{item.title}</span></div>
                        </div>
                      </DropdownItem>
                    )
                  })
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex cursor-pointer z-0" >
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center">
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
                  <div className="flex w-full space-x-1 mx-auto" onClick={() => handleUserSetting()}>
                    <span>{icons.accountsetting}</span>
                    <span>Account Settings</span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex w-full space-x-2 mx-auto pl-1" onClick={() => handleLogOut()}>
                    <span>{icons.logout}</span>
                    <span>Log out</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;