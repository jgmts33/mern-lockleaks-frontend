"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { GoogleSearch, Components } from "@/components/utils/Icons";
import React from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function GoogleBing() {
    const [value, setValue] = React.useState(25);

    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        components: <Components fill="currentColor" size={16} />,
    };

    const GoogleScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content:"12345"
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content:"12345"
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content:"12345"
        }
    ]

    const BingScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content:"12345"
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content:"12345"
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content:"12345"
        }
    ]

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>GOOGLE & BING ORDERS</span></div>
                </div>
                <div className='flex'>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
                    {
                        GoogleScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex justify-between p-6'>
                                        <div className='flex px-5 gap-5'>
                                            <div>{items.icon}</div>
                                            <span className='font-semibold text-sm'>{items.title}</span>
                                        </div>
                                        <div className='px-20 flex justify-start'>
                                            <span className='font-normal text-xs'>{items.content}</span>
                                        </div>
                                    </div>
                                    <hr className='w-full' />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
                    {
                        BingScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex justify-between p-6'>
                                        <div className='flex px-5 gap-5'>
                                            <div>{items.icon}</div>
                                            <span className='font-semibold text-sm'>{items.title}</span>
                                        </div>
                                        <div className='px-20 flex justify-start'>
                                            <span className='font-normal text-xs'>{items.content}</span>
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
    )
}
