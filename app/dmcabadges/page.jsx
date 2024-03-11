"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Shine } from "@/src/utils/Icons";
import Saturn from '@/public/assets/saturn.svg';
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
                <div className='mt-20'>
                    <span className='font-medium text-md'>Download DMCA Badges</span>
                </div>
                <div className='flex gap-32 mt-10 max-md:px-3'>
                    <div className='grid grid-cols-3 gap-5'>
                        {
                            DmcaBadgesContent.map((dmcabadge, index) => {
                                return (
                                    <div key={index} className="flex relative w-[380px] bg-[url('/assets/saturn.svg')] h-[300px] bg-cover border border-gray-500 rounded-[20px] cursor-pointer">
                                        <div className='flex absolute bottom-0 p-2'>
                                            <Button radius="lg" className="font-medium bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>Download
                                            </Button>
                                            <Button radius="lg" className="font-medium backdrop-blur-sm bg-white/10 shadow-gray-50 text-white px-5 py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>Embed your badge
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex w-full mt-36'>
                    <div className='flex w-1/3 relative'>
                        <Image className='left-0 top-10 z-20' src={RobertHand} alt='robert-hand' />
                        <Image className='absolute -right-40 top-20 max-xl:hidden' src={PhotoRight} alt='photo right rotate' />
                    </div>
                    <div className='w-1/3 text-center mt-32 relative z-20'>
                        <Image className='-top-40 absolute max-xl:hidden' src={PhotoLeft} alt='photo rotate left' />
                        <span className='font-medium text-xl mx-auto mt-20'>Why Use DMCA Badges?</span>
                    </div>
                    <div className='w-1/3 relative'>
                        <div className="flex py-10 absolute -left-20 -top-3 max-w-[466px] max-lg:rotate-0 rotate-[12deg] backdrop-blur-sm bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] z-20 p-5 cursor-pointer">
                            <div className='flex'>
                                <div>
                                    <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Download Legal Protection:</span>
                                    <span className='font-normal text-lg'>Displaying DMCA Badges communicates that your content is safeguarded by copyright laws and under DMCA policies, discouraging theft or misuse.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-10 absolute max-w-[466px] -left-44 top-44 backdrop-blur-sm bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5">
                            <div className='flex'>
                                <div>
                                    <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Visual Deterrent:</span>
                                    <span className='font-normal text-lg'>These badges act as a deterrent to potential violators, signaling that your content is monitored and protected by copyright laws. Badges</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mt-36 max-w-[1400px]'>
                    <div className='flex w-1/4 items-center'>
                        <span className='font-medium text-2xl'>How to Use DMCA Badges?</span>
                    </div>
                    <div className='relative flex w-1/2'>
                        <div className="flex py-10 absolute -top-10 max-w-[466px] h-[170px] bg-gradient-to-br backdrop-blur-sm bg-white/10 shadow-sm border border-gray-500 rounded-[20px] p-5 z-20 cursor-pointer">
                            <div className='flex'>
                                <div className='flex flex-col'>
                                    <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Download:</span>
                                    <span className='font-normal text-lg'>Choose from a range of DMCA Badges available for your platform.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-10 absolute right-20 top-28 h-[150px] max-w-[466px] backdrop-blur-sm bg-white/10 border border-gray-500 z-10 rounded-[20px] p-5">
                            <div className='flex'>
                                <div className='flex flex-col'>
                                    <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Placement:</span>
                                    <span className='font-normal text-lg'>Insert the badge on your website, content, or platform to make it visible to users.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex py-10 absolute bottom-0 max-w-[466px] h-[170px] backdrop-blur-sm bg-white/10 bg-opacity-60 border border-gray-500 rounded-[20px] p-5">
                            <div className='flex'>
                                <div className='flex flex-col'>
                                    <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Visibility:</span>
                                    <span className='font-normal text-lg'>Ensure the badges are clearly visible, preferably near the content, to indicate protection against infringement.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center'>
                    <Image className='w-[318px] h-[409px]' src={Robert} />
                    </div>
                </div>
            </div>
        </>
    )
}
