"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Shine, ProtectShadow, RecoveryChat } from "@/src/utils/Icons";
import LeftChat from '@/public/assets/recovery/left-chat.svg';
import RightChat from '@/public/assets/recovery/right-chat.svg';
import Photo from '@/public/assets/recovery/photo.svg';
import RobertHand from '@/public/assets/recovery/robert-hand.svg';
import CustomerReview from '@/src/components/customerReview';

export default function MonthlyPdf() {

    const icons = {
        shine: <Shine fill="currentColor" size={16} />,
        protect: <ProtectShadow fill="currentColor" size={16} />,
        chat: <RecoveryChat fill="currentColor" size={16} />,
    };

    const MonthlyTitle = {
        title: "Monthly Analytics & PDF Reports",
        content: "Monthly Analytics & PDF Reports provide clients with detailed insights and trends related to their content. These reports, delivered in PDF format, offer comprehensive data analysis, including performance metrics, trends, and other pertinent information. Clients gain a holistic view of their content's evolution, facilitating informed decision-making and future content strategies."
    }

    const BenefitContent = [
        {
            content: "Detailed insights and analysis through monthly reports for informed decision-making."
        }, {
            content: "Facilitation of strategic content planning based on performance metrics and trends."
        }, {
            content: "Comprehensive data presentation in PDF format, enabling easy comprehension and sharing."
        }, {
            content: "Customizability to align reports with specific content goals and requirements."
        }
    ]

    const FAQContent = [
        {
            title: "How often are the reports generated?",
            content: "Reports are generated on a monthly basis."
        }, {
            title: "What kind of data is included in these reports?",
            content: "The reports cover performance metrics, trends, interactions, and audience insights."
        }, {
            title: "Can these reports be customized based on specific requirements?",
            content: "Yes, reports can be tailored to address specific content needs and goals."
        }
    ]

    const TipContent = [
        {
            title: "Regular Review:",
            content: "Analyze reports regularly to identify content trends and audience preferences."
        }, {
            title: "Benchmarking:",
            content: "Compare monthly reports to track changes in content performance over time."
        }, {
            title: "Actionable Insights::",
            content: "Leverage insights to refine content strategies and improve performance."
        }
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full max-w-[1400px]">

                {/* This section for define monthly pdf header*/}

                <div className='mt-28 max-md:px-3 max-md:text-center'>
                    <p className='font-medium text-5xl uppercase text-center'>{MonthlyTitle.title}</p>
                    <div className='flex items-center justify-between mx-auto max-xl:justify-center max-md:flex-col'>
                        <div className='max-w-[653px] mt-10'><p className='font-normal text-lg mt-10'>{MonthlyTitle.content}</p></div>
                        <p className='font-semibold text-lg mt-20'>Your Logo</p>
                    </div>
                </div>

                {/* This section for define help content*/}

                <div className='flex w-full justify-center mt-32 relative max-xl:w-full max-xl:flex-col max-xl:items-center max-xl:mx-auto max-md:px-3'>
                    <span className='font-medium text-md'>How It Helps</span>
                    <div className="flex max-w-[422px] duration-700 max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute -left-8 top-6 max-xl:left-0 max-xl:top-0 mt-6 ">
                        <div>{icons.protect}</div>
                        <div>
                            <p className='font-normal text-lg mt-2'>Strategy Planning: Facilitates informed decision-making for future content strategies.</p>
                        </div>
                    </div>
                    <div className="flex max-w-[422px] duration-700 max-xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute right-6 top-20 max-xl:right-0 max-xl:top-8 ">
                        <div>{icons.protect}</div>
                        <div>
                            <p className='font-normal text-lg mt-2'>Comprehensive Analysis:Presents a detailed overview of content evolution and performance metrics.</p>
                        </div>
                    </div>
                    <div className="flex max-w-[422px] duration-700 max-xl:!relative max-xl:rotate-0 max-xl:right-0 max-xl:top-20 bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-40 p-5 cursor-pointer absolute -right-12 -top-8 ">
                        <div>{icons.protect}</div>
                        <div>
                            <p className='font-normal text-lg mt-2'>Data Insights: Offers in-depth insights into content performance, interactions,and trends.</p>
                        </div>
                    </div>
                </div>

                {/* This section for define benefit content*/}

                <div className='max-lg:px-5 mt-60 max-md:items-center max-md:justify-center max-md:mx-auto'>
                <div className='mt-20 grid grid-cols-2 gap-10 mb-20 max-xl:px-3 max-lg:grid-cols-2 max-md:grid-cols-1 p-20 bg-[#0E142B] rounded-[40px]'>
                    {
                        BenefitContent.map((benefits, index) => {
                            return (
                                <div key={index} className="flex py-10 max-w-[490px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[40px] p-5 cursor-pointer top-6 mt-6">
                                    <div className='flex flex-col'>
                                        {icons.shine}
                                        <p className='mt-5 font-normal text-base'>{benefits.content}...</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    <div className='flex max-lg:hidden relative'>
                        <Image src={Photo} className='absolute right-80 -top-[500px]' />
                        <Image src={RightChat} className='absolute right-64 -top-72' />
                        <Image src={RobertHand} className='right-0 -top-[450px] absolute' />
                    </div>
                </div>

                {/* This section for define tips for monthly pdf*/}

                <span className='font-medium text-5xl text-center mt-10 max-md:mt-32 max-lg:text-3xl'>Tips for Use</span>
                <div className='flex justify-around mt-10 max-lg:flex-col max-lg:mx-auto'>
                    {
                        TipContent.map((tips, index) => {
                            return (
                                <div key={index} className="flex max-w-[407px] bg-white/10 bg-opacity-20 shadow-sm shadow-gray-50 rounded-[30px] p-5 cursor-pointer top-6 mt-6">
                                    <div className='flex flex-col'>
                                        <span>{icons.shine}</span>
                                        <span className='font-medium text-3xl mt-3 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{tips.title}</span>
                                        <span className='font-normal text-base mt-3'>{tips.content}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ content*/}

                <div className='font-medium text-5xl mt-56'><p className='font-medium text-5x text-center'>FAQ</p></div>
                <div className='flex'>
                    <div className='flex mt-10 gap-5 max-lg:flex-col max-lg:mx-auto max-lg:px-3'>
                        {
                            FAQContent.map((cards, index) => {
                                return (
                                    <div key={index} className="flex max-w-[466px] w-full bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer">
                                        <div className='flex flex-col'>
                                            <span>{icons.chat}</span>
                                            <p className='font-semibold text-lg mt-2'>{cards.title}</p>
                                            <Button className="bg-gradient-to-tr mt-2 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                answer:
                                            </Button>
                                            <p className='mt-5 font-normal text-base'>{cards.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
