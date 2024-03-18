"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Shine } from "@/src/utils/Icons";
import RobertHand from '@/public/assets/dmcabadge/robert-hand.svg';
import PhotoRight from '@/public/assets/dmcabadge/photo-right.svg';
import PhotoLeft from '@/public/assets/dmcabadge/photo-left.svg';
import Robert from '@/public/assets/dmcabadge/robert.svg';

export default function DmcaBadges() {

    const icons = {
        shine: <Shine fill="currentColor" size={16} />,
    };

    const DmcaBadgesTitle = {
        title: "DMCA BADGES",
        content: "DMCA Badges represent a visible declaration that your content is protected by copyright and follows the DMCA (Digital Millennium Copyright Act) guidelines. Placing these badges on your content or platform serves as a warning sign to potential infringers, notifying them that your work is legally protected and any unauthorized use or reproduction will face legal repercussions."
    }
    const DmcaBadgesContent = [
        {
            content: "@/public/assets/saturn.svg"
        }, {
            content: "@/public/assets/saturn.svg"
        }, {
            content: "@/public/assets/saturn.svg"
        }, {
            content: "@/public/assets/saturn.svg"
        }, {
            content: "@/public/assets/saturn.svg"
        }, {
            content: "@/public/assets/saturn.svg"
        }
    ]

    const DmcaBadges = [
        {
            title: "Download Legal Protection:",
            content: "Displaying DMCA Badges communicates that your content is safeguarded by copyright laws and under DMCA policies, discouraging theft or misuse."
        }, {
            title: "Visual Deterrent:",
            content: "These badges act as a deterrent to potential violators, signaling that your content is monitored and protected by copyright laws. Badges"
        }
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-20'>
                    <p className='font-medium text-5xl max-lg:text-[30px]'>{DmcaBadgesTitle.title}</p>
                    <div className='max-w-[716px] mx-auto max-md:'><p className='font-normal text-base mt-10'>{DmcaBadgesTitle.content}</p></div>
                </div>
                <div className='mt-20 max-md:text-center max-md:mx-auto'>
                    <span className='font-medium text-md'>Download DMCA Badges</span>
                </div>
                <div className='flex gap-32 mt-10 max-md:px-3'>
                    <div className='grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1'>
                        {
                            DmcaBadgesContent.map((dmcabadge, index) => {
                                return (
                                    <div key={index} className="flex relative max-md:w-[330px] w-[380px] bg-[url('/assets/saturn.svg')] h-[300px] bg-cover border border-gray-500 rounded-[20px] cursor-pointer">
                                        <div className='flex absolute bottom-0 p-2'>
                                            <Button radius="lg" className="font-medium bg-gradient-to-tr max-md:text-xs from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>Download
                                            </Button>
                                            <Button radius="lg" className="font-medium backdrop-blur-sm max-md:text-xs bg-white/10 shadow-gray-50 text-white px-5 py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>Embed your badge
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='flex w-full pt-64 max-xl:flex-col max-xl:mx-auto max-xl:justify-center max-xl:items-center'>
                    <div className='flex w-1/3 relative'>
                        <Image className='left-0 top-10 z-20' src={RobertHand} alt='robert-hand' />
                        <Image className='absolute -right-40 top-20 max-xl:hidden' src={PhotoRight} alt='photo right rotate' />
                    </div>
                    <div className='w-1/3 text-center mt-32 relative z-20 max-xl:mt-0'>
                        <Image className='-top-40 absolute max-xl:hidden' src={PhotoLeft} alt='photo rotate left' />
                        <span className='font-medium text-xl mx-auto mt-20'>Why Use DMCA Badges?</span>
                    </div>
                    <div className='w-1/3 max-xl:w-full relative max-xl:px-3'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='absolute left-0 top-10 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                        <div className="flex max-w-[422px] duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative max-xl:rotate-0 max-xl:right-0 max-xl:top-20 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-40 p-5 cursor-pointer absolute left-0 -top-36 ">
                            <div>
                                <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Download Legal Protection:</span>
                                <span className='font-normal text-lg'>Displaying DMCA Badges communicates that your content is safeguarded by copyright laws and under DMCA policies, discouraging theft or misuse.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[422px] duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute -left-8 top-6 max-xl:left-0 max-xl:top-24 mt-6 ">
                            <div>
                                <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Visual Deterrent:</span>
                                <span className='font-normal text-lg'>These badges act as a deterrent to potential violators, signaling that your content is monitored and protected by copyright laws. Badges</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mt-36 max-w-[1400px] max-xl:flex-col max-xl:items-center mb-96'>
                    <div className='flex w-1/4 items-center'>
                        <span className='font-medium text-2xl max-xl:text-center'>How to Use DMCA Badges?</span>
                    </div>
                    <div className='relative flex w-1/2 max-xl:mt-5 max-xl:flex-col max-md:w-full max-md:px-3'>
                        <div className="flex max-w-[462px] max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-0 top-6 max-xl:left-0 max-xl:top-24 mt-6 ">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Download:</span>
                                <span className='font-normal text-lg'>Choose from a range of DMCA Badges available for your platform.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[462px] max-xl:mt-5 max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-48 top-44 max-xl:left-0 max-xl:top-24">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Placement:</span>
                                <span className='font-normal text-lg'>Insert the badge on your website, content, or platform to make it visible to users.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[462px] max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-0 top-80 max-xl:left-0 max-xl:top-24 mt-6 ">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Visibility:</span>
                                <span className='font-normal text-lg'>Ensure the badges are clearly visible, preferably near the content, to indicate protection against infringement.</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center max-xl:hidden'>
                        <Image className='w-[318px] h-[409px]' src={Robert} alt='robert hand' />
                    </div>
                </div>
            </div >
        </>
    )
}