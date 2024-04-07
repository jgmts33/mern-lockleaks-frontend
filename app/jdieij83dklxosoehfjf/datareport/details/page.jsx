"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Warning } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';


export default function DataReportDetails() {
    const router = useRouter();

    const [selectDownload, setSelectDownload] = useState(0)

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    const NotificationContent = [
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
        "Scan name February 27, 2024",
    ]

    const description = [
        "Our comprehensive approach to security begins with a meticulous scanning process. Leveraging our proprietary software, we conduct extensive searches across Google, including Search, Images, and Videos, along with an examination of diverse online platforms such as video-streaming sites, forums, peer-to-peer networks, file hosting services, and major social media platforms like Reddit, Instagram, Twitter, and TikTok. This process encompasses over 100,000 inspected websites, ensuring a thorough examination of potential brand copyright infringements.",
        "Upon detection of any infringing content, our expert agents promptly initiate the takedown process by issuing DMCA notices to relevant internet authorities. This dual-layered approach, combining both software and manual scans, allows us to swiftly remove illicit copies of your content. Our strong affiliations with file hosting sites ensure the expedited consideration of DMCA takedown notices, aligning seamlessly with our clients' business policies, albeit limited by DMCA compliance.",
        "Furthermore, our membership in Google's Trusted Copyright Removal Program facilitates the rapid delisting of reported infringing content from Google Search, Google Video, and Google Images. We maintain a perfect track record, successfully removing 100% of reported infringing content, and we extend these efforts to Microsoft Bing as well.",
        "Incorporating advanced technologies such as facial recognition software, machine learning, optical character recognition, and proprietary algorithms, our Artificial Intelligence tools fortify content protection against copyright infringements on Google Images and Google Videos, as well as various social media platforms.",
        "Our dedicated agents conduct manual scans across multiple platforms using specified usernames and chosen keywords, ensuring a proactive approach to copyright protection. This manual scrutiny spans Google Search, Images & Videos, web-streaming sites, forums, file hosting platforms, and major social media platforms including Reddit, Twitter, TikTok, and Instagram.",
        "For content creators and cam models, we offer specialized services that include the provision of DMCA badges for integration into clients' websites or platforms. These badges serve as visual notifications, signaling to potential users that the content is protected by copyright, and legal actions will be taken against copyright violations.",
        "We extend our protection to shield your brand from impersonation, fraudulent accounts, and harassment across various platforms, including Reddit, Instagram, Twitter, TikTok, YouTube, Telegram, Facebook, and Discord.",
        "In recognition of the importance of anonymity, we prioritize the protection of your personal information when filing DMCA complaints. LockLeaks takes extra precautions by utilizing our company's contact information to lodge DMCA complaints on your behalf, safeguarding your identity.",
        "Our monthly analytics and PDF reports provide clients with detailed insights into their content's performance, trends, interactions, and other relevant data. This comprehensive overview aids clients in understanding their content's evolution and devising future strategies.",
        "Additionally, our Username History Recovery & Removal service is designed to provide a historical perspective on content associated with multiple usernames, ensuring the removal of unauthorized or unwanted content, thereby safeguarding the model's online image and security.",
        "The Reverify & Reanalyzer functionality ensures constant monitoring and periodic updates, identifying new copyright infringements or reintroduced content. This guarantees the ongoing discovery and appropriate management of illegal activities, maintaining high-security standards for copyrighted content.",
        "In conclusion, our suite of services, complemented by cutting-edge technology and meticulous manual efforts, significantly reduces the risk of copyright infringements, fortifying the online security and reputation of our clients."
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DOWNLOAD DATA</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full max-md:px-4'>
                <ScrollShadow className="h-[300px]">
                    <div className='flex flex-col'>
                        <div><span className='font-bold text-lg'>Monthly Report - Website</span></div>
                        <div className='font-semibold text-sm mt-5'>
                            <span>FROM 12.02.2.24</span>
                            <span>TO 04.03.2.24</span>
                        </div>
                        <div className='flex flex-col max-w-[440px] mt-5'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Email:</span>
                                <span className='font-semibold text-[18px]'>Example@gmailcom</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Used Usernames: </span>
                                <span className='font-semibold text-[18px]'>Name</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Subscription:</span>
                                <span className='font-semibold text-[18px]'>Info</span>
                            </div>
                        </div>
                        <div className='flex flex-col max-w-[440px] mt-5'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Search Engines:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Ai Face Recognition:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Adult Websites:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Social Media:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Personal Agent:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold text-sm'>Total Hosted Files:</span>
                                <span className='font-semibold text-[18px]'>10</span>
                            </div>
                        </div>
                    </div>
                </ScrollShadow>
            </div>
            <div className='flex flex-col mt-5'>
                <div className='flex font-semibold text-base'>Impact on Security</div>
                <div className='flex flex-col space-y-2'>
                    {
                        description.map((items,index)=>{
                            return(
                                <span key={index} className='font-normal text-sm'>{items}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
