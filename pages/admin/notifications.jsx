"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { Warning } from "@/components/utils/Icons";

export default function Notification() {

    const icons = {
        warning: <Warning/>,
    };

    const NotificationContent = [
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
        "Notification from the module",
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

            {/* This section for define notification header?*/}

            <div className='max-xl:mx-auto max-lg:mt-0'>
                <span className='font-extrabold text-lg'>NOTIFICATION</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 max-sm:px-3 rounded-[16px] max-w-[1100px] mt-5 w-full'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-5 gap-5 max-sm:px-3'>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex bg-white/20 shadow-sm p-3 rounded-[16px]'>
                                        <span className='max-md:text-sm'>{items}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>

            {/* This section for define notification warning?*/}

            <div className='flex bg-white/10 shadow-sm px-16 py-5 gap-7 rounded-[16px] border border-gray-500 max-w-[1300px] items-center mt-10 w-full max-sm:text-base max-sm:px-5 max-sm:mt-5'>
                <div>{icons.warning}</div>
                <div><span className='font-semibold text-base'>AUTOMATIC DELETION OF NOTIFICATION OLDER THAN 30 DAYS</span></div>
            </div>
        </div>
    )
}
