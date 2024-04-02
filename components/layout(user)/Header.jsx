"use client";
import React from "react";
import Image from 'next/image';
import { YellowStar, Search, Dot, Pencil, Trash, Control, Window } from "@/components/utils/Icons";
import { useCallback, useEffect, useState } from 'react';
import {
  Button, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input
} from '@nextui-org/react';
import Flag from '@/public/assets/background/download.svg';
import UserAvatar from '@/public/assets/background/Avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserHeader = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const router = useRouter();
  const userData = useSelector((state) => state.auth);
  const [isSearch, setSearch] = useState(false)

  const icons = {
    yellowstar: <YellowStar fill="currentColor" size={16} />,
    search: <Search fill="currentColor" size={8} />,
    dot: <Dot fill="currentColor" size={16} />,
    pencil: <Pencil fill="currentColor" size={16} />,
    trash: <Trash fill="currentColor" size={16} />,
    control: <Control fill="currentColor" size={16} />,
    window: <Window fill="currentColor" size={16} />,
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

  const handleSelectSidebar = () => {
  }

  return (
    <div className="flex bg-[#0a0a0a] items-center max-w-screen justify-between h-14">
      <div className="flex px-2 items-center max-sm:justify-center max-sm:px-0">
        <Button radius="sm" className="bg-transparent text-white px-3 hidden items-center max-lg:block" size='sm' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
        {
          userData.email == "cosmin@gmail.com" && userData.password == "admin123"
            ?
            <div className="flex">
              <div className="px-2 max-md:hidden">
                <span>{icons.pencil}</span>
              </div>
              <div className="px-2 max-md:hidden">
                <span>{icons.trash}</span>
              </div>
              <div className="px-2 max-md:hidden">
                <span>{icons.window}</span>
              </div>
              <div className="px-2 max-md:hidden">
                <span>{icons.control}</span>
              </div>
            </div>
            :
            false
        }
        <Button radius="lg" className="bg-transparent text-white flex items-center max-sm:hidden" size='sm' onClick={()=>handleSelectSidebar()}>
          {icons.yellowstar}
        </Button>
        <div className="h-1/2 min-h-[1em] w-px border-t-0 bg-white max-sm:hidden"></div>
        <Button radius="lg" className="bg-transparent text-white flex items-center" size='sm' onClick={() => { setSearch(isSearch ? false : true) }}>
          {icons.search}
        </Button>
        <div className={("flex duration-1000 pb-2 ") + (!isSearch ? "opacity-0" : "opacity-100")}>
          <Input type="text" label="Search" className="h-7" />
        </div>
      </div>
      <div className="flex px-5 text-white gap-5 items-center">
        <div className="flex max-sm:hidden">
          <Image src={Flag} width={15} height={15} alt="flag" />
          <span>En</span>
        </div>
        <div className="flex max-md:hidden text-white cursor-pointer">
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
        <div className="flex flex-col max-sm:hidden">
          <span className="font-semibold text-sm">Emilia Clarke</span>
          <span className="font-normal text-xs">EC@gmail.com</span>
        </div>
        <div onClick={() => { handleUserSetting() }} className="cursor-pointer">
          <Badge content="" color="success" shape="circle" placement="bottom-right">
            <Image src={UserAvatar} width={35} height={35} className="" alt="useravatar" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
