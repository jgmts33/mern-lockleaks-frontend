"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";

export default function VPSManagement() {
    const router = useRouter();

    const [selectDownload, setSelectDownload] = useState(0);
    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    const UsersData = [
        {
            vpsip: "123.123.12.123",
            users: "2",
            total_users: "25",
            first_freespace: "23",
            second_freespace: "25",
            status: "ONLINE"
        }, {
            vpsip: "123.123.12.123",
            users: "2",
            total_users: "25",
            first_freespace: "23",
            second_freespace: "25",
            status: "OFFLINE"
        }, {
            vpsip: "123.123.12.123",
            users: "2",
            total_users: "25",
            first_freespace: "25",
            second_freespace: "25",
            status: "ONLINE"
        }, {
            vpsip: "123.123.12.123",
            users: "2",
            total_users: "25",
            first_freespace: "23",
            second_freespace: "25",
            status: "ONLINE"
        },
    ]

    const handleShowMoreDetails = () => {
        router.push("/jdieij83dklxosoehfjf/users/usersview")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>VPS MANAGEMENT</span>
            </div>
            <div className='flex mt-10'>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    CONNECT VPS
                </Button>
            </div>
            <div className='grid grid-cols-4 font-semibold text-sm w-full mt-10 max-sm:hidden'>
                <div className='flex px-20'><span>VPS IP</span></div>
                <div className='flex'><span>USERS</span></div>
                <div className='flex px-3'><span>FREE SPACE</span></div>
                <div className='flex px-10'><span>STATUS</span></div>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1400px] mt-10 w-full'>
                <ScrollShadow className="h-[300px]">
                    <ScrollShadow className='max-sm:w-[800px]'>
                    <div className='grid grid-cols-4 sm:hidden'>
                        <div className='flex px-20 max-sm:px-0'><span>VPS IP</span></div>
                        <div className='flex'><span>USERS</span></div>
                        <div className='flex px-3 max-sm:px-0'><span>FREE SPACE</span></div>
                        <div className='flex px-10 max-sm:px-10'><span>STATUS</span></div>
                    </div>
                    {
                        UsersData.map((items, index) => {
                            return (
                                <div key={index} className='grid grid-cols-4 font-semibold text-lg max-sm:font-normal max-sm:text-sm gap-10 w-full py-3'>
                                    <div className='flex'><span>{items.vpsip}</span></div>
                                    <div className='flex'>
                                        <span>{items.users}</span>/
                                        <span>{items.total_users}</span>
                                    </div>
                                    <div className='flex gap-10'>
                                        <div className='flex'>
                                            <span className=''>{items.first_freespace}</span>/
                                            <span className=''>{items.second_freespace}</span>
                                        </div>
                                        <div>
                                            <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-5 text-sm">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <span className={items.status == "ONLINE" ? "text-[#4AC34E]" : "text-[#CF3B56]"}>{items.status}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </ScrollShadow>
                </ScrollShadow>
            </div>
        </div>
    )
}
