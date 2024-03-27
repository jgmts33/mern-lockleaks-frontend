"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React from 'react';

export default function RecoveryUser() {

    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <span className='font-extrabold text-lg'>RECOVERY AND REMOVAL OF USERNAMES CONTENT</span>
                </div>
                <div className='flex justify-between'>
                    <div className='mt-10 font-extrabold text-lg'><span>Recovery Usernames</span></div>
                    <div className='mt-10 font-extrabold text-lg mr-24'><span>Profile Content Removal</span></div>
                </div>
                <div className='flex gap-10'>
                    <div className="flex flex-col max-w-[460px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-5">
                        <div className='flex max-w-[250px] text-center mx-auto'>
                            <span className='font-normal text-sm'>To Start the Scanning Process, Please Begin by Uploading a Photo of Yourself</span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr bg-transparent text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                            + Upload
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                            Start
                        </Button>
                    </div>
                    <div className='flex items-center pt-12'><span className='text-white font-extrabold text-lg'>Or</span></div>
                    <div className="flex flex-col max-w-[460px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
                        <div className='flex max-w-[250px] text-center mx-auto'>
                            <span className='font-normal text-sm'>To Begin the Scanning Process,Please Provide Any Known Usernames You Have Used.</span>
                        </div>
                        <input
                            type="text"
                            name="content"
                            className='w-full outline-none p-3 rounded-lg mt-7 bg-white/15 border border-gray-700'
                            placeholder='Type here'
                        />
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                            Start
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[460px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
                        <div className='flex max-w-[200px] text-center mx-auto'>
                            <span className='font-normal text-sm'>Upload a Picture Of Yourself While Holding a Sign That Reads  “CGF”</span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr bg-transparent text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                            + Upload
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                            Start
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center py-5 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full">
                    <div className='flex items-center'>
                        <span className='font-normal text-base'>How does it work?</span>
                    </div>
                    <div className=''>
                        <span className='font-normal text-sm'>Upload a picture of yourself to 'Profile Content Removal', then choose whether you want to upload a picture of yourself for automatic facial scanning or if you want to use your username.</span>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full py-5 px-10">
                    <div className='flex gap-10 max-w-[350px] w-full items-center'>
                        {icons.components}
                        <span className='font-normal text-base'>HISTORICAL PROFILE RESULTS</span>
                    </div>
                    <div className='px-20'>
                        <span className='font-normal text-xs'>Generated a removal report for 10 copyright infringements, encompassing AI results, matched photos & profiles, and manually forwarded it to Recovery Usernames Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
