"use client";
import {
    Button
} from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cancel } from "@/components/utils/Icons";
import { createNewTicket } from '../../../axios/ticket';

export default function CreateTicket() {

    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const icons = {
        cancel: <Cancel />,
    };

    const handleCreate = useCallback(async () => {

        if (!name || !message) return;
        setIsProcessing(true);
        const res = await createNewTicket({
            name,
            content: message,
            attached_images: []
        });

        if (res.status == 'success') {
            router.push('/app/personal-agent/ticket-detail')
        }
        setIsProcessing(false);
    }, [name, message]);

    const handlePreviousPage = () => {
        history.back()
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 text-white max-lg:mx-auto">

            {/* This section for define create ticket header?*/}

            <div className='mt-5 max-lg:mx-auto max-lg:mt-0 font-extrabold text-lg'>
                PERSONAL AGENT
            </div>
            <div className="flex items-center px-10 py-5 mt-10 justify-between bg-white/15 border border-gray-500 rounded-[16px] w-full p-5">
                <div>New Ticket</div>
                <Button radius="sm" className="bg-gradient-to-tr bg-transparent text-white text-lg" size='sm' onClick={() => handlePreviousPage()}>{icons.cancel}</Button>
            </div>

            {/* This section for define create ticket content?*/}

            <div className="flex flex-col px-10 py-5 mt-10 mx-auto max-w-[750px] w-full bg-white/15 border border-gray-500 rounded-[16px] p-5 max-md:px-3">
                <div className='flex flex-col w-full p-5'>
                    <label>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        className='w-full outline-none p-2 rounded-lg bg-white/15 border border-gray-700 notranslate'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Type here'
                    />
                </div>
                <div className='flex flex-col w-full p-5'>
                    <label>Message</label>
                    <textarea
                        rows="5"
                        className='w-full outline-none p-2 rounded-lg bg-white/15 border border-gray-700 notranslate'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Type here'
                    />
                </div>
                <div className='flex justify-between w-full pb-10 px-5'>
                    <Button
                        radius="lg"
                        className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white px-12 text-sm"
                        size='sm'
                        onPress={() => router.push("/app/personal-agent")}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        radius="lg"
                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white px-12"
                        size='sm'
                        onClick={handleCreate}
                        isLoading={isProcessing}
                    >
                        <span>Create</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
