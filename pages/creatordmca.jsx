"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { useState } from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, Chat } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';
import Envelop from '@/public/assets/dmca/envelop.svg';
import Reversechat from '@/public/assets/dmca/envelop-reverse.svg';
import { useRouter } from 'next/navigation';

export default function CreatorDmca() {

    const icons = {
        chat: <Chat />,
        FirstTip: <FirstTip />,
        SecondTip: <SecondTip />,
        ThirdTip: <ThirdTip />,
    };

    const router = useRouter();

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
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full mb-10">

                {/* This section for define create dmca header*/}

                <div className='text-center mt-10 max-sm:mt-5 max-lg:px-3'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 left-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 right-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                    <p className='font-bold text-6xl uppercase max-lg:text-3xl z-10'>{CamDmcaTitle.title}</p>
                    <div className='flex gap-32 max-xl:gap-20 max-lg:flex-col items-center max-md:gap-10 mt-20 max-lg:gap-10 max-sm:mt-10 max-xl:px-3'>
                        <div className='max-w-[805px] z-10'><p className='font-normal text-base'>{CamDmcaTitle.sub_title}</p></div>
                        <div className='max-lg:w-56 max-lg:h-24 z-10'><Image src="/assets/logo.svg" width={300} height={150} alt="logo" /></div>
                    </div>
                </div>

                {/* This section for define additional element*/}

                <div className='px-3 z-10'>
                    <div className='flex bg-white/5 mx-auto mt-24 max-lg:mt-5 justify-center rounded-[20px] max-xl:flex-col w-full max-w-[1440px] px-10 py-10 gap-32'>
                        <div className='flex max-md:items-center max-lg:flex-wrap max-lg:flex-col'>
                            <div className='w-1/2 max-lg:w-full max-lg:mx-auto'>
                                <div className='max-md:flex-col flex max-sm:items-center max-lg:items-center max-lg:justify-center'><span className='font-medium text-[63px] max-lg:text-[30px]'>DMCA</span><span className='font-medium max-lg:text-[30px] text-[63px] text-[#F68171] pl-4'> BADGES</span></div>
                                <p className='mt-10 max-sm:text-center'>DMCA Badges<br />
                                    To download DMCA badges and learn more about integration, please visit our dedicated DMCA badges page.
                                    These badges are essential for demonstrating your commitment to protecting your digital content.
                                </p>
                            </div>
                            <div className='self-end max-sm:mx-auto max-sm:mt-5 max-lg:mx-auto mt-5'>
                                <Button
                                    radius="sm"
                                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg"
                                    size='lg'
                                    onPress={() => router.push("/dmcabadges")}
                                >
                                    <span>Download DMCA Badges</span>
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

                <div className='flex bg-white/5 mx-auto justify-around mt-10 px-10 w-[calc(100vw-20px)] max-2xl:w-full py-10 max-xl:py-7 max-xl:flex-col items-center max-sm:px-5'>
                    <div className='max-w-[650px] flex flex-col items-center max-xl:mt-0'>
                        <div className='flex items-center z-10 mt-5'>
                            <div><Image src={WriteTip} width={559} height={150} alt='write tip' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                            <div><Image src={TipDocument} width={409} height={150} alt='tip document' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                        </div>
                    </div>
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
                </div>

                {/* This section for define FAQ for creator dmca page*/}

                <div className='font-medium text-5xl mt-16 max-xl:mt-10'><p className='font-medium text-5x center max-sm:text-4xl'>FAQ</p></div>
                <div className='flex gap-32 mt-10 max-sm:mt-0 px-3'>
                    <div className='flex mt-10 gap-10 mx-auto justify-center max-lg:flex-col'>
                        {
                            CamDmcaContent.map((item, index) => {
                                return (
                                    <div key={index} className="flex max-w-[695px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {item.icon}
                                            <p className='font-semibold text-xl mt-5'>{item.title}</p>
                                            <Button className="bg-gradient-to-tr mt-5 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                <span>answer:</span>
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
