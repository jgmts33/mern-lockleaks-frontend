"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { Balance, FirstTip, SecondTip, ThirdTip, CHAT } from "@/src/utils/Icons";
import CustomerReview from '@/src/components/customerReview';
import Chat from '@/public/assets/services/chat.svg';
import RecoveryChat from '@/public/assets/services/recovery-chat.svg';

export default function Recovery() {

    const icons = {
        chat: <CHAT fill="currentColor" size={16} />,
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const RecoveryTitle = {
        title: "Username History Recovery Removal",
        sub_title: "The Username History Recovery & Removal service is exclusively tailored for models on cam platforms and can be adapted for those on OnlyFans. Its primary function is to recover and eliminate content linked to multiple usernames utilized by an individual. This service offers a comprehensive view of content associated with various online identities, enabling the removal of unauthorized or undesired content linked to these identities. Ultimately, this protects the model's online image and security by ensuring the eradication of unwanted or unauthorized content."
    }

    const HelpContent = {
        first_tip: {
            title: "Content Recovery: ",
            content: "Retrieves historical content associated with diverse online identities."
        },
        second_tip: {
            title: "Safeguarding Online Image:  ",
            content: "Protects the model's online reputation and security."
        },
        third_tip: {
            title: "Content Removal:  ",
            content: "Eliminates undesired or unauthorized content linked to specific usernames."
        }
    }

    return (
        <>
            <div className="flex flex-col text-white w-full">
                <div className='mt-28'>
                    <p className='font-medium text-[50px] uppercase text-center'>{RecoveryTitle.title}</p>
                    <div className='flex gap-32 items-center justify-between max-w-[1300px] mx-auto'>
                        <div className='max-w-[612px] mt-10'><p className='font-normal text-base mt-10'>{RecoveryTitle.sub_title}</p></div>
                        <p className='font-medium text-7xl mt-20'>LOGO</p>
                    </div>
                </div>
                <p className='font-medium text-[50px] text-center mt-44'>How It Helps</p>
                <div className='flex flex-col mx-auto max-w-[1400px] mt-20'>
                    <div className='flex  justify-centerg'>
                        <div className='max-w-[623px]'>
                            <p className='font-medium text-[50px]'>{HelpContent.first_tip.title}</p>
                            <p className='font-medium text-[34px]'>{HelpContent.first_tip.content}</p>
                        </div>
                        <div className='mt-24'>
                            <Image class="object-cover" src={RecoveryChat} />
                        </div>
                        <div className='max-w-[623px] mt-32'>
                            <p className='font-medium text-[50px]'>{HelpContent.second_tip.title}</p>
                            <p className='font-medium text-[34px]'>{HelpContent.second_tip.content}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='max-w-[623px]'>
                                <p className='font-medium text-[50px]'>{HelpContent.first_tip.title}</p>
                                <p className='font-medium text-[34px]'>{HelpContent.first_tip.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
