"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, ScrollShadow
} from '@nextui-org/react';
import { Chain, Components } from "@/components/utils/Icons";
import React from 'react';
import { useEffect, useState } from 'react';
import Woman from '@/public/assets/background/woman.svg';

export default function AIfaceprofile() {
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
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div className='flex felx'>
                        <div><span className='font-extrabold text-lg'>AIFACE PROFILES</span></div>
                    </div>
                    <div><Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 text-lg" size='sm'>
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
                <div className='flex max-w-[700px] w-full justify-between mt-10'>
                    <span className='font-extrabold text-lg'>Upload Photo for Removal</span>
                    <span className='font-extrabold text-lg'>Photo for Removal Refference</span>
                </div>
                <div className='flex gap-10'>
                    <div className="flex flex-col w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5">
                        <div className='flex p-10 justify-around gap-10'>
                            <div className='flex w-full h-96'>
                                <Image src={Woman} width={200} height={100} className='w-full h-full' alt='saturn' />
                            </div>
                            <div className='flex w-full px-5'>
                                <ScrollShadow className="h-[220px] w-[500px]">
                                    {
                                        AIImageLists.map((items, index) => {
                                            return (
                                                <div key={index} className='flex mt-5 items-center px-8 gap-10 w-full'>
                                                    <div className='flex bg-gradient-to-br bg-white/10 shadow-sm py-3 px-10 w-full justify-start px-10 items-center gap-3 rounded-[16px]'>
                                                        {items.icon}
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
                    <div className='max-w-[400px] w-full'>
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
                <div className="flex items-center px-20 py-8 justify-start bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] w-full p-5">
                    <div className='flex gap-5 items-center'>
                        {icons.components}
                        <span className='font-normal text-base'>AI RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-w-[1000px]'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements, including AI results, matched photos, and profiles, and forwarded it to AI Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
