"use client";
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import Facebook from "@/public/assets/AI/facebook.svg"
import Instagram from "@/public/assets/AI/instagram.svg"
import TikTok from "@/public/assets/AI/TikTok.svg"
import Reddit from "@/public/assets/AI/Reddit.svg"
import Twitter from "@/public/assets/AI/twitter.svg"
import { ProtectKey, MotherBoard, Locks, Hub, Tips, ChevronRight } from "@/components/utils/Icons";
import Robertgroup from '@/public/assets/robert.svg';
import CustomerReview from '@/components/customer-review';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';


export default function AI() {

    const icons = {
        protect: <ProtectKey/>,
        motherboard: <MotherBoard/>,
        locks: <Locks/>,
        hub: <Hub/>,
        tip: <Tips/>,
        arrowtop: <ChevronRight/>,
    };

    const AITitle = {
        title: "ARTIFICIAL INTELLIGENCE",
        sub_title: "Our Artificial Intelligence service integrates cutting-edge facial recognition software, machine learning, optical character recognition, and a wide array of algorithms meticulously crafted by our experts. These technologies significantly bolster content protection against potential copyright infringements on leading platforms such as Google Images and Google Videos."
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

                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-medium text-7xl max-lg:text-[40px]'>{AITitle.title}</p>
                    <div className='max-w-[830px]'><p className='font-normal text-base mt-10'>{AITitle.sub_title}</p></div>
                </div>

                {/* This section for deplay social media network*/}

                <div className='max-md:px-3'>
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl' />
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 left-0 bg-[#362666] bg-opacity-5 blur-3xl' />   
                    <div className='flex gap-8 w-full flex-col bg-gradient-to-br max-w-[1470px] text-center mx-auto justify-center z-10 from-gray-600/40 mt-20 to-gray-800/40 rounded-[30px] py-10 max-xl:px-5'>
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

                <div className='flex justify-center mt-20 max-xl:px-3'>
                    <div className='flex grid-cols-3 gap-20 z-10 max-xl:flex-wrap max-xl:justify-center max-xl:flex-col'>
                        <div className='flex flex-col gap-10'>
                            {
                                ProtectHelpContent.map((item, index) => {
                                    return (
                                        <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                            <div className='flex flex-col'>
                                                {item.icon}
                                                <p className='mt-5 font-normal text-xl max-sm:text-base'>{item.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='relative max-xl:hidden'>
                            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='absolute left-0 bg-[#a189f8] bg-opacity-5 blur-3xl' />
                            <Image className="w-80 h-[560px] mt-10 z-10  relative" src={Robertgroup} alt='rober-group' />
                        </div>
                        <div className='flex flex-col gap-10 max-xl:-mt-10'>
                            {
                                HubHelpContent.map((item, index) => {
                                    return (
                                        <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                            <div className='flex flex-col'>
                                                {item.icon}
                                                <p className='mt-5 font-normal text-xl max-sm:text-base'>{item.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* This section for define tips for AI*/}

                <div className='flex bg-white/10 py-16 w-[calc(100vw-20px)] justify-center gap-32 max-xl:gap-10 max-md:py-5 px-5 mt-24 max-lg:flex-col max-lg:items-center max-sm:px-3'>
                    <p className='font-medium text-3xl'>TIPS:</p>
                    {
                        AITips.map((item, index) => {
                            return (
                                <div key={index} className='max-w-[527px] flex gap-3 z-10 w-full max-lg:max-w-[1000px]'>
                                    <span>{icons.tip}</span>
                                    <span className='font-normal text-xl max-sm:text-base'>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ for AI page*/}

                <div className='flex flex-col mt-16 max-xl:mt-10 max-w-[1500px] mx-auto w-full max-xl:flex-col max-2xl:px-3 z-10'>
                    <p className='font-medium text-5xl text-center max-sm:text-4xl'>FAQ</p>
                    {
                        AIFAQContent.map((contents, index) => {
                            return (
                                <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-8 max-sm:p-5 border border-gray-600'>
                                    <div className='flex justify-between gap-3'>
                                        <p className='font-medium text-xl max-lg:text-lg'>{contents.title}</p>
                                        <button className={("mt-50 w-10 h-10 text-white aspect-square max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-lg bottom-[calc(50%-80px)] ") + (expandedFAQIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border right-0" : "rotate-[90deg] bg-gradient-to-tr from-gray-600/40 to-gray-800/40 right-2")} onClick={() => { expandedFAQIndex != index ? setExpandedFAQIndex(index) : setExpandedFAQIndex(-1) }}>
                                            <div>{icons.arrowtop}</div>
                                        </button>
                                    </div>
                                    <div className={expandedFAQIndex == index ? 'h-auto max-xl:max-w-[800px] max-lg:max-w-[600px] max-md:max-w-[450px]' : 'h-0'}>
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
            </div>
            <CustomerReview />
        </>
    )
}
