"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { Components} from "@/components/utils/Icons";
import React, { useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function SocialMedia() {
    const [selectGoogleAccept, setSelectGoogleAccept] = useState(0)
    const [selectBingAccept, setSelectBingAccept] = useState(0)


    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const SocialMediaScannerContent = [
        {
            icon: icons.components,
            title: "TOTAL ORDERS:",
            content: "12345"
        },
        {
            icon: icons.components,
            title: "ACCEPTED ORDERS:",
            content: "12345"
        }, {
            icon: icons.components,
            title: "PENDING ORDERS:",
            content: "12345"
        }
    ]

    const SocialMediaSubmitContent = [
        {
            icon: icons.components,
            title: "TOTAL ORDERS:",
            content: "12345"
        },
        {
            icon: icons.components,
            title: "ACCEPTED ORDERS:",
            content: "12345"
        }, {
            icon: icons.components,
            title: "PENDING ORDERS:",
            content: "12345"
        }
    ]

    const GoogleScanContent = [
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
        "Username,id,urls",
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
            <ScrollShadow className="h-[1220px]">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA ORDERS</span></div>
                </div>
                <div className='flex gap-5 mt-10'>
                    <div className='flex flex-col w-full'>
                        <span className='font-semibold text-base'>SOCIAL MEDIA SCANNER</span>
                        <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
                            {
                                SocialMediaScannerContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5'>
                                            <div className='flex justify-between p-7'>
                                                <div className='flex px-5 gap-5 w-1/2'>
                                                    <div>{items.icon}</div>
                                                    <span className='font-semibold text-sm'>{items.title}</span>
                                                </div>
                                                <div className='px-20 flex justify-start w-1/2'>
                                                    <span className='font-bold text-base'>{items.content}</span>
                                                </div>
                                            </div>
                                            <hr className='w-full' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <span className='font-semibold text-base'>SOCIAL MEDIA SUBMIT</span>
                        <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
                            {
                                SocialMediaSubmitContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5'>
                                            <div className='flex justify-between p-7'>
                                                <div className='flex px-5 gap-5 w-1/2'>
                                                    <div>{items.icon}</div>
                                                    <span className='font-semibold text-sm'>{items.title}</span>
                                                </div>
                                                <div className='px-20 flex justify-start w-1/2'>
                                                    <span className='font-bold text-base'>{items.content}</span>
                                                </div>
                                            </div>
                                            <hr className='w-full' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 scroll-y'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-10'>
                                                <div className='flex bg-white/10 shadow-sm py-3 w-full rounded-[16px] px-6 pr-44'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={selectGoogleAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"} size='sm' onClick={() => setSelectGoogleAccept(index)}>
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
                    <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 scroll-y'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-10'>
                                                <div className='flex bg-white/10 shadow-sm py-3 w-full rounded-[16px] px-6 pr-44'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={selectBingAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"} size='sm' onClick={() => setSelectBingAccept(index)}>
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
                </div>
            </ScrollShadow>
        </div>
    )
}
