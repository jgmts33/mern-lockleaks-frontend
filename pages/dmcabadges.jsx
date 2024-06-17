"use client";
import Image from 'next/image';
import {
    Button,
    ScrollShadow,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Shine } from "@/components/utils/Icons";
import PhotoRight from '@/public/assets/dmcabadge/photo-right.svg';
import PhotoLeft from '@/public/assets/dmcabadge/photo-left.svg';
import Robert from '@/public/assets/dmcabadge/robert.svg';
import CustomerReview from '@/components/customer-review';
import { getDmcaImages, getDmcaImagesPositions } from '@/axios/dmca';
import { useRouter } from 'next/router';

export default function DmcaBadges() {

    const [list, setList] = useState([]);

    const getDmcaImagesInfo = async () => {
        const res = await getDmcaImages();
        const positionsRes = await getDmcaImagesPositions();

        if (positionsRes.data.length) {
            let _list = [];
            positionsRes.data?.map((item, index) => {
                const data = res.data.find((badge) => badge.id == item);
                _list.push(data);
            });
            setList(_list);
        } else {
            setList(res.data);
        }
    }

    useEffect(() => {
        getDmcaImagesInfo();
    }, []);

    const icons = {
        shine: <Shine/>,
    };

    const DmcaBadgesTitle = {
        title: "DMCA BADGES",
        content: "DMCA Badges represent a visible declaration that your content is protected by copyright and follows the DMCA (Digital Millennium Copyright Act) guidelines. Placing these badges on your content or platform serves as a warning sign to potential infringers, notifying them that your work is legally protected and any unauthorized use or reproduction will face legal repercussions."
    }

    const router = useRouter();

    useEffect(() => {
        console.log("list:", list);
    },[list])


    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">

                {/* This section for define dmcabadges title*/}

                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-medium text-5xl max-lg:text-[30px]'>{DmcaBadgesTitle.title}</p>
                    <div className='max-w-[716px] mx-auto max-md:px-3'><p className='font-normal text-base mt-10'>{DmcaBadgesTitle.content}</p></div>
                </div>
                <div className='mt-20 max-sm:mt-10 max-md:text-center max-md:mx-auto'>
                    <span className='font-medium text-md'>Download DMCA Badges</span>
                </div>

                {/* This section for define dmcabadges title*/}

                <div className='flex gap-32 mt-10'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 left-0 bg-[#362666] bg-opacity-5 blur-3xl' />
                    <ScrollShadow className='h-[620px]'>
                        <div className='grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1 p-5'>
                            {
                                list.map((item, index) => <div
                                    key={index}
                                    className="flex flex-col gap-2 relative w-[380px] bg-cover border border-gray-500 rounded-[20px] cursor-pointer"
                                >
                                    <div className='flex justify-center items-center w-full relative h-[220px] backdrop-blur-3xl bg-white/10 rounded-[20px] px-2 py-4'>
                                        <Image
                                            src={`https://server.lockleaks.com/images?filename=${item?.name}`}
                                            width={200}
                                            height={100}
                                            className='rounded-2xl max-w-full max-h-full'
                                            alt={item?.name}
                                        />
                                    </div>
                                    <div className='flex justify-between w-full gap-2 p-2 pt-0'>
                                        <Button
                                            radius="lg"
                                            className="font-medium bg-gradient-to-tr max-md:text-xs from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-base"
                                            size='md'
                                            onClick={() => router.push("/auth/login")}
                                        >
                                            <span>{icons.shine}</span>
                                            <span> Download</span>
                                        </Button>
                                        <Button
                                            radius="lg"
                                            className="font-medium backdrop-blur-sm max-md:text-xs bg-white/10 shadow-gray-50 text-white px-5 py-5 text-base"
                                            size='md'
                                            onClick={() => router.push("/auth/login")}
                                        >
                                            <span>{icons.shine}</span>
                                            <span> Embed your badge</span>
                                        </Button>

                                    </div>
                                </div>)
                            }
                        </div>
                    </ScrollShadow>
                </div>
                <div className='flex w-[calc(100vw-10px)] relative pt-64 max-xl:flex-col max-xl:justify-center max-xl:items-center max-xl:pt-20'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={433} height={342} className='absolute max-xl:hidden left-0 top-0 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                    <div className='flex w-1/3 relative '>
                        <Image className='absolute -right-32 top-20 max-xl:hidden' src={PhotoRight} alt='photo right rotate' />
                    </div>
                    <div className='w-1/3 text-center mt-32 relative z-10 max-xl:mt-0 max-xl:w-full'>
                        <Image className='-top-40 absolute max-xl:hidden' src={PhotoLeft} alt='photo rotate left' />
                        <span className='font-medium text-md mx-auto mt-20 max-xl:text-3xl'>Why Use DMCA Badges?</span>
                    </div>
                    <div className='w-1/3 max-xl:w-full relative max-xl:px-3'>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='absolute max-xl:hidden left-0 top-10 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                        <div className="flex max-w-[422px] duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative max-xl:rotate-0 max-xl:right-0 max-xl:top-20 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-10 p-5 absolute left-0 -top-36 ">
                            <div>
                                <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-xl:text-base'>Download Legal Protection:</span>
                                <span className='font-normal text-lg max-sm:text-base'> Displaying DMCA Badges communicates that your content is safeguarded by copyright laws and under DMCA policies, discouraging theft or misuse.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[422px] duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute -left-8 top-6 max-xl:left-0 max-xl:top-24 mt-6 ">
                            <div>
                                <span className='font-normal text-lg bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-base'>Visual Deterrent:</span>
                                <span className='font-normal text-lg max-sm:text-base'> These badges act as a deterrent to potential violators, signaling that your content is monitored and protected by copyright laws.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full mt-36 max-w-[1400px] relative max-xl:flex-col max-xl:items-center mb-32 max-sm:mb-10 max-sm:px-3 max-sm:mt-44'>
                    <div className='flex w-1/4 max-md:w-full z-10 items-center max-lg:text-center'>
                        <span className='font-medium max-md:mx-auto text-md max-xl:text-3xl'>How to Use DMCA Badges?</span>
                    </div>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={433} height={342} className='absolute max-xl:hidden left-0 top-0 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                    <div className='relative flex w-1/2 max-xl:flex-col max-md:w-full max-md:px-3'>
                        <div className="flex max-w-[462px] max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-0 top-6 max-xl:left-0 max-xl:top-5 mt-6 ">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-lg'>Download:</span>
                                <span className='font-normal text-lg max-sm:text-base'>Choose from a range of DMCA Badges available for your platform.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[462px] max-xl:mt-5 max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-48 top-44 max-xl:left-0 max-xl:top-10">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-lg'>Placement:</span>
                                <span className='font-normal text-lg max-sm:text-base'>Insert the badge on your website, content, or platform to make it visible to users.</span>
                            </div>
                        </div>
                        <div className="flex max-w-[462px] max-xl:w-full duration-700  max-xl:mx-auto max-xl:items-center max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-8 cursor-pointer absolute left-0 top-80 max-xl:left-0 max-xl:top-16 mt-6 ">
                            <div className='flex flex-col'>
                                <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-lg'>Visibility:</span>
                                <span className='font-normal text-lg max-sm:text-base'>Ensure the badges are clearly visible, preferably near the content, to indicate protection against infringement.</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center max-xl:hidden'>
                        <Image className='w-[318px] h-[409px] max-xl:hidden' src={Robert} alt='robert hand' />
                    </div>
                </div>
            </div >
            <CustomerReview />
        </>
    )
}