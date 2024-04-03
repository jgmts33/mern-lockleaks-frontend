"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";

export default function UsersView() {

    const [selectDownload, setSelectDownload] = useState(0);
    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>USERS</span>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>EMAIL:</span></div>
                <div><span>user@admin.com</span></div>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>EMCONNECTED WITH :</span></div>
                <div><span>Name</span></div>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>USERNAMES:</span></div>
                <div><span>Name</span></div>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>CONTRACT :</span></div>
                <div>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-xs" size='sm'>
                        START
                    </Button>
                </div>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>PLAN:</span></div>
                <div><span>ACTIVE / INACTIVE</span></div>
            </div>
            <div className='flex font-semibold text-base max-w-[370px] justify-between'>
                <div><span>ACTIVE PLAN:</span></div>
                <div><span> STARTER , STAR , PRO</span></div>
            </div>
        </div>
    )
}
