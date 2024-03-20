"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight } from "@/src/utils/Icons";
import RightChat from '@/public/assets/recovery/right-chat.svg';
import LeftChat from '@/public/assets/recovery/left-chat.svg';
import { useRouter } from 'next/navigation';

export default function Help() {
    const router = useRouter();

    const icons = {
        search: <Search fill="currentColor" size={16} />,
        collobation: <Collobation fill="currentColor" size={16} />,
        chat: <RecoveryChat fill="currentColor" size={16} />,
        direction: <ArrowRight fill="currentColor" size={16} />,
    };

    const CategoriesContent = [
        {
            icon: icons.collobation,
            title: "Subscriptions & Pricing",
            content: "Subscription , Pricing , Upgrade or Change, Cancellation & Refunds.."
        }, {
            icon: icons.collobation,
            title: "Payments & Billing",
            content: "Manange Payment Information,Billing & Invoices,Subscription Renewal...",
        }, {
            icon: icons.collobation,
            title: "Contact & Support",
            content: "Contact Support,FAQs,Feedback & Suggestions..."
        }, {
            icon: icons.collobation,
            title: "Services Offered",
            content: "Content Analysis,Impersonation & Brand Protection, Content Moderation & Compliance Manangement , AI Tools, Model Services,Monthly Reporting & Analytics..."
        },
        {
            icon: icons.collobation,
            title: "Technical Issues & Troubleshooting",
            content: "Technial Support,Login or Access Issues, Reporting Glitches..."
        }, {
            icon: icons.collobation,
            title: "Security & Privacy",
            content: "Data Security Measures , Privacy Policy , Protecting Personal Information , Content Security Measures..."
        }, {
            icon: icons.collobation,
            title: "Updates & News",
            content: "Recent News , Service Updates & Changes"
        }
    ]
    const QuestionContent = [
        {
            content: "I've just subscribed to a service. What happens next?"
        }, {
            content: "What payment methods are accepted for subscriptions?"
        }, {
            content: "How often are reports generated, and what do they include?"
        }, {
            content: "Is there a limit to the number of takedown requests I can make within my subscription?"
        }, {
            content: "How to Cancel Your Subscription?"
        }, {
            content: "Are DMCA badges provided with the subscription, and how can I integrate them into my website?"
        }
    ]

    const handleGoCategory = () =>{
        router.push("/help/categories")
    }

    return (
        <div className="text-white relative container flex flex-col" >

            {/* This section for define Help Page Title*/}

            <div className='mt-28 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-around gap-5 mt-20 w-full items-center max-w-[1050px]'>
                <div className='justify-center items-center w-3/4'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
                        required
                    />
                </div>
                <div className='w-1/4'>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-5 py-5 text-sm" size='md'>
                        Search{icons.search}
                    </Button>
                </div>
            </div>
            <div className='flex mx-auto mt-20'>
                <span className='font-medium text-5xl'>CATEGORIES</span>
            </div>

            {/* This section for define Help Page content*/}

            <div className='grid grid-cols-2 gap-10 mx-auto mt-20'>
                {
                    CategoriesContent.map((category, index) => {
                        return (
                            <div key={index} className="flex max-w-[537px] bg-white/10 bg-opacity-20 shadow-sm rounded-sm p-5 cursor-pointer" onClick={() => handleGoCategory()}>
                                <div className='flex flex-col w-full'>
                                    <div className='flex items-center gap-5'>
                                        <span>{category.icon}</span>
                                        <span className='font-medium text-3xl mt-3 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{category.title}</span>
                                    </div>
                                    <div className='pt-3'>
                                        <span className='font-normal text-base mt-3'>{category.content}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex mx-auto mt-32'>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto w-full from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-5 py-5 text-sm" size='md'>
                    Contact Support
                </Button>
            </div>
            <div className='relative'>
                <Image src={RightChat} width={190} height={50} alt="right-chat" className='absolute right-28 top-28 -rotate-[40deg]' />
                <Image src={LeftChat} width={350} height={150} alt="right-chat" className='absolute right-0 -top-32 rotate-[50deg]' />
            </div>
            <div className='mt-32 mx-auto max-w-[600px] text-center'>
                <span className='font-medium text-5xl'>Frequently Asked Questions</span>
            </div>
            <div className='grid grid-cols-3 gap-10 mx-auto mt-32 mb-10'>
                {
                    QuestionContent.map((items, index) => {
                        return (
                            <div key={index} className="flex max-w-[466px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-lg p-5 cursor-pointer">
                                <div className='flex flex-col w-full'>
                                    <div className='flex items-center gap-5'>
                                        <span>{icons.chat}</span>
                                        <span className='font-medium text-3xl mt-3 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{items.title}</span>
                                    </div>
                                    <div className='pt-3'>
                                        <span className='font-normal text-base mt-3'>{items.content}</span>
                                    </div>
                                    <div className='mt-3'>
                                        {icons.direction}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-between mt-20'>
                <div className='flex flex-col'>
                    <span className='font-medium text-4xl'>Need further assistance? </span>
                    <span>Contact our customer support team now.</span>
                </div>
                <div>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto w-full from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm" size='md'>
                        Chat Now
                    </Button>
                </div>
            </div>
            <div className='flex justify-between mb-20 mt-44'>
                <div>
                    <Image src="/assets/logo.svg" width={190} height={50} alt="logo" />
                </div>
                <div>
                    <div className="flex backdrop-blur-sm bg-white/5 border border-gray-500 shadow-sm shadow-gray-10 rotate-[10deg] rounded-[20px] p-2 cursor-pointer w-[350px]">
                        <div className='absolute'>{icons.chat}</div>
                        <div className='flex justify-start flex-col'>
                            <div className='flex justify-start ml-20'><Image src="/assets/logo.svg" width={230} height={150} alt="logo" /></div>
                            <div><p className='font-normal text-base mt-2 uppercase ml-20'>support</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
