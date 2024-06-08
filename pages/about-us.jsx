"use client";
import Image from 'next/image';
import React from 'react';
import CustomerReview from '@/components/customer-review';

export default function AboutUs() {

    const AboutUsHeader = [
        {
            title: "Mission and Vision",
            content: "Lock Leaks is committed to the protection and promotion of creative digital content. We endeavor to provide innovative solutions and high-quality services that guarantee the safety and security of our clients' online content. Our primary goal is to be a trusted partner devoted to safeguarding creativity and copyright rights."
        }, {
            title: "Experience and Expertise",
            content: "Our team comprises experts with extensive experience in the copyright protection and digital security industry. We are dedicated to using our knowledge to find personalized and effective solutions for each client. Our expertise allows us to quickly identify and manage copyright infringements."
        }, {
            title: "Values and Principles",
            content: "Our values are based on integrity, transparency, and commitment to clients. We respect confidentiality and individual rights, offering personalized and tailored solutions to meet each client's needs. We are dedicated to maintaining high standards of quality and professionalism."
        },
    ]

    return (
        <>
            <div className="flex flex-col text-white w-full">

                {/* This section for define aboutus page header*/}

                <div className="text-center mt-10 max-sm:mt-5">
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-20 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-20 right-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
                    <div className='mx-auto'><p className="font-medium text-huge uppercase max-lg:text-4xl">About us</p></div>
                </div>
                <div className="flex mt-10 max-sm:mt-5 max-xl:mx-auto max-xl:px-3">
                    <div className='flex w-full justify-around max-lg:flex-col max-xl:gap-5 z-10'>
                        {
                            AboutUsHeader.map((description, index) => {
                                return (
                                    <div key={index} className='flex flex-col max-w-sm text-center mt-5'>
                                        <span className='font-medium flex-wrap text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{description.title}</span>
                                        <span className='font-normal flex-wrap text-base mt-5'>{description.content}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* This section for define Innovation and Progress*/}

                <div className='max-lg:px-3'>
                    <div className="mt-24 max-sm:mt-16 flex flex-col rounded-3xl bg-[#0E142B] container relative px-10 py-20 max-sm:py-5 mx-auto">
                        <div className='flex w-full'>
                            <div className='px-9 py-6 max-lg:w-full max-xl:text-center max-xl:px-0 max-xl:w-1/3'>
                                <div><span className='font-medium text-5xl mt-3 max-xl:text-4xl'>Innovation and</span><p className='bg-gradient-to-r font-medium text-5xl from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-4xl !leading-normal'>Progress</p></div>
                                <div><p className='max-w-[539px] max-xl:mx-auto mt-5'>We focus on constant innovation and progress, continuously adapting to changes in the digital protection field. We are committed to staying updated with the latest technologies and methods to provide efficient and competitive solutions for our clients.</p></div>
                            </div>
                            <div className='max-lg:hidden max-xl:w-2/3'>
                                <Image src="assets/setup/message.svg" alt='message' width={300} height={170} className="top-20 right-[460px] max-xl:right-80 absolute" />
                                <Image src="assets/setup/bubble.svg" alt='bubble' width={443} height={404} className="top-0 right-0 absolute" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={1033} height={542} className='absolute bg-[#935ee9] z-0 -top-96 right-0 bg-opacity-5 blur-3xl' />
                </div>

                {/* This section for define Success Stories or Case Studies*/}

                <div className='max-lg:px-3 mt-20 z-10'>
                    <div className='mx-auto text-center max-w-lg uppercase'>
                        <span className='font-medium text-5xl max-xl:text-4xl'>Success Stories or Case Studies</span>
                    </div>
                    <div className='flex max-xl:flex-col mx-auto max-xl:mx-auto mt-10 container justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 rounded-3xl '>
                        <Image src="assets/setup/aboutus.svg" width={845} height={311} alt="Service" className='max-xl:w-full' />
                        <div className='px-20 max-md:text-center max-xl:py-10 max-md:px-5'>
                            <span className='max-w-1/2 font-normal text-base max-xl:text-center'>We have had several successful projects where we managed to eliminate pirated content from various platforms, thereby contributing to protecting our clients' image and digital assets. Case studies demonstrate the effectiveness of our solutions and how we addressed specific client needs.</span>
                        </div>
                    </div>
                </div>

                {/* This section for define Team information */}

                <div className='max-lg:px-3 mt-20 text-center'>
                    <div className='mx-auto'><span className='font-medium text-5xl max-xl:text-4xl'>The Team</span></div>
                    <div className='max-w-3xl mx-auto mt-5'><span className='font-normal text-base max-xl:text-center'>Our team comprises dedicated professionals with extensive experience in the digital protection industry. Each member brings a unique set of skills and expertise, contributing to our success and excellence in serving clients.</span></div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
