"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function RUserContent() {
    const [selectUserPhoto, setSelectUserPhoto] = useState(0)
    const [selectContentUser, setSelectContentUser] = useState(0)

    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const UserContentPhoto = [
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

    const UserContentUser = [
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
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
        "INFO USER + Photo,Photo",
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto'>
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>R & R User Content Orders</span></div>
                </div>
            </div>
            <div className='flex w-full gap-5 max-2xl:flex-col'>
                <div className='flex flex-col w-full mt-10 max-sm:mt-5'>
                    <div className='flex flex-col w-full'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>R & R User Content Photo</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                            {
                                UserContentPhoto.map((items, index) => {
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
                                            <div>
                                                <div className='flex px-5'>
                                                    <hr className='w-full' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-10 max-2xl:flex-col max-2xl:gap-2'>
                                                <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6 pr-44 max-lg:pr-0'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={("border border-white/40 ") + (selectUserPhoto == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectUserPhoto(index)}>
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
                <div className='flex flex-col w-full mt-10 max-lg:mt-0'>
                    <div className='flex flex-col w-full'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>R & R User Content User</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                            {
                                UserContentUser.map((items, index) => {
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
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    GoogleScanContent.map((items, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-10 max-2xl:flex-col max-2xl:gap-2'>
                                                <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6 pr-44 max-lg:pr-0'>
                                                    <span className='font-normal text-sm'>{items}</span>
                                                </div>
                                                <div className='px-4'>
                                                    <Button radius="lg" className={("border border-white/40 ") + (selectContentUser == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base")} size='sm' onClick={() => setSelectContentUser(index)}>
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
        </div>
    )
}
