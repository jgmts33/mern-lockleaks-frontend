"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Balance, FirstTip, SecondTip, ThirdTip, CHAT } from "@/src/utils/Icons";
import CustomerReview from '@/src/components/customerReview';
import Reversechat from '@/public/assets/reverse-chat.svg';

export default function Catfishing() {

    const icons = {
        chat: <CHAT fill="currentColor" size={16} />,
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const CamDmcaTitle = {
        title: "Catfishing & Impersonation",
        sub_title: "Our Catfishing & Impersonation services are meticulously crafted to provide comprehensive protection against fraudulent accounts, impersonation attempts, and deceptive activities. We employ a proactive approach in monitoring various social media platforms and websites, swiftly detecting and mitigating instances of impersonation or deceptive behavior. By utilizing cutting-edge detection techniques, we ensure immediate responses to safeguard your online presence, preventing potential harm to your brand image. Our dedicated team offers expert guidance and strategies to counteract and minimize risks associated with catfishing and online impersonation."
    }

    const CamDmcaContent = [
        {
            icon: icons.chat,
            title: "What actions do you take upon detecting fraudulent accounts?",
            content: "We swiftly respond by reporting and taking necessary actions to have such accounts removed or disabled."
        }, {
            icon: icons.chat,
            title: "How can I protect myself from catfishing attempts?",
            content: "We offer personalized guidance and best practices to recognize and prevent catfishing."
        },
        {
            icon: icons.chat,
            title: "Can you monitor multiple platforms for potential impersonation?",
            content: " Yes, our services encompass monitoring across various social media and online platforms."
        }
    ]

    const HelpContent = [
        { content: "Swift detection and mitigation of fraudulent accounts and impersonation attempts." },
        { content: "Proactive monitoring across diverse social media platforms and websites." },
        { content: "Immediate responses to protect your online identity and brand reputation." },
        { content: "Expert guidance and strategies to mitigate risks associated with catfishing and impersonation." }
    ]

    const BenefitContent = [
        { content: "Comprehensive protection against catfishing, fraudulent accounts, and impersonation." },
        { content: "Swift responses and mitigation strategies to counteract deceptive behavior." },
        { content: "Proactive monitoring across diverse online platforms to safeguard your online presence and brand image." },
        { content: "Expert guidance and personalized strategies to minimize risks associated with catfishing and impersonation." },
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">

                {/* This section for define catifishing header*/}

                <div className='text-center mt-28'>
                    <p className='font-medium text-5xl uppercase max-lg:text-[30px]'>{CamDmcaTitle.title}</p>
                    <div className='max-lg:px-3'><p className='font-normal text-base mt-10 max-w-[1100px]'>{CamDmcaTitle.sub_title}</p></div>
                </div>
                <div className='font-medium text-7xl mt-32 max-lg:text-[40px]'><Image src="/assets/logo.svg" width={500} height={350} alt="logo" /></div>
                <div className='flex justify-around mt-20 w-full max-xl:px-5 max-md:flex-col max-md:items-center max-md:text-center'>
                    <div>
                        <p className='font-medium text-5xl text-center max-lg:text-[30px]'>HOW IT HELPS</p>
                        <ul className='mt-10 list-disc'>
                            {
                                HelpContent.map((heplitems, index) => {
                                    return (
                                        <li key={index} className='font-normal text-base max-w-[575px]'>{heplitems.content}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='max-md:mt-5'>
                        <p className='font-medium text-5xl text-center max-lg:text-[30px]'>BENEFITS</p>
                        <ul className='mt-10'>
                            {
                                BenefitContent.map((benefits, index) => {
                                    return (
                                        <li key={index} className='font-normal text-base max-w-[575px]'>{benefits.content}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* This section for define tips for catfishing page*/}

                <div className='flex w-full mx-auto mt-20 justify-center px-10 py-20 gap-32'>
                    <div className='flex max-w-[505px] flex-col gap-y-10'>
                        <p className='font-medium text-5xl text-center max-lg:text-[30px]'>Tips for Prevention</p>
                        <div className='flex gap-8 p-7'>
                            <div>{icons.FirstTip}</div>
                            <div><p className=''>Identity Verification: Encourage verification processes to ensure authenticity on social media platforms.</p></div>
                        </div>
                        <div className='flex gap-8 rounded-lg'>
                            <div className='ml-5'>{icons.SecondTip}</div>
                            <div className='flex-col'>
                                <p className=''>Privacy Settings: Regularly review and adjust privacy settings to control information accessibility.</p>
                            </div>
                        </div>
                        <div className='flex gap-8 mt-5 p-6'>
                            <div>{icons.ThirdTip}</div>
                            <div className='flex-col'>
                                <p className=''>Vigilant Monitoring: Consistently monitor online activity for any signs of impersonation or fraudulent behavior.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* This section for define FAQ for creator dmca page*/}

                <div className='font-medium text-5xl'><p className='font-medium text-5x center'>FAQ</p></div>
                <div className='flex gap-32 mt-10 max-w-[1480px]'>
                    <div className='flex mt-10 gap-10 max-lg:flex-col max-md:px-3'>
                        {
                            CamDmcaContent.map((camdmca, index) => {
                                return (
                                    <div key={index} className="flex py-10 max-w-[466px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {camdmca.icon}
                                            <p className='font-semibold text-xl mt-5'>{camdmca.title}</p>
                                            <Button className="bg-gradient-to-tr mt-5 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                answer:
                                            </Button>
                                            <p className='mt-5 font-normal text-base'>{camdmca.content}</p>
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
