"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { FirstRecoveryStep, SecondRecoveryStep, ThirdRecoveryStep, FourthRecoveryStep, RecoveryChat } from "@/components/utils/Icons";
import LeftChat from '@/public/assets/recovery/left-chat.svg';
import RightChat from '@/public/assets/recovery/right-chat.svg';
import Photo from '@/public/assets/recovery/photo.svg';
import Shape from '@/public/assets/recovery/shape.svg';
import CustomerReview from '@/components/customer-review';

export default function Recovery() {

    const icons = {
        chat: <RecoveryChat/>,
        firststep: <FirstRecoveryStep/>,
        secondstep: <SecondRecoveryStep/>,
        thirdstep: <ThirdRecoveryStep/>,
        fourthstep: <FourthRecoveryStep/>,
    };

    const RecoveryTitle = {
        title: "Username History Recovery Removal",
        sub_title: "The Username History Recovery & Removal service is exclusively tailored for models on cam platforms and can be adapted for those on OnlyFans. Its primary function is to recover and eliminate content linked to multiple usernames utilized by an individual. This service offers a comprehensive view of content associated with various online identities, enabling the removal of unauthorized or undesired content linked to these identities. Ultimately, this protects the model's online image and security by ensuring the eradication of unwanted or unauthorized content."
    }

    const HelpContent = {
        first_tip: {
            title: "Content Recovery: ",
            content: "Retrieves historical content associated with diverse online identities."
        },
        second_tip: {
            title: "Safeguarding Online Image:  ",
            content: "Protects the model's online reputation and security."
        },
        third_tip: {
            title: "Content Removal:  ",
            content: "Eliminates undesired or unauthorized content linked to specific usernames."
        }
    }

    const BenefitContent = [
        {
            step: icons.firststep,
            content: "Comprehensive content recovery and removal across various online identities."
        }, {
            step: icons.secondstep,
            content: "Enhanced security by eradicating unwanted or unauthorized content linked to specific usernames."
        }, {
            step: icons.thirdstep,
            content: "Protection of the model's online image and reputation through the removal of compromising content."
        }, {
            step: icons.fourthstep,
            content: "Adaptability for models on cam platforms and customization for use on OnlyFans to ensure effective content control."
        }
    ]

    const FAQContent = [
        {
            step: icons.chat,
            title: "Can this service remove content across multiple platforms?",
            content: "Yes, it can retrieve and eliminate content associated with various online platforms."
        }, {
            step: icons.chat,
            title: "How long does the process take?",
            content: "The duration varies based on the amount and nature of content to be removed."
        }, {
            step: icons.chat,
            title: "Is this service adaptable for OnlyFans users?",
            content: "Yes, it is specifically designed for models on cam platforms but can be customized for OnlyFans usage."
        }
    ]

    const TipContent = [
        {
            step: icons.firststep,
            title: "Frequent Review:",
            content: "Regularly check and review your online identities for any unauthorized or unwanted content."
        }, {
            step: icons.secondstep,
            title: "Timely Action:",
            content: "Take prompt action upon detecting content linked to multiple usernames that compromises your image or security."
        }, {
            step: icons.thirdstep,
            title: "Professional Assistance:",
            content: "Seek professional support for thorough content removal and protection strategies."
        }
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define username recovery header*/}

                <div className='mt-10 max-sm:mt-5'>
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-0 left-0 bg-opacity-5 blur-3xl' />
                    <p className='font-medium text-5xl uppercase text-center max-md:text-4xl'>{RecoveryTitle.title}</p>
                    <div className='flex gap-20 items-center justify-between max-w-[1300px] mx-auto max-xl:px-5 max-lg:flex-col max-md:gap-10'>
                        <div className='max-w-[612px] mt-20 max-sm:mt-10'>
                            <p className='font-normal text-base'>{RecoveryTitle.sub_title}</p>
                        </div>
                        <div className='font-medium text-7xl mt-0 max-md:w-52 max-md:h-24'>
                            <Image src="/assets/logo.svg" width={300} height={150} alt="logo" />
                        </div>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-0 right-40 bg-opacity-5 blur-3xl' />
                    </div>
                </div>
                <div className='flex relative mx-auto'>
                    <p className='font-medium text-5xl text-center mt-36 max-md:mt-5 max-lg:mt-10 max-md:text-3xl'>How It Helps</p>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-0 left-72 bg-opacity-5 blur-3xl' />
                </div>
                <div className='flex flex-col mx-auto max-w-[1400px] mt-20 max-xl:px-5'>
                    <div className='flex max-lg:flex-col max-lg:items-center max-lg:text-center'>
                        <div className='max-w-[583px]'>
                            <p className='font-medium text-5xl max-sm:text-3xl pb-5 max-md:text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{HelpContent.first_tip.title}</p>
                            <p className='font-medium text-3xl max-sm:text-base'>{HelpContent.first_tip.content}</p>
                        </div>
                        <div className='mt-24 max-xl:hidden'>
                            <Image alt='left-chat' src={LeftChat} />
                        </div>
                        <div className='max-w-[673px] mt-32 max-md:mt-10 justify-end max-lg:mt-10'>
                            <p className='font-medium text-5xl max-sm:text-3xl pb-5 max-md:text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{HelpContent.second_tip.title}</p>
                            <p className='font-medium text-3xl max-sm:text-base'>{HelpContent.second_tip.content}</p>
                        </div>
                    </div>
                    <div className='flex mt-5 max-md:mt-10 max-md:text-center max-md:mx-auto'>
                        <div className='relative max-w-[623px] ml-20 max-md:ml-0 z-10'>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8d51ee] z-0 top-0 -left-10 bg-opacity-5 blur-3xl' />
                            <p className='z-10 font-medium text-5xl max-sm:text-3xl pb-5 max-md:text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{HelpContent.third_tip.title}</p>
                            <p className='z-10 font-medium text-3xl max-sm:text-base'>{HelpContent.third_tip.content}</p>
                        </div>
                        <div className='flex relative max-xl:hidden'>
                            <Image alt='right-chat' className='mt-40' src={RightChat} />
                            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8b4cf1] z-0 top-0 left-44 bg-opacity-5 blur-3xl' />
                            <Image alt='photo' className='absolute left-40' src={Photo} />
                        </div>
                    </div>
                </div>

                {/* This section for define benefit content*/}
                
                <div className='flex flex-col w-[calc(100vw-30px)] bg-white/5 mx-auto justify-around mt-10 px-3 py-20 gap-20 max-xl:flex-col items-center'>
                    <span className='font-medium text-5xl max-md:text-4xl'>BENEFITS</span>
                    <div className='flex max-lg:px-3 max-w-[1076px] justify-between w-full max-md:flex-col mx-auto'>
                        <div className='flex'><Image src={Shape} width={200} height={200} className='mx-auto mb-10' alt='moon' /></div>
                        <div className='flex p-5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 rounded-e-3xl'>
                            <div className='flex flex-col mx-auto justify-center'>
                                {
                                    BenefitContent.map((benefit, index) => {
                                        return (
                                            <div key={index} className='flex items-center py-3 max-w-[512px] gap-3 max-xl:pt-10'>
                                                <span>{benefit.step}</span>
                                                <span className='font-medium'>{benefit.content}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* This section for define  username recovery header*/}

                <div className='flex flex-col justify-center mx-auto mt-20 max-sm:px-3 relative'>
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={433} height={250} className='max-2xl:hidden absolute bg-[#935ee9] z-0 top-0 -right-96 bg-opacity-5 blur-3xl' />
                    <span className='font-medium text-5xl text-center max-sm:text-4xl'>Tips for Use</span>
                    {
                        TipContent.map((tips, index) => {
                            return (
                                <div key={index} className='flex max-w-[612px] mt-20 max-sm:mt-8 gap-2'>
                                    <span>{tips.step}</span>
                                    <div className=''>
                                        <span className='bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent font-medium text-lg max-sm:text-base'>{tips.title}</span>
                                        <span className='font-medium text-lg max-sm:text-base'>{tips.content}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define FAQ for username recovery*/}

                <div className='font-medium text-5xl mt-16 max-sm:text-4xl max-sm:mt-10'><p className='font-medium text-5x text-center'>FAQ</p></div>
                <div className='flex gap-32 mt-10 max-lg:px-3'>
                    <div className='flex mt-10 max-sm:mt-0 gap-10 mx-auto justify-center max-xl:flex-col'>
                        {
                            FAQContent.map((cards, index) => {
                                return (
                                    <div key={index} className="flex max-w-[466px] py-10 bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[20px] p-5 cursor-pointer top-6 mt-6">
                                        <div className='flex flex-col'>
                                            <span>{cards.step}</span>
                                            <p className='font-semibold text-xl mt-5 max-sm:text-lg h-16 max-sm:h-auto'>{cards.title}</p>
                                            <Button className="bg-gradient-to-tr mt-5 bg-white/10 max-w-[88px] rounded-[30px] text-white shadow-lg" size='sm'>
                                                <span>answer:</span>
                                            </Button>
                                            <p className='mt-5 font-normal text-base'>{cards.content}</p>
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
