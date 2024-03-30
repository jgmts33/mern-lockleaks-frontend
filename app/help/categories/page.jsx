"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Search, Collobation, RedStar, RecoveryChat } from "@/components/utils/Icons";
import RightChat from '@/public/assets/setup/rightchat.svg';
import LeftChat from '@/public/assets/setup/leftchat.svg';
import { useRouter } from 'next/navigation';

export default function Categories() {
    const router = useRouter();
    const [selectedCategory, setSelectCatecory] = useState(0)

    const icons = {
        chat: <RecoveryChat fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
        collobation: <Collobation fill="currentColor" size={16} />,
        redstar: <RedStar fill="currentColor" size={16} />,
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
        },
        {
            icon: icons.collobation,
            title: "How It Works",
            content: "Using our Platform,Features Navigation,Copyright Protection Guide,Dashboard Usage Guide..."
        },
        {
            icon: icons.collobation,
            title: "Security & Privacy",
            content: "Data Security Measures , Privacy Policy , Protecting Personal Information , Content Security Measures..."
        }, {
            icon: icons.collobation,
            title: "Updates & News",
            content: "Recent News , Service Updates & Changes"
        }
    ]

    const CatagoryButtons = [
        "common questions",
        "get started",
        "subscribtion",
        "takedown",
        "other",
    ]

    return (
        <div className="text-white relative container flex flex-col max-2xl:px-3 mx-auto" >

            {/* This section for define Help Page Title*/}

            <div className='mt-10 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center max-md:text-4xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-10 items-center max-w-[1050px] max-md:flex-col'>
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
            <div className='flex mx-auto mt-10'>
                <span className='font-medium text-5xl max-md:text-4xl'>CATEGORIES</span>
            </div>

            {/* This section for define Help Page content*/}

            <div className="flex z-10 backdrop-blur-sm bg-white/5 shadow-sm rounded-[20px] w-full p-20 max-xl:p-0 mt-20 max-xl:flex-col max-xl:mx-auto max-xl:justify-center max-xl:items-center">
                <div className='flex flex-col w-1/3 gap-3 max-md:mx-auto max-md:justify-center max-md:items-center max-md:w-full'>
                    <div className='max-xl:pt-10'><span className='font-medium text-3xl'>Categories</span></div>
                    {
                        CatagoryButtons.map((items, index) => {
                            return (
                                <div key={index} className='mt-3'>
                                    {
                                        selectedCategory == index ?
                                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white px-5 py-5 shadow-lg text-lg max-sm:text-base" size='md' onClick={() => setSelectCatecory(index)}>
                                                {items}
                                            </Button>
                                            :
                                            <span className='font-medium text-lg max-sm:text-base' onClick={() => setSelectCatecory(index)}>{items}</span>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col w-2/3 gap-5 max-xl:w-full max-xl:px-5 max-md:mx-auto max-md:text-lg max-xl:mt-10 mb-10 max-sm:w-full max-sm:px-3'>
                    {
                        CategoriesContent.map((category, index) => {
                            return (
                                <div key={index} className="flex bg-white/10 bg-opacity-20 shadow-sm rounded-lg p-5 cursor-pointer">
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-5'>
                                                <span>{category.icon}</span>
                                                <span className='font-medium text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-lg'>{category.title}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='flex'>{icons.redstar}{icons.redstar}{icons.redstar}{icons.redstar}{icons.redstar}</div>
                                                <did className="mx-auto"><span className='font-normal text-base'>popular</span></did>
                                            </div>
                                        </div>
                                        <div className='pt-3 max-w-[810px]'>
                                            <span className='font-normal w-full text-base mt-3'>{category.content}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='relative max-2xl:hidden'>
                <Image src={RightChat} width={250} height={150} alt="right-chat" className='absolute -right-32 -top-44' />
                <Image src={LeftChat} width={190} height={50} alt="left-chat" className='absolute right-0 -top-8' />
            </div>
            <div className='flex justify-between max-sm:justify-center max-sm:mx-auto mt-28 max-md:space-y-5 max-xl:mt-16 max-xl:justify-around max-md:flex-col mb-20'>
                <div className='flex flex-col max-sm:items-center max-md:space-y-3'>
                    <span className='font-medium text-4xl text-center max-sm:text-center'>Need further assistance? </span>
                    <span className='max-sm:text-center max-md:mx-auto'>Contact our customer support team now.</span>
                </div>
                <div className='max-sm:mt-10 max-md:mx-auto max-md:justify-center max-lg:items-center max-md:mmx-auto'>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm" size='md'>
                        Chat Now
                    </Button>
                </div>
            </div> 
        </div>
    )
}
