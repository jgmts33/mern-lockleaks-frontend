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
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>USERS</span>
            </div>
            <div className='flex max-w-[1400px] justify-between mt-10 max-sm:mt-5 max-md:gap-5 max-sm:flex-col max-sm:mx-auto'>
                <span className='font-semibold text-base'>TOTAL ACTIVE PLANS: 10</span>
                <span className='font-semibold text-base'>TOTAL USERS: 10</span>
                <span className='font-semibold text-base'>TOTAL INACTIVE PLANS: 10</span>
            </div>
            <div className='flex mt-16 max-sm:mt-10 max-md:flex-col max-sm:mx-auto'>
                <Input
                    isClearable
                    radius="lg"
                    className='w-60'
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
                    placeholder="Search by User or Email"
                    startContent={
                        <span>{icons.search}</span>
                    }
                />
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-5 rounded-[16px] max-w-[1400px] mt-10 max-md:w-full'>
                <ScrollShadow className='h-[400px]'>
                    <ScrollShadow className='max-sm:w-[900px]'>
                    <div className='grid grid-cols-5 w-full'>
                        <div>
                            <span>Email</span>
                        </div>
                        <div>
                            <span>Username</span>
                        </div>
                        <div>
                            <span>Plan</span>
                        </div>
                        <div>
                            <span>Ban</span>
                        </div>
                        <div>
                            <span>Data</span>
                        </div>
                    </div>
                    <div className='w-full'>
                        {
                            UsersData.map((items, index) => {
                                return (
                                    <div key={index} className='grid grid-cols-5 space-y-5 font-normal text-sm items-center'>
                                        <div className='flex mt-5'>
                                            <span>{items.email}</span>
                                        </div>
                                        <div className='flex'>
                                            <span>{items.username}</span>
                                        </div>
                                        <div className='flex'>
                                            <span>{items.plan}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                                Yes
                                            </Button>
                                            <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"} size='sm'>
                                                No
                                            </Button>
                                        </div>
                                        <div className='flex'>
                                            <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={()=>handleShowMoreDetails()}>
                                                View
                                            </Button>                                        
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </ScrollShadow>
                </ScrollShadow>
                </div>
        </div>
    )
}
