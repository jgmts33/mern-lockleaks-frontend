"use client";
import React, { useEffect, useState } from 'react';
import {
    Button, Checkbox
} from '@nextui-org/react';
import { Components, Checkboxs } from "@/components/utils/Icons";
import { userInfo as info } from '@/lib/auth/authSlice';
import { DEFAULT_SCAN_RESULT, ENDPOINT } from '@/config/config';
import { getScrapedDataList } from '@/axios/download';

import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export default function AdultTubs() {

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
        component: <Components />,
        checkboxs: <Checkboxs />,
    };

    const ScannerContent = [
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>FOUND</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.matches_count}</span>
                    <span className='font-semibold text-sm'>MATCHES WITH SPECIFIED KEYWORDS AND USERNAMES  IN URLs.</span>
                </div>
            </div>
        },
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>FOUND</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.no_matches_count}</span>
                    <span className='font-semibold text-sm'>POTENTIAL MATCHES.</span>
                </div>
            </div>
        },
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>FOUND</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.no_report_count}</span>
                    <span className='font-semibold text-sm'>NON-COMPLIANT WEBSITES REGARDING DMCA POLICY.</span>
                </div>
            </div>
        },
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>FOUND</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.report_count}</span>
                    <span className='font-semibold text-sm'>WEBSITES COMPLYING WITH DMCA POLICY.</span>
                </div>
            </div>
        },
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>Generated A Removal Report For</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>
                        {
                            scanResult.matches_count +
                            scanResult.no_matches_count +
                            scanResult.no_report_count +
                            scanResult.report_count
                        }
                    </span>
                    <span className='font-semibold text-sm'>Websites In Compliance With DMCA Policy And Forwarded It For Removal.</span>
                </div>
            </div>
        },
    ]

    useEffect(() => {
        getScannerResult();

        const socket = io(ENDPOINT);

        socket.on(`scanner-finished-${userInfo.id}`, () => {
            getScannerResult();
        });

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

            {/* This section for define Adult Website*/}

            <div className='flex gap-10 items-center max-md:flex-col max-md:gap-5'>
                <div>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-sm" size='sm'>
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
                <span className='font-extrabold text-lg'>ADULT TUBES SCANNED</span>
            </div>
            <div className='flex flex-col mt-10 gap-3'>
                <span className='font-semibold text-base'>RESULTS FROM LAST SCAN:</span>
                <span className='font-medium text-lg text-white/50'>Scanning {
                    scanResult.matches_count +
                    scanResult.no_matches_count +
                    scanResult.no_report_count +
                    scanResult.report_count
                } Websites Using Specified Keywords And Usernames</span>
            </div>

            {/* This section for define Adult Website Content*/}

            <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-md:p-0 pb-20">
                {
                    ScannerContent.map((items, index) => {
                        return (
                            <div key={index} className='flex flex-col px-5 max-sm:px-2'>
                                <div className='flex justify-between p-6 max-sm:p-5'>
                                    {items.content}
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
