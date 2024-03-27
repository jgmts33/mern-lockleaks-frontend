"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React from 'react';

export default function SMsubmit() {
    const [value, setValue] = React.useState(25);

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        SMfacebook: <SMfacebook fill="currentColor" size={16} />,
        SMinstagram: <SMinstagram fill="currentColor" size={16} />,
        SMtwitter: <SMtwitter fill="currentColor" size={16} />,
        SMtelegram: <SMtelegram fill="currentColor" size={16} />,
        SMreddit: <SMreddit fill="currentColor" size={16} />,
    };

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA SUBMIT</span></div>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                        <div className='flex max-w-[330px]'>
                            <span className='font-normal text-[18px]'>Requests are reviewed,and government-issued IDs are required for verification.Without the upload of a government-issued ID, these profiles.<span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Cannot Be Removed</span></span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                            Upload ID
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[462px] bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base'>Select the platform icon where you want to report the profile.</span>
                            <div className='flex justify-around mt-5'>
                                <span>{icons.SMfacebook}</span>
                                <span>{icons.SMinstagram}</span>
                                <span>{icons.SMtwitter}</span>
                                <span>{icons.SMtelegram}</span>
                                <span>{icons.SMreddit}</span>
                            </div>
                            <textarea className='bg-white/15 shadow-sm shadow-gray-50 rounded-lg mt-3 h-20'></textarea>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-5 text-sm mx-auto mt-7" size='sm'>
                                Submit
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                        <div className='flex flex-col'>
                            <span className='font-normal text-[18px] text-center'>How Doew It Works?</span>
                            <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center px-20 py-8 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full p-5">
                    <div className='flex gap-10 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
