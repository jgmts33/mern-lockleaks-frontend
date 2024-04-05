"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning } from "@/components/utils/Icons";

export default function DownloadData() {

    const [selectDownload , setSelectDownload] = useState(0)

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
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">

            {/* This section for define download data header?*/}

            <div className='mt-5 max-lg:mx-auto max-lg:mt-0'>
                <span className='font-extrabold text-lg'>DOWNLOAD DATA</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full max-md:px-4'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-8 gap-5 scroll-y max-md:px-4'>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex items-center gap-10 max-md:flex-col max-xl:gap-5 max-md:items-start'>
                                        <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                            {items}
                                        </div>
                                        <div>
                                            <Button radius="lg" className={selectDownload == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"} size='sm' onClick={()=>setSelectDownload(index)}>
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>

            {/* This section for define download data warning?*/}

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
