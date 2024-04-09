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
            <div className="flex flex-col max-sm:py-16 bg-gradient-to-tr py-5 px-5 text-white max-lg:mx-auto">

                {/* This section for define rusercontent header*/}

                <div className='flex gap-16 items-center max-lg:mx-auto max-lg:text-center'>
                    <span className='font-extrabold text-lg'>RECOVERY AND REMOVAL OF USERNAMES CONTENT</span>
                </div>

                <div className="flex flex-col items-center py-8 justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full max-sm:mt-5 max-sm:text-center sm:hidden">
                    <div className='flex items-center'>
                        <span className='font-normal text-base'>How does it work?</span>
                    </div>
                    <div className='max-2xl:px-3'>
                        <span className='font-normal text-sm'>Upload a picture of yourself to 'Profile Content Removal', then choose whether you want to upload a picture of yourself for automatic facial scanning or if you want to use your username.</span>
                    </div>
                </div>

                {/* This section for define rusercontent content*/}

                <div className='flex mt-10 max-sm:mt-0 w-full max-2xl:space-x-10 max-lg:space-x-0 max-lg:flex-col max-lg:justify-center max-lg:items-center'>
                    <div className='flex flex-col w-2/3 max-lg:w-full '>
                        <div className='text-center justify-center items-center font-extrabold text-lg max-sm:text-base max-sm:mt-5 pr-10 max-sm:pr-0'><span>Recovery Usernames</span></div>
                        <div className='flex space-x-10 max-2xl:space-x-0 max-2xl:flex-col'>
                            <div className="flex flex-col max-w-[480px] max-xl:max-w-full w-full bg-white/15 border border-gray-500 rounded-[16px] mt-5 p-10 pb-5">
                                <div className='flex max-w-[250px] text-center mx-auto'>
                                    <span className='font-normal text-sm'>To Start the Scanning Process, Please Begin by Uploading a Photo of Yourself</span>
                                </div>
                                <Button radius="lg" className="bg-gradient-to-tr bg-white/10 text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                                    + Upload
                                </Button>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                                    Start
                                </Button>
                            </div>
                            <div className='flex items-center pt-12 max-2xl:mx-auto max-2xl:hidden'><span className='text-white font-extrabold text-lg'>Or</span></div>
                            <div className="flex flex-col max-w-[480px] max-xl:max-w-full w-full bg-white/15 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
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
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 justify-center items-center max-2xl:w-full max-lg:mt-5'>
                        <div className='font-extrabold text-lg mx-auto text-center'><span>Profile Content Removal</span></div>
                        <div className="flex flex-col max-w-[460px] max-xl:max-w-full w-full bg-white/15 border border-gray-500 rounded-[16px] mt-5 p-10 pb-10">
                            <div className='flex max-w-[200px] text-center mx-auto'>
                                <span className='font-normal text-sm'>Upload a Picture Of Yourself While Holding a Sign That Reads  “CGF”</span>
                            </div>
                            <Button radius="lg" className="bg-gradient-to-tr bg-white/10 text-white shadow-lg px-7 py-5 text-sm mx-auto mt-10" size='sm'>
                                + Upload
                            </Button>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-12 py-5 text-sm mx-auto mt-10" size='sm'>
                                Start
                            </Button>
                        </div>
                    </div>
                </div>

                {/* This section for define how does it work?*/}

                <div className="flex flex-col items-center py-8 justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full max-sm:hidden">
                    <div className='flex items-center'>
                        <span className='font-normal text-base'>How Does It Work?</span>
                    </div>
                    <div className='max-2xl:px-3'>
                        <span className='font-normal text-sm'>Upload a picture of yourself to 'Profile Content Removal', then choose whether you want to upload a picture of yourself for automatic facial scanning or if you want to use your username.</span>
                    </div>
                </div>

                {/* This section for define HISTORICAL PROFILE RESULTS?*/}

                <div className="flex items-center justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full py-5 px-10 max-lg:flex-col max-lg:px-3 max-sm:mt-5">
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
