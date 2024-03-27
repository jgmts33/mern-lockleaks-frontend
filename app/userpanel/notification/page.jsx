"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { Warning } from "@/components/utils/Icons";

export default function Notification() {

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
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
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>NOTIFICATION</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-5 gap-5'>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex bg-white/20 shadow-sm p-3 rounded-[16px]'>
                                        {items}
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>
            <div className='flex bg-white/10 shadow-sm px-16 py-5 gap-7 rounded-[16px] border border-gray-500 max-w-[1300px] items-center mt-10 w-full'>
                <div>{icons.warning}</div>
                <div><span className='font-semibold text-base'>AUTOMATIC DELETION OF NOTIFICATION OLDER THAN 30 DAYS</span></div>
            </div>
        </div>
    )
}