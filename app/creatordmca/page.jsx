"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, Chat } from "@/components/utils/Icons";
import CustomerReview from '@/components/customerReview';
import Envelop from '@/public/assets/dmca/envelop.svg';
import Reversechat from '@/public/assets/dmca/envelop-reverse.svg';

export default function CreatorDmca() {

    const icons = {
        chat: <Chat fill="currentColor" size={16} />,
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const [selectedTipIndex, setSelectedTipIndex] = useState(0);

    const CamDmcaTitle = {
        title: "CREATOR DMCA CONTENT PROTECTION",
        sub_title: "Our platform provides an advanced DMCA Content Protection service specifically tailored for content creators and models on live streaming platforms. Leveraging cutting-edge technology and a proactive approach, we ensure the highest safety and security for your digital assets. From real-time monitoring to swift actions, our services aim to fortify your online presence and safeguard your valuable content."
    }

    const CamDmcaContent = [
        {
            icon: icons.chat,
            title: "What is DMCA, and how does it protect my content?",
            content: "DMCA (Digital Millennium Copyright Act) is a law that provides a legal framework for copyright protection in the online environment. Our DMCA service for creators ensures the detection and removal of unauthorized content, acting in accordance with legal regulations."
        }, {
            icon: icons.chat,
            title: "How does proactive content protection work for me?",
            content: " We use advanced technology to continuously monitor online activity and detect any copyright infringements. Once identified, takedown actions are swiftly executed to remove unauthorized content."
        }
    ]

    const TipContent = [
        {
            icon: icons.FirstTip,
            title: "Two-Factor Authentication:",
            content: "Use two-factor authentication to add an extra layer of protection for your accounts and personal data."
        },
        {
            icon: icons.SecondTip,
            title: "Regular Monitoring:",
            content: "Regularly check your content's presence online. Consistent monitoring allows you to quickly identify any unauthorized usage or distribution of your material and take immediate action to protect your rights."
        },
        {
            icon: icons.ThirdTip,
            title: "Collaborate with Platform Support Teams:",
            content: "Engaging with the support teams of the platforms where your content is hosted can be beneficial. They might offer additional protection features or guidelines specific to their platform. Establishing contact or rapport with these support teams can provide insights or assistance in cases of content disputes or unauthorized sharing."
        }
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full">

                {/* This section for define create dmca header*/}

                <div className='text-center mt-28 max-lg:px-3'>
                    <p className='font-bold text-6xl uppercase max-lg:text-3xl'>{CamDmcaTitle.title}</p>
                    <div className='flex gap-32 max-md:flex-col items-center max-md:gap-10 mt-20'>
                        <div className='max-w-[855px]'><p className='font-normal text-base'>{CamDmcaTitle.sub_title}</p></div>
                        <Image src="/assets/logo.svg" width={300} height={150} alt="logo" />
                    </div>
                </div>

                {/* This section for define additional element*/}

                <div className='max-xl:px-3'>
                    <div className='flex bg-white/5 mx-auto mt-24 justify-center rounded-[20px] max-xl:flex-col w-full max-w-[1440px] px-10 py-10 gap-32'>
                        <div className='flex max-md:items-center max-lg:flex-wrap max-lg:flex-col'>
                            <div className='w-1/2 max-sm:w-full max-lg:text-center max-lg:mx-auto'>
                                <div className='max-md:flex-col flex mx-auto max-sm:items-center max-lg:items-center max-lg:justify-center'><span className='font-medium text-[63px] max-lg:text-[30px]'>DMCA</span><span className='font-medium max-lg:text-[30px] text-[63px] text-[#F68171]'>BADGES</span></div>
                                <p className='mt-10 max-sm:text-center'>DMCA Badges<br />
                                    To download DMCA badges and learn more about integration, please visit our dedicated DMCA badges page. (reffer link)
                                    These are examples for each category of information you requested for the "Creator DMCA Content Protection" service. If you need more details or any additional information, please let me know!
                                </p>
                            </div>
                            <div className='self-end max-sm:mx-auto max-sm:mt-5 max-lg:mx-auto mt-5'>
                                <Button radius="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg" size='lg'>
                                    Free Analisis
                                </Button>
                            </div>
                            <div className='relative w-1/2 flex max-xl:flex-col max-lg:hidden'>
                                <Image className='right-0 absolute max-2xl:right-10 max-xl:-right-10 ' width={350} height={200} src={Envelop} alt='chat' />
                                <Image className='left-0 mt-32' width={250} height={150} src={Reversechat} alt='reverse chat' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* This section for define tips for creator dmca page*/}

                <div className='flex bg-white/5 mx-auto justify-around mt-10 px-20 w-[calc(100vw-20px)] max-2xl:w-full py-10 max-xl:flex-col items-center max-sm:px-5'>
                    <div className='flex max-w-[720px] justify-center flex-col gap-y-5'>
                        {
                            TipContent.map((content, index) => {
                                return (
                                    <div key={index} className={selectedTipIndex == index ? 'bg-white/10 shadow-sm rounded-[20px]' : ""} >
                                        <div className='flex gap-6 p-5 max-sm:flex-col' onClick={() => { setSelectedTipIndex(index) }}>
                                            <div>{content.icon}</div>
                                            <div className='flex flex-col'>
                                                <p className='font-medium text-xl max-sm:text-lg'>{content.title}</p>
                                                <p className='mt-3 text-lg max-sm:text-sm'>{content.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="max-w-[540px] relative flex max-xl:flex-col max-xl:items-center max-xl:justify-center">
                        <div className='flex max-md:flex-wrap items-center justify-center'>
                            <div><Image src={WriteTip} alt='write tip' className='relative z-0 max-md:w-80' /></div>
                            <div><Image src={TipDocument} alt='tip document' className='relative z-0 max-md:80' /></div>
                        </div>
                    </div>
                </div>

                {/* This section for define FAQ for creator dmca page*/}

                <div className='font-medium text-5xl mt-32'><p className='font-medium text-5x center'>FAQ</p></div>
                <div className='flex gap-32 mt-10 max-lg:px-3'>
                    <div className='flex mt-10 gap-10 mx-auto justify-center max-lg:flex-col'>
                        {
                            CamDmcaContent.map((item, index) => {
                                return (
                                    <div key={index} className="flex max-w-[695px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
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
