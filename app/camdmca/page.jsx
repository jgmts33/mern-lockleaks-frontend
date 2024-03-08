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
import WriteTip from "@/public/assets/scan/camdcma.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { Balance, Banned, Law, ChevronRight, Tips, FirstTip, SecondTip, ThirdTip } from "@/src/utils/Icons";
import CustomerReview from '@/src/components/customerReview';

export default function CamDmca() {

    const icons = {
        balance: <Balance fill="currentColor" size={16} />,
        ban: <Banned fill="currentColor" size={16} />,
        law: <Law fill="currentColor" size={16} />,
        tip: <Tips fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const CamDmcaTitle = {
        title: "Cam DMCA Content Protection",
        sub_title: "Our platform offers an advanced DMCA Content Protection service specifically designed for content creators and models on cam platforms. Utilizing state-of-the-art technology and a proactive approach, we ensure the utmost safety and security of your digital assets. From real-time monitoring to swift action, our services aim to fortify your online presence and protect your valuable content."
    }

    const CamDmcaContent = [
        {
            icon: icons.balance,
            title: "Multi-Platform Security",
            content: "Our comprehensive protection extends across various platforms, safeguarding your content from unauthorized use or distribution."
        }, {
            icon: icons.ban,
            title: "Rapid and Effective Response:",
            content: "Upon identifying copyright infringements, our dedicated team initiates immediate takedown procedures to swiftly remove unauthorized content, preserving your intellectual property rights."
        },
        {
            icon: icons.law,
            title: "Tailored Solutions",
            content: "We provide personalized and adaptive solutions, addressing the unique needs of content creators and cam models to ensure maximum security and peace of mind."
        }
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-20'>
                    <p className='font-bold text-7xl'>{CamDmcaTitle.title}</p>
                    <div className='max-w-[1100px]'><p className='font-normal text-base mt-10'>{CamDmcaTitle.sub_title}</p></div>
                </div>
                <div className='font-medium text-5xl mt-56'><p className='font-medium text-5x center'>HOW It HELPS</p></div>
                <div className='flex gap-32 mt-10'>
                    <div className='flex mt-10 gap-10 mx-auto justify-center'>
                        {
                            CamDmcaContent.map((item, index) => {
                                return (
                                    <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {item.icon}
                                            <p className='font-medium text-2xl mt-5'>{item.title}</p>
                                            <p className='mt-5 font-normal text-xl'>{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex w-full bg-white/5 mx-auto mt-20 justify-center px-10 py-20 gap-32'>
                    <div className="relative max-w-[509px]">
                        {/* <p className='font-medium text-5xl'>Tips for Content Protection:</p> */}
                        <Image class="h-80 w-96 object-cover absolute top-10" src={WriteTip} />
                        <Image class="h-80 w-96 object-cover " src={TipDocument} />
                    </div>
                    <div className='flex max-w-[570px] justify-center flex-col gap-y-10'>
                        <div className='flex gap-8 p-7'>
                            <div>{icons.FirstTip}</div>
                            <div className='flex flex-col'>
                            <p className='font-medium text-xl'>Regular Monitoring:</p>
                            <p className='mt-5'>Perform routine checks to ensure the integrity and exclusivity of your uploaded content.</p>
                            </div>
                        </div>
                        <div className='flex gap-8 rounded-lg'>
                            <div className='ml-5'>{icons.SecondTip}</div>
                            <div className='flex-col'>
                            <p className='font-medium text-xl'>Enhanced Security Measures: </p>
                            <p>Implement two-factor authentication and regularly update your security settings to prevent unauthorized access to your accounts.</p>
                            </div>
                        </div>
                        <div className='flex gap-8 mt-5 p-6'>
                            <div>{icons.ThirdTip}</div>
                            <div className='flex-col'>
                            <p className='font-medium text-xl'>Cautious Information Sharing:</p>
                            <p>Be mindful of sharing personal information online to reduce potential vulnerabilities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
