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

export default function DeleteData() {

    const icons = {
        chat: <CHAT fill="currentColor" size={16} />,
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const CamDmcaTitle = {
        title: "Request for Personal Data Deletion",
        sub_title: "Our Catfishing & Impersonation services are meticulously crafted to provide comprehensive protection against fraudulent accounts, impersonation attempts, and deceptive activities. We employ a proactive approach in monitoring various social media platforms and websites, swiftly detecting and mitigating instances of impersonation or deceptive behavior. By utilizing cutting-edge detection techniques, we ensure immediate responses to safeguard your online presence, preventing potential harm to your brand image. Our dedicated team offers expert guidance and strategies to counteract and minimize risks associated with catfishing and online impersonation."
    }

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">
                <div className='text-center mt-28'>
                    <p className='font-medium text-5xl uppercase'>{CamDmcaTitle.title}</p>
                    <p className='font-normal text-base mt-10 max-w-[1100px]'>{CamDmcaTitle.sub_title}</p>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
