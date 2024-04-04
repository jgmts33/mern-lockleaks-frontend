"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { UpDownScroll,MoreDetails } from "@/components/utils/Icons";

export default function Scanner() {

    const [selectAccept, setSelectAccept] = useState(0)

    const icons = {
        updownscroll: <UpDownScroll fill="currentColor" size={16} />,
        moredetails: <MoreDetails fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
        "USERNAMES OF USER + URLs OF SCAN",
    ]

    const ScannerDetails = {
        title: "STATUS GOOGLE & BING",
        total_orders: 123456,
        accept_orders: 123456,
        pending_orders: 123456
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 w-full container text-white">
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>SCANNER ORDERS</span>
            </div> 
            <div className='flex w-full gap-5'>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 px-5 py-10 rounded-[16px] mt-5 w-full'>
                    <ScrollShadow className="h-[320px]">
                        <div className='flex flex-col scroll px-5 gap-5 scroll-y'>
                            {
                                ScannerContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-10'>
                                            <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                                <span className='font-normal text-sm'>{items}</span>
                                            </div>
                                            <div>
                                                <Button radius="lg" className={"border border-white/30 " +(selectAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectAccept(index)}>
                                                    Accept
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </ScrollShadow>
                </div>
                <div className="flex flex-col w-full h-1/2 mt-5 max-w-[500px] bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-2">
                    <div className='flex justify-between px-3 py-3'>
                        <div className='px-5 cursor-pointer'><span className='font-medium text-lg'>{ScannerDetails.title}</span></div>
                        <div>{icons.moredetails}</div>
                    </div>
                    <div className='flex gap-5'>
                        <div>{icons.updownscroll}</div>
                        <div className='flex flex-col'>
                            <span className='text-[#A29EB1]'>total orders:</span>
                            <span className='py-1'>{ScannerDetails.total_orders}</span>
                            <div className='flex flex-col space-y-2 py-3'>
                                <div className='flex gap-2'>
                                    <span className='gap-5 font-normal text-[18px] text-[#A29EB1]'>Accepted orders:</span>
                                    <span className='gap-5 font-normal text-[18px] text-white'>{ScannerDetails.accept_orders}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-normal text-[18px] text-[#A29EB1]'>Pending orders:</span>
                                    <span className='font-normal text-[18px] text-[white]'>{ScannerDetails.pending_orders}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
