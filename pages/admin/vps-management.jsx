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
        router.push("/admin/users/view")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>VPS MANAGEMENT</span>
            </div>
            <div className='flex mt-10'>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    CONNECT VPS
                </Button>
            </div>
            <div className='grid grid-cols-4 font-semibold text-sm max-w-[1400px] mt-10 max-sm:hidden px-10'>
                <div className='flex pl-1'><span>VPS IP</span></div>
                <div className='flex pl-12'><span>USERS</span></div>
                <div className='flex pl-4'><span>FREE SPACE</span></div>
                <div className='flex pl-3'><span>STATUS</span></div>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1200px] mt-10 max-sm:mt-16 w-full'>
                <ScrollShadow className="h-[300px]">
                    <ScrollShadow className='max-sm:w-[900px]'>
                        <div className='flex gap-44 sm:hidden w-full'>
                            <div className='flex'><span>VPS IP</span></div>
                            <div className='flex pl-10'><span>USERS</span></div>
                            <div className='flex pl-10'><span>FREE SPACE</span></div>
                            <div className='flex'><span>STATUS</span></div>
                        </div>
                        {
                            UsersData.map((items, index) => {
                                return (
                                    <div key={index} className='flex font-semibold text-lg max-sm:font-normal max-sm:text-sm gap-40 w-full py-3 max-sm:grid max-sm:grid-cols-4'>
                                        <div className='flex gap-5'>
                                            <div>
                                                <span>{items.vpsip}</span>
                                            </div>
                                            <div>
                                                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-5 text-sm">
                                                    View
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='flex gap-5'>
                                            <div>
                                                <span>{items.users}</span>/
                                                <span>{items.total_users}</span>
                                            </div>
                                            <div>
                                                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-5 text-sm">
                                                    View
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='flex gap-5'>
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
                                        <div className='flex'>
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
