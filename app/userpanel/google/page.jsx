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
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google search, resulting in the detection of </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google Images search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google Images search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">

            {/* This section for define file google scan header*/}

            <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
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

            {/* This section for define google scan content*/}

            <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
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

            {/* This section for define google scan footer*/}

            <div className="flex items-center px-16 py-8 justify-start bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 w-full p-5 max-md:flex-col max-md:px-5">
                <div className='flex gap-5 items-center'>
                    <div>{icons.components}</div>
                    <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                </div>
                <div className='px-20 max-md:px-0 font-normal text-xs space-x-1 items-center'>
                    <span>Generated a removal report with </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                    <span>copyright infringements and forwarded it to Search Engines.</span>
                </div>
            </div>
        </div>
    )
}
