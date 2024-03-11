"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { Balance, Banned, Law, ChevronRight, Tips } from "@/src/utils/Icons";
import CopyrightHelp from '@/public/assets/copyright/copyright.svg';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';
import CustomerReview from '@/src/components/customerReview';

export default function CopyRight() {

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
                    <div className='max-md:-mt-10'><Image class="w-[606px] mt-5 h-[550px] " src={CopyrightHelp} alt='copyright' /></div>
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
                    <Image class="w-[461px] h-[312px] absolute right-0" src={RobertHand} alt='robert hand' />
                </div>

                {/* This section for define FAQ for copyright*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full max-md:px-3'>
                    <p className='font-medium text-5xl text-center'>FAQ</p>
                    <div className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px] max-lg:text-[25px] max-lg:text-center'>How does copyright registration benefit content creators?</p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Copyright registration grants creators exclusive rights and legal protection for their content, allowing them to take legal action against unauthorized use or theft.</p>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px] max-lg:text-[25px] max-lg:text-center'>What does copyright cover?</p>
                            <button className="bg-gradient-to-tr -rotate-[90deg] from-[#9C3FE4] to-[#C65647] text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 right-2">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Copyright protects original works of authorship, including writings, music, artwork, videos, and other creative content.</p>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
