"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import WriteTip from "@/public/assets/scan/write-tip.svg";
import TipDocument from "@/public/assets/scan/tip-document.svg";
import { FirstTip, SecondTip, ThirdTip, ChevronRight } from "@/components/utils/Icons";
import { useEffect, useState } from 'react';
import Scan from "@/public/assets/scan/scan.svg"
import Takedown from "@/public/assets/scan/takedown.svg"
import CustomerReview from '@/components/customer-review';

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
                                <div><span className='font-medium text-lg max-md:text-base'>{tips.content}</span></div>
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

export default function ScanTakeDown() {

    const icons = {
        firstTip: <FirstTip/>,
        secondTip: <SecondTip/>,
        thirdTip: <ThirdTip/>,
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
                    <p className='font-medium text-huge text-center mt-10 max-lg:text-4xl '>SCAN & TAKEDOWN</p>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[680px] gap-2 items-center container'>
                    <Button radius="full" className={"mx-auto w-1/2 px-7 py-5 text-lg relative z-10 " + (selectedContent == 'scan' ? "bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg" : "bg-transparent")} size='lg' onClick={() => setSelectedContent('scan')}>
                        <span>SCAN</span>
                    </Button>
                    <Button radius="full" className={"mx-auto w-1/2 px-7 py-5 text-lg relative z-10 " + (selectedContent == 'takedown' ? "bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg" : "bg-transparent")} size='lg' onClick={() => setSelectedContent('takedown')}>
                        <span>TAKEDOWN</span>
                    </Button>
                </div>
                <div className='flex w-full justify-around max-w-[1590px] mx-auto mt-20 max-lg:flex-col max-lg:justify-center items-center'>
                    <div className='flex items-center w-64 h-64'>
                        <Image src={selectedContent == 'scan' ? Scan : Takedown} className={selectedContent == 'scan' ? "mx-auto w-44 h-44 z-10" : "mx-auto w-full h-full z-10"} alt='warning' width={250} height={250} />
                    </div>
                    <Image src="assets/bg-shape-purple-green.svg" alt='shape-green' width={503} height={372} className='max-lg:hidden absolute top-80 left-44 bg-[#58f040] bg-opacity-5 blur-3xl' />
                    <div className='max-w-[695px] max-lg:text-center max-lg:mt-10'>
                        <p className='font-normal text-medium'>{selectedContent == 'scan' ? scanHeaderContent.description : takedownHeaderContent.description}</p>
                        <p className='font-normal text-red-300 text-medium mt-5'>{selectedContent == 'scan' ? '' : takedownHeaderContent.note}</p>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-44 right-32 bg-opacity-5 blur-3xl' />
                    </div>
                </div>

                {/* This section for define tips for scan&takedown page*/}

                <div className='flex bg-[#090D1F] mx-auto justify-center mt-20 py-20 gap-20 max-sm:py-5 max-lg:flex-col w-[calc(100vw-40px)] max-xl:items-center max-2xl:px-3'>

                    <div className='max-w-[550px] flex flex-col items-center'>
                        <div className='flex items-center z-10 mt-5'>
                            <div><Image src={WriteTip} width={509} height={150} alt='write tip' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                            <div><Image src={TipDocument} width={409} height={150} alt='tip document' className='relative z-10 max-sm:w-64 max-sm:h-44' /></div>
                        </div>
                    </div>

                    <TipContent targetContent={selectedContent == 'scan' ? scanTipContent : takeDownTipContent} />
                </div>

                {/* This section for define FAQ*/}

                <div className='flex flex-col mt-16 max-md:mt-10 max-w-[1500px] mx-auto w-full'>
                    <p className='font-medium text-5xl text-center max-md:text-4xl'>FAQ</p>

                    <FAQContent targetContent={selectedContent == 'scan' ? scanFAQTitle : takedownFAQTitle} />

                </div>
            </div>
            <CustomerReview />
        </>
    )
}
