"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React, { useState } from 'react';

export default function SMsubmit() {
    const [value, setValue] = React.useState(25);
    const [isselect, setSelect] = useState(0)

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        SMfacebook: <SMfacebook fill="currentColor" size={16} />,
        SMinstagram: <SMinstagram fill="currentColor" size={16} />,
        SMtwitter: <SMtwitter fill="currentColor" size={16} />,
        SMtelegram: <SMtelegram fill="currentColor" size={16} />,
        SMreddit: <SMreddit fill="currentColor" size={16} />,
    };

    const SOcialMediaButtons = [
        {
            icon: icons.SMfacebook
        }, {
            icon: icons.SMinstagram
        }, {
            icon: icons.SMtwitter
        }, {
            icon: icons.SMtelegram
        }, {
            icon: icons.SMreddit
        }
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto max-lg:px-3">

                {/* This section for define Social Submit header*/}

                <div className='flex gap-16 items-center max-lg:mx-auto'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA SUBMIT</span></div>
                </div>
                <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:mt-5 sm:hidden">
                    <div className='flex flex-col'>
                        <span className='font-normal text-[18px] text-center'>How Doew It Works?</span>
                        <span className='font-normal text-xs pt-3'>Choose the reference image, Upload your photo, upload your ID card picture, and then press Start.</span>
                    </div>
                </div>
                {/* This section for define Social Submit content*/}

                <div className='grid grid-cols-3 gap-10 max-2xl:gap-2 max-xl:flex-col max-xl:flex max-xl:gap-0'>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:mt-5">
                        <div className='flex max-w-[330px] max-xl:max-w-full'>
                            <span className='font-normal text-[18px] max-sm:text-sm'>Requests are reviewed,and government-issued IDs are required for verification.Without the upload of a government-issued ID, these profiles.<span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Cannot Be Removed</span></span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                            Upload ID
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[462px] max-xl:max-w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-8 pb-10 max-sm:mt-5">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base'>Select the platform icon where you want to report the profile.</span>
                            <div className='flex justify-around mt-5 max-lg:justify-between px-2 max-xl:gap-0 max-sm:gap-2'>
                                {
                                    SOcialMediaButtons.map((items, index) => {
                                        return (
                                            <Button key={index} radius="sm" size='md' isIconOnly className={('bg-transparent p-6 ') + (isselect == index ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "")} onClick={() => setSelect(index)}><span>{items.icon}</span></Button>
                                        )
                                    })
                                }
                            </div>
                            <textarea className='bg-white/15 shadow-sm shadow-gray-50 rounded-lg mt-3 h-20'></textarea>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-5 text-sm mx-auto mt-7" size='sm'>
                                Submit
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:hidden">
                        <div className='flex flex-col'>
                            <span className='font-normal text-[18px] text-center'>How Doew It Works?</span>
                            <span className='font-normal text-xs pt-3'>Choose the reference image, Upload your photo, upload your ID card picture, and then press Start.</span>
                        </div>
                    </div>
                </div>

                {/* This section for define Social Media Submit result*/}

                <div className="flex items-center px-20 py-8 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-xl:flex-col max-xl:px-3 max-sm:mt-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-xl:px-5 space-x-1'>
                        <span className='font-normal text-xs'>Generated a removal report with</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                        <span className='font-normal text-xs'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
