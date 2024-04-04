"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function TestBots() {
    const [value, setValue] = React.useState(25);
    const [selectGoogleAccept, setSelectGoogleAccept] = useState(0)
    const [selectBingAccept, setSelectBingAccept] = useState(0)


    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const GoogleScannerContent = [
        {
            icon: icons.components,
            title: "GOOGLE SEARCH",
            content: "12345"
        },
        {
            icon: icons.components,
            title: "GOOGLE IMAGES SEARCH",
            content: "12345"
        }, {
            icon: icons.components,
            title: "GOOGLE VIDEOS SEARCH",
            content: "12345"
        }
    ]

    const BingScannerContent = [
        {
            icon: icons.components,
            title: "GOOGLE SEARCH",
            content: "12345"
        },
        {
            icon: icons.components,
            title: "GOOGLE IMAGES SEARCH",
            content: "12345"
        }, {
            icon: icons.components,
            title: "GOOGLE VIDEOS SEARCH",
            content: "12345"
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white">
            <div className='flex gap-16 items-center'>
                <div><span className='font-extrabold text-lg'>AI FACE ORDERS</span></div>
            </div>
            <div className='flex gap-5 mt-10'>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base'>AI FACE IMAGES</span>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
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
                    <span className='font-semibold text-base'>AI FACE PROFILES</span>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
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
        </div>
    )
}
