"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';


export default function DataReport() {
    const router = useRouter();

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

    const setSelectDownloadData = (index) => {
        setSelectDownload(index)
        router.push("/jdieij83dklxosoehfjf/datareport/details")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DATA PDF REPORT</span>
            </div>
            <div className='mt-10'>
                <span className='font-semibold text-base'>DATA PDF REPORT  DOWNLOAD</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full max-md:px-4'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-3 gap-3 max-md:px-4'>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex items-center gap-10 max-md:flex-col max-xl:gap-5 max-md:items-start'>
                                        <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                            {items}
                                        </div>
                                        <div>
                                            <Button radius="lg" className={selectDownload == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"} size='sm' onClick={()=>setSelectDownloadData(index)}>
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
        </div>
    )
}
