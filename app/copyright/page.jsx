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
import { Balance, Banned, Law, ChevronRight, Tips } from "@/src/utils/Icons";
import CopyrightHelp from '@/public/assets/copyright/copyright.svg';
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
        title: "Copyright",
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
                <div className='text-center mt-20'>
                    <p className='font-bold text-7xl'>{CopyrightTitle.title}</p>
                    <div className='max-w-[1100px]'><p className='font-normal text-base mt-10'>{CopyrightTitle.sub_title}</p></div>
                </div>
                <div className='flex gap-32 mt-44'>
                    <p className='font-medium text-5xl text-center'>HOW It HELPS</p>
                    <div><Image class="w-80 h-[550px] object-cover" src={CopyrightHelp} /></div>
                    <div className='flex flex-col'>
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
                            <p className='font-medium text-[34px]'>How does copyright registration benefit content creators?</p>
                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                {icons.arrowtop}
                            </button>
                        </div>
                        <p className='font-normal text-base mt-3'>Copyright registration grants creators exclusive rights and legal protection for their content, allowing them to take legal action against unauthorized use or theft.</p>
                    </div>
                    <div className='flex mt-10 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg  p-12 border border-gray-600'>
                        <div className='flex justify-between'>
                            <p className='font-medium text-[34px]'>What does copyright cover?</p>
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
