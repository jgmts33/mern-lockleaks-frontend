"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane, Search } from "@/components/utils/Icons";

export default function TicketDetail() {
    const [value, setValue] = React.useState(100);
    const [selectticket, setSelectTicket] = React.useState(-1);
    const router = useRouter();

    const icons = {
        cancel: <Cancel fill="currentColor" size={16} />,
        shape: <Shape fill="currentColor" size={16} />,
        paperclip: <PaperClip fill="currentColor" size={16} />,
        paperplane: <PaperPlane fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
    };

    const handleGoSettings = () => {
        router.push("/app/personal-agent/property");
    }

    const handleGoPreviousPage = () => {
        history.back()
    }

    const TicketTitle = [
        {
            date: "#10 / February 27, 2024",
            title: "Ticket Title",
            status: "solved"
        }, {
            date: "#10 / February 27, 2024",
            title: "Ticket Title",
            status: "progress"
        }, {
            date: "#10 / February 27, 2024",
            title: "Ticket Title",
            status: "progress"
        }
    ]

    const chatContent = [
        {

        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='flex flex-col space-y-5 max-md:mx-auto max-md:text-center'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
            </div>
            <div className='flex gap-5 mt-5 max-md:flex-col'>
                <div className="flex flex-col max-w-[400px] w-full h-[650px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5 max-md:mx-auto">
                    <div className='flex flex-col justify-between mt-5 items-center'>
                        <div className='flex justify-between w-full'>
                            <div className='flex items-center'>
                                <span className='font-semibold text-[18px]'>Ticket Name</span>
                            </div>
                            <div>
                                <Button radius="sm" className="bg-gradient-to-tr bg-transparent text-white text-lg" size='sm' onClick={() => handleGoSettings()}>
                                    {icons.shape}
                                </Button>
                            </div>
                        </div>
                        <div className='flex justify-around mt-5 w-full'>
                            <div>
                                <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-600 text-white text-base" size='sm' onClick={() => handleGoSettings()}>
                                    IN PROGRESS
                                </Button>
                            </div>
                            <div>
                                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-600 text-white text-base" size='sm' onClick={() => handleGoSettings()}>
                                    SOLVED
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col pt-10'>
                        <ScrollShadow className='h-[530px]'>
                            {
                                TicketTitle.map((item, index) => {
                                    return (
                                        <div key={index} className={("cursor-pointer p-3 rounded-lg ") + (selectticket == index ? 'flex flex-col border-3 border-gray-700 bg-gradient-to-tr from-purple-light to-purple-weight' : "flex flex-col border-3 border-gray-700")} onClick={() => setSelectTicket(selectticket == index ? -1 : index)}>
                                            <span className='font-normal text-sm'>{item.date}</span>
                                            <span className='font-semibold text-[18px]'>{item.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </ScrollShadow>
                    </div>
                </div>
                <div className='flex flex-col max-w-[1040px] w-full space-y-32'>
                    <div className="flex flex-col max-w-[1040px] w-full bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5">
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col space-y-4'>
                                <span className='font-normal text-sm'>#10 / February 27, 2024</span>
                                <span className='font-semibold text-base mt-2'>Ticket Title</span>
                            </div>
                            <div>
                                <Button radius="sm" className="bg-gradient-to-tr bg-transparent text-white text-lg" size='sm' onClick={() => handleGoPreviousPage()}>{icons.cancel}</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <ScrollShadow className='h-[190px]'>
                            {
                                
                            }
                        </ScrollShadow>
                    </div>
                    <div className='flex mt-10 gap-5'>
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
