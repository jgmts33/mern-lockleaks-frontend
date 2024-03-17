"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, ChevronRight } from "@/src/utils/Icons";
import { useEffect, useState } from 'react';
import Scan from "@/public/assets/services/scan-takedown.svg"
import Takedown from "@/public/assets/scan/takedown.svg"
import CustomerReview from '@/src/components/customerReview';

export default function ScanTakeDown() {

    const [selectedContent, setSelectedContent] = useState('scan');
    const [expandedFAQIndex, setExpandedFAQIndex] = useState(-1);

    const icons = {
        firstTip: <FirstTip fill="currentColor" size={16} />,
        secondTip: <SecondTip fill="currentColor" size={16} />,
        thirdTip: <ThirdTip fill="currentColor" size={16} />,
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
    };

    const scanHeaderContent = {
        img_path: Scan,
        description: "Utilizing state-of-the-art software, we tirelessly scour the internet, identifying potential copyright infringements across diverse online platforms. Supported by meticulous manual scans conducted by our proficient agents, we scrutinize an extensive array of sources, including Google Search, Images, Videos, file hosting services, and various websites. Our comprehensive scan encompasses over 100 scrutinized websites and social media platforms like Reddit, Instagram, Twitter, and TikTok."
    }

    const takedownHeaderContent = {
        img_path: Takedown,
        description: "Upon detecting any infringing content, our seasoned experts promptly issue DMCA takedown notices to the relevant internet authorities. We are committed to swiftly removing illicit copies of your content identified through both software and manual scans. Our strong affiliations with file hosting sites ensure expedited consideration of our DMCA takedown notices, aligning closely with our clients'business policies.",
        note: "(Note: Our actions may be limited by DMCA compliance  regulations.)"
    }

    const scanTipContent = [
        {
            order: icons.firstTip,
            content: "Regularly monitor your digital footprint and perform scans to identify unauthorized content."
        }, {
            order: icons.secondTip,
            content: "Enable notifications for immediate alerts regarding potential copyright  infringements.",
        }, {
            order: icons.thirdTip,
            content: "Maintain clear documentation and records of your original content to facilitate  takedown procedures."
        }
    ]

    const takeDownTipContent = [
        {
            order: icons.firstTip,
            content: "Act quickly upon discovering any unauthorized usage of your content to"
        }, {
            order: icons.secondTip,
            content: "Keep all necessary documentation and evidence to support your takedown requests.",
        }, {
            order: icons.thirdTip,
            content: "Review and update your content protection strategy regularly."
        }
    ]

    const scanFAQTitle = [
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

    const takedownFAQTitle = [
        {
            title: "What is the average turnaround time for content takedowns?",
            content: ""
        }, {
            title: "Are there limitations to takedown actions?",
            content: "Our actions are governed by DMCA compliance regulations, which may impose limitations on certain takedown requests."
        }
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define scan&takedown header*/}

                <div>
                    <p className='font-medium text-7xl text-center mt-20 max-lg:text-[40px]'>SCAN & TAKEDOWN</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                    <Button radius="full" className={selectedContent == 'scan' ? "bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} size='lg' onClick={() => setSelectedContent('scan')}>
                        SCAN
                    </Button>
                    <Button radius="full" className={selectedContent == 'takedown' ? "bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} size='lg' onClick={() => setSelectedContent('takedown')}>
                        TAKEDOWN
                    </Button>
                </div>
                {
                    selectedContent == 'scan' ?
                        <div className='flex w-full justify-center gap-96  items-center mx-auto mt-32 max-lg:flex-col max-lg:text-center max-lg:gap-20'>
                            <Image alt='scan' className="h-80 w-96 max-lg:-ml-20" src={Scan} />
                            <div className='max-w-[563px]'>
                                <p className='font-normal text-base'>{scanHeaderContent.description}</p>
                            </div>
                        </div>
                        :
                        <div className='flex w-full justify-center gap-72 items-center mx-auto mt-32 max-xl:flex-col max-lg:gap-20'>
                            <Image className="opacity-80" src={Takedown} alt='warning' width={320} height={384} />
                            <div className='max-w-[743px] max-xl:text-center'>
                                <p className='font-normal text-lg'>{takedownHeaderContent.description}</p>
                                <p className='font-normal text-red-300 text-lg'>{takedownHeaderContent.note}</p>
                            </div>
                        </div>
                }

                {/* This section for define tips for scan&takedown page*/}

                <div className='flex w-full bg-white/5 mx-auto justify-center mt-10 px-10 py-20 gap-20 max-xl:flex-col max-xl:items-center'>
                    <div className='flex items-center max-w-[720px] justify-between flex-col gap-y-10'>
                        {
                            selectedContent == 'scan' ?
                                scanTipContent.map((tips, index) => {
                                    return (
                                        <div key={index} className='flex gap-8 p-7'>
                                            <div className='w-10 h-10'>{tips.order}</div>
                                            <p className='font-medium text-xl max-lg:text-[20px]'>{tips.content}</p>
                                        </div>
                                    )
                                })
                                :
                                takeDownTipContent.map((tips, index) => {
                                    return (
                                        <div key={index} className='flex gap-8 p-7'>
                                            <div className='w-10 h-10'>{tips.order}</div>
                                            <p className='font-medium text-xl max-lg:text-[20px]'>{tips.content}</p>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="relative max-w-[740px] flex flex-wrap">
                        <Image alt='writetip' className="w-[349px] h-[319px]" src={WriteTip} />
                        <Image alt='tip' src={TipDocument} />
                    </div>
                </div>

                {/* This section for define FAQ*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto mb-56 w-full'>
                    <p className='font-medium text-5xl text-center max-lg:text-[40px]'>FAQ</p>
                    {
                        selectedContent == 'scan' ?
                            scanFAQTitle.map((FAQ_content, index) => {
                                return (
                                    <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                                        <div className='flex justify-between'>
                                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>{FAQ_content.title}</p>
                                            <button className={expandedFAQIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white mt-50 w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-0" : "rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2"} onClick={() => { expandedFAQIndex != index ? setExpandedFAQIndex(index) : setExpandedFAQIndex(-1) }}>
                                                {icons.arrowtop}
                                            </button>
                                        </div>
                                        <div className={expandedFAQIndex == index ? 'h-auto' : 'h-0'}>
                                            {
                                                FAQ_content.content.map((items, contentIndex) => {
                                                    return (
                                                        <p key={contentIndex} className={`font-normal text-base mt-3 duration-500 ' + ${expandedFAQIndex == index ? 'block' : 'hidden'} `}>{items}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            :
                            takedownFAQTitle.map((items, index) => {
                                return (
                                    <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                                        <div className='flex justify-between'>
                                            <p className='font-medium text-4xl max-lg:text-[25px] max-lg:text-center'>{items.title}</p>
                                            <button className="rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2 ">
                                                {icons.arrowtop}
                                            </button>
                                        </div>
                                        <p className='font-normal text-base mt-3'>{items.content}</p>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
