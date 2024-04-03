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
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>VPS MANAGEMENT</span>
            </div>
            <div className='flex mt-10'>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                    CONNECT VPS
                </Button>
            </div>
            <div className='flex font-semibold text-sm w-full justify-around max-w-[1400px]'>
                <div><span>VPS IP</span></div>
                <div><span>USERS</span></div>
                <div><span>FREE SPACE</span></div>
                <div><span>STATUS</span></div>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1400px] mt-10 w-full'>
                <ScrollShadow className="h-[300px]">
                    {
                        UsersData.map((items, index) => {
                            return (
                                <div className='flex font-semibold text-lg justify-between w-full'>
                                    <div className='flex'><span>{items.vpsip}</span></div>
                                    <div className='flex'>
                                        <span>{items.users}</span>/
                                        <span>{items.total_users}</span>
                                    </div>
                                    <div className='flex space-x-5'>
                                        <div className='flex'>
                                            <span>{items.first_freespace}</span>/
                                            <span>{items.second_freespace}</span>
                                        </div>
                                        <div>
                                            <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-5 text-sm">
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}
