"use client";
import Image from 'next/image';
import {
    Button, Checkbox
} from '@nextui-org/react';
import { Components, Checkboxs } from "@/components/utils/Icons";
import React from 'react';

export default function AdultWesite() {

    const icons = {
        component: <Components fill="currentColor" size={16} />,
        checkboxs: <Checkboxs fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.component,
            content: <div className='flex px-5 gap-2 items-center'>
                <div><Checkbox color='success' radius='full' isDisabled /></div>
                <div className='space-x-1'>
                    <span className='font-semibold text-sm'>FOUND</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
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
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
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
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
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
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
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
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                    <span className='font-semibold text-sm'>Websites In Compliance With DMCA Policy And Forwarded It For Removal.</span>
                </div>
            </div>
        },
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 max-sm:py-16 container text-white max-lg:mx-auto">

            {/* This section for define Adult Website*/}

            <div className='flex gap-10 items-center max-md:flex-col max-md:gap-5'>
                <div>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-sm" size='sm'>
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
                <span className='font-extrabold text-lg'>ADULT WEBSITES SCANNED</span>
            </div>
            <div className='flex flex-col mt-10 gap-3'>
                <span className='font-semibold text-base'>RESULTS FROM LAST SCAN:</span>
                <span className='font-medium text-lg text-white/50'>Scanning 10 Websites Using Specified Keywords And Usernames</span>
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
