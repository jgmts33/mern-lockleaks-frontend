"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { GoogleSearch, BingSearch, Complete } from "@/components/utils/Icons";
import React from 'react';

export default function Scanner() {
    const [value, setValue] = React.useState(25);

    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        bingsearch: <BingSearch fill="currentColor" size={16} />,
        complete: <Complete fill="currentColor" size={16} />,
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
        }, {
            icon: icons.bingsearch,
            title: "BING SEARCH",
            content: "Initiated automated searches on Bing Search, resulting in the detection of 10 new copyright infringements."
        }, {
            icon: icons.bingsearch,
            title: "BING IMAGES SEARCH",
            content: "Initiated automated searches on Bing Images Search, resulting in the detection of 10 new copyright infringements."
        }, {
            icon: icons.bingsearch,
            title: "BING VIDEO SEARCH",
            content: "Initiated automated searches on Bing Video Search, resulting in the detection of 10 new copyright infringements."
        },
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>SCANNER</span></div>
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
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5">
                    {
                        ScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex px-4 py-5'>
                                        <div className='flex px-5 gap-5 w-1/4'>
                                            <div>{items.icon}</div>
                                            <div className='flex'><span className='font-semibold text-sm'>{items.title}</span></div>
                                        </div>
                                        <div className='px-20 justify-start w-3/4'>
                                            <span className='font-normal text-xs'>{items.content}</span>
                                        </div>
                                    </div>
                                    <hr className='w-full' />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center px-20 py-8 justify-start bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5">
                    <div className='flex gap-5 items-center'>
                        {icons.complete}
                        <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements and forwarded it to Search Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
