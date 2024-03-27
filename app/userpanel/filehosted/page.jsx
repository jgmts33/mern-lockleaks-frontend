"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React from 'react';

export default function FileHosted() {

    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.components,
            title: "",
            content: "FOUND 10 DOWNLOAD URLs."
        },
        {
            icon: "",
            title: "Information:",
            content: "This module searches for specific keywords and usernames on forums that deal with leaks,collects filehost links, and generates automated reports about them.."
        }, {
            icon: icons.components,
            content: "Generated a removal report for 10 FileHosts in compliance with DMCA policy and forwarded it for removal."
        }
    ]

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-10 items-center'>
                    <div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-sm" size='sm'>
                            FILE HOSTED SCANNED
                        </Button>
                    </div>
                    <div>
                        <Button radius="lg" className="bg-white/10 bg-opacity-20 text-white border border-gray-600 shadow-lg px-7 text-sm" size='sm'>
                            STATISTICS
                        </Button>
                    </div>
                    <div>
                        <Button radius="lg" className="bg-white/10 bg-opacity-20 text-white border border-gray-600 shadow-lg px-7 text-sm" size='sm'>
                            INFO.LAST SCAN
                        </Button>
                    </div>
                </div>
                <div className='mt-5'>
                    <span className='font-extrabold text-lg'>FILE HOSTED</span>
                </div>
                <div className='flex flex-col mt-10 gap-3'>
                    <span className='font-semibold text-base'>RESULTS FROM LAST SCAN:</span>
                    <span className='font-medium text-lg text-white/50'>Scanning 10 websites using Specified keywords and Usernames</span>
                </div>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5 pb-20">
                    {
                        ScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex justify-between p-7'>
                                        <div className='flex px-5 gap-4'>
                                            <div>{items.icon}</div>
                                            <div className='flex max-w-[820px]'>
                                                <span className='font-normal text-sm bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{items.title}</span>
                                                <span className={index != 1 ?' font-semibold text-smfont-normal text-sm': " font-normal text-sm"}>{items.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='w-full' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}
