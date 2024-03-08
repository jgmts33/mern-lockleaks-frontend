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

    const LeftHelpContent = [
        "Swift detection and mitigation of fraudulent accounts and impersonation attempts.",
        "Proactive monitoring across diverse social media platforms and websites.",
        "Immediate responses to protect your online identity and brand reputation.",
        "Expert guidance and strategies to mitigate risks associated with catfishing and impersonation.",
    ]

    const RightHelpContent = [
        "Comprehensive protection against catfishing, fraudulent accounts, and impersonation.",
        "Swift responses and mitigation strategies to counteract deceptive behavior.",
        "Proactive monitoring across diverse online platforms to safeguard your online presence and brand image.",
        "Expert guidance and personalized strategies to minimize risks associated with catfishing and impersonation.",
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-28'>
                    <p className='font-medium text-5xl uppercase'>{CamDmcaTitle.title}</p>
                    <p className='font-normal text-base mt-10 max-w-[1100px]'>{CamDmcaTitle.sub_title}</p>
                </div>
                <p className='font-medium text-7xl mt-32'>LOGO</p>
                <div className='flex gap-60'>
                    <div>
                        <p className='font-medium text-5xl text-center'>HOW IT HELPS</p>
                        <ul className='mt-10'>
                            {
                                LeftHelpContent.map((item, index) => {
                                    return (
                                        <li key={index} className='font-normal text-base max-w-[575px]'>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <p className='font-medium text-5xl text-center'>BENEFITS</p>
                        <ul className='mt-10'>
                            {
                                RightHelpContent.map((item, index) => {
                                    return (
                                        <li key={index} className='font-normal text-base max-w-[575px]'>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className='flex w-full mx-auto mt-20 justify-center px-10 py-20 gap-32'>
                    <div className='flex max-w-[505px] flex-col gap-y-10'>
                        <p className='font-medium text-5xl text-center'>Tips for Prevention</p>
                        <div className='flex gap-8 p-7'>
                            <div>{icons.FirstTip}</div>
                            <div><p className='mt-5'>Identity Verification: Encourage verification processes to ensure authenticity on social media platforms.</p></div>
                        </div>
                        <div className='flex gap-8 rounded-lg'>
                            <div className='ml-5'>{icons.SecondTip}</div>
                            <div className='flex-col'>
                                <p className='mt-5'>Privacy Settings: Regularly review and adjust privacy settings to control information accessibility.</p>
                            </div>
                        </div>
                        <div className='flex gap-8 mt-5 p-6'>
                            <div>{icons.ThirdTip}</div>
                            <div className='flex-col'>
                                <p className='mt-5'>Vigilant Monitoring: Consistently monitor online activity for any signs of impersonation or fraudulent behavior.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='font-medium text-5xl mt-40'><p className='font-medium text-5x center'>FAQ</p></div>
                <div className='flex gap-32 mt-10 max-w-[1480px]'>
                    <div className='flex mt-10 gap-10'>
                        {
                            CamDmcaContent.map((item, index) => {
                                return (
                                    <div key={index} className="flex py-10 max-w-[466px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {item.icon}
                                            <p className='font-semibold text-xl mt-5'>{item.title}</p>
                                            <Button className="bg-gradient-to-tr mt-5 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                answer:
                                            </Button>
                                            <p className='mt-5 font-normal text-base'>{item.content}</p>
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
