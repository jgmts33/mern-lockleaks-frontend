"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, ChevronRight } from "@/src/utils/Icons";
import { useEffect, useState } from 'react';
import ScanTakedown from "@/public/assets/services/scan-takedown.svg"
import CustomerReview from '@/src/components/customerReview';

export default function SCAN() {

    const icons = {
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
    };

    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define scan header*/}

                <div>
                    <p className='font-medium text-7xl text-center mt-20 max-lg:text-[40px]'>SCAN & TAKEDOWN</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                    <Button radius="full" className="bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                        SCAN
                    </Button>
                    <Button radius="full" className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" size='lg'>
                        TAKEDOWN
                    </Button>
                </div>
                <div className='flex w-full justify-around  items-center mx-auto mt-20 max-lg:flex-col max-lg:text-center'>
                    <Image class="h-80 w-96 object-cover max-lg:-ml-20" src={ScanTakedown} />
                    <div className='max-w-[563px]'>
                        <p className='font-normal text-base'>Utilizing state-of-the-art software, we tirelessly scour the internet, identifying potential copyright infringements across diverse online platforms. Supported by meticulous manual scans conducted by our proficient agents, we scrutinize an extensive array of sources, including Google Search, Images, Videos, file hosting services, and various websites. Our comprehensive scan encompasses over 100 scrutinized websites and social media platforms like Reddit, Instagram, Twitter, and TikTok.</p>
                    </div>
                </div>

                {/* This section for define tips for scan page*/}

                <div className='flex w-full bg-white/5 mx-auto justify-around mt-10 px-10 py-20 gap-20 max-xl:flex-col max-xl:items-center'>
                    <div className='flex items-center max-w-[720px] justify-between flex-col gap-y-10'>
                        <div className='flex gap-8 p-7'>
                            <div className='w-10 h-10'>{icons.FirstTip}</div>
                            <p className='font-medium text-xl max-lg:text-[20px]'>Regularly monitor your digital footprint and perform scans to identify unauthorized content.</p>
                        </div>
                        <div className='flex gap-8 mt-5 bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-5'>
                            <div>{icons.SecondTip}</div>
                            <p className='font-medium text-xl max-lg:text-[20px]'>Enable notifications for immediate alerts regarding potential copyright  infringements.</p>
                        </div>
                        <div className='flex gap-8 mt-5 p-6'>
                            <div>{icons.ThirdTip}</div>
                            <p className='font-medium text-xl max-lg:text-[20px]'>Maintain clear documentation and records of your original content to facilitate  takedown procedures.</p>
                        </div>
                    </div>
                    <div className="relative max-w-[740px] flex flex-wrap">
                        <Image class="w-[349px] h-[319px]" src={WriteTip} />
                        <Image class="" src={TipDocument} />
                    </div>
                </div>

                {/* This section for define FAQ*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full'>
                    <p className='font-medium text-5xl text-center max-lg:text-[40px]'>FAQ</p>
                    <div className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>How often does the scanning process occur? </p>
                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Our scanning process operates continuously, providing real-time monitoring and alerts for potential infringements.</p>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>What platforms does the scan cover?</p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>The scan comprehensively covers  Google & Bing Search, Images, Videos, file hosting services, and a diverse range of websites, including major social media platforms.</p>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
