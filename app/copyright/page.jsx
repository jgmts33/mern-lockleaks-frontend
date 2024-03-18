"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Balance, Banned, Law, ChevronRight, Tips } from "@/src/utils/Icons";
import CopyrightHelp from '@/public/assets/copyright/copyright.svg';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';
import CustomerReview from '@/src/components/customerReview';

export default function CopyRight() {

    const [expandedFAQIndex, setExpandedFAQIndex] = useState(-1);

    const icons = {
        balance: <Balance fill="currentColor" size={16} />,
        ban: <Banned fill="currentColor" size={16} />,
        law: <Law fill="currentColor" size={16} />,
        tip: <Tips fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
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

                {/* This section for define copyright title*/}

                <div className='text-center mt-20'>
                    <p className='font-bold text-7xl max-lg:text-[40px]'>{CopyrightTitle.title}</p>
                    <div className='max-w-[1100px]'><p className='font-normal text-base mt-10'>{CopyrightTitle.sub_title}</p></div>
                </div>

                {/* This section for define help content*/}

                <div className='text-center mt-32 max-md:mt-20'>
                    <p className='font-medium text-5xl max-lg:text-[40px]'>HOW It HELPS</p>
                </div>
                <div className='flex gap-20 mt-20 max-lg:flex-col max-md:-mt-20 max-md:gap-0'>
                    <div className='max-md:-mt-10 relative'>
                        <Image className="w-[606px] mt-5 h-[550px] z-20 relative" src={CopyrightHelp} alt='copyright' />
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute bg-[#6748a1] z-0 top-0 right-0 bg-opacity-5 blur-3xl' />
                    </div>
                    <div className='flex flex-col max-xl:items-center max-xl:px-3 max-md:-mt-20'>
                        {
                            CopyrightContent.map((item, index) => {
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

                {/* This section for define tips for copyright*/}

                <div className='flex bg-white/10 py-20 w-full justify-center gap-32 mt-24 max-lg:flex-col max-lg:items-center'>
                    <p className='font-medium text-3xl'>TIPS</p>
                    {
                        AITips.map((item, index) => {
                            return (
                                <div key={index} className='max-w-[527px] flex gap-3'>{icons.tip}<p className='font-normal text-xl'>{item}</p></div>
                            )
                        })
                    }
                    <Image className="w-[461px] h-[312px] absolute right-0" src={RobertHand} alt='robert hand' />
                </div>

                {/* This section for define FAQ for copyright*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full max-md:px-3'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    {
                        CopyrightFAQContent.map((FAQ_content, index) => {
                            return (
                                <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                                    <div className='flex justify-between'>
                                        <p className='font-medium text-[34px] max-md:text-[18px]'>{FAQ_content.title}</p>
                                        <button className={expandedFAQIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white mt-50 w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-0" : "rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2"} onClick={() => { expandedFAQIndex != index ? setExpandedFAQIndex(index) : setExpandedFAQIndex(-1) }}>
                                            {icons.arrowtop}
                                        </button>
                                    </div>
                                    <div className={expandedFAQIndex == index ? 'h-auto' : 'h-0'}>
                                        {
                                            FAQ_content.content.map((items, contentIndex) => {
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
