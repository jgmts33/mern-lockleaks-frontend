"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, Input
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane, TurnLeft, TurnRight, Search } from "@/components/utils/Icons";

export default function PersonalAgent() {
    const [value, setValue] = React.useState(25);
    const router = useRouter();

    const icons = {
        turnleft: <TurnLeft fill="currentColor" size={16} />,
        turnright: <TurnRight fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
    };

    const handleShowDetails = () => {
        router.push("/admin/personal-agent/details");
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='flex flex-col space-y-5 max-md:mx-auto max-md:text-center'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
            </div>
            <div className='flex gap-10 mt-5 max-md:flex-col'>
                <div className="flex flex-col max-w-[400px] w-full h-[550px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5 pb-28 max-md:mx-auto">
                    <div className='flex justify-between'>
                        <div>{icons.turnleft}</div>
                        <div>{icons.turnright}</div>
                    </div>
                    <div className='flex space-x-5 mt-8 max-sm:flex-col max-sm:space-x-0 max-sm:gap-3'>
                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-700 text-white text-sm px-5" size='sm' onClick={()=>handleShowDetails()}>
                            NEW
                        </Button>
                        <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white text-sm px-5" size='sm'>
                            IN PROGRESS
                        </Button>
                        <Button radius="full" className="bg-gradient-to-tr from-gray-600/40 to-gray-800/40 border border-gray-700 text-white text-sm" size='sm'>
                            SOLVED
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
