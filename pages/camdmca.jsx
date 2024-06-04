"use client";
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import WriteTip from "@/public/assets/scan/camdcma.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { Balance, Banned, Law, ChevronRight, Tips, FirstTip, SecondTip, ThirdTip } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';

export default function CamDmca() {

    const icons = {
        balance: <Balance/>,
        ban: <Banned/>,
        law: <Law/>,
        tip: <Tips/>,
        arrowtop: <ChevronRight/>,
        FirstTip: <FirstTip/>,
        SecondTip: <SecondTip/>,
        ThirdTip: <ThirdTip/>,
    };

    const [selectedTipIndex, setSelectedTipIndex] = useState(0);

    const CamDmcaTitle = {
        title: "Cam DMCA Content Protection",
        sub_title: "Our platform offers an advanced DMCA Content Protection service specifically designed for content creators and models on cam platforms. Utilizing state-of-the-art technology and a proactive approach, we ensure the utmost safety and security of your digital assets. From real-time monitoring to swift action, our services aim to fortify your online presence and protect your valuable content."
    }

    const CamDmcaContent = [
        {
            icon: icons.balance,
            title: "Multi-Platform Security",
            content: "Our comprehensive protection extends across various platforms, safeguarding your content from unauthorized use or distribution."
        }, {
            icon: icons.ban,
            title: "Rapid and Effective Response:",
            content: "Upon identifying copyright infringements, our dedicated team initiates immediate takedown procedures to swiftly remove unauthorized content, preserving your intellectual property rights."
        },
        {
            icon: icons.law,
            title: "Tailored Solutions",
            content: "We provide personalized and adaptive solutions, addressing the unique needs of content creators and cam models to ensure maximum security and peace of mind."
        }
    ]

    const ProtectionContent = [
        {
            icon: icons.FirstTip,
            title: "Regular Monitoring:",
            content: "Perform routine checks to ensure the integrity and exclusivity of your uploaded content."
        }, {
            icon: icons.SecondTip,
            title: "Enhanced Security Measures:",
            content: "Implement two-factor authentication and regularly update your security settings to prevent unauthorized access to your accounts."
        }, {
            icon: icons.ThirdTip,
            title: "Cautious Information Sharing:",
            content: "Be mindful of sharing personal information online to reduce potential vulnerabilities."
        }
    ]

    const createDmcaFAQTitle = [
        {
            title: "How often does the scanning process occur?",
            content: [
                "Our scanning process operates continuously, providing real-time monitoring and alerts for potential infringements."
            ]
        }, {
            title: "What platforms does the scan cover?",
            content: [
                "The scan comprehensively covers  Google & Bing Search, Images, Videos, file hosting services, and a diverse range of websites, including major social media platforms."
            ]
        }
    ]

    const FAQContent = ({ targetContent }) => {
        const icons = {
            arrowtop: <ChevronRight/>,
        };
    
        const [expandedIndex, setExpandedIndex] = useState(-1);
    
        return (
            targetContent.map((contents, index) => {
                return (
                    <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-7 max-md:p-5 border border-gray-600'>
                        <div className='flex justify-between items-center max-sm:mx-auto gap-5'>
                            <p className='font-medium text-2xl max-lg:text-lg'>{contents.title}</p>
                            <button className={expandedIndex == index ? "-rotate-[90deg] bg-gradient-to-tr aspect-square from-purple-light to-purple-weight border-gray-600 border text-white mt-50 w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-0 max-sm:w-8 max-sm:h-8" : "rotate-[90deg] aspect-square mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 max-sm:w-8 max-sm:h-8"} onClick={() => { expandedIndex != index ? setExpandedIndex(index) : setExpandedIndex(-1) }}>
                                {icons.arrowtop}
                            </button>
                        </div>
                        <div className={expandedIndex == index ? 'h-auto max-xl:max-w-[600px]' : 'h-0'}>
                            {
                                contents.content.map((items, contentIndex) => {
                                    return (
                                        <p key={contentIndex} className={`font-normal text-base mt-3 duration-500' + ${expandedIndex == index ? 'block' : 'hidden'} `}>{items}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <>
            <div className="flex flex-col mx-auto items-center justify-center text-white w-full max-md:px-3">

                {/* This section for define camdmca title*/}

                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-bold text-7xl max-lg:text-3xl uppercase'>{CamDmcaTitle.title}</p>
                    <div className='max-w-[848px] mx-auto'><p className='font-normal text-base mt-10'>{CamDmcaTitle.sub_title}</p></div>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute bg-[#6748a1] max-xl:hidden z-0 top-0 left-0 bg-opacity-5 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={442} className='absolute bg-[#6748a1] max-xl:hidden z-0 top-0 right-0 bg-opacity-5 blur-3xl' />
                </div>
                <div className='font-medium text-5xl mt-20 max-sm:mt-10 max-lg:text-4xl'><p className='font-medium text-5x center'>HOW It HELPS</p></div>
                <div className='flex  max-2xl:px-3'>
                    <div className='flex mt-10 gap-10 mx-auto justify-center max-lg:flex-col max-xl:px-3'>
                        {
                            CamDmcaContent.map((item, index) => {
                                return (
                                    <div key={index} className="flex max-w-[480px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            {item.icon}
                                            <p className='font-medium text-2xl mt-5 max-md:text-lg'>{item.title}</p>
                                            <p className='mt-5 font-normal text-lg max-md:text-base'>{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* This section for define tips for camdmca page*/}

                <div className='flex w-[calc(100vw-40px)] bg-white/5 mx-auto mt-20 justify-around py-20 max-lg:py-8 max-xl:flex-col max-xl:items-center px-3'>
                    <div className="relative max-w-[940px] flex justify-center">
                        <div className='max-w-[550px] flex flex-col items-center mt-20 max-xl:mt-0'>
                            <span className='font-medium text-4xl uppercase max-sm:text-lg'>Tips for Content Protection:</span>
                            <div className='flex items-center z-10 mt-5'>
                                <div><Image src={WriteTip} width={459} height={150} alt='write tip' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                                <div><Image src={TipDocument} width={409} height={150} alt='tip document' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                            </div>
                        </div>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={433} height={242} className='max-md:hidden absolute bg-[#9458f5] z-0 top-0 right-0 bg-opacity-5 blur-3xl' />
                    </div>
                    <div className='flex max-w-[720px] justify-center flex-col gap-y-10 z-10 max-sm:mt-10'>
                        {
                            ProtectionContent.map((contents, index) => {
                                return (
                                    <div key={index} className={selectedTipIndex == index ? 'bg-white/10 shadow-sm rounded-[20px]' : ""} >
                                        <div className='flex gap-3 p-5 w-full max-sm:p-3' onClick={() => { setSelectedTipIndex(index) }}>
                                            <div>{contents.icon}</div>
                                            <div className='flex flex-col'>
                                                <span className='font-medium text-xl max-lg:text-lg'>{contents.title}</span>
                                                <span className='font-medium text-lg pt-3 max-lg:text-base'>{contents.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col mt-16 max-md:mt-10 max-w-[1500px] mx-auto w-full text-white'>
                    <p className='font-medium text-5xl text-center max-md:text-4xl'>FAQ</p>

                    <FAQContent targetContent={createDmcaFAQTitle} />

                </div>
            <CustomerReview />
        </>
    )
}
