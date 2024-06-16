"use client";
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { Balance, Banned, Law, ChevronRight, Tips } from "@/components/utils/Icons";
import CopyrightHelp from '@/public/assets/copyright/copyright.svg';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';
import CustomerReview from '@/components/customer-review';

export default function CopyRight() {

    const [expandedFAQIndex, setExpandedFAQIndex] = useState(-1);

    const icons = {
        balance: <Balance/>,
        ban: <Banned/>,
        law: <Law/>,
        tip: <Tips/>,
        arrowtop: <ChevronRight/>,
    };

    const CopyrightTitle = {
        title: "COPYRIGHT",
        sub_title: "Copyright registration is a vital step in safeguarding your dedication and creativity as a content creator and cam model across various platforms. It grants exclusive rights to your content and acts as a protective shield against unauthorized use or theft."
    }

    const CopyrightContent = [
        {
            icon: icons.balance,
            content: "Provides exclusive rights and legal protection for your content."
        }, {
            icon: icons.ban,
            content: "Acts as a deterrent against unauthorized use or theft of your creative work."
        },
        {
            icon: icons.law,
            content: "Enables legal action against those infringing upon your copyright."
        }
    ]

    const AITips = [
        "Regularly register your creative content to reinforce its legal protection.",
        "Keep records and documentation of your original creations."
    ]

    const CopyrightFAQContent = [
        {
            title: "How does copyright registration benefit content creators?",
            content: [
                "Copyright registration grants creators exclusive rights and legal protection for their content, allowing them to take legal action against unauthorized use or theft."
            ]
        }, {
            title: "What does copyright cover?",
            content: [
                "Copyright protects original works of authorship, including writings, music, artwork, videos, and other creative content."
            ]
        }

    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-10 max-sm:mt-5 px-3'>
                    <p className='font-bold text-7xl max-lg:text-[40px]'>{CopyrightTitle.title}</p>
                    <div className='max-w-[1100px]'><p className='font-normal text-base mt-10'>{CopyrightTitle.sub_title}</p></div>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute bg-[#6748a1] max-xl:hidden z-0 top-0 left-0 bg-opacity-5 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute bg-[#6748a1] max-xl:hidden z-0 top-0 right-0 bg-opacity-5 blur-3xl' />
                </div>

                {/* This section for define help content*/}

                <div className='text-center mt-32 max-md:mt-20'>
                    <p className='font-medium text-5xl max-lg:text-4xl'>HOW It HELPS</p>
                </div>
                <div className='flex gap-20 mt-20 max-lg:flex-col max-md:-mt-20 max-md:gap-0'>
                    <div className='max-md:-mt-10 relative'>
                        <Image className="w-[606px] mt-5 h-[550px] z-10 relative" src={CopyrightHelp} alt='copyright' />
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute max-xl:hidden bg-[#6748a1] z-0 top-0 right-0 bg-opacity-5 blur-3xl' />
                    </div>
                    <div className='flex flex-col max-xl:items-center max-xl:px-3 max-md:-mt-20'>
                        {
                            CopyrightContent.map((item, index) => {
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

                {/* This section for define tips for copyright*/}

                <div className='flex bg-white/10 py-16 w-[calc(100vw-20px)] justify-center gap-32 max-xl:gap-10 max-md:py-5 mt-24 max-lg:flex-col px-5'>
                    <div className='flex px-5'><p className='font-medium text-3xl'>TIPS:</p></div>
                    {
                        AITips.map((item, index) => {
                            return (
                                <div key={index} className='max-w-[600px] flex gap-3 z-10 max-lg:max-w-[900px] max-lg:px-3'>
                                    <span>{icons.tip}</span>
                                    <span className='font-normal text-xl max-sm:text-base'>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ for copyright*/}

                <div className='flex flex-col mt-16 max-xl:mt-10 max-w-[1500px] mx-auto w-full max-lg:px-3'>
                    <p className='font-medium text-5xl max-md:text-4xl text-center'>FAQ</p>
                    {
                        CopyrightFAQContent.map((FAQ_content, index) => {
                            return (
                                <div key={index} className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-7 max-sm:p-5 border border-gray-600'>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-medium text-xl max-md:text-base'>{FAQ_content.title}</p>
                                        <button className={("text-white mt-50 w-10 h-10 max-sm:w-8 max-sm:h-8 aspect-square flex items-center justify-center rounded-lg z-10 bottom-[calc(50%-80px)] ") + (expandedFAQIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border right-0" : "rotate-[90deg] bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 right-2")} onClick={() => { expandedFAQIndex != index ? setExpandedFAQIndex(index) : setExpandedFAQIndex(-1) }}>
                                            {icons.arrowtop}
                                        </button>
                                    </div>
                                    <div className={expandedFAQIndex == index ? 'h-auto' : 'h-0'}>
                                        {
                                            FAQ_content.content.map((items, contentIndex) => {
                                                return (
                                                    <p key={contentIndex} className={`font-normal text-base mt-3 duration-500' + ${expandedFAQIndex == index ? 'block' : 'hidden'} `}>{items}</p>
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
