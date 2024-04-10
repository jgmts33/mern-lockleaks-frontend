"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil, Trash } from "@/components/utils/Icons";

export default function UsersView() {

    const [selectDownload, setSelectDownload] = useState(0);
    const icons = {
        search: <Search fill="currentColor" size={16} />,
        pencil: <Pencil fill="currentColor" size={16} />,
        trash: <Trash fill="currentColor" size={16} />,
    };

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 max-sm:pt-16 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>USERS</span>
            </div>
            <div className='flex flex-col space-y-5 mt-10'>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>EMAIL:</span></div>
                    <div className='flex w-1/2'><span>user@admin.com</span></div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>EMCONNECTED WITH :</span></div>
                    <div className='flex w-1/2'><span>Name</span></div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>USERNAMES:</span></div>
                    <div className='flex w-1/2'><span>Name</span></div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>CONTRACT :</span></div>
                    <div className='flex w-1/2'>
                        <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                            Download
                        </Button>
                    </div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>PLAN:</span></div>
                    <div className='flex w-1/2'><span>ACTIVE / INACTIVE</span></div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] justify-between'>
                    <div className='flex w-1/2'><span>ACTIVE PLAN:</span></div>
                    <div className='flex w-1/2'><span> STARTER , STAR , PRO</span></div>
                </div>
            </div>
            <div className='flex flex-col max-w-[200px] space-y-8 mt-8'>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    <span className='flex gap-1'>{icons.pencil}EDIT EMAIL</span>
                </Button>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    <span className='flex gap-1'>{icons.pencil}EDIT PASSWORD</span>
                </Button>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    <span className='flex gap-1'>{icons.trash}DELETE USER</span>
                </Button>
            </div>
        </div>
    )
}
