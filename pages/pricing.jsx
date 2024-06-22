"use client";
import Image from 'next/image';
import {
    Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure
} from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Shine, Star, ChevronLeft, ChevronRight, ArrowDown } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';
import Complete from "@/public/assets/background/complete.svg";
import Uncomplete from "@/public/assets/background/uncomplete.svg";
import Info from "@/public/assets/info.svg"
import { useRouter } from 'next/router';
import { Crisp } from 'crisp-sdk-web';
import { getUserInfo } from "@/axios/auth";
import { getAccessToken, getCookieValue, setTokensExpired } from "@/axios/token";

export default function Pricing() {

    const [userInfo, setUserInfo] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isPricingSelected, setPricingSelected] = React.useState('monthly');
    const [selectServiceList, setSelectServiceList] = React.useState(-1);
    const [selectMoreContent, setSelectMoreContent] = useState("");

    const router = useRouter();

    const icons = {
        left: <ChevronLeft />,
        right: <ChevronRight />,
        shine: <Shine />,
        star: <Star />,
        arrowDown: <ArrowDown />,
        complete: () => <Complete />,
        uncomplete: () => <Uncomplete />,
        info: () => <Info />,
    };

    const pricingContent = [
        {
            title: "STARTER",
            value: 'starter',
            monthly_price: "150",
            yearly_price: "405",
            discount: "Discount 10%",
            plan_deadline: 1,
            save_price: "Save $45",
            bg_color: "from-gray-600/40 to-gray-800/40",
            user_name: "1",
            add_propertity: "mt-[72px]",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Reports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search",
            reverify_tool: "Re-verify & Re-analyzer Tool",
            google_removal_report: "Google Results, Images & Videos Removal Report",
            bing_removal_report: "Bing Results, Images & Videos Removal Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer Tool & Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal Report",
            social_submit: "Social Media Submit & Removal Report",
            AI_analyze: "Face Recognition AI Analyzer & Removal Report",
            monthly_analyze: "Monthly Report Data Analytics and Insights",
            history_content: "Usernames History Content Recovery & Removal Report",
            copyright_certification: "Copyright Certification",
            social_analyze_status: false,
            social_submit_status: false,
            adult_analyze_status: false,
            forum_analyze_status: false,
            file_analyze_status: false,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            recovery_report_status: false,
            history_status: false,
            copyright_certification_status: false,
            add_content: "px-3"
        }, {
            title: "STAR",
            value: 'star',
            monthly_price: "350",
            yearly_price: "840",
            plan_deadline: 5,
            discount: "Discount 15%",
            save_price: "Save $210",
            bg_color: "from-[#ad553b] to-[#c879e0]",
            add_propertity: "",
            user_name: "5",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Reports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search",
            reverify_tool: "Re-verify & Re-analyzer Tool",
            google_removal_report: "Google Results, Images & Videos Removal Report",
            bing_removal_report: "Bing Results, Images & Videos Removal Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer Tool & Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal Report",
            social_submit: "Social Media Submit & Removal Report",
            AI_analyze: "Face Recognition AI Analyzer & Removal Report",
            monthly_analyze: "Monthly Report Data Analytics and Insights",
            history_content: "Usernames History Content Recovery & Removal Report",
            copyright_certification: "Copyright Certification",
            bing_removal_report_status: true,
            social_analyze_status: true,
            social_submit_status: true,
            adult_analyze_status: true,
            forum_analyze_status: true,
            file_analyze_status: true,
            AI_analyze_status: true,
            monthly_analyze_status: true,
            recovery_report_status: true,
            history_status: true,
            copyright_certification_status: true,
            add_content: "bg-opacity-50 bg-black/40 rounded-[20px] px-3 py-3"
        },
        {
            title: "PRO",
            value: 'pro',
            monthly_price: "200",
            yearly_price: "510",
            discount: "Discount 20%",
            plan_deadline: 3,
            save_price: "Save $90",
            bg_color: "from-gray-600/40 to-gray-800/40",
            add_propertity: "mt-[72px]",
            content_property: "",
            user_name: "3",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Reports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search",
            reverify_tool: "Re-verify & Re-analyzer Tool",
            google_removal_report: "Google Results, Images & Videos Removal Report",
            bing_removal_report: "Bing Results, Images & Videos Removal Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer Tool & Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal Report",
            social_submit: "Social Media Submit & Removal Report",
            AI_analyze: "Face Recognition AI Analyzer & Removal Report",
            monthly_analyze: "Monthly Report Data Analytics and Insights",
            history_content: "Usernames History Content Recovery & Removal Report",
            copyright_certification: "Copyright Certification",
            bing_removal_report_status: true,
            social_analyze_status: false,
            social_submit_status: true,
            adult_analyze_status: true,
            forum_analyze_status: true,
            file_analyze_status: true,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            recovery_report_status: false,
            copyright_certification_status: false,
            history_status: false,
            add_content: "px-3"
        }
    ]

    const princingMoreDetais = [
        {
            title: "Personal Agent Requests",
            content: "The 'Personal Agent Requests' feature enables you to directly interact with our specialized agents for personalized assistance. An agent will promptly review your request and provide tailored responses or solutions to address your needs. This feature offers individualized support, ensuring you receive the assistance necessary to enhance your experience with our services."
        },
        {
            title: "Unlimited Takedowns",
            content: "The 'Unlimited Takedowns' feature empowers you to swiftly remove infringing content without limitations. With this feature, you can efficiently address copyright violations across various platforms. Enjoy the freedom to initiate takedown requests without constraints, ensuring that your content remains protected and your rights upheld."
        },
        {
            title: "Daily Reports",
            content: "The 'Daily Reports' feature provides you with comprehensive insights into your platform's performance delivered directly to your panel and email inbox. Stay informed about key metrics, trends, and activities, allowing you to make informed decisions and optimize your strategies effectively. Receive regular updates effortlessly, ensuring you stay ahead of the curve and maximize the potential of your platform."
        },
        {
            title: "DMCA Badges",
            content: "The 'DMCA Badges' feature offers visible indicators that your content is safeguarded by copyright and adheres to DMCA (Digital Millennium Copyright Act) regulations. These badges serve as a warning to potential infringers, signaling that your content is legally protected, and any unauthorized use will face legal consequences. Display these badges prominently on your platform to reinforce your commitment to copyright protection."
        },
        {
            title: "Monthly PDF Reports",
            content: "The 'Monthly PDF Reports' feature delivers detailed insights into your platform's performance directly to your inbox in PDF format. Stay up-to-date with key analytics, trends, and interactions, empowering you to make data-driven decisions and optimize your strategies effectively. Receive comprehensive reports effortlessly, ensuring you have the information you need to track progress and drive success for your platform."
        },
        {
            title: "Confidential DMCA Takedown",
            content: "The 'Confidential DMCA Takedown' feature ensures discreet removal of infringing content while protecting your privacy. Our dedicated team handles takedown requests with utmost confidentiality, safeguarding your personal information throughout the process. Rest assured that your rights are upheld without compromising your privacy, allowing you to address copyright violations discreetly and effectively."
        },
        {
            title: "Re-verify & Re-analyzer Tool",
            content: "This functionality involves repetitive scans and periodic updates to identify and evaluate any new copyright infringements or reintroduced content. It ensures constant monitoring of illegal activities and helps rediscover previously undetected content, ensuring all violations are appropriately managed and eliminated, maintaining high-security standards for copyrighted content.what need be here"
        },
        {
            title: "Analyzer Tool Search",
            content: "The 'Analyzer Tool Search' feature offers in-depth analysis and insights into your content's online visibility. Utilize this tool to search for mentions, reviews, and interactions across various platforms. Gain valuable insights to understand audience sentiment, track engagement, and refine your content strategy effectively. With the Analyzer Tool Search, stay informed about your content's performance and take proactive steps to enhance your online presence."
        },
        {
            title: "Google Results, Images & Videos Removal Report",
            content: "The 'Google Results, Images & Videos Removal Report' provides detailed documentation of the removal process for content across Google search results, images, and videos. This report offers comprehensive insights into the status and effectiveness of removal requests, allowing you to track the progress and results of content removal efforts. Stay informed about the management of your online presence and ensure that unauthorized content is promptly addressed and removed from Google's platforms."
        },
        {
            title: "Bing Results, Images & Videos Removal Report",
            content: "The 'Bing Results, Images & Videos Removal Report' offers comprehensive documentation of the removal process for content across Bing search results, images, and videos. This report provides detailed insights into the status and outcomes of removal requests, enabling you to monitor the effectiveness of content removal efforts. Stay informed about the management of your online presence and ensure that unauthorized content is promptly addressed and removed from Bing's platforms."
        },
        {
            title: "Adult Tubes Analyzer Tool & Removal Report",
            content: "The 'Adult Tubes Analyzer Tool & Removal Report' offers specialized analysis and documentation for content across Adult Tubes. Utilize these tools to monitor and analyze your presence on adult platforms, including mentions, interactions, and reviews. Additionally, gain detailed reports on the content removal process, ensuring swift and effective removal of unauthorized or harmful content from adult tube sites. Stay informed about your online presence in adult spaces and take proactive steps to manage and protect your content effectively."
        },
        {
            title: "Forums Analyzer & Removal Report",
            content: "The 'Forums Analyzer & Removal Report' provides detailed analysis and documentation of your presence on online forums. Utilize these tools to monitor discussions, mentions, and interactions across various forum platforms. Additionally, gain insights into the content removal process with comprehensive reports, ensuring that unauthorized or harmful content is swiftly addressed and removed from forums. Stay informed about your online reputation and take proactive steps to manage and protect your brand image effectively on forum communities."
        },
        {
            title: "File Host Analyzer Tool & Removal Report",
            content: "The 'File Host Analyzer Tool & Removal Report' offers comprehensive analysis and documentation for content hosted on file sharing platforms. Utilize these tools to monitor and analyze the distribution of your content across various file hosting services. Additionally, gain detailed reports on the content removal process, ensuring swift and effective removal of unauthorized or harmful content from file hosting platforms. Stay informed about the distribution of your content and take proactive steps to protect your intellectual property rights and brand image."
        },
        {
            title: "Social Media Analyzer Tools & Removal Report",
            content: "The 'Social Media Analyzer Tools & Removal Report' provides a comprehensive analysis of your social media presence and offers insights into content removal processes. Utilize these tools to monitor mentions, engagements, and reviews across various social media platforms. Additionally, gain detailed documentation of the content removal process, ensuring that unauthorized or harmful content is swiftly addressed and removed from social media channels. Stay informed about your online reputation and take proactive steps to manage and protect your brand image effectively."
        },
        {
            title: "Social Media Submit & Removal Report",
            content: "The 'Social Media Submit & Removal Report' empowers users to manage their social media presence by providing detailed insights and tools for content removal. Users can manually report impersonator accounts they find, and our system will ensure these accounts are promptly reported to the respective social media platforms. Monitor mentions, engagements, and reviews across various channels, and stay informed about your online reputation. Protect your brand from fraudulent accounts, impersonators, and harassment on various platforms, ensuring a secure and positive online presence."
        },
        {
            title: "Face Recognition AI Analyzer & Removal Report",
            content: "The 'Face Recognition AI Analyzer & Removal Report' offers comprehensive analysis and documentation for content flagged by facial recognition AI systems. Utilize these tools to monitor and analyze instances of your content being flagged or identified across various platforms. Additionally, gain detailed reports on the content removal process, ensuring swift and effective removal of unauthorized or harmful content flagged by facial recognition AI. Stay informed about the presence of your content and take proactive steps to protect your privacy and online reputation."
        },
        {
            title: "Monthly Report Data Analytics and Insights",
            content: "The 'Monthly Report Data Analytics and Insights' provides a comprehensive overview of your platform's performance, offering detailed analytics and valuable insights. Utilize this report to track key metrics, identify trends, and make data-driven decisions to optimize your strategies effectively. Stay informed about your platform's progress and leverage insights to drive growth and success.on features, search."
        },
        {
            title: "Usernames History Content Recovery & Removal Report",
            content: "The 'Usernames History Content Recovery & Removal Report' offers a detailed account of the recovery and removal process for content associated with multiple usernames. Utilize this report to track the recovery and removal of unauthorized or unwanted content linked to specific usernames across various platforms. Gain insights into the effectiveness of content removal efforts and take proactive steps to safeguard your online image and security.popups finished."
        },
        {
            title: "Copyright Certification",
            content: "We assist you in becoming a registered copyright holder, ensuring that your content is legally recognized as yours. Your copyright certificate will be valid as evidence in court in 183 countries."
        },
    ]

    const selectMoreDetails = (data) => {
        setSelectMoreContent(data);
        onOpenChange(!isOpen)
        onOpen();
    }

    useEffect(() => {
        (async () => {
            try {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    const res = await getUserInfo();
                    if (res.status == 'success') {
                        setUserInfo(res.data);
                    }
                    else {
                        window.open("/", "_self");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <>
            <div className="flex flex-col text-white w-full container max-md:px-3 mx-auto">

                {/* This section for define pricing page header*/}

                <div className="text-center gap-10 mt-10 max-sm:mt-5">
                    <p className="font-bold text-7xl max-lg:text-4xl max-md:justify-center">PRICING</p>
                </div>

                {/* This section for define pricing page content*/}

                <div className='flex justify-between max-md:justify-center max-sm:flex-col gap-5 mt-10 z-10'>
                    <div className='flex flex-col'>
                        <span className='text-center font-medium text-xl'>special offer for agency and business</span>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr mx-auto from-[#c775e0] to-[#c233af] border-gray-600 border text-white mt-5 shadow-lg px-5 py-3 text-sm"
                            size='md'
                            onClick={() => {
                                Crisp.chat.open();
                            }}
                        >
                            <span>Access Special offer! </span>{icons.shine}
                        </Button>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-center font-medium text-xl'>how can fans gift you a plan</span>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr bg-transparent from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border mx-auto px-7 py-5 text-sm mt-5"
                            size='md'
                        >
                            <span>Request fan support </span> {icons.shine}
                        </Button>
                    </div>
                </div>
                <div className='flex mx-auto mt-32 max-md:mt-20'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 left-0 bg-[#362666] bg-opacity-5 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl' />
                    <span className="font-medium text-5xl max-lg:text-4xl">PRICING TABLE</span>
                </div>
                <div className='bg-gradient-to-tr w-1/2 max-lg:w-full max-lg:mt-16 max-sm:flex-wrap max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                    <Button
                        radius="full"
                        className={isPricingSelected == 'monthly' ? "bg-gradient-to-tr mx-auto w-1/2 from-[#c879e0] to-[#ce28dd] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"}
                        onClick={() => setPricingSelected('monthly')}
                        size='lg'
                    >
                        <span>Bill Monthly</span>
                    </Button>
                    <Button
                        radius="full"
                        className={isPricingSelected == 'monthly' ? "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" : "bg-gradient-to-tr mx-auto w-1/2 from-[#c879e0] to-[#ce28dd] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"}
                        onClick={() => setPricingSelected('quarterly')}
                        size='lg'
                    >
                        <span>Bill Quarterly</span>
                    </Button>
                </div>

                {/* This section for define chechout page content*/}

                <div className='flex mt-28 max-lg:mt-20 w-full gap-3 relative max-xl:flex-col mx-auto justify-center'>
                    {
                        pricingContent.map((item, index) => {
                            return (
                                <div key={index} className={'bg-gradient-to-tr relative z-10 rounded-3xl max-xl:flex-col max-w-[544px] max-xl:mx-auto max-xl:w-full cursor-pointer px-3 ' + item.bg_color + " " + item.add_propertity + " max-xl:mt-4 "}>
                                    <div>
                                        <div className='p-10 '>
                                            {
                                                item.title == "STAR" ?
                                                    <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                                        <span className='px-4'>popular</span>
                                                    </Button>
                                                    :
                                                    false
                                            }
                                            <p className='text-center font-medium text-6xl mt-10'>{item.title}</p>
                                            <div className='mt-10 flex text-center justify-center'><p className='font-normal text-3xl'>$</p><p className='text-center font-normal text-5xl'>{isPricingSelected == 'monthly' ? item.monthly_price : item.yearly_price}</p><p className='pt-5'>{isPricingSelected ? "/MO" : "/3 MO"}</p></div>
                                            {
                                                isPricingSelected == 'quarterly' ?
                                                    <div className='flex flex-col mt-10 text-center'>
                                                        <span className='font-normal text-3xl'>{item.discount}</span>
                                                        <span className='font-medium text-5xl max-sm:text-4xl'>{item.save_price}</span>
                                                    </div>
                                                    : false
                                            }
                                            {
                                                item.title == "STAR" ?
                                                    <Button
                                                        radius="lg"
                                                        className={"w-full mt-10 bg-gradient-to-tr mx-auto border-gray-600 border text-white shadow-lg px-7 py-5 text-lg from-gray-600/40 to-gray-800/40" }
                                                        size='lg'
                                                        onClick={() => router.push(`/checkout?plan=${item.value}&period=${isPricingSelected}`)}
                                                        isDisabled={userInfo?.subscription?.plan_id == 4}
                                                    >
                                                        {userInfo?.subscription?.plan_id == 4 ? <span>ACTIVE</span> : !userInfo?.subscription?.plan_id ? <span>BUY</span> : <span>UPGRADE</span>}
                                                    </Button>
                                                    :
                                                    item.title == "PRO" ?
                                                        <Button
                                                            radius="lg"
                                                            className={"w-full mt-10 bg-gradient-to-tr mx-auto border-gray-600 border text-white shadow-lg px-7 py-5 text-lg " + ( userInfo?.subscription?.plan_id == 3 ? "from-gray-600/40 to-gray-800/40" : "from-[#aa7fe2] to-[#ec4d1d]" )  }
                                                            size='lg'
                                                            onClick={() => router.push(`/checkout?plan=${item.value}&period=${isPricingSelected}`)}
                                                            isDisabled={userInfo?.subscription?.plan_id == 3}
                                                        >
                                                            {userInfo?.subscription?.plan_id == 3 ? <span>ACTIVE</span> : !userInfo?.subscription?.plan_id ? <span>BUY</span> : userInfo?.subscription?.plan_id < 3 ? <span>UPGRADE</span> : <span>DOWNGRADE</span>}
                                                        </Button>
                                                        :
                                                        <Button
                                                            radius="lg"
                                                            className={"w-full mt-10 bg-gradient-to-tr mx-auto border-gray-600 border text-white shadow-lg px-7 py-5 text-lg " + ( userInfo?.subscription?.plan_id == 2 ? "from-gray-600/40 to-gray-800/40" : "from-[#aa7fe2] to-[#ec4d1d]" )  }
                                                            size='lg'
                                                            onClick={() => router.push(`/checkout?plan=${item.value}&period=${isPricingSelected}`)}
                                                            isDisabled={userInfo?.subscription?.plan_id == 2}
                                                        >
                                                            {userInfo?.subscription?.plan_id == 2 ? <span>ACTIVE</span> : !userInfo?.subscription?.plan_id ? <span>BUY</span> : userInfo?.subscription?.plan_id < 2 ? <span>UPGRADE</span> : <span>DOWNGRADE</span>}
                                                        </Button>
                                            }
                                        </div>
                                        <div className={'flex flex-col gap-3 mb-1 relative ' + item.add_content}>
                                            <p className='font-semibold text-xl px-4'>USERNAMES : {item.user_name}</p>
                                            <div>
                                                <Button radius="lg" className="w-full bg-gradient-to-br bg-transparent p-2 gap-5 hidden max-sm:block" size='md' onClick={() => { selectServiceList != index ? setSelectServiceList(index) : setSelectServiceList(-1) }}>
                                                    <div className='flex items-center justify-center'>
                                                        <span className='flex items-center justify-center '>Plan Details</span>
                                                        <span className={selectServiceList == index ? 'rotate-[180deg]' : ''}>{icons.arrowDown}</span>
                                                    </div>
                                                </Button>
                                            </div>
                                            <div className='flex items-center max-xl:justify-content'>
                                                <div className='flex items-center max-sm:hidden px-3 gap-3'>
                                                    <div className='flex w-10 h-5'>
                                                        <div onClick={() => selectMoreDetails(item.agent_request)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                        <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                    </div>
                                                    <span>{item.agent_request}</span>
                                                    <p>{item.plan_deadline}/DAY</p>
                                                </div>
                                            </div>
                                            <div className={("flex flex-col gap-y-5 mb-10 max-sm:space-y-2 px-3 ") + (selectServiceList == index ? "max-sm:block" : "max-sm:hidden")}>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.takedowns)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.takedowns}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.daily_report)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.daily_report}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.badges)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.badges}</div>
                                                </div>
                                                <div className='flex gap-1 items-center'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.pdf_report)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div><div>
                                                    </div>
                                                    <div className='flex pl-1 flex-wrap'>{item.pdf_report}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.candidential_takedown)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.candidential_takedown}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.analyzer_tool)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.analyzer_tool}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.reverify_tool)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.reverify_tool}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.google_removal_report)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.google_removal_report}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.bing_removal_report)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.bing_removal_report}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.adult_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.adult_analyze_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.adult_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.file_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.file_analyze_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.file_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.forum_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.forum_analyze_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.forum_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.social_submit)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.social_submit_status
                                                                    ?
                                                                    <div ><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.social_submit}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.social_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.social_analyze_status
                                                                    ?
                                                                    <div ><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.social_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.AI_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.AI_analyze_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.AI_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.monthly_analyze)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.monthly_analyze_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.monthly_analyze}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.history_content)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.history_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.history_content}</div>
                                                </div>
                                                <div className='flex gap-3 items-center max-sm:gap-2'>
                                                    <div className='cusor-point flex'>
                                                        <div className='flex items-center w-10 h-5'>
                                                            <div onClick={() => selectMoreDetails(item.copyright_certification)}><Image src={Info} width={20} height={20} alt=''></Image></div>
                                                            {
                                                                item.copyright_certification_status
                                                                    ?
                                                                    <div><Image src={Complete} width={25} height={25} alt=''></Image></div>
                                                                    :
                                                                    <div><Image src={Uncomplete} width={25} height={25} alt=''></Image></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-wrap'>{item.copyright_certification}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Modal
                    backdrop="opaque"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    classNames={{
                        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                    }}
                >
                    <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77] py-10 px-5 text-white text-center max-md:absolute max-md:top-32'>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {selectMoreContent}
                                </ModalHeader>
                                <ModalBody>
                                    {
                                        princingMoreDetais.map((detail, index) => {
                                            return (
                                                detail.title == selectMoreContent
                                                    ?
                                                    <span key={index}>{detail.content}</span>
                                                    :
                                                    false
                                            )
                                        })
                                    }
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div >
            <CustomerReview />
        </>
    )
}
