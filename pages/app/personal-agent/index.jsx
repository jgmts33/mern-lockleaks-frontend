"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function PersonalAgent() {
    const router = useRouter();

    const handleCreteTicket = () => {
        router.push("/app/personal-agent/create-ticket");
    }

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 text-white">
                <div className='mt-5 max-md:mx-auto'>
                    <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                </div>
                <div className='flex flex-col justify-center h-[calc(100vh-200px)] items-center gap-10'>
                    <span className='font-bold text-3xl'>Need Assistance?</span>
                    <span className='font-normal text-base'>Click to Chat with Your Personal Agent</span> 
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-sm mx-auto" size='sm' onClick={()=>handleCreteTicket()}>
                        Create A Ticket
                    </Button>
                </div>
        </div>   
    ) 
}
