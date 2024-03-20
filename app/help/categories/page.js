import React from 'react'
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight } from "@/src/utils/Icons";
import RightChat from '@/public/assets/recovery/right-chat.svg';
import LeftChat from '@/public/assets/recovery/left-chat.svg';


export default function Categories() {

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

            <div className="flex z-10 backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] w-full flex-col max-md:p-5 gap-4 p-20 text-center relative ">
                
            </div>
        </div>
    )
}
