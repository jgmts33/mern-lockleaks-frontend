"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import Facebook from "@/public/assets/AI/facebook.svg"
import Instagram from "@/public/assets/AI/instagram.svg"
import TikTok from "@/public/assets/AI/TikTok.svg"
import Reddit from "@/public/assets/AI/Reddit.svg"
import Twitter from "@/public/assets/AI/twitter.svg"
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

    const [expandedFAQIndex, setExpandedFAQIndex] = useState(-1);

    const ProtectHelpContent = [
        {
            icon: icons.protect,
            content: "Provides robust protection against copyright violations."
        }, {
            icon: icons.motherboard,
            content: "Utilizes advanced algorithms to identify and prevent content misuse."
        }
    ]

    const HubHelpContent = [
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

    const AIFAQContent = [
        {
            title: "How does the AI software detect copyright infringements?",
            content: ["Yes, our AI tools are designed to function efficiently on major social media platforms, ensuring comprehensive content protection."]
        }, {
            title: "Is the AI tool effective across all social media networks?",
            content: [
                "Yes, our AI tools are designed to function efficiently on major social media platforms, ensuring comprehensive content protection."
            ]
        }
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">

                {/* This section for define AI page header*/}

                <div className='text-center mt-20'>
                    <p className='font-medium text-7xl max-lg:text-[40px]'>{AITitle.title}</p>
                    <div className='max-w-[830px]'><p className='font-normal text-base mt-10'>{AITitle.sub_title}</p></div>
                </div>

                {/* This section for deplay social media network*/}

                <div className='max-md:px-3'>
                    <div className='flex gap-8 w-full flex-col bg-gradient-to-br max-w-[1470px] text-center mx-auto justify-center from-gray-600/40 mt-36 to-gray-800/40 rounded-[30px] py-10 max-xl:px-5'>
                        <div className='max-w-[425px] mx-auto justify-content'><p className='font-normal text-xl '>Our AI tools are deployed across a myriad of social media networks:</p></div>
                        <div className='flex gap-10 justify-center items-center max-lg:flex-col px-10'>
                            <Image src={Facebook} width={150} height={150} alt='facebook' />
                            <Image src={Instagram} width={150} height={150} alt='instagram' />
                            <Image src={TikTok} width={150} height={150} alt='tiktok' />
                            <Image src={Reddit} width={150} height={150} alt='reddit' />
                            <Image src={Twitter} width={50} height={50} alt='twitter' />
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
                        <div className='relative'>
                            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='absolute left-0 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                            <Image className="w-80 h-[560px] object-cover mt-10 z-20  relative" src={Robertgroup} />
                        </div>
                        <div className='flex flex-col gap-20'>
                            {
                                HubHelpContent.map((item, index) => {
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
                                <div key={index} className='max-w-[527px] flex gap-3'>{icons.tip}<p className='font-normal max-xl:text-[18px] text-xl'>{item}</p></div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ for AI page*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full max-xl:flex-col max-md:px-3'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    {
                        AIFAQContent.map((contents, index) => {
                            return (
                                <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                                    <div className='flex justify-between'>
                                        <p className='font-medium text-3xl max-md:text-base'>{contents.title}</p>
                                        <button className={expandedFAQIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white mt-50 w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-0" : "rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2"} onClick={() => { expandedFAQIndex != index ? setExpandedFAQIndex(index) : setExpandedFAQIndex(-1) }}>
                                            {icons.arrowtop}
                                        </button>
                                    </div>
                                    <div className={expandedFAQIndex == index ? 'h-auto' : 'h-0'}>
                                        {
                                            contents.content.map((items, contentIndex) => {
                                                return (
                                                    <p key={contentIndex} className={`font-normal text-base mt-3 duration-500 ' + ${expandedFAQIndex == index ? 'block' : 'hidden'} `}>{items}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div><Image className="w-[461px] h-[312px] absolute right-0 -mt-36" src={RobertHand} alt='robert hand' /></div>
            </div>
            <CustomerReview />
        </>
    )
}
