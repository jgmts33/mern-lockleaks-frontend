"use client";
import Image from 'next/image';
import {
    Button, Link, Progress, ScrollShadow
} from '@nextui-org/react';
import { Chain, Components } from "@/components/utils/Icons";
import React from 'react';
import { useEffect, useState } from 'react';
import Saturn from '@/public/assets/background/space.svg';

export default function AIImage() {
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
            content: <div className='flex items-center space-x-1 font-normal text-sm'>
                <span>Scanning on</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-base'>10</span>
                <span>websites.</span>
            </div>
        },
        {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-sm'>
                <span>Photos Matched</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-base'>10</span>
                <span>.</span>
            </div>
        }, {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-sm'>
                <span>Profiles Matched:</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-base'>10</span>
                <span>.</span>
            </div>
        },
    ]

    const handlePreviousPage = () => {
        history.back()
    }

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

                {/* This section for define AI face images header*/}

                <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                    <div className='flex felx'>
                        <div><span className='font-extrabold text-lg'>AI FACE IMAGES</span></div>
                    </div>
                    <div className="flex flex-col sm:hidden bg-white/15 border border-gray-500 rounded-[16px] p-10">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base text-center'>How Doew It Work?</span>
                            <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                        </div>
                    </div>
                    <div className='flex space-x-5 max-sm:hidden'>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 text-lg" size='sm'>
                            <span>START</span>
                        </Button>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl max-sm:hidden"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>

                {/* This section for define AI face images upload*/}
                <div className='flex gap-5 max-xl:flex-col max-md:gap-5'>
                    <div className='flex flex-col mt-3'>
                        <div className='flex max-sm:mx-auto'>
                            <span className='font-extrabold text-lg max-lg:text-base'>Photo for Removal Refference</span>
                        </div>
                        <div className="flex flex-col w-full bg-white/15 border border-gray-500 py-2 px-5 rounded-[16px] mt-5">
                            <div className='flex mx-auto'>
                                <Image src={Saturn} width={150} height={150} className='' alt='saturn' />
                            </div>
                            <div>
                            <ScrollShadow className="h-[220px] max-sm:h-[130px]">
                                {
                                    AIImageLists.map((items, index) => {
                                        return (
                                            <div key={index} className='flex py-1 items-center px-8 gap-2 w-full max-lg:gap-3 max-lg:ite-start max-sm:px-0'>
                                                <div className='flex bg-gradient-to-br justify-start bg-white/10 py-2 px-10 w-full items-center gap-3 rounded-[16px] max-md:items-start max-sm:px-1 max-sm:py-2'>
                                                    <div>{items.icon}</div>
                                                    <span>{items.content}</span>
                                                </div>
                                                <div>
                                                    <Button radius="lg" className={selectedimage == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 border border-gray-600 text-white text-base") : ("bg-gradient-to-tr bg-white/15 text-white border border-gray-600 text-base px-5 flex justify-start")} size='sm' onClick={() => setSelectImage(index)}><span>select</span></Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </ScrollShadow>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col py-10 w-full h-full max-sm:py-0'>
                        <div className='flex max-sm:mx-auto'>
                            <span className='font-extrabold text-lg max-lg:text-base'>Upload Photo for Removal</span>
                        </div>
                        <div className='flex flex-col w-full h-[400px] max-sm:h-[200px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                            <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                                <div className="flex items-center justify-center pt-5">
                                    <span className="font-light text-lg text-white">+ Upload Photo</span>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className='max-w-[450px] w-full max-lg:flex max-lg:max-w-[700px] max-lg:gap-5 max-md:flex-col max-md:gap-0'>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-10 max-sm:mt-0">
                            <div className='flex'>
                                <span className='font-normal text-base'>Requests are reviewed,and government-issued IDs are required for verification.Without the upload of a government-issued ID, these profiles.<span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Cannot Be Removed</span></span>
                            </div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-10" size='sm'>
                                <span>Upload ID</span>
                            </Button>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-10 max-sm:hidden">
                            <div className='flex flex-col'>
                                <span className='font-normal text-base text-center'>How Doew It Work?</span>
                                <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                            </div>
                        </div>
                        <div className='flex space-x-5 sm:hidden max-sm:mx-auto max-sm:mt-5'>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-5 text-lg" size='sm'>
                                <span>START</span>
                            </Button>
                        </div>
                        <Progress
                            size="md"
                            aria-label="Loading..."
                            className="max-w-2xl sm:hidden"
                            color='secondary'
                            value={value}
                            showValueLabel={true}
                        />
                    </div>
                </div>

                {/* This section for define AI face images scan list*/}

                <div className='flex flex-col'>
                    {
                        scanResults.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col p-1'>
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
                <div className="flex items-center px-20 py-8 gap-20 bg-white/15 border border-gray-500 rounded-[16px] w-full max-lg:px-5 p-5 mt-1 max-lg:py-5 max-md:flex-col max-md:gap-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <div><span className='font-normal text-base'>AI RESULTS REMOVAL MODULE</span></div>
                    </div>
                    <div className='flex items-center space-x-1 max-lg:flex-wrap'>
                        <span className='font-normal text-xs'>Generated a removal report with</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                        <span className='font-normal text-xs'>copyright infringements, including AI results, matched photos, and profiles, and forwarded it to AI Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
