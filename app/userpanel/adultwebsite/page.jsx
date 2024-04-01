"use client";
import Image from 'next/image';
import {
    Button, Checkbox
} from '@nextui-org/react';
import {Components,Checkboxs } from "@/components/utils/Icons";
import React from 'react';

export default function AdultWesite() {

    const icons = {
        component: <Components fill="currentColor" size={16} />,
        checkboxs: <Checkboxs fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.component,
            content: "FOUND 10 MATCHES WITH SPECIFIED KEYWORDS AND USERNAMES  IN URLs."
        },
        {
            icon: icons.checkboxs,
            content: "FOUND 10 POTENTIAL MATCHES."
        }, {
            icon: icons.component,
            content: "FOUND 10 NON-COMPLIANT WEBSITES REGARDING DMCA POLICY."
        }, {
            icon: icons.checkboxs,
            content: "FOUND 10 WEBSITES COMPLYING WITH DMCA POLICY."
        }, {
            icon: icons.component,
            content: "Generated a removal report for 10 websites in compliance with DMCA policy and forwarded it for removal."
        }
    ]

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white max-lg:mx-auto">
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
                    <span className='font-medium text-lg text-white/50'>Scanning 10 websites using Specified keywords and Usernames</span>
                </div>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-md:p-0 pb-20">
                    {
                        ScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5 max-sm:px-2'>
                                    <div className='flex justify-between p-6 max-sm:p-5'>
                                        <div className='flex px-5 gap-5'>
                                            <Checkbox color='success' radius='full' />
                                            <span className='font-semibold text-sm'>{items.content}</span>
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
