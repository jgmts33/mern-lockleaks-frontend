"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, BingSearch } from "@/components/utils/Icons";
import React from 'react';
import BingIcon from '@/public/assets/background/Bing.svg';

export default function Bing() {
    const [value, setValue] = React.useState(25);

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        bingsearch: <BingSearch fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.bingsearch,
            title: "GOOGLE SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                <span>Initiated an automated Google search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                <span>new copyright infringements.</span>
                </div>
            </div>
        },
        {
            icon: icons.bingsearch,
            title: "GOOGLE SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                <span>Initiated an automated Google search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                <span>new copyright infringements.</span>
                </div>
            </div>
        }, {
            icon: icons.bingsearch,
            title: "GOOGLE SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                <span>Initiated an automated Google search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                <span>new copyright infringements.</span>
                </div>
            </div>
        },
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                <div><span className='font-extrabold text-lg'>BING MODULE</span></div>
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
            <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-3 pb-10 cursor-pointer">
                {
                    ScannerContent.map((items, index) => {
                        return (
                            <div key={index} className='flex flex-col px-5'>
                                <div className='flex justify-between p-7 max-md:flex-col'>
                                    <div className='flex px-5 gap-5 w-1/4 max-md:w-full max-md:px-0'>
                                        <div>{items.icon}</div>
                                        <span className='font-semibold text-sm'>{items.title}</span>
                                    </div>
                                    <div className='px-20 flex justify-start w-3/4 max-md:w-full max-md:px-0 max-md:mt-2'>
                                        {items.content}
                                    </div>
                                </div>
                                <hr className='w-full' />
                            </div>
                        )
                    })
                }
                <div className='mt-10 mx-auto'>
                    <Image src={BingIcon} width={80} height={80} alt='bing'></Image>
                </div>
            </div>
            <div className="flex items-center px-20 py-8 justify-start bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 w-full p-5 cursor-pointer max-md:flex-col max-md:px-0">
                <div className='flex gap-5 items-center'>
                    <div>{icons.components}</div>
                    <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                </div>
                <div className='px-20 max-md:px-5 font-normal text-xs space-x-1'>
                    <span className='font-normal text-xs'>Generated a removal report with </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span> 
                    <span>copyright infringements and forwarded it to Search Engines.</span>
                </div>
            </div>
        </div>
    )
}
