"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight } from "@/src/utils/Icons";
import RightChat from '@/public/assets/setup/rightchat.svg';
import LeftChat from '@/public/assets/setup/leftchat.svg';
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

    const handleGoCategory = () => {
        router.push("/help/categories")
    }

    const handleGoDetail = () => {
        router.push("/help/details")
    }

    return (
        <div className="text-white container flex flex-col max-sm:px-3" >

            {/* This section for define Help Page Title*/}

            <div className='mt-28 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center max-lg:text-5xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-20 items-center max-w-[1050px] max-sm:flex-col'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-3 rounded-lg bg-white text-black'
                        required
                    />
                </div>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg" size='lg'>
                    Search{icons.search}
                </Button>
            </div>
            <div className='flex mx-auto mt-20'>
                <span className='font-medium text-5xl'>CATEGORIES</span>
            </div>

            {/* This section for define Help Page content*/}

            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-10 mx-auto mt-20'>
                {
                    CategoriesContent.map((category, index) => {
                        return (
                            <div key={index} className="flex max-w-[597px] bg-white/10 bg-opacity-20 shadow-sm rounded-lg px-8 py-5 cursor-pointer" onClick={() => handleGoCategory()}>
                                <div className='flex flex-col w-full'>
                                    <div className='flex items-start gap-5'>
                                        <span>{category.icon}</span>
                                        <span className='font-medium text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-lg'>{category.title}</span>
                                    </div>
                                    <div className='pt-3'>
                                        <span className='font-normal text-base mt-3 max-md:text-xs'>{category.content}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex mx-auto mt-32'>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto w-full z-10 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-5 py-5 text-sm" size='md'>
                    Contact Support
                </Button>
            </div>
            <div className='relative max-md:hidden'>
                <Image src={RightChat} width={250} height={150} alt="right-chat" className='absolute right-0 -top-20' />
                <Image src={LeftChat} width={190} height={50} alt="left-chat" className='absolute right-32 top-32' />
            </div>
            <div className='mt-32 mx-auto max-w-[600px] text-center'>
                <span className='font-medium text-5xl max-md:text-4xl'>Frequently Asked Questions</span>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-10 mx-auto mt-32 mb-10'>
                {
                    QuestionContent.map((items, index) => {
                        return (
                            <div key={index} className="flex max-w-[466px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 cursor-pointer" onClick={()=>handleGoDetail()}>
                                <div className='flex flex-col w-full'>
                                    <div className='flex items-center gap-5'>
                                        <span className='-ml-5'>{icons.chat}</span>
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
            <div className='flex justify-between mt-20 max-xl:justify-around max-sm:flex-col mb-10'>
                <div className='flex flex-col max-sm:mx-auto'>
                    <span className='font-medium text-4xl max-sm:text-center'>Need further assistance? </span>
                    <span>Contact our customer support team now.</span>
                </div>
                <div className='max-sm:mt-10 max-md:mx-auto max-md:justify-center max-lg:items-center max-md:mmx-auto'>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm" size='md'>
                        Chat Now
                    </Button>
                </div>
            </div>
            {/* <div className='flex justify-between mb-20 mt-32 max-xl:justify-around max-sm:flex-col max-sm:mx-auto'>
                <div className='max-sm:mx-auto'>
                    <Image src="/assets/logo.svg" width={190} height={50} alt="logo" />
                </div>
                <div>
                    <div className="flex backdrop-blur-sm bg-white/5 border border-gray-500 shadow-sm shadow-gray-10 rotate-[10deg] rounded-[20px] p-2 cursor-pointer w-[350px] max-sm:rotate-0 max-sm:mt-5">
                        <div className='absolute'>{icons.chat}</div>
                        <div className='flex justify-start flex-col '>
                            <div className='flex justify-center git ml-20 '><Image src="/assets/logo.svg" width={230} height={150} alt="logo" /></div>
                            <div><p className='font-normal text-base mt-2 uppercase ml-20'>support</p></div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
