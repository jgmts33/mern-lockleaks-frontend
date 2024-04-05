"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import { Components, WarningIcon } from "@/components/utils/Icons";
import React, { useState } from 'react';

export default function TestBots() {
    const [value, setValue] = React.useState(25);
    const [selectWorkingBot, setSelectWorkingBot] = useState(0)
    const [selectNotWorkingBot, setSelectNotWorkingBot] = useState(0)

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        warningicon: <WarningIcon fill="currentColor" size={16} />,
    };

    const BotStatus = [
        {
            icon: icons.components,
            title: "WORK BOTS:",
            used: 14,
            total: 15
        },
        {
            icon: icons.warningicon,
            title: "NO WORK BOTS:",
            used: 1,
            total: 15
        }
    ]

    const WorkingBots = [
        {
            title: "Name bot",
        },
        {
            title: "Name bot",
        }
    ]

    const NotWorkingBots = [
        {
            title: "Name bot",
        },
        {
            title: "Name bot",
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='flex gap-16 items-center max-lg:mx-auto'>
                <div><span className='font-extrabold text-lg'>TEST BOTS</span></div>
            </div>
            <div className='flex flex-col mt-5 space-y-3 max-lg:mx-auto'>
                <div>
                    <span className=''>info</span>
                </div>
                <div>
                    <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-6 text-base" size='sm'>
                        START TEST
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1  gap-5 mt-10'>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base max-lg:text-center'>STATUS</span>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 p-5 rounded-[16px] w-full pb-8">
                        {
                            BotStatus.map((bots, index) => {
                                return (
                                    <div key={index} className='flex flex-col'>
                                        <div className='flex justify-between p-7'>
                                            <div className='flex gap-2 px-3'>
                                                <div>{bots.icon}</div>
                                                <span className='font-semibold text-sm'>{bots.title}</span>
                                            </div>
                                            <div className='px-20 flex justify-start w-1/2'>
                                                <span className={(index == 0 ? "text-[#52C055]" : "text-[#CF3B56]") + (' font-bold text-base')}>{bots.used}</span>
                                                <span className='font-bold text-base'>/{bots.total}</span>
                                            </div>
                                        </div>
                                        <div className='flex px-6'>
                                            <hr className='w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base max-lg:text-center'>WORKING BOTS</span>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
                        <ScrollShadow className='h-80'>
                            {
                                WorkingBots.map((items, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5'>
                                            <div className='flex justify-between p-7'>
                                                <div>
                                                    <span>{items.title}</span>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={("border border-gray-500 text-white shadow-lg px-6 text-base ")+(selectWorkingBot == index ? "bg-gradient-to-tr from-purple-light to-purple-weight " : "bg-gradient-to-tr from-gray-700 to-gray-800")} size='sm' onClick={()=>setSelectWorkingBot(index)}>
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex px-6'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ScrollShadow>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent max-lg:text-center'>Not WORKING BOTS</span>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
                        <ScrollShadow className='h-80'>
                            {
                                NotWorkingBots.map((items, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5'>
                                            <div className='flex justify-between p-7'>
                                                <div>
                                                    <span>{items.title}</span>
                                                </div>
                                                <div>
                                                <Button radius="full" className={("border border-gray-500 text-white shadow-lg px-6 text-base ")+(selectNotWorkingBot == index ? "bg-gradient-to-tr from-purple-light to-purple-weight " : "bg-gradient-to-tr from-gray-700 to-gray-800")} size='sm' onClick={()=>setSelectNotWorkingBot(index)}>
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex px-6'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ScrollShadow>
                    </div>
                </div>
            </div>
        </div>
    )
}
