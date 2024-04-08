"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function AIface() {
    const [value, setValue] = React.useState(25);
    const [selectGoogleAccept, setSelectGoogleAccept] = useState(0)
    const [selectBingAccept, setSelectBingAccept] = useState(0)


    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const GoogleScannerContent = [
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

    const BingScannerContent = [
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
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
        "USERNAME user  + zip urls scan  + refferences photo uploaded + ID",
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto max-lg:px-3">
            <div className='flex gap-16 items-center max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>AI FACE ORDERS</span>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-5 max-lg:grid-cols-1'>
                <div className='flex flex-col w-full'>
                    <div className='flex mx-auto'>
                        <span className='font-semibold text-base max-lg:text-center'>AI FACE IMAGES</span>
                    </div>
                    <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                        {
                            GoogleScannerContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                        <div className='flex justify-between p-7'>
                                            <div className='flex px-5 gap-5 w-1/2'>
                                                <div>{items.icon}</div>
                                                <span className='font-semibold text-sm'>{items.title}</span>
                                            </div>
                                            <div className='px-20 flex justify-start w-1/2'>
                                                <span className='font-bold text-base'>{items.content}</span>
                                            </div>
                                        </div>
                                        <div className='flex px-5'>
                                            <hr className='w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex mx-auto'>
                        <span className='font-semibold text-base max-lg:mx-auto'>AI FACE PROFILES</span>
                    </div>
                    <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                        {
                            BingScannerContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                        <div className='flex justify-between p-7'>
                                            <div className='flex px-5 gap-5 w-1/2'>
                                                <div>{items.icon}</div>
                                                <span className='font-semibold text-sm'>{items.title}</span>
                                            </div>
                                            <div className='px-20 flex justify-start w-1/2'>
                                                <span className='font-bold text-base'>{items.content}</span>
                                            </div>
                                        </div>
                                        <div className='flex px-5'>
                                            <hr className='w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
                <div className='flex flex-col bg-white/10 border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                    <ScrollShadow className="h-[320px]">
                        <div className='flex flex-col gap-5 px-2'>
                            {
                                GoogleScanContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-10 max-xl:flex-col max-xl:gap-3'>
                                            <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6 pr-44 max-sm:pr-0 max-sm:px-2'>
                                                <span className='font-normal text-sm'>{items}</span>
                                            </div>
                                            <div className='px-4'>
                                                <Button radius="lg" className={("border border-white/40 ") + ("border border-white/40 ") + (selectGoogleAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectGoogleAccept(index)}>
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
                <div className='flex flex-col bg-white/10 border border-gray-500 p-10 rounded-[16px] mt-5 w-full max-lg:mt-0'>
                    <ScrollShadow className="h-[320px]">
                        <div className='flex flex-col gap-5 px-2'>
                            {
                                GoogleScanContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-10 max-xl:flex-col max-xl:gap-3'>
                                            <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6 pr-44 max-sm:pr-0 max-sm:px-2'>
                                                <span className='font-normal text-sm'>{items}</span>
                                            </div>
                                            <div className='px-4'>
                                                <Button radius="lg" className={("border border-white/40 ") + (selectBingAccept == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white text-base" : "bg-gradient-to-tr bg-white/10 text-white text-base")} size='sm' onClick={() => setSelectBingAccept(index)}>
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
