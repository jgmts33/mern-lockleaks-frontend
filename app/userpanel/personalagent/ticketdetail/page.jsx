"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane } from "@/components/utils/Icons";

export default function TicketDetail() {
    const [value, setValue] = React.useState(25);
    const router = useRouter();

    const icons = {
        cancel: <Cancel fill="currentColor" size={16} />,
        shape: <Shape fill="currentColor" size={16} />,
        paperclip: <PaperClip fill="currentColor" size={16} />,
        paperplane: <PaperPlane fill="currentColor" size={16} />,
    };

    return (
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
            </div>
            <div className='flex gap-5 mt-5'>
                <div className="flex flex-col max-w-[480px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                    <div className='flex justify-between mt-5'>
                        <span className='font-semibold text-[18px]'>Ticket Name</span>
                        <span>{icons.shape}</span>
                    </div>
                    <div className='flex flex-col pt-10 space-y-3'>
                        <span className='font-normal text-sm'>#10 / February 27, 2024</span>
                        <span className='font-semibold text-[18px]'>Ticket Title</span>
                    </div>
                    <Progress
                        size="md"
                        className="max-w-2xl mt-5"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                    <div className='mx-auto pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg px-5 py-5 text-lg" size='sm'>
                            Pending
                        </Button>
                    </div>
                </div>
                <div className='max-w-[1040px] w-full'>
                    <div className="flex flex-col max-w-[1040px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col space-y-3'>
                                <span className='font-normal text-sm'>#10 / February 27, 2024</span>
                                <span className='font-semibold text-base'>Ticket Title</span>
                            </div>
                            <div>{icons.cancel}</div>
                        </div>
                        <div>
                            <div className='flex mt-10 gap-5 pt-20'>
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
            </div>
        </div>
    )
}
