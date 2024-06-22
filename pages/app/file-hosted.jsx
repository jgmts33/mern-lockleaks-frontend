"use client";
import React, { useEffect, useState } from 'react';
import {
    Button, Checkbox
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import { userInfo as info } from '@/lib/auth/authSlice';
import { DEFAULT_SCAN_RESULT, ENDPOINT } from '@/config/config';
import { getScrapedDataList } from '@/axios/download';

import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export default function FileHosted() {

    const userInfo = useSelector(info);

    const [scanResult, setScanResult] = useState(DEFAULT_SCAN_RESULT);

    const getScannerResult = async () => {

        const res = await getScrapedDataList(false, "", true);

        if (res.status == 'success') {
            if (res.data?.length >= 1) {
                setScanResult(res.data[0]);
            }

        } else {
            console.log(res.data);
        }
    };

    const icons = {
        components: <Components />,
    };

    useEffect(() => {
        if ( !userInfo ) return;
        getScannerResult();

        const socket = io(ENDPOINT);

        socket.on(`scanner-finished-${userInfo.id}`, () => {
            getScannerResult();
        });

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    const ScannerContent = [
        {
            icon: icons.components,
            title: "",
            content:
                <div className='flex items-center'>
                    <div className='flex space-x-1 items-center'>
                        <span>FOUND</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.good_count}</span>
                        <span>DOWNLOAD URLs.</span>
                    </div>
                </div>
        },
        {
            icon: "",
            title: "Information:",
            content: "This module searches for specific keywords and usernames on forums that deal with leaks,collects filehost links, and generates automated reports about them.."
        }, {
            icon: icons.components,
            content:
                <div className='flex items-center flex-wrap space-x-1'>
                    <span>Generated A Removal Report For</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.other_count}</span>
                        <span>FileHosts In Compliance With DMCA Policy And Forwarded It For Removal.</span>
                </div>
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

            {/* This section for define file hosted header*/}

            <div className='flex gap-10 items-center max-md:flex-col max-sm:gap-5'>
                <div>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight bg-opacity-20 text-white border border-gray-600 shadow-lg px-7 text-sm" size='sm'>
                        <span>STATISTICS</span>
                    </Button>
                </div>
                <div>
                    <Button radius="lg" className="bg-white/10 bg-opacity-20 text-white border border-gray-600 shadow-lg px-7 text-sm" size='sm'>
                        <span>INFO.LAST SCAN</span>
                    </Button>
                </div>
            </div>
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>FILE HOSTED</span>
            </div>
            <div className='flex flex-col mt-10 gap-3 max-sm:mt-5'>
                <span className='font-semibold text-base'>RESULTS FROM LAST SCAN:</span>
                <span className='font-medium text-lg text-white/50'>Scanning { scanResult.good_count + scanResult.other_count } Websites Using Specified Keywords And Usernames</span>
            </div>

            {/* This section for define file hosted content*/}

            <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-sm:p-2">
                {
                    ScannerContent.map((items, index) => {
                        return (
                            <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                <div className='flex justify-between p-7'>
                                    <div className='flex px-2 gap-4'>
                                        <div className={items.icon ? 'block max-sm:mt-2' : 'hidden'}><Checkbox color='success' radius='full' isDisabled /></div>
                                        <div className='flex max-w-[820px] gap-2 max-sm:flex-col max-sm:flex-wrap'>
                                            <span className='font-normal text-sm bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{items.title}</span>
                                            <div className={index != 1 ? ' font-semibold text-smfont-normal text-sm' : " font-normal text-sm"}>{items.content}</div>
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
