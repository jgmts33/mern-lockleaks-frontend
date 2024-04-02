"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane } from "@/components/utils/Icons";

export default function TicketDetail() {
    const [value, setValue] = React.useState(100);
    const router = useRouter();

    const icons = {
        cancel: <Cancel fill="currentColor" size={16} />,
        shape: <Shape fill="currentColor" size={16} />,
        paperclip: <PaperClip fill="currentColor" size={16} />,
        paperplane: <PaperPlane fill="currentColor" size={16} />,
    };

    const handleGoSettings = () => {
        router.push("/userpanel/personalagent/setproperty");
    }

    const handleGoPreviousPage = () => {
        history.back()
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='flex flex-col space-y-5 max-md:mx-auto'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
            </div>
            <div className='flex gap-5 mt-5 max-md:flex-col'>
                <div className="flex flex-col max-w-[400px] w-full h-[550px] bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5 max-md:mx-auto">
                    <div className='flex justify-between mt-5'>
                        <span className='font-semibold text-[18px]'>Ticket Name</span>
                        <Button radius="sm" className="bg-gradient-to-tr bg-transparent border border-gray-700 text-white shadow-lg text-lg" size='sm' onClick={() => handleGoSettings()}>
                            {icons.shape}
                        </Button>
                    </div>
                    <div className='flex justify-center space-x-5 mt-8'>
                        <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white shadow-lg text-sm" size='sm'>
                            IN PROGRESS
                        </Button>
                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-700 text-white shadow-lg text-sm" size='sm'>
                            SOLVED
                        </Button>
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
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-5 py-5 text-lg" size='sm'>
                            Solved
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col max-w-[1040px] w-full space-y-32'>
                    <div className="flex flex-col max-w-[1040px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col space-y-4'>
                                <span className='font-normal text-sm'>#10 / February 27, 2024</span>
                                <span className='font-semibold text-base mt-2'>Ticket Title</span>
                            </div>
                            <div>
                                <Button radius="sm" className="bg-gradient-to-tr bg-transparent text-white shadow-lg text-lg" size='sm' onClick={() => handleGoPreviousPage()}>{icons.cancel}</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>

                    </div>
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
    )
}
