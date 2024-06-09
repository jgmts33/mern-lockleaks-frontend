"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { Shine, ProtectShadow, RecoveryChat } from "@/components/utils/Icons";
import RightChat from '@/public/assets/recovery/right-chat.svg';
import Photo from '@/public/assets/recovery/photo.svg';
import RobertHand from '@/public/assets/recovery/robert-hand.svg';
import CustomerReview from '@/components/customer-review';

export default function MonthlyPdf() {

    const icons = {
        shine: <Shine />,
        protect: <ProtectShadow />,
        chat: <RecoveryChat />,
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
            <div className="flex flex-col text-white px-3">

                {/* This section for define monthly pdf header*/}

                <div className='mt-20 max-sm:mt-5 max-md:px-3 max-md:text-center z-10'>
                    <p className='font-medium text-5xl uppercase text-center max-md:text-4xl'>{MonthlyTitle.title}</p>
                    <div className='flex items-center justify-between mx-auto max-2xl:justify-around max-md:flex-col'>
                        <div className='max-w-[653px] mt-10 max-sm:mt-4'><p className='font-normal text-lg mt-10'>{MonthlyTitle.content}</p></div>
                        <div className='font-medium text-7xl mt-0 max-md:w-52 max-md:h-24 z-10'>
                            <Image src="/assets/logo.svg" width={300} height={150} alt="logo" />
                        </div>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-0 right-20 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />
                    </div>
                </div>

                {/* This section for define help content*/}
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-10 left-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />
                <div className='flex w-full justify-center mt-72 max-sm:mt-16 z-10 relative max-2xl:w-full max-2xl:flex-col max-2xl:items-center max-2xl:mx-auto max-md:px-3 max-2xl:justify-center max-xl:mt-20'>
                    <div className='relative'>
                        <span className='font-medium text-md'>How It Helps</span>
                    </div>
                    <div className='max-xl:hidden'><Image src={Photo} width={300} height={200} className='absolute left-80 -top-44' alt='right rotate chat' /></div>
                    <div className="flex max-w-[422px] z-10 duration-700 max-2xl:!relative backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute left-0 top-6 max-2xl:left-0 max-2xl:top-10 mt-6">
                        <div>{icons.protect}</div>
                        <p className='font-normal text-lg mt-2 max-sm:text-base'>Strategy Planning: Facilitates informed decision-making for future content strategies.</p>
                    </div>
                    <div className='max-xl:hidden'><Image src={RightChat} width={200} height={100} className='absolute left-60 -top-8' alt='right rotate chat' /></div>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={433} height={242} className='absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />

                    <div className="flex max-w-[422px] z-10 duration-700 max-2xl:!relative bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer absolute right-20 top-20 max-xl:right-0 max-xl:top-20 max-2xl:right-0">
                        <div>{icons.protect}</div>
                        <div>
                            <p className='font-normal text-lg mt-2 max-sm:text-base'>Comprehensive Analysis:Presents a detailed overview of content evolution and performance metrics.</p>
                        </div>
                    </div>
                    <div className="flex max-w-[422px] duration-700 max-2xl:!relative max-2xl:rotate-0 max-2xl:right-0 max-2xl:top-32 backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] rotate-[12deg] z-10 p-5 cursor-pointer absolute right-8 -top-16 ">
                        <div>{icons.protect}</div>
                        <div>
                            <p className='font-normal text-lg mt-2 max-sm:text-base'>Data Insights: Offers in-depth insights into content performance, interactions,and trends.</p>
                        </div>
                    </div>
                </div>

                {/* This section for define benefit content*/}

                <div className='flex max-lg:px-5 mt-80 z-10 py-2 max-md:items-center max-md:justify-center max-md:mx-auto bg-[#0E142B] rounded-[40px] max-md:mt-60 max-sm:pb-10'>
                    <div className='flex flex-col'>
                        <div className='py-10 px-12'><span className='font-medium text-5xl max-lg:text-4xl'>BENEFITS:</span></div>
                        <div className='grid grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 gap-8 justify-center items-center px-10 py-10 max-sm:p-0'>
                            {
                                BenefitContent.map((benefits, index) => {
                                    return (
                                        <div key={index} className="flex max-w-[480px] rounded-full items-center gap-5 backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 z-10 border border-gray-500 px-5 py-7 cursor-pointer">
                                            <div>{icons.shine}</div>
                                            <div><span className='flex font-normal text-base'>{benefits.content}...</span></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='max-xl:hidden relative'>
                        <Image alt='photo' src={Photo} width={350} height={150} className='absolute -left-48 top-1' />
                        <Image alt='rightchat' src={RightChat} width={250} height={150} className='absolute -bottom-10 -left-24' />
                        <Image alt='roberthand' src={RobertHand} width={461} height={312} className='mt-20 z-10' />
                    </div>
                </div>

                {/* This section for define tips for monthly pdf*/}

                <span className='font-medium text-5xl text-center mt-20 max-md:mt-32 max-lg:text-3xl'>Tips for Use</span>
                <div className='flex justify-around mt-10 max-lg:flex-col max-lg:mx-auto max-lg:p-3 max-xl:gap-5'>
                    {
                        TipContent.map((tips, index) => {
                            return (
                                <div key={index} className="flex max-w-[407px] bg-white/10 bg-opacity-20 shadow-sm shadow-gray-50 rounded-[30px] p-5 cursor-pointer top-6 mt-6">
                                    <div className='flex flex-col'>
                                        <span>{icons.shine}</span>
                                        <span className='font-medium text-3xl mt-3 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-xl'>{tips.title}</span>
                                        <span className='font-normal text-base mt-3'>{tips.content}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ content*/}

                <div className='font-medium text-5xl mt-32 max-sm:mt-28'>
                    <p className='font-medium text-5x text-center'>FAQ</p>
                </div>
                <div className='flex mx-auto'>
                    <div className='flex mt-10 gap-5 max-lg:flex-col max-lg:mx-auto max-lg:px-3'>
                        {
                            FAQContent.map((cards, index) => {
                                return (
                                    <div key={index} className="flex max-w-[450px] w-full bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer">
                                        <div className='flex flex-col'>
                                            <span>{icons.chat}</span>
                                            <p className='font-semibold text-lg mt-2'>{cards.title}</p>
                                            <Button className="bg-gradient-to-tr mt-2 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                <span>answer:</span>
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
