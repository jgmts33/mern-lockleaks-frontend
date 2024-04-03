"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";

export default function Users() {
    const router = useRouter();

    const [selectDownload, setSelectDownload] = useState(0);
    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    const UsersData = [
        {
            email: "user@lockleaks.com",
            username: "NickName",
            plan: "Planname",
        }, {
            email: "user@lockleaks.com",
            username: "NickName",
            plan: "Planname",
        }, {
            email: "user@lockleaks.com",
            username: "NickName",
            plan: "Planname",
        }, {
            email: "user@lockleaks.com",
            username: "NickName",
            plan: "Planname",
        }, {
            email: "user@lockleaks.com",
            username: "NickName",
            plan: "Planname",
        }
    ]

    const handleShowMoreDetails = () => {
        router.push("/jdieij83dklxosoehfjf/users/usersview")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>USERS</span>
            </div>
            <div className='flex max-w-[1232px] justify-between'>
                <span className='font-semibold text-base'>TOTAL ACTIVE PLANS: 10</span>
                <span className='font-semibold text-base'>TOTAL USERS: 10</span>
                <span className='font-semibold text-base'>TOTAL INACTIVE PLANS: 10</span>
            </div>
            <div className='flex max-w-[1232px] justify-between mt-16'>
                <Input
                    isClearable
                    radius="lg"
                    className='w-56'
                    classNames={{
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
                    placeholder="Search by Email"
                    startContent={
                        <span>{icons.search}</span>
                    }
                />
                <Input
                    isClearable
                    radius="lg"
                    className='w-56'
                    classNames={{
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            "w-44"
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
                    placeholder="Search by Username"
                    startContent={
                        <span>{icons.search}</span>
                    }
                />
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1400px] mt-10 w-full'>
                <ScrollShadow className="h-[300px]">
                    <table class="table-auto w-full items-center">
                        <thead>
                            <tr>
                                <th><span>Email</span></th>
                                <th><span>Username</span></th>
                                <th><span>Plan</span></th>
                                <th><span>Ban</span></th>
                                <th><span>Data</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                UsersData.map((items, index) => {
                                    return (
                                        <tr className='' key={index}>
                                            <td className='mt-5 py-7'><span className='flex justify-center'>{items.email}</span></td>
                                            <td className='mt-10 py-7'><span className='flex justify-center'>{items.username}</span></td>
                                            <td className='mt-10 py-7'><span className='flex justify-center'>{items.plan}</span></td>
                                            <td className='mt-10 py-7'>
                                                <div className='flex justify-center space-x-5'>
                                                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                                                        Yes
                                                    </Button>
                                                    <Button radius="lg" className="bg-gradient-to-tr from-gray-600 to-gray-800 text-white shadow-lg px-7 text-lg" size='sm'>
                                                        No
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className='mt-10 py-7'>
                                                <div className='flex justify-center'>
                                                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm' onClick={() => handleShowMoreDetails()}>
                                                        View
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </ScrollShadow>
            </div>
        </div>
    )
}
