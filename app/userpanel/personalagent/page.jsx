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
        router.push("/userpanel/personalagent/createticket");
    }

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='mt-5'>
                    <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                </div>
                <div className='flex flex-col mx-auto gap-10'>
                    <span>Need Assistance?</span>
                    <span>Click to Chat with Your Personal Agent</span> 
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-sm mx-auto" size='sm' onClick={()=>handleCreateTicket()}>
                        Download
                    </Button>
                </div>
        </div>   
    ) 
}
