"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { GoogleSearch, Components, BingSearch } from "@/components/utils/Icons";
import React, { useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function GoogleBing() {
    const [value, setValue] = React.useState(25);
    const [selectGoogleAccept, setSelectGoogleAccept] = useState(0)
    const [selectBingAccept, setSelectBingAccept] = useState(0)


    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        components: <Components fill="currentColor" size={16} />,
        bingsearch: <BingSearch fill="currentColor" size={16} />,
    };

    const GoogleScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content: "12345"
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content: "12345"
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: "12345"
        }
    ]

    const BingScannerContent = [
        {
            icon: icons.bingsearch,
            title: "GOOGLE SEARCH",
            content: "12345"
        },
        {
            icon: icons.bingsearch,
            title: "GOOGLE IMAGES SEARCH",
            content: "12345"
        }, {
            icon: icons.bingsearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: "12345"
        }
    ]

    const GoogleScanContent = [
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

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto max-lg:px-3">
                <div className='flex items-center max-lg:mx-auto'>
                    <div><span className='font-extrabold text-lg'>GOOGLE & BING ORDERS</span></div>
                </div>
                <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3'>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
                        {
                            GoogleScannerContent.map((items, index) => {
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
                                        <div className='flex px-6'>
                                            <hr className='w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 max-md:mt-3 w-full pb-8">
                        {
                            BingScannerContent.map((items, index) => {
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
                                        <div className='flex px-6'>
                                            <hr className='w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-3'>
                    <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center w-full gap-10 max-lg:gap-2'>
                                                <div className='flex bg-white/10 shadow-sm py-3 w-full rounded-[16px] px-6'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={("border border-white/40 ") + (selectGoogleAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectGoogleAccept(index)}>
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
                    <div className='flex bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 max-md:mt-3 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-10 max-lg:gap-2'>
                                                <div className='flex bg-white/10 shadow-sm py-3 w-full rounded-[16px] px-6'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={("border border-white/40 ") + (selectBingAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectBingAccept(index)}>
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
        </div>
    )
}
