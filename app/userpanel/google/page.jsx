"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { GoogleSearch, Components } from "@/components/utils/Icons";
import React from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';

export default function Google() {
    const [value, setValue] = React.useState(25);

    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        components: <Components fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content: "Initiated an automated Google search, resulting in the detection of 10 new copyright infringements."
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content: "Initiated an automated Google Images search, resulting in the detection of 10 new copyright infringements"
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: "Initiated an automated Google Images search, resulting in the detection of 10 new copyright infringements."
        }
    ]

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>GOOGLE MODULE</span></div>
                    <div><Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                        START
                    </Button>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
                    {
                        ScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex justify-between p-6'>
                                        <div className='flex px-5 gap-5 w-1/4'>
                                            {items.icon}
                                            <span className='font-semibold text-sm'>{items.title}</span>
                                        </div>
                                        <div className='px-20 flex justify-start w-3/4'>
                                            <span className='font-normal text-xs'>{items.content}</span>
                                        </div>
                                    </div>
                                    <hr className='w-full' />
                                </div>
                            )
                        })
                    }
                    <div className='mt-10 mx-auto'>
                    <Image src={GoogleIcon} width={100} height={100} alt='google'></Image>
                    </div>
                </div>
                <div className="flex items-center px-20 py-8 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5">
                    <div className='flex gap-10 items-center'>
                        {icons.components}
                        <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements and forwarded it to Search Engines.</span>
                    </div>
                </div>
            </div>
    )
}