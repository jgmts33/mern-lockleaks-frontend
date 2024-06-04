"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { FirstTip, SecondTip, ThirdTip, Chat } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';

export default function Catfishing() {

    const icons = {
        chat: <Chat/>,
        FirstTip: <FirstTip/>,
        SecondTip: <SecondTip/>,
        ThirdTip: <ThirdTip/>,
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

    const PreventionTips = [
        {
            icon: icons.FirstTip,
            content: "Identity Verification: Encourage verification processes to ensure authenticity on social media platforms."
        }, {
            icon: icons.SecondTip,
            content: "Privacy Settings: Regularly review and adjust privacy settings to control information accessibility."
        }, {
            icon: icons.ThirdTip,
            content: "Vigilant Monitoring: Consistently monitor online activity for any signs of impersonation or fraudulent behavior."
        }
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full max-md:px-3">

                {/* This section for define catifishing header*/}

                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-medium text-5xl uppercase max-lg:text-4xl'>{CamDmcaTitle.title}</p>
                    <div className='max-lg:px-3'><p className='font-normal text-base mt-10 max-w-[1100px]'>{CamDmcaTitle.sub_title}</p></div>
                </div>
                <div className='font-medium text-7xl mt-20 max-sm:mt-10 max-lg:text-[40px] max-md:w-64 max-md:h-24'><Image src="/assets/logo.svg" width={350} height={350} alt="logo" /></div>
                <div className='flex justify-around mt-20 max-md:mt-0 max-sm:mt-10 w-full max-xl:px-5 max-md:flex-col max-md:items-center max-md:text-center'>
                    <div className='z-10'>
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
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-56 left-20 bg-[#362666] bg-opacity-5 blur-3xl' />
                    <div className='max-md:mt-5 max-sm:mt-16 z-10'>
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
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-56 right-32 bg-[#362666] bg-opacity-5 blur-3xl' />
                </div>

                {/* This section for define tips for catfishing page*/}

                <div className='flex w-full relative mx-auto mt-10 max-sm:mt-10 max-sm:!py-10 justify-center px-10 py-20 gap-32 max-sm:px-0'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 left-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={542} className='max-md:hidden absolute bg-[#955bf1] right-32 z-0 bg-opacity-5 blur-3xl' />
                    <div className='flex max-w-[705px] flex-col gap-y-10 max-sm:gap-y-0'>
                        <p className='font-medium text-5xl text-center max-lg:text-3xl'>Tips for Prevention</p>
                        {
                            PreventionTips.map((content, index) => {
                                return (
                                    <div key={index} className='flex gap-8 p-5 z-10 mt-5'>
                                        <div>{content.icon}</div>
                                        <div><span className='font-medium text-xl max-sm:text-base'>{content.content}</span></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* This section for define FAQ for creator dmca page*/}

                <div className='font-medium text-5xl'><p className='font-medium text-5xl center max-sm:text-4xl'>FAQ</p></div>
                <div className='flex gap-28 mt-10 max-w-[1480px] mx-auto max-sm:mt-0'>
                    <div className='flex mt-10 gap-10 max-xl:flex-col max-md:px-3'>
                        {
                            CamDmcaContent.map((camdmca, index) => {
                                return (
                                    <div key={index} className="flex py-10 max-w-[466px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {camdmca.icon}
                                            <p className='font-semibold text-xl mt-5'>{camdmca.title}</p>
                                            <Button className="bg-gradient-to-tr mt-5 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                <span>answer:</span>
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
