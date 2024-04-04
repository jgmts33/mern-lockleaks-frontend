"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, Input
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane, TurnLeft, TurnRight, Search } from "@/components/utils/Icons";

export default function AddAnalytics() {
    const [value, setValue] = React.useState(25);
    const router = useRouter();

    const icons = {
        turnleft: <TurnLeft fill="currentColor" size={16} />,
        turnright: <TurnRight fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
    };

    const handleShowDetails = () => {
        router.push("/jdieij83dklxosoehfjf/analytics/details");
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='flex flex-col space-y-5 max-md:mx-auto'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
            </div>
            <div className='flex gap-10 mt-5 max-md:flex-col'>
                <div className="flex flex-col max-w-[400px] w-full h-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5 pb-28 max-md:mx-auto">
                    <div className='flex justify-between'>
                        <div>{icons.turnleft}</div>
                        <div>{icons.turnright}</div>
                    </div>
                    <div className='grid grid-cols-3 space-x-5 mt-8'>
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
                            startContent={
                                <svg width="21" height="21" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.7073 25.2925L20.4485 19.035C22.2626 16.8572 23.1672 14.0638 22.9741 11.236C22.781 8.40814 21.5052 5.76361 19.412 3.85251C17.3188 1.9414 14.5694 0.910859 11.7357 0.975258C8.90201 1.03966 6.20225 2.19404 4.19802 4.19827C2.1938 6.20249 1.03941 8.90225 0.975014 11.7359C0.910614 14.5696 1.94116 17.319 3.85226 19.4122C5.76337 21.5054 8.40789 22.7813 11.2357 22.9743C14.0635 23.1674 16.8569 22.2628 19.0348 20.4488L25.2923 26.7075C25.3852 26.8005 25.4955 26.8742 25.6169 26.9244C25.7383 26.9747 25.8684 27.0006 25.9998 27.0006C26.1312 27.0006 26.2613 26.9747 26.3827 26.9244C26.5041 26.8742 26.6144 26.8005 26.7073 26.7075C26.8002 26.6146 26.8739 26.5043 26.9242 26.3829C26.9745 26.2615 27.0004 26.1314 27.0004 26C27.0004 25.8686 26.9745 25.7385 26.9242 25.6171C26.8739 25.4958 26.8002 25.3855 26.7073 25.2925ZM2.9998 12C2.9998 10.22 3.52764 8.47995 4.51657 6.99991C5.5055 5.51987 6.91111 4.36631 8.55565 3.68513C10.2002 3.00394 12.0098 2.82571 13.7556 3.17297C15.5014 3.52024 17.1051 4.37741 18.3638 5.63608C19.6224 6.89475 20.4796 8.4984 20.8269 10.2442C21.1741 11.9901 20.9959 13.7997 20.3147 15.4442C19.6335 17.0887 18.48 18.4943 16.9999 19.4833C15.5199 20.4722 13.7798 21 11.9998 21C9.61366 20.9974 7.32601 20.0483 5.63876 18.3611C3.95151 16.6738 3.00244 14.3862 2.9998 12Z" fill="white" />
                                </svg>
                            }
                        />
                    </div>
                    <div className='flex flex-col mt-10 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>
                        <span className='font-normal text-xs'>February 27, 2024</span>
                        <span className='font-semibold text-[18px]'>Example@gmailcom</span>
                    </div>
                    <div className='flex flex-col mt-10'>
                        <span className='font-normal text-xs'>February 27, 2024</span>
                        <span className='font-semibold text-[18px]'>Example@gmailcom</span>
                    </div>
                    <Progress
                        size="md"
                        className="max-w-2xl mt-5"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                    <div className='mx-auto pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg px-5 text-lg" size='md' onClick={()=>handleShowDetails()}>
                            Download
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-5'>
                    <div className='grid grid-cols-3'>
                        <div className="flex flex-col w-full bg-white/15 max-w-[330px] shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5 space-y-7 text-white">
                            <div className='flex mx-auto'>
                                <span className='font-semibold text-base'>Hosting Revenue</span>
                            </div>
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
                                    placeholder='Type Here'
                                />
                            </div>
                            <div className='flex mx-auto'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-lg" size='md'>
                                    Save
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full bg-white/15 max-w-[330px] shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5 space-y-5">
                            <div className='flex flex-col space-y-3 mx-auto'>
                                <span className='font-semibold text-base'>Subscription Profits</span>
                                <span className='font-normal text-xs text-center bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Warning</span>
                            </div>
                            <div className='flex mx-auto'>
                                <span className='font-normal text-xs'>Duplicates and unique links added here</span>
                            </div>
                            <div className='flex mx-auto'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-lg" size='md'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3'>
                        <div className="flex flex-col w-full bg-white/15 max-w-[330px] shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                            <div className='flex mx-auto'>
                                <span className='font-semibold text-base'> Advertisement Revenue</span>
                            </div>
                            <div className='flex mx-auto mt-10'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-lg" size='md'>
                                    Save
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full bg-white/15 max-w-[330px] shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                            <div className='flex mx-auto'>
                                <span className='font-semibold text-base'>Intermediary Forums &Websites</span>
                            </div>
                            <div className='flex mx-auto mt-10'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-lg" size='md'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3'>
                    <div className="flex flex-col w-full bg-white/15 max-w-[330px] shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                            <div className='flex mx-auto'>
                                <span className='font-semibold text-base'>Archive Websites</span>
                            </div>
                            <div className='flex mx-auto mt-10'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-lg" size='md'>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
