"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import Facebook from "@/public/assets/AI/facebook.svg"
import Instagram from "@/public/assets/AI/instagram.svg"
import TikTok from "@/public/assets/AI/TikTok.svg"
import Reddit from "@/public/assets/AI/Reddit.svg"
import Ban from "@/public/assets/AI/Ban.svg"
import { ProtectKey, MotherBoard, Locks, Hub, Tips, ChevronRight } from "@/src/utils/Icons";
import Robertgroup from '@/public/assets/robert.svg';
import CustomerReview from '@/src/components/customerReview';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';


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

    const ProtectHelpContent = [
        {
            icon: icons.protect,
            content: "Provides robust protection against copyright violations."
        }, {
            icon: icons.motherboard,
            content: "Utilizes advanced algorithms to identify and prevent content misuse."
        }
    ]

    const HubHelContent = [
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

                {/* This section for define AI page header*/}

                <div className='text-center mt-20'>
                    <p className='font-medium text-7xl max-lg:text-[40px]'>{AITitle.title}</p>
                    <div className='max-w-[820px]'><p className='font-normal text-base mt-10'>{AITitle.sub_title}</p></div>
                </div>

                {/* This section for deplay social media network*/}

                <div className='max-md:px-3'>
                    <div className='flex gap-8 w-full flex-col bg-gradient-to-br max-w-[1470px] text-center mx-auto justify-center from-gray-600/40 mt-36 to-gray-800/40 rounded-[30px] py-10 max-xl:px-5'>
                        <div className='max-w-[425px] mx-auto justify-content'><p className='font-normal text-xl '>Our AI tools are deployed across a myriad of social media networks:</p></div>
                        <div className='flex gap-8 justify-center items-center max-lg:flex-col px-5'>
                            <Image alt='facebook' class="h-[95px] w-[196px]" src={Facebook} />
                            <Image alt='instagram' class="h-[95px] w-[196px]" src={Instagram} />
                            <Image alt='tiktok' class="h-[95px] w-[196px]" src={TikTok} />
                            <Image alt='reddit' class="h-[95px] w-[196px]" src={Reddit} />
                            <Image alt='ban' class="h-[95px] w-[196px]" src={Ban} />
                        </div>
                    </div>
                </div>

                {/* This section for define help content*/}

                <div className='flex justify-center mt-20 max-md:px-3 '>
                    <div className='flex grid-cols-3 gap-20 z-20 max-xl:flex-wrap max-xl:justify-center max-xl:flex-col'>
                        <div className='flex flex-col gap-20'>
                            {
                                ProtectHelpContent.map((item, index) => {
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
                                HubHelContent.map((item, index) => {
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

                {/* This section for define tips for AI*/}

                <div className='flex bg-white/10 py-20 w-full justify-center gap-32 max-md:rounded-[10px] mt-36 mx-auto items-center max-xl:flex-col max-xl:px-3'>
                    <p className='font-medium text-3xl'>TIPS</p>
                    {
                        AITips.map((item, index) => {
                            return (
                                <div className='max-w-[527px] flex gap-3'>{icons.tip}<p className='font-normal max-xl:text-[18px] text-xl'>{item}</p></div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ for AI page*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full max-xl:flex-col max-md:px-3'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    <div className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px] max-md:text-[18px]'>How does the AI software detect copyright infringements?</p>
                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                {icons.arrowtop}
                            </button>
                        </div>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px] max-md:text-[18px]'>Is the AI tool effective across all social media networks?</p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Yes, our AI tools are designed to function efficiently on major social media platforms, ensuring comprehensive content protection.</p>
                    </div>
                </div>
                <div><Image class="w-[461px] h-[312px] absolute right-0 -mt-36" src={RobertHand} /></div>
            </div>
            <CustomerReview />
        </>
    )
}
