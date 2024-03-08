"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
// import WriteTip from "@/public/assets/scan/write-tip.svg";
// import TipDocument from "@/public/assets/scan/tip-document.svg";
import { success } from "@/src/utils/Icons";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Warning from "@/public/assets/scan/takedown.svg"
import Facebook from "@/public/assets/AI/facebook.svg"
import Instagram from "@/public/assets/AI/instagram.svg"
import TikTok from "@/public/assets/AI/TikTok.svg"
import Reddit from "@/public/assets/AI/Reddit.svg"
import Ban from "@/public/assets/AI/Ban.svg"
import { ProtectKey, MotherBoard, Locks, Hub, Tips, ChevronRight } from "@/src/utils/Icons";
import Robertgroup from '@/public/assets/robert.svg';
import CustomerReview from '@/src/components/customerReview';

export default function AI() {

    const icons = {
        protect: <ProtectKey fill="currentColor" size={16} />,
        motherboard: <MotherBoard fill="currentColor" size={16} />,
        locks: <Locks fill="currentColor" size={16} />,
        hub: <Hub fill="currentColor" size={16} />,
        tip: <Tips fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
    };

    const AITitle = {
        title: "ARTIFICIAL INTELLIGENCE",
        sub_title: "ur Artificial Intelligence service integrates cutting-edge facial recognition software, machine learning, optical character recognition, and a wide array of algorithms meticulously crafted by our experts. These technologies significantly bolster content protection against potential copyright infringements on leading platforms such as Google Images and Google Videos."
    }

    const LeftHelpContent = [
        {
            icon: icons.protect,
            content: "Provides robust protection against copyright violations."
        }, {
            icon: icons.motherboard,
            content: "Utilizes advanced algorithms to identify and prevent content misuse."
        }
    ]

    const RightHelContent = [
        {
            icon: icons.locks,
            content: "Enhances security by employing facial recognition and machine learning."
        }, {
            icon: icons.hub,
            content: "Ensures comprehensive coverage across major social media platforms and websites."
        }
    ]

    const AITips = [
        "regularly update and monitor your content to maximize AI's effectiveness.",
        "Familiarize yourself with the AI tools available to proactively manage your content protection."
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-20'>
                    <p className='font-medium text-7xl'>{AITitle.title}</p>
                    <div className='max-w-[820px]'><p className='font-normal text-base mt-10'>{AITitle.sub_title}</p></div>
                </div>
                <div className='flex gap-8 w-full flex-col bg-gradient-to-br max-w-[1470px] text-center mx-auto justify-center from-gray-600/40 mt-36 to-gray-800/40 rounded-[30px] py-10'>
                    <div className='max-w-[425px] mx-auto justify-content'><p className='font-normal text-xl '>Our AI tools are deployed across a myriad of social media networks:</p></div>
                    <div className='flex gap-8 justify-center items-center'>
                        <Image class="h-[95px] w-[196px] object-cover" src={Facebook} />
                        <Image class="h-[95px] w-[196px] object-cover" src={Instagram} />
                        <Image class="h-[95px] w-[196px] object-cover" src={TikTok} />
                        <Image class="h-[95px] w-[196px] object-cover" src={Reddit} />
                        <Image class="h-[95px] w-[196px] object-cover" src={Ban} />
                    </div>
                </div>
                <div className='flex justify-center mt-20'>
                    <div className='flex grid-cols-3 gap-20 z-20 max-lg:flex-wrap max-lg:justify-center'>
                        <div className='flex flex-col gap-20'>
                            {
                                LeftHelpContent.map((item, index) => {
                                    return (
                                        <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                            <div className='flex flex-col'>
                                                {item.icon}
                                                <p className='mt-5 font-normal text-xl'>{item.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <Image class="w-80 h-[550px] object-cover" src={Robertgroup} />
                        </div>
                        <div className='flex flex-col gap-20'>
                            {
                                RightHelContent.map((item, index) => {
                                    return (
                                        <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                            <div className='flex flex-col'>
                                                {item.icon}
                                                <p className='mt-5 font-normal text-xl'>{item.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='flex bg-white/10 py-10 w-full justify-center gap-32 mt-36'>
                    <p className='font-medium text-3xl'>TIPS</p>
                    {
                        AITips.map((item, index) => {
                            return (
                                <div className='max-w-[527px] flex gap-3'>{icons.tip}<p className='font-normal text-xl'>{item}</p></div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    <div className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px]'>How does the AI software detect copyright infringements?</p>
                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                {icons.arrowtop}
                            </button>
                        </div>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px]'>Is the AI tool effective across all social media networks?</p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Yes, our AI tools are designed to function efficiently on major social media platforms, ensuring comprehensive content protection.</p>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}