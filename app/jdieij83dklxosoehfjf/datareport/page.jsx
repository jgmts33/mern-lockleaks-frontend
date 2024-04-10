"use client";
import {
    Button, Link, ScrollShadow,Input,Progress
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning,TurnLeft, TurnRight, Search } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';


export default function DataReport() {
    const router = useRouter();
    const [value, setValue] = React.useState(25);
    const [selectDownload, setSelectDownload] = useState(0)

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
        turnleft: <TurnLeft fill="currentColor" size={16} />,
        turnright: <TurnRight fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
    };

    const NotificationContent = [
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
    ]

    const personalAgentContent = [
        {
            date: "February 27, 2024",
            mail: "Example@gmailcom"
        }, {
            date: "February 27, 2024",
            mail: "Example@gmailcom"
        }
    ]

    const setSelectDownloadData = (index) => {
        setSelectDownload(index)
        router.push("/jdieij83dklxosoehfjf/datareport/details")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 max-sm:pt-16 container text-white max-lg:mx-auto">
            <div className='mt-0 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DATA PDF REPORT</span>
            </div>
            <div className='mt-10 max-md:mx-auto max-sm:mt-0'>
                <span className='font-semibold text-base'>DATA PDF REPORT  DOWNLOAD</span>
            </div>
            <div className='flex gap-5 max-lg:flex-col max-sm:gap-0'>
                <div className='flex gap-10 mt-5 max-2xl:flex-col max-lg:justify-center max-lg:items-center'>
                    <div className="flex flex-col max-w-[400px] w-full h-full bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5 pb-28 max-md:mx-auto">
                        <div className='flex justify-between'>
                            <div>{icons.turnleft}</div>
                            <div>{icons.turnright}</div>
                        </div>
                        <div className='grid grid-cols-3 space-x-5 mt-8 max-sm:grid-cols-2'>
                            <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white shadow-lg text-sm" size='sm'>
                                IN PROGRESS
                            </Button>
                            <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-700 text-white shadow-lg text-sm" size='sm'>
                                SENT
                            </Button>
                        </div>
                        <div className='flex mt-10'>
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
                                placeholder='Search by Email or Username'
                                startContent={
                                    <svg width="21" height="21" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.7073 25.2925L20.4485 19.035C22.2626 16.8572 23.1672 14.0638 22.9741 11.236C22.781 8.40814 21.5052 5.76361 19.412 3.85251C17.3188 1.9414 14.5694 0.910859 11.7357 0.975258C8.90201 1.03966 6.20225 2.19404 4.19802 4.19827C2.1938 6.20249 1.03941 8.90225 0.975014 11.7359C0.910614 14.5696 1.94116 17.319 3.85226 19.4122C5.76337 21.5054 8.40789 22.7813 11.2357 22.9743C14.0635 23.1674 16.8569 22.2628 19.0348 20.4488L25.2923 26.7075C25.3852 26.8005 25.4955 26.8742 25.6169 26.9244C25.7383 26.9747 25.8684 27.0006 25.9998 27.0006C26.1312 27.0006 26.2613 26.9747 26.3827 26.9244C26.5041 26.8742 26.6144 26.8005 26.7073 26.7075C26.8002 26.6146 26.8739 26.5043 26.9242 26.3829C26.9745 26.2615 27.0004 26.1314 27.0004 26C27.0004 25.8686 26.9745 25.7385 26.9242 25.6171C26.8739 25.4958 26.8002 25.3855 26.7073 25.2925ZM2.9998 12C2.9998 10.22 3.52764 8.47995 4.51657 6.99991C5.5055 5.51987 6.91111 4.36631 8.55565 3.68513C10.2002 3.00394 12.0098 2.82571 13.7556 3.17297C15.5014 3.52024 17.1051 4.37741 18.3638 5.63608C19.6224 6.89475 20.4796 8.4984 20.8269 10.2442C21.1741 11.9901 20.9959 13.7997 20.3147 15.4442C19.6335 17.0887 18.48 18.4943 16.9999 19.4833C15.5199 20.4722 13.7798 21 11.9998 21C9.61366 20.9974 7.32601 20.0483 5.63876 18.3611C3.95151 16.6738 3.00244 14.3862 2.9998 12Z" fill="white" />
                                    </svg>
                                }
                            />
                        </div>
                        <div className='mt-5'>
                            <ScrollShadow className='h-[160px]'>
                                {
                                    personalAgentContent.map((item, index) => {
                                        return (
                                            <div key={index} className={index == 0 ? ('flex flex-col mt-10 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent') : ("flex flex-col mt-10")}>
                                                <span className='font-normal text-xs'>{item.date}</span>
                                                <span className='font-semibold text-[18px]'>{item.mail}</span>
                                            </div>
                                        )
                                    })
                                }
                            </ScrollShadow>
                        </div>
                        <Progress
                            size="md"
                            className="max-w-2xl mt-5"
                            color='secondary'
                            value={value}
                            showValueLabel={true}
                        />
                        <div className='mx-auto pt-5'>
                            <Button radius="lg" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg px-5 text-lg" size='md'>
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full max-md:px-4'>
                    <ScrollShadow className="h-[350px]">
                        <div className='flex flex-col scroll px-3 gap-3 max-md:px-4'>
                            {
                                NotificationContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-10 max-md:flex-col max-xl:gap-5 max-md:items-start'>
                                            <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px]'>
                                                {items}
                                            </div>
                                            <div>
                                                <Button radius="lg" className={selectDownload == index ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"} size='sm' onClick={() => setSelectDownloadData(index)}>
                                                    Download
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
    )
}
