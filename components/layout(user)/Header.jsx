"use client";
import React from "react";
import Image from 'next/image';
import { YellowStar, Search, Dot } from "@/components/utils/Icons";
import { useCallback, useEffect, useState } from 'react';
import {
  Button, Badge, Avatar
} from '@nextui-org/react';
import Flag from '@/public/assets/background/download.svg';
import UserAvatar from '@/public/assets/background/Avatar.svg'

const UserHeader = ({setIsSidebarOpen, isSidebarOpen}) => {

  const icons = {
    yellowstar: <YellowStar fill="currentColor" size={16} />,
    search: <Search fill="currentColor" size={8} />,
    dot: <Dot fill="currentColor" size={16} />,
  };

  return (
    <div className="flex bg-[#0a0a0a] items-center max-w-screen justify-between h-14">
      <div className="flex px-5 items-center">
        <Button radius="sm" className="bg-transparent text-white px-3 hidden items-center max-lg:block" size='sm' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
        <Button radius="lg" className="bg-transparent text-white flex items-center max-sm:hidden" size='sm'>
          {icons.yellowstar}
        </Button>
        <div className="h-1/2 min-h-[1em] w-px border-t-0 bg-white max-sm:hidden"></div>
        <Button radius="lg" className="bg-transparent text-white flex items-center max-sm:hidden" size='sm'>
          {icons.search}
        </Button>
      </div>
      <div className="flex px-5 text-white gap-5 items-center">
        <div className="flex max-sm:hidden">
          <Image src={Flag} width={15} height={15} alt="flag" />
          <span>En</span>
        </div>
        <div className="flex max-md:hidden">
          <div>
            <Badge color="danger" content={5} shape="circle">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </Badge>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">Emilia Clarke</span>
          <span className="font-normal text-xs">EC@gmail.com</span>
        </div>
        <div>
          <Badge content="" color="success" shape="circle" placement="bottom-right">
            <Image src={UserAvatar} width={35} height={35} className="" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
