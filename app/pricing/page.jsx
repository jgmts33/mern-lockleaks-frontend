"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Shine, Complete, Uncomplete, Star, ChevronLeft, ChevronRight } from "@/src/utils/Icons";
import CustomerReview from '@/src/components/customerReview';

export default function Pricing() {

    const [isSelected, setSelected] = React.useState(true);

    const icons = {
        lock: <Lock fill="currentColor" size={16} />,
        left: <ChevronLeft fill="currentColor" size={16} />,
        right: <ChevronRight fill="currentColor" size={16} />,
        shine: <Shine fill="currentColor" size={16} />,
        complete: <Complete fill="currentColor" size={16} />,
        star: <Star fill="currentColor" size={16} />,
        uncomplete: <Uncomplete fill="currentColor" size={16} />,
    };

    const ButtonContent = [
        "1 ( included)", "2 (+$40)", "3 (+$80)", "4 (+$120)", "CUSTOM ( CONTACT US )", "USERNAME "
    ]

    const pricingContent = [
        {
            title: "STARTER",
            price: "000",
            bg_color: "from-gray-600/40 to-gray-800/40",
            user_name: "1",
            add_propertity: "mt-[72px]",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            social_analyze_status: false,
            adult_analyze_status: false,
            forum_analyze_status: false,
            file_analyze_status: false,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            add_content: "px-10"
        }, {
            title: "STAR",
            price: "350",
            bg_color: "from-[#F68171] to-[#B759FF]",
            add_propertity: "",
            user_name: "5",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            bing_removal_report_status: true,
            social_analyze_status: true,
            adult_analyze_status: true,
            forum_analyze_status: true,
            file_analyze_status: true,
            AI_analyze_status: true,
            monthly_analyze_status: true,
            add_content: "bg-opacity-10 bg-black/20 rounded-[20px] px-10 py-10"
        },
        {
            title: "PRO",
            price: "200",
            bg_color: "from-gray-600/40 to-gray-800/40",
            add_propertity: "mt-[72px]",
            content_property: "",
            user_name: "1",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            bing_removal_report_status: true,
            social_analyze_status: true,
            adult_analyze_status: true,
            forum_analyze_status: false,
            file_analyze_status: false,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            add_content: "px-10"
        }
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define chechout page header*/}

                <div className="text-center gap-10 mt-20">
                    <p className="font-bold text-7xl max-lg:text-[40px] max-md:justify-center">PRICING</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-28 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                    <Button radius="full" className={isSelected ? "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} onClick={() => setSelected(true)} size='lg'>
                        Bill Monthly
                    </Button>
                    <Button radius="full" className={isSelected ? "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" : "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"} onClick={() => setSelected(false)} size='lg'>
                        Bill Yearly
                    </Button>
                </div>

                {/* This section for define chechout page content*/}

                <div className='flex mt-28 w-full gap-3 relative max-xl:flex-col mx-auto justify-center'>
                    {
                        pricingContent.map((item, index) => {
                            return (
                                <div key={index} className={'bg-gradient-to-tr  rounded-3xl max-xl:flex-col max-w-[544px] max-xl:mx-auto max-xl:w-full cursor-pointer ' + item.bg_color + " " + item.add_propertity + " max-xl:mt-4 "}>
                                    <div>
                                        <div className='p-10'>
                                            {
                                                item.title == "STAR" ?
                                                    <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                                        <span className='px-4'>popular</span>
                                                    </Button>
                                                    :
                                                    false
                                            }
                                            <p className='text-center font-medium text-6xl mt-10'>{item.title}</p>
                                            <div className='mt-20 flex text-center justify-center'><p className='font-normal text-3xl'>$</p><p className='text-center font-normal text-5xl'>{item.price}</p><p className='pt-5'>/MO</p></div>
                                            {
                                                item.title != "STAR" ?
                                                    <Button radius="lg" className="w-full mt-10 bg-gradient-to-tr mx-auto from-[#aa7fe2] to-[#ec4d1d] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                                                        BUY
                                                    </Button>
                                                    :
                                                    <Button radius="lg" className="w-full mt-10 bg-gradient-to-tr mx-auto from-gray-600/40 to-gray-800/40 border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                                                        BUY
                                                    </Button>
                                            }
                                        </div>
                                        <div className={'flex flex-col gap-y-5 ' + item.add_content}>
                                            <div className={'flex justify-between items-center z-10 '}>
                                                <p className='font-semibold text-xl'>USERNAMES : {item.user_name}</p>
                                                <Button radius="full" className="w-1/3 bg-gradient-to-br from-gray-600/40 to-gray-800/40 p-2" size='md'>
                                                    ADD EXTRA
                                                </Button>
                                            </div>
                                            <div className='flex items-center max-xl:justify-content'>
                                                <div className='flex gap-7'><p>10/DAY</p> {icons.complete}{item.agent_request}</div>
                                            </div>
                                            <div className='flex gap-7'>{icons.complete}{item.agent_request}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.takedowns}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.daily_report}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.badges}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.pdf_report}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.candidential_takedown}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.analyzer_tool}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.reverify_tool}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.google_removal_report}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.bing_removal_report}</div>
                                            <div className='flex gap-7'>{item.social_analyze_status ? icons.complete : icons.uncomplete}{item.social_analyze}</div>
                                            <div className='flex gap-7'>{item.adult_analyze_status ? icons.complete : icons.uncomplete}{item.adult_analyze}</div>
                                            <div className='flex gap-7'>{item.forum_analyze_status ? icons.complete : icons.uncomplete}{item.forum_analyze}</div>
                                            <div className='flex gap-7'>{item.file_analyze_status ? icons.complete : icons.uncomplete}{item.file_analyze}</div>
                                            <div className='flex gap-7'>{item.AI_analyze_status ? icons.complete : icons.uncomplete}{item.AI_analyze}</div>
                                            <div className='flex gap-7'>{item.monthly_analyze_status ? icons.complete : icons.uncomplete}{item.monthly_analyze}</div>
                                            <div className='flex gap-7'>{icons.complete}{item.history_content}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >
            <CustomerReview />
        </>
    )
}
