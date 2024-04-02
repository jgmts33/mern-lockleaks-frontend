"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input, Progress
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning, Search } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';

export default function Analytics() {
    const router = useRouter();
    const [value, setValue] = React.useState(25);

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
    };

    const NotificationContent = [
        "domain.com",
        "domain.to ",
        "etc... ",
        "domain.com",
        "domain.to ",
        "etc... ",
        "domain.com",
        "domain.to ",
        "etc... ",
        "domain.com",
        "domain.to ",
        "etc... ",
    ]

    const handleGoAddAnalytics = () => {
        router.push("/")
    }


    return (
        <div className="flex flex-col bg-gradient-to-tr px-3 py-10 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DATA ANALYTICS</span>
            </div>
            <div className='mt-10'>
                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm' onClick={()=>handleGoAddAnalytics()}>
                    Add
                </Button>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-10 w-full max-md:px-4'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col gap-5 scroll-y px-4'>
                        <div className='flex justify-between'>
                            <div><span>Search Domain...</span></div>
                            <div>
                                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                    Add
                                </Button></div>
                        </div>
                        <div className='px-3 w-1/2'>
                            <div>
                                <Input
                                    isClearable
                                    radius="lg"
                                    classNames={{
                                        label: "text-black/50 dark:text-white/90",
                                        input: [
                                            "bg-transparent",
                                            "text-black/90 dark:text-white/90",
                                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "shadow-xl",
                                            "bg-default-200/50",
                                            "dark:bg-default/60",
                                            "backdrop-blur-xl",
                                            "backdrop-saturate-200",
                                            "hover:bg-default-200/70",
                                            "dark:hover:bg-default/70",
                                            "group-data-[focused=true]:bg-default-200/50",
                                            "dark:group-data-[focused=true]:bg-default/60",
                                            "!cursor-text",
                                        ],
                                    }}
                                    startContent={
                                        icons.search
                                    }
                                />
                            </div>
                            <div className='mt-4'>
                                <Progress
                                    size="md"
                                    aria-label="Loading..."
                                    className="max-w-2xl"
                                    color='secondary'
                                    value={value}
                                    showValueLabel={true}
                                />
                            </div>
                        </div>
                        {
                            NotificationContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex items-center gap-10 px-4'>
                                        <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                            {items}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>
        </div>
    )
}
