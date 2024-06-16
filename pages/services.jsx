"use client"
import React from 'react'
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { ChevronRight, Eye, Chats, Photos, GradiantChevronRIGHT } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';


export default function SERVICES() {
    const router = useRouter();

    const icons = {
        right: <ChevronRight/>,
        eye: <Eye/>,
        chat: <Chats/>,
        photo: <Photos/>,
        arrow_right: <GradiantChevronRIGHT/>,
    };

    const ServicesTitle = {
        title: "SERVICES",
        content: "Discover how our specialized services can assist in safeguarding your digital content, maintaining confidentiality, and enhancing your online management. We offer efficient and tailored solutions, crafted to meet the unique needs of each client. From securing digital content to periodic analyses and personalized options, we're here to provide the necessary support."
    }

    const ServicesContent = [
        [
            {
                title: "Scan & Takedown",
                content: "Utilizing cutting-edge tech and thorough manual checks, we identify potential copyright issues across various online platforms, including Google Search, Images, Videos, file hosting services, and numerous websites. Our scan covers 100,000+ websites and social platforms, allowing us to promptly issue DMCA takedown notices for content protection.",
                path: "/scantakedown"
            },
            {
                title: "Cam DMCA Content Protection",
                content: "Tailored for content creators and models on cam platforms, our advanced DMCA Content Protection service ensures the utmost safety and security of digital assets through real-time monitoring and swift action.",
                path: "/camdmca"
            },
            {
                title: "Username History Recovery & Removal",
                content: "This service is designed to recover and eliminate content associated with multiple usernames, protecting the model's online image and security.",
                path: "/recovery"
            },
        ],
        [
            {
                title: "Artificial Intelligence",
                content: "Upon discovering infringing content, our experts issue DMCA takedown notices swiftly. We employ a proactive approach using software and manual scans to remove unauthorized copies, leveraging strong relationships with file hosting sites in line with our clients' business policies.",
                path: "/ai"
            },
            {
                title: "Creator DMCA Content Protection",
                content: "Specifically designed for content creators and models on live streaming platforms, our service fortifies online presence and protects valuable content by leveraging cutting-edge technology.",
                path: "/creatordmca"
            },
            {
                title: "Monthly Analytics & PDF Reports",
                content: "Detailed reports offer comprehensive insights into content performance, aiding informed decision-making and future content strategies.",
                path: "/monthlypdf"
            },
        ],
        [
            {
                title: "DMCA BADGES",
                content: "DMCA Badges serve as visible markers, indicating your content is protected by copyright laws under the DMCA guidelines. Placing these badges acts as a deterrent, warning potential violators that your work is legally protected and unauthorized use may lead to legal consequences.",
                path: "/dmcabadges"
            },
            {
                title: "Catfishing & Impersonation",
                content: "We provide comprehensive protection against fraudulent accounts and impersonation attempts across social media and websites, ensuring immediate responses to safeguard your online presence.",
                path: "/catfishing"
            },
            {
                title: "Copyright",
                content: "Copyright registration safeguards your creative content, providing exclusive rights against unauthorized use or theft.",
                path: "/copyright"
            }]
    ]

    const handleSelectServices = (path) => {
        router.push(path)
    }

    return (
        <div className="text-white flex flex-col pb-10 mx-auto">
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 left-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 right-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
            <div className='flex mt-10 max-sm:mt-5 relative justify-center max-sm:px-3'>
                <div className='left-0 top-0  max-2xl:hidden'>
                    <div className='mb-0 absolute left-40 -top-10 max-2xl:w-[100px]'>{icons.photo}</div>
                    <div className='absolute left-6 top-32 max-2xl:-left-6 max-2xl:top-2'>{icons.chat}</div>
                </div>
                <div className='max-w-[670px] flex flex-col justify-center text-center max-2xl:z-10'>
                    <p className='font-medium text-5xl max-md:text-4xl'>{ServicesTitle.title}</p>
                    <p className='font-normal text-xl mt-5 max-md:text-lg'>{ServicesTitle.content}</p>
                </div>
            </div>
            <div className='flex mt-20 max-lg:mt-10 px-3 mx-auto'>
                <div className='flex grid-cols-3 gap-6 z-10 max-lg:flex-wrap max-lg:justify-center '>
                    {
                        ServicesContent.map((item, index) => {
                            return (
                                <div key={index} className={(index == 1 ? ' mt-20 pt-10 max-xl:-mt-10' : "") + " max-w-[480px] flex flex-col gap-6"}>
                                    {
                                        item.map((service_content, count) => {
                                            return (
                                                <div key={count} className={"flex max-w-[480px] bg-white/10 bg-opacity-20 shadow-sm shadow-gray-50 rounded-[20px] p-5 cursor-pointer top-6 mt-6"}>
                                                    <div className='flex flex-col'>
                                                        <p className='font-semibold text-xl mt-3'>{service_content.title}</p>
                                                        <p className='font-normal text-base mt-5'>{service_content.content}</p>
                                                        <Button radius="lg" className="bg-transparent justify-start text-white mt-4" size='lg' onClick={() => handleSelectServices(service_content.path)}>
                                                            <span className='bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>See Solution</span>
                                                            {icons.arrow_right}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}
