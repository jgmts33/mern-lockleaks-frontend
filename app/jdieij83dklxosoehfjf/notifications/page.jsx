"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Notifications() {

    const [selectDownload, setSelectDownload] = useState(0);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 mt-10 container text-white ">
            <div>
                <span className='font-extrabold text-lg'>NOTIFICATIONS</span>
            </div>
            <div className='flex space-x-5 mt-10'>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] w-1/2'>
                    <ScrollShadow className='flex h-[400px] justify-between'>
                        <span className='font-semibold text-base'>NOTIFICATION FROM ALL MODULES</span>
                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-sm" size='sm'>
                            Yes
                        </Button>
                    </ScrollShadow>
                </div>
                <div className='w-1/2 flex items-center'>
                    <div className='flex flex-col space-y-16'>
                        <div className='text-center'>
                            <span className='font-bold text-lg'>AUTOMATIC DELETION OF NOTIFICATION OLDER THAN 30 DAYS</span>
                        </div>
                        <div className='text-center'>
                            <span className='font-semibold text-base'>CLICK REDIRECT TO NOTIFICATION</span>
                        </div>
                        <div className='flex mx-auto'>
                            <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-sm" size='sm'>
                                REDIRECT
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
