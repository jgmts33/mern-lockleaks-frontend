"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, ChevronRight } from "@/src/utils/Icons";
import Warning from "@/public/assets/scan/takedown.svg"
import CustomerReview from '@/src/components/customerReview';

export default function TakeDown() {

    const icons = {
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,

    };
    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define takedown page header*/}

                <div>
                    <p className='font-medium text-7xl text-center mt-20 max-lg:text-[40px]'>SCAN & TAKEDOWN</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                    <Button radius="full" className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" size='lg'>
                        SCAN
                    </Button>
                    <Button radius="full" className="bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                        TAKEDOWN
                    </Button>
                </div>

                {/* This section for define takedown page content*/}

                <div className='flex w-full justify-around items-center mx-auto mt-20 max-xl:flex-col'>
                    <Image class="h-80 w-96 object-cover opacity-80" src={Warning} />
                    <div className='max-w-[743px] max-xl:text-center'>
                        <p className='font-normal text-lg'>Upon detecting any infringing content, our seasoned experts promptly issue DMCA takedown notices to the relevant internet authorities. We are committed to swiftly removing illicit copies of your content identified through both software and manual scans. Our strong affiliations with file hosting sites ensure expedited consideration of our DMCA takedown notices, aligning closely with our clients'business policies. </p>
                        <p className='font-normal text-red-300 text-lg'>(Note: Our actions may be limited by DMCA compliance  regulations.)</p>
                    </div>
                </div>

                {/* This section for define tips for takedown page*/}

                <div className='flex w-full bg-white/5 mx-auto justify-around px-10 py-20 gap-20 mt-20 max-lg:flex-col'>
                    <div className='flex items-center max-w-[870px] justify-between flex-col gap-y-10'>
                        <div className='flex gap-8 p-7'>
                            <div className='w-10 h-10'>{icons.FirstTip}</div>
                            <p className='font-medium text-xl max-lg:text-[20px]'>Act quickly upon discovering any unauthorized usage of your content to </p>
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
                <div>
                </div>

                {/* This section for define takedown page FAQ*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    <div className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                        <div className='flex relative'>
                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>What is the average turnaround time for content takedowns? </p>
                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                {icons.arrowtop}
                            </button>
                        </div>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify relative'>
                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>WhAre there limitations to takedown actions? </p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Our actions are governed by DMCA compliance regulations, which may impose limitations on certain takedown requests.</p>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
