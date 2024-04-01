"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning } from "@/components/utils/Icons";

export default function Analytics() {

    const [selectDownload, setSelectDownload] = useState(0)

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    const NotificationContent = [
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-3 py-10 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DATA ANALYTICS</span>
            </div>
            <div className='mt-10'>
                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                    Add
                </Button>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-10 w-full max-md:px-4'>
                <div className='flex justify-between'>
                    <div><span>Search Domain...</span></div>
                    <div>
                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm'>
                            Add
                        </Button></div>
                </div>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col gap-5 scroll-y max-md:px-4'>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex items-center gap-10 px-3'>
                                        <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                            {items}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>
            <div className='flex bg-white/10 shadow-sm py-5 px-16 gap-7 rounded-[16px] border border-gray-500 max-w-[1300px] items-center mt-10 w-full'>
                <div>{icons.warning}</div>
                <div className='flex gap-16 max-md:flex-col max-md:gap-1'>
                    <span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Scan name February 27, 2024</span>
                    <span className='font-semibold text-base '>Date Has Expired</span>
                </div>
            </div>
        </div>
    )
}
