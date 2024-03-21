"use client";
import Image from 'next/image';
import {
    Button, Link, SelectItem, Switch
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Lock, Shine, Complete, Uncomplete, Star, ChevronLeft, ChevronRight, SelectSwitch, UnselectSwitch } from "@/src/utils/Icons";

export default function Checkout() {

    const [isSelected, setSelected] = React.useState(true);
    const [username, setUsername] = React.useState(false);

    const icons = {
        lock: <Lock fill="currentColor" size={16} />,
        left: <ChevronLeft fill="currentColor" size={16} />,
        right: <ChevronRight fill="currentColor" size={16} />,
        shine: <Shine fill="currentColor" size={16} />,
        complete: <Complete fill="currentColor" size={16} />,
        star: <Star fill="currentColor" size={16} />,
        uncomplete: <Uncomplete fill="currentColor" size={16} />,
    };

    const ButtonContent = [
        "1 ( included)", "2 (+$40)", "3 (+$80)", "4 (+$120)", "CUSTOM ( CONTACT US )", "USERNAME "
    ]

    const pricingContent = [
        {
            title: "STARTER",
            monthly_price: "150",
            yearly_price: "405",
            discount: "Discount 10%",
            save_price: "Save $45",
            bg_color: "from-gray-600/40 to-gray-800/40",
            user_name: "1",
            add_propertity: "mt-[72px]",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            social_analyze_status: false,
            adult_analyze_status: false,
            forum_analyze_status: false,
            file_analyze_status: false,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            add_content: "px-10"
        }, {
            title: "PRO",
            monthly_price: "200",
            yearly_price: "510",
            discount: "Discount 15%",
            save_price: "Save $90",
            bg_color: "from-[#F68171] to-[#B759FF]",
            add_propertity: "",
            user_name: "5",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            bing_removal_report_status: true,
            social_analyze_status: true,
            adult_analyze_status: true,
            forum_analyze_status: true,
            file_analyze_status: true,
            AI_analyze_status: true,
            monthly_analyze_status: true,
            add_content: "bg-opacity-10 bg-black/20 rounded-[20px] px-10 py-10"
        },
        {
            title: "STAR",
            monthly_price: "350",
            yearly_price: "840",
            discount: "Discount 20%",
            save_price: "Save $210",
            bg_color: "from-gray-600/40 to-gray-800/40",
            add_propertity: "mt-[72px]",
            content_property: "",
            user_name: "1",
            agent_request: "Personal Agent Requests",
            takedowns: "Unlimited Takedowns",
            daily_report: "Daily Repports",
            badges: "DMCA Badges",
            pdf_report: "Monthly PDF Reports",
            candidential_takedown: "Confidential DMCA Takedown",
            analyzer_tool: "Analyzer Tool Search English",
            reverify_tool: "Reverify & Reanalyzer Tool",
            google_removal_report: "Google Results,Images & Videos Removal Report",
            bing_removal_report: "Bing Results,Images & Videos Removal Report",
            social_analyze: "Social Media Analyzer Tools & Removal  Report",
            adult_analyze: "Adult Tubes Analyzer Tool & Removal Report",
            forum_analyze: "Forums Analyzer & Removal Report",
            file_analyze: "File Host Analyzer tool & Removal Report",
            AI_analyze: "FACE RECGNITION AI ANALYZER & REMOVAL REPORT",
            monthly_analyze: "MONTHLY REPORT DATA ANALYTICS AND INSIGHTS",
            history_content: "Usernames History Content Recovery & Removal Report",
            bing_removal_report_status: true,
            social_analyze_status: true,
            adult_analyze_status: true,
            forum_analyze_status: false,
            file_analyze_status: false,
            AI_analyze_status: false,
            monthly_analyze_status: false,
            add_content: "px-10"
        }
    ]

    const AddUserName = [
        {
            title: "ADD NEW USERNAME",
            description: "We will use your username to identify and report copyright infringements",
            sub_title: "username:",
            input: true,
            LeftButton: "Next",
            RightButton: "Cancel"
        },
        {
            title: "ADD NEW USERNAME",
            description: "We will utilize your profile page URL to establish your ownership of this content.",
            sub_title: "Link:",
            input: true,
            LeftButton: "Save",
            RightButton: "Cancel"
        },
        {
            title: "USERNAMES HISTORY CONTENT RECOVERY & REMOVAL REPORT",
            description: "+$200",
            sub_title: "",
            input: false,
            LeftButton: "Add",
            RightButton: "Skip"
        },
    ]

    return (
        <div className="flex flex-col text-white w-full max-sm:px-3">
            <div className="text-center gap-10 mt-20">
                <p className="font-bold text-7xl max-lg:text-[40px] max-md:justify-center">CHECKOUT</p>
            </div>
            <div className='bg-gradient-to-tr w-1/2 max-sm:flex-wrap max-sm:w-full mx-auto mt-28 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                <Button radius="full" className={isSelected ? "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} onClick={() => setSelected(true)} size='lg'>
                    Bill Monthly
                </Button>
                <Button radius="full" className={isSelected ? "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" : "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"} onClick={() => setSelected(false)} size='lg'>
                    Bill Yearly
                </Button>
            </div>
            <div className='flex mt-28 w-full gap-3 relative max-xl:flex-col mx-auto justify-center'>
                {
                    pricingContent.map((item, index) => {
                        return (
                            <div key={index} className={'bg-gradient-to-tr  rounded-3xl max-xl:flex-col max-w-[544px] max-xl:mx-auto max-xl:w-full cursor-pointer ' + item.bg_color + " " + item.add_propertity + " max-xl:mt-4 "}>
                                <div>
                                    <div className='p-10'>
                                        {
                                            item.title == "PRO" ?
                                                <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                                    <span className='px-4'>popular</span>
                                                </Button>
                                                :
                                                false
                                        }
                                        <p className='text-center font-medium text-6xl mt-10 max-sm:text-5xl'>{item.title}</p>
                                        <div className='mt-20 flex text-center justify-center'><p className='font-normal text-3xl'>$</p><p className='text-center font-normal text-5xl'>{isSelected ? item.monthly_price : item.yearly_price}</p><p className='pt-5'>{isSelected ? "/MO" : "/3 MO"}</p></div>
                                        {
                                            isSelected != true ?
                                                <div className='flex flex-col mt-10 text-center'>
                                                    <span className='font-normal text-3xl'>{item.discount}</span>
                                                    <span className='font-medium text-5xl max-sm:text-4xl'>{item.save_price}</span>
                                                </div>
                                                : false
                                        }
                                        {
                                            <Link href="/checkout/buy" className='w-full' title='checkout'>
                                                <Button radius="lg" className={`w-full mt-10 border-gray-600 border text-white shadow-lg px-7 py-5 text-lg mx-auto " + ${item.title != "PRO" ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "bg-gradient-to-br from-gray-600/40 to-gray-800/40"}`} size='lg'>
                                                    BUY
                                                </Button>
                                            </Link>
                                        }
                                    </div>
                                    <div className={'flex flex-col gap-y-5 mb-10 ' + item.add_content}>
                                        <div className={'flex justify-between items-center z-10 '}>
                                            <p className='font-semibold text-xl'>USERNAMES : {item.user_name}</p>
                                            <Button radius="full" className="w-1/3 bg-gradient-to-br from-gray-600/40 to-gray-800/40 p-2" size='md'>
                                                ADD EXTRA
                                            </Button>
                                        </div>
                                        <div className='flex items-center max-xl:justify-content'>
                                            <div className='flex gap-7'><p>10/DAY</p> {icons.complete}{item.agent_request}</div>
                                        </div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.agent_request}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.takedowns}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.daily_report}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.badges}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.pdf_report}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.candidential_takedown}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.analyzer_tool}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.reverify_tool}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.google_removal_report}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.bing_removal_report}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.social_analyze_status ? icons.complete : icons.uncomplete}</div>{item.social_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.adult_analyze_status ? icons.complete : icons.uncomplete}</div>{item.adult_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.forum_analyze_status ? icons.complete : icons.uncomplete}</div>{item.forum_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.file_analyze_status ? icons.complete : icons.uncomplete}</div>{item.file_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.AI_analyze_status ? icons.complete : icons.uncomplete}</div>{item.AI_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{item.monthly_analyze_status ? icons.complete : icons.uncomplete}</div>{item.monthly_analyze}</div>
                                        <div className='flex gap-7 max-sm:flex-col'><div>{icons.complete}</div>{item.history_content}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center mx-auto mt-32 gap-10 max-xl:flex-col max-md:mx-auto max-md:px-3'>
                <div className="flex bg-white/5 shadow-sm rounded-[20px] max-w-[720px] w-full flex-col gap-4 p-20 max-sm:p-10">
                    <p className='font-medium text-6xl mt-3'>ORDER</p>
                    <div className='flex flex-col'>
                        <p>Tell Us Jow Many Usernames You're Using.</p>
                        <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                            <option>1 INCLUDED</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </div>
                    <div>
                        <p>Tell Us Jow Many Usernames You're Using.</p>
                        <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                            <option>1 INCLUDED</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col bg-gradient-to-tr mx-auto from-purple-light to-purple-weight rounded-[20px] p-5 cursor-pointer text-center max-lg:mx-auto">
                    <div className='mt-5'>
                        <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                            <span className='px-4'>popular</span>
                        </Button>
                    </div>
                    <div className='p-7 text-center flex flex-col justify-center'>
                        <p className='font-bold text-6xl mt-3'>STAR</p>
                        <p className='font-normal text-5xl mt-10'>$350</p>
                        <p className='font-bold text-3xl'>/MO</p>
                        <p className='font-normal text-base mt-5'>YOU ARE FREE TO CANCEL AT ANY TIME</p>
                        <p className='font-normal text-base'>+ PRICE FROM EXTRA USERNAMES + ADDON CAM MODELS</p>
                    </div>
                </div>
            </div>
            <div className='mt-20 flex mx-auto justify-center gap-80 max-2xl:gap-0 max-xl:flex-col max-md:px-3'>
                <div className='flex-col flex mx-auto'>
                    <p className='font-medium text-3xl'>ADD NEW USERNAME</p>
                    {
                        ButtonContent.map((item, index) => {
                            return (
                                <Button key={index} className="rounded-[10px] mt-5 w-[327px] bg-gradient-to-tr mx-auto from-purple-light to-purple-weight text-white text-base" size='md'>
                                    {item}
                                    <span>{icons.shine}</span>
                                </Button>
                            )
                        })
                    }
                    <Button className="rounded-[10px] mt-5 w-[327px] bg-gradient-to-tr mx-auto from-gray-600/40 to-gray-800/40 text-white text-base" size='md'>
                        Add New
                        <span>{icons.shine}</span>
                    </Button>
                    <Image src="assets/robert.svg" width={320} height={400} alt='robert' className='mt-40 bg-opacity-90' />
                </div>
                <div className='flex flex-col gap-5'>
                    {
                        AddUserName.map((content, index) => {
                            return (
                                <div key={index} className="flex bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 cursor-pointer w-full max-w-[724px] flex-col border border-gray-700 py-20 px-10 ">
                                    <p className='font-medium text-[34px] text-center'>{content.title}</p>
                                    <p className={content.input == true ? 'mt-3' : "text-center"}>{content.description}</p>
                                    <div className="flex w-full flex-col gap-4 mt-10">
                                        <p className='flex justify-start'>{content.sub_title}</p>
                                        <div className='flex'>
                                            {
                                                <div className={content.input != true ? 'hidden' : "w-full flex"}>
                                                    <div className="flex flex-col gap-2">
                                                        <Switch
                                                            defaultSelected
                                                            size="lg"
                                                            color="default"
                                                            thumbIcon={({ isSelected, className }) =>
                                                                isSelected ? (
                                                                    <SelectSwitch className={className} />
                                                                ) : (
                                                                    <UnselectSwitch className={className} />
                                                                )
                                                            }
                                                        >
                                                        </Switch>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder='Type here'
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
                                                        required
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='bg-gradient-to-tr max-sm:flex-wrap max-sm:w-full mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                                        <Button radius="full" className={username ? "bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} size='lg' onClick={() => setUsername(true)}>
                                            {content.LeftButton}
                                        </Button>
                                        <Button radius="full" className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" size='lg'>
                                            {content.RightButton}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex bg-gradient-to-br mt-20 text-center mx-auto from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 flex-col w-full border border-gray-700 max-w-[1389px] py-20 px-5">
                <p className='font-medium text-[34px] text-center'>PAYMENT</p>
                <p className='mt-3 font-normal text-base'>We utilize Paddle as our payment processing platform. Paddle ensures secure payment transactions.
                    Follow the on-screen instructions to complete your purchase securely. Please note, additional VAT costs may apply based on your location.
                    This charge will be billed at regular intervals until you opt to cancel the automatic renewal.
                </p>
                <div className='bg-gradient-to-tr mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-2 border-gray-600 border rounded-[30px] max-w-[676px] gap-3 flex max-md:flex-col items-center'>
                    <Button radius="full" className="mx-auto bg-transparent text-white shadow-lg px-7 py-7 max-md:flex-wrap text-lg" size='lg'>
                        Pay whith credit card
                    </Button>
                    <Button radius="full" className=" bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-7 text-lg" size='lg'>
                        Pay whith paypal
                    </Button>
                    <Button radius="full" className=" bg-transparent mx-auto px-7 py-7 text-lg" size='lg'>
                        Request fan support
                    </Button>
                </div>
            </div>
            <div className='max-w-[1420px] w-full mx-auto text-start mt-20 mb-40 max-md:px-3'>
                <p className='font-normal text-base'>We're utilizing Paddle for payment processing. What is Paddle? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
                <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
            </div>
        </div >
    )
}
