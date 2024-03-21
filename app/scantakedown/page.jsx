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
import Scan from "@/public/assets/scan/scan.svg"
import Takedown from "@/public/assets/scan/takedown.svg"
import CustomerReview from '@/src/components/customerReview';

const TipContent = ({ targetContent }) => {

    const [selectedTipIndex, setSelectedTipIndex] = useState(0);

    useEffect(() => {
        setSelectedTipIndex(0);
    }, [targetContent])

    return (
        <div className='flex items-center justify-between flex-col gap-y-5 cursor-pointer'>
            {
                targetContent.map((tips, index) => {
                    return (
                        <div key={index} className={selectedTipIndex == index ? 'bg-white/10 shadow-sm rounded-[20px]' : ""} >
                            <div className='flex gap-3 p-7 max-w-[720px] max-sm:flex-col' onClick={() => { setSelectedTipIndex(index) }}>
                                <div>{tips.order}</div>
                                <div><span className='font-medium text-xl max-md:text-base'>{tips.content}</span></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const FAQContent = ({ targetContent }) => {
    const icons = {
        arrowtop: <ChevronRight fill="currentColor" size={16} />,
    };

    const [expandedIndex, setExpandedIndex] = useState(-1);

    return (
        targetContent.map((contents, index) => {
            return (
                <div key={index} className='flex mt-20 gap-2 flex-col bg-gradient-to-br from-gray-600/40 to-gray-800/40 rounded-lg p-12 border border-gray-600'>
                    <div className='flex justify-between max-sm:flex-col max-sm:mx-auto'>
                        <p className='font-medium text-2xl max-lg:text-lg'>{contents.title}</p>
                        <button className={expandedIndex == index ? "-rotate-[90deg] bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white mt-50 w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-0" : "rotate-[90deg] mt-50 bg-gradient-to-tr from-gray-600/40 to-gray-800/40 mt-0 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg z-50 bottom-[calc(50%-80px)] right-2"} onClick={() => { expandedIndex != index ? setExpandedIndex(index) : setExpandedIndex(-1)}}>
                            {icons.arrowtop}
                        </button>
                    </div>
                    <div className={expandedIndex == index ? 'h-auto' : 'h-0'}>
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

export default function ScanTakeDown() {

    const icons = {
        firstTip: <FirstTip fill="currentColor" size={16} />,
        secondTip: <SecondTip fill="currentColor" size={16} />,
        thirdTip: <ThirdTip fill="currentColor" size={16} />,
    };

    const [selectedContent, setSelectedContent] = useState('scan');

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
            content: [
                "Our actions are governed by DMCA compliance regulations, which may impose limitations on certain takedown requests."
            ]
        }, {
            title: "Are there limitations to takedown actions?",
            content: [
                "Our actions are governed by DMCA compliance regulations, which may impose limitations on certain takedown requests."
            ]
        }
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full max-md:px-3">

                {/* This section for define scan&takedown header*/}

                <div>
                    <p className='font-medium text-huge text-center mt-20 max-lg:text-4xl '>SCAN & TAKEDOWN</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[680px] gap-2 items-center container'>
                    <Button radius="full" className={"mx-auto w-1/2 px-7 py-5 text-lg relative z-10 " + (selectedContent == 'scan' ? "bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg" : "bg-transparent")} size='lg' onClick={() => setSelectedContent('scan')}>
                        SCAN
                    </Button>
                    <Button radius="full" className={"mx-auto w-1/2 px-7 py-5 text-lg relative z-10 " + (selectedContent == 'takedown' ? "bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg" : "bg-transparent")} size='lg' onClick={() => setSelectedContent('takedown')}>
                        TAKEDOWN
                    </Button>
                </div>
                <div className='flex w-full justify-around max-w-[1590px] mx-auto mt-20 max-lg:flex-col max-lg:justify-center max-lg:items-center'>
                    <div className='w-80 h-96'>
                        <Image src={selectedContent == 'scan' ? Scan : Takedown} className={selectedContent == 'scan' ? "w-72 h-56" : "w-96 h-80"} alt='warning' width={500} height={250} />
                    </div>
                    <Image src="assets/bg-shape-purple-green.svg" alt='shape-green' width={503} height={472} className='max-md:hidden absolute top-80 left-44 bg-[#58f040] bg-opacity-5 blur-3xl' />
                    <div className='max-w-[695px] mt-8'>
                        <p className='font-normal text-medium'>{selectedContent == 'scan' ? scanHeaderContent.description : takedownHeaderContent.description}</p>
                        <p className='font-normal text-red-300 text-medium mt-5'>{selectedContent == 'scan' ? '' : takedownHeaderContent.note}</p>
                    </div>
                </div>

                {/* This section for define tips for scan&takedown page*/}

                <div className='flex w-full bg-[#090D1F] mx-auto justify-around mt-10 py-20 gap-20 max-xl:flex-col max-xl:items-center'>

                    <TipContent targetContent={selectedContent == 'scan' ? scanTipContent : takeDownTipContent} />

                    <div className="relative max-w-[740px] flex flex-wrap max-md:justify-center max-md:items-center">
                        <Image src={WriteTip} alt='writetip' width={349} height={319} className='' />
                        <Image src={TipDocument} alt='tip' width={349} height={150} className='max-sm:w-64 max-sm:h-44' />
                    </div>
                </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

                {/* This section for define FAQ*/}

                <div className='flex flex-col mt-44 max-w-[1500px] mx-auto w-full max-xl:px-3'>
                    <p className='font-medium text-5xl text-center max-md:text-4xl'>FAQ</p>

                    <FAQContent targetContent={selectedContent == 'scan' ? scanFAQTitle : takedownFAQTitle} />

                </div>
            </div>
            <CustomerReview />
        </>
    )
}
