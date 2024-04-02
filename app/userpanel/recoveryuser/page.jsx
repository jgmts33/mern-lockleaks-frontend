"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React from 'react';

export default function RecoveryUsers() {

    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr py-10 px-5 text-white max-lg:mx-auto">
                <div className='flex gap-16 items-center max-lg:mx-auto'>
                    <span className='font-extrabold text-lg'>RECOVERY AND REMOVAL OF USERNAMES CONTENT</span>
                </div>
                <div className='flex justify-between '>
                    <div className='mt-10 font-extrabold text-lg max-sm:text-base max-sm:mt-5'><span>Recovery Usernames</span></div>
                    <div className='mt-10 font-extrabold text-lg mr-24 max-lg:mr-0 max-sm:text-base max-sm:mt-5'><span>Profile Content Removal</span></div>
                </div>
                <div className='flex gap-10 max-xl:flex-col max-xl:gap-3'>
                    <div className="flex flex-col max-w-[460px] max-xl:max-w-full w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-5">
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
                    <div className='flex items-center pt-12 max-xl:mx-auto'><span className='text-white font-extrabold text-lg'>Or</span></div>
                    <div className="flex flex-col max-w-[460px] max-xl:max-w-full w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
                        <div className='flex max-w-[250px] text-center mx-auto'>
                            <span className='font-normal text-sm'>To Begin the Scanning Process,Please Provide Any Known Usernames You Have Used.</span>
                        </div>
                        <input
                            type="text"
                            name="content"
                            className='w-full outline-none p-3 rounded-2xl mt-7 bg-white/15 border border-gray-700'
                            placeholder='Type here'
                        />
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                            Start
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[460px] max-xl:max-w-full w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
                        <div className='flex max-w-[200px] text-center mx-auto'>
                            <span className='font-normal text-sm'>Upload a Picture Of Yourself While Holding a Sign That Reads  “CGF”</span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr bg-transparent text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                            + Upload
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                            Submit
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center py-8 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full">
                    <div className='flex items-center'>
                        <span className='font-normal text-base'>How does it work?</span>
                    </div>
                    <div className='max-2xl:px-3'>
                        <span className='font-normal text-sm'>Upload a picture of yourself to 'Profile Content Removal', then choose whether you want to upload a picture of yourself for automatic facial scanning or if you want to use your username.</span>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 w-full py-5 px-10 max-lg:flex-col max-lg:px-3">
                    <div className='flex gap-5 max-w-[350px] w-full items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>HISTORICAL PROFILE RESULTS</span>
                    </div>
                    <div className='px-20 max-lg:px-3 items-center space-x-1'>
                        <span className='font-normal text-xs'>Generated a removal report for</span> 
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span> 
                        <span className='font-normal text-xs'>copyright infringements, encompassing AI results, matched photos & profiles, and manually forwarded it to Recovery Usernames Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
