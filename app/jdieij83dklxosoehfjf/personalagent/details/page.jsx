"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, Input, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, PaperClip, PaperPlane, TurnLeft, TurnRight, Search } from "@/components/utils/Icons";

export default function PersonalAgentDetails() {
    const [value, setValue] = React.useState(25);
    const router = useRouter();

    const icons = {
        turnleft: <TurnLeft fill="currentColor" size={16} />,
        turnright: <TurnRight fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
        cancel: <Cancel fill="currentColor" size={16} />,
        paperclip: <PaperClip fill="currentColor" size={16} />,
        paperplane: <PaperPlane fill="currentColor" size={16} />,
    };

    const handleShowDetails = () => {
        router.push("/jdieij83dklxosoehfjf/analytics/details");
    }

    const personalAgentContent = [
        {
            date: "#10 / February 27, 2024",
            title: "Ticket Title"
        }, {
            date: "#10 / February 27, 2024",
            title: "Ticket Title"
        }, {
            date: "#10 / February 27, 2024",
            title: "Ticket Title"
        }
    ]

    const handleBack = () =>{
        history.back()
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='flex flex-col space-y-5 max-md:mx-auto'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
            </div>
            <div className='flex justify-between w-full mt-5'>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
                <Button radius="lg" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-white/50 text-white text-sm" size='md' onClick={()=>handleBack()}>
                    Back
                </Button>
            </div>
            <div className='flex gap-10 mt-5 max-md:flex-col'>
                <div className="flex flex-col max-w-[400px] w-full h-full bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5 pb-28 max-md:mx-auto">
                    <div className='flex justify-between'>
                        <div>{icons.turnleft}</div>
                        <div>{icons.turnright}</div>
                    </div>
                    <div className='flex space-x-5 mt-8 max-sm:flex-col max-sm:gap-3 max-sm:space-x-0'>
                        <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white text-sm" size='sm'>
                            NEW
                        </Button>
                        <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white text-sm" size='sm'>
                            IN PROGRESS
                        </Button>
                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-700 text-white text-sm" size='sm'>
                            SOLVED
                        </Button>
                    </div>
                    <ScrollShadow className='h-[220px]'>
                        {
                            personalAgentContent.map((item, index) => {
                                return (
                                    <div key={index} className={index == 0 ? 'flex flex-col mt-10 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent' : "flex flex-col mt-10"}>
                                        <span className='font-normal text-xs'>{item.date}</span>
                                        <span className='font-semibold text-[18px]'>{item.title}</span>
                                    </div>
                                )
                            })
                        }
                    </ScrollShadow>
                    <Progress
                        size="md"
                        className="max-w-2xl mt-5"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                    <div className='mx-auto pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white px-5 text-lg" size='md' onClick={() => handleShowDetails()}>
                            Download
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col max-w-[1040px] w-full space-y-32'>
                    <div className="flex flex-col max-w-[1040px] w-full bg-white/15 border border-gray-500 rounded-[20px] max-sm:px-0 px-10 py-5">
                        <div className='flex justify-between items-center max-sm:flex-col'>
                            <div className='flex flex-col space-y-4 max-sm:space-y-2'>
                                <span className='font-normal text-sm'>#10 / February 27, 2024</span>
                                <span className='font-semibold text-base mt-2'>Ticket Title</span>
                            </div>
                            <div className='flex items-center max-sm:mt-2'>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white px-5 py-4 text-lg" size='sm' onClick={() => handleShowDetails()}>
                                    SOLVED
                                </Button>
                                <Button radius="sm" className="bg-gradient-to-tr bg-transparent text-white text-lg" size='sm' onClick={() => handleGoPreviousPage()}>{icons.cancel}</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex mt-10 gap-5 pt-32'>
                        <div className='flex items-center'>{icons.paperclip}</div>
                        <div className='flex justify-between max-w-[960px] w-full bg-white/10 rounded-[16px] p-2 items-center'>
                            <div className='w-full'>
                                <textarea className='bg-transparent w-full rounded-lg h-20' placeholder='Type Here'></textarea>
                            </div>
                            <div>{icons.paperplane}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
