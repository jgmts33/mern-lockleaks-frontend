"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel } from "@/components/utils/Icons";

export default function CreateTicket() {
    const router = useRouter();

    const icons = {
        cancel: <Cancel fill="currentColor" size={16} />,
    };

    const handleTicketDetail = () =>{
        router.push("/userpanel/personalagent/ticketdetail")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
            </div>
            <div className="flex items-center px-10 py-5 mt-10 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] w-full p-5">
                <div><span>New Ticket</span></div>
                <div>{icons.cancel}</div>
            </div>
            <div className="flex flex-col px-10 py-5 mt-10 mx-auto max-w-[750px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] p-5">
                <div className='flex flex-col w-full p-5'>
                    <label>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        className='w-full outline-none p-2 rounded-lg bg-white/15 border border-gray-700'
                        placeholder='Type here'
                    />
                </div>
                <div className='flex flex-col w-full p-5'>
                    <label>Message</label>
                    <textarea
                        rows="5"
                        className='w-full outline-none p-2 rounded-lg bg-white/15 border border-gray-700'
                        placeholder='Type here'
                    />
                </div>
                <div className='flex justify-between w-full pb-10 px-5'>
                    <Button radius="lg" className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg px-12 text-sm" size='sm'>
                        Cancel
                    </Button>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-12" size='sm' onClick={()=>handleTicketDetail()}>
                        Create
                    </Button>
                </div>
            </div>
        </div>
    )
}
