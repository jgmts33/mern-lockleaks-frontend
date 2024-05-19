"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';


export default function DataAnalyticsDetails() {
    const router = useRouter();

    const [selectDownload, setSelectDownload] = useState(0)

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    const description = [
        {
            title: <span className='font-semibold text-base'>1. Hosting Revenue:</span>,
            content: <span className='font-normal text-xs'>Analyzing hosting revenue focuses on how individuals or entities profit from uploading and hosting "leaked" content on various online platforms. This may involve uploading copyrighted or unfiltered content on hosting sites, thus generating revenue for site owners.Understanding this aspect is crucial as it influences both the models producing the content and the users accessing it.</span>,
            description: <span className='font-normal text-xs'>Understanding this aspect is crucial as it influences both the models producing the content and the users accessing it.</span>
        }, {
            title: <span className='font-semibold text-base'>2. Subscription Profits:</span>,
            content: <span className='font-normal text-xs'>The analysis of subscription profits focuses on how certain platforms earn money by selling premium subscriptions for access to "leaked" content. These subscriptions offer users exclusive or enhanced access to content provided by models or other sources.</span>,
            description: <span className='font-normal text-xs'>Understanding how this practice affects the industry and users is essential for taking appropriate measures</span>
        },{
            title:<span className='font-semibold text-base'>3. Advertisement Revenue:</span>,
            content:<span className='font-normal text-xs'>The analysis of advertisement revenue examines how certain websites profit from "leaked" content through displaying ads.</span>,
            description:<span className='font-normal text-xs'>Understanding these practices influences consumers and how they can be countered.</span>
        },{
            title:<span className='font-semibold text-base'>4. Intermediary Forums & Websites:</span>,
            content:<span className='font-normal text-xs'>This category analyzes the role of intermediary sites that post references or "leaked" content from other sites. These sites act as intermediaries between the original source of the content and end-users, often making profits through displaying ads or other means.</span>,
            description:<span className='font-normal text-xs'>Understanding the role and impact of these intermediary forums is crucial for understanding the distribution and propagation of illegal content online.</span>
        },{
            title:<span className='font-semibold text-base'>5. Archive Websites:</span>,
            content:<span className='font-normal text-xs'>This category analyzes archive sites that host "leaked" content without offering direct financial benefits. These sites function as repositories of illegal content, allowing access to it without paying a subscription or other fees.</span>,
            description:<span className='font-normal text-xs'>Understanding the presence and impact of these archive sites is essential for developing strategies to protect content and copyright.</span>
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='mt-5 max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>DATA ANALYTICS</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 w-full max-md:px-4'>
                <ScrollShadow className="h-[300px]">
                    <div className='flex flex-col'>
                        <div><span className='font-bold text-lg'>Monthly Report - Website</span></div>
                        <div className='font-semibold text-sm mt-5'>
                            <span>FROM 12.02.2.24</span>
                            <span>TO 04.03.2.24</span>
                        </div>
                        <div className='flex flex-col max-w-[740px] mt-5'>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Email:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>Example@gmailcom</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Used Usernames: </span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>Name</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Subscription:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>Info</span></div>
                            </div>
                        </div>
                        <div className='flex flex-col max-w-[740px] mt-5'>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Search Engines:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Ai Face Recognition:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Adult Websites:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Social Media:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Personal Agent:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='flex w-1/2'><span className='font-semibold text-sm'>Total Hosted Files:</span></div>
                                <div className='flex w-1/2'><span className='font-semibold text-[18px]'>10</span></div>
                            </div>
                        </div>
                    </div>
                </ScrollShadow>
            </div>
            <div className='flex mt-3'>
                <span className='font-semibold text-base'>The introduction to our report is dedicated to emphasizing the importance of understanding the reasons behind the illegal distribution of content created by models on various websites. Our company specializes in cleaning and removing these illegal content leaks, aiming to protect copyright and the reputation of the models. A profound understanding of the motivations behind these actions is essential to take appropriate measures to combat this phenomenon and to ensure a safer and more responsible digital environment for all users. Through the analysis of relevant data and metrics, we can gain significant insights into how this illegal content is distributed and consumed online, so that we can develop effective strategies to combat this phenomenon and protect copyright.</span>
            </div>
            <div className='flex flex-col mt-5'>
                <div className='flex flex-col space-y-2'>
                    {
                        description.map((items,index)=>{
                            return(
                                <div key={index} >
                                    <div>{items.title}</div>
                                    <div>{items.content}</div>
                                    <div>{items.description}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex mt-3'>
                <span className='font-semibold text-base'>In conclusion, analyzing hosting revenue, subscription profits, intermediary forums and websites, as well as archive websites, reveals the complexity and diversity of ways in which illegal content is distributed and monetized on the internet. Understanding these aspects is crucial for developing effective strategies to protect copyright and combat illegal content distribution. By continuously analyzing and monitoring these practices, we can contribute to promoting a safer and more ethical online environment for both creators and users.</span>
            </div>
        </div>
    )
}
