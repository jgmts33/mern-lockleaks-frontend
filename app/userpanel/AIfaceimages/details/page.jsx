"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, ScrollShadow
} from '@nextui-org/react';
import { Chain, Components } from "@/components/utils/Icons";
import React from 'react';
import { useEffect, useState } from 'react';
import Saturn from '@/public/assets/background/space.svg';

export default function AIImageDetails() {
    const [value, setValue] = React.useState(25);

    const icons = {
        chain: <Chain fill="currentColor" size={16} />,
        components: <Components fill="currentColor" size={16} />,
    };

    const [selectedimage, setSelectImage] = useState(0)

    const AIImageLists = [
        {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }
    ]

    const scanResults = [
        {
            icon: icons.components,
            content: "Scanning on 10 websites. "
        },
        {
            icon: icons.components,
            content: "Photos Matched: 10  "
        }, {
            icon: icons.components,
            content: "Profiles Matched: 10"
        },
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-3 py-10 container text-white max-lg:mx-auto">
                <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                    <div className='flex felx'>
                        <div><span className='font-extrabold text-lg'>SCANNER</span></div>
                    </div>
                    <div><Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 text-lg" size='sm'>
                        START
                    </Button>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-[900px]"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>
                <div className='flex max-w-[750px] w-full justify-between mt-10 max-lg:gap-20'>
                    <div><span className='font-extrabold text-lg max-lg:text-base'>Upload Photo for Removal</span></div>
                    <div><span className='font-extrabold text-lg max-lg:text-base'>Photo for Removal Refference</span></div>
                </div>
                <div className='flex gap-10 max-lg:flex-col max-md:gap-5'>
                    <div className="flex flex-col w-full justify-center items-center bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5">
                        <div className='flex p-10 justify-around gap-10 w-full max-2xl:flex-col max-2xl:justify-center max-2xl:items-center max-md:p-1'>
                            <div className='flex w-full max-2xl:w-1/2'>
                                <Image src={Saturn} width={300} height={100} className='' alt='saturn' />
                            </div>
                            <div className='flex w-full px-5'>
                                <ScrollShadow className="h-[220px] w-[500px]">
                                    {
                                        AIImageLists.map((items, index) => {
                                            return (
                                                <div key={index} className='flex mt-5 items-center px-8 gap-10 w-full max-lg:flex-col max-lg:gap-5 max-lg:items-start'>
                                                    <div className='flex bg-gradient-to-br justify-start bg-white/10 shadow-sm py-3 px-10 w-full items-center gap-3 rounded-[16px] max-md:items-start max-sm:px-2 max-sm:py-2'>
                                                        <div>{items.icon}</div>
                                                        <span>{items.content}</span>
                                                    </div>
                                                    <div>
                                                        <Button radius="lg" className={selectedimage == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 border border-gray-600 text-white text-base") : ("bg-gradient-to-tr bg-white/15 text-white border border-gray-600 text-base px-5 flex justify-start")} size='sm' onClick={() => setSelectImage(index)}>select</Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </ScrollShadow>
                            </div>
                        </div>
                    </div>
                    <div className='max-w-[450px] w-full max-lg:flex max-lg:max-w-[700px] max-lg:gap-5 max-md:flex-col max-md:gap-0'>
                        <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 w-full p-10">
                            <div className='flex'>
                                <span className='font-normal text-base'>Requests are reviewed,and government-issued IDs are required for verification.Without the upload of a government-issued ID, these profiles.<span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Cannot Be Removed</span></span>
                            </div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-sm mx-auto mt-10" size='sm'>
                                Upload ID
                            </Button>
                        </div>
                        <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                            <div className='flex flex-col'>
                                <span className='font-normal text-base text-center'>How Doew It Works?</span>
                                <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-5'>
                    {
                        scanResults.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col p-3'>
                                    <div className='flex gap-5 p-3'>
                                        <div>{items.icon}</div>
                                        <div>{items.content}</div>
                                    </div>
                                    <hr className='w-full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center px-20 py-8 gap-20 bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] w-full max-lg:px-5 p-5 max-lg:py-5 max-md:flex-col max-md:gap-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <div><span className='font-normal text-base'>AI RESULTS REMOVAL MODULE</span></div>
                    </div>
                    <div className='flex max-w-[671px]'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements, including AI results, matched photos, and profiles, and forwarded it to AI Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
