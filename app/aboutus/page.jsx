"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import CustomerReview from '@/src/components/customerReview';

export default function AboutUs() {

    const AboutUsHeader = [
        {
            title: "Mission and Vision",
            content: "LockLeaks is committed to the protection and promotion of creative digital content. We endeavor to provide innovative solutions and high-quality services that guarantee the safety and security of our clients' online content. Our primary goal is to be a trusted partner devoted to safeguarding creativity and copyright rights."
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

                {/* This section for define aboutus header*/}

                <div className="text-center mt-20">
                    <div className='mx-auto'><p className="font-medium text-huge uppercase max-lg:text-3xl">About us</p></div>
                </div>
                <div className="flex mt-10 max-xl:mx-auto max-md:px-3">
                    <div className='flex w-full justify-around max-xl:flex-col max-xl:mx-auto'>
                        {
                            AboutUsHeader.map((description, index) => {
                                return (
                                    <div key={index} className='flex flex-col max-w-sm text-center mt-5'>
                                        <span className='font-medium text-md bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{description.title}</span>
                                        <span className='font-normal text-base mt-5'>{description.content}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* This section for define Innovation and Progress*/}

                <div className='max-lg:px-3'>
                    <div className="mt-24 outline-none flex flex-col rounded-3xl bg-[#0E142B] container justify-between items-center relative px-10 py-20 mx-auto">
                        <div className='flex justify-start w-full'>
                            <div className='px-9 py-6 max-xl:w-full max-xl:text-center'>
                                <div className='max-xl:text-3xl'><span className='font-medium text-5xl mt-3 max-md:text-3xl'>Innovation and</span><p className='bg-gradient-to-r font-medium text-5xl from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-3xl'>Progress</p></div>
                                <div><p className='max-w-[539px] max-xl:mx-auto mt-5'>We focus on constant innovation and progress, continuously adapting to changes in the digital protection field. We are committed to staying updated with the latest technologies and methods to provide efficient and competitive solutions for our clients.</p></div>
                            </div>
                            <div className='max-xl:hidden'>
                                <Image src="assets/setup/message.svg" alt='message' width={300} height={170} className="top-20 right-[460px] absolute" />
                                <Image src="assets/setup/bubble.svg" alt='bubble' width={443} height={404} className="top-0 right-0 absolute" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* This section for define Success Stories or Case Studies*/}

                <div className='max-lg:px-3 mt-20'>
                    <div className='mx-auto text-center max-w-lg uppercase'><span className='font-medium text-5xl max-xl:text-3xl'>Success Stories or Case Studies</span></div>
                    <div className='flex max-xl:flex-col mx-auto max-xl:mx-auto mt-10 container justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 rounded-3xl '>
                        <img src="assets/setup/aboutus.svg" alt="Service" className='max-xl:w-full max-md:hidden' />
                        <div className='px-20 max-md:text-center max-xl:py-10'>
                            <span className='max-w-1/2 justify-center font-normal  text-base max-xl:text-center'>We have had several successful projects where we managed to eliminate pirated content from various platforms, thereby contributing to protecting our clients' image and digital assets. Case studies demonstrate the effectiveness of our solutions and how we addressed specific client needs.</span>
                        </div>
                    </div>
                </div>

                {/* This section for define Team information */}

                <div className='max-lg:px-3 mt-20 text-center'>
                    <div className='mx-auto'><span className='font-medium text-5xl max-xl:text-3xl'>The Team</span></div>
                    <div className='max-w-3xl mx-auto mt-5'><span className='font-normal text-base max-xl:text-center'>Our team comprises dedicated professionals with extensive experience in the digital protection industry. Each member brings a unique set of skills and expertise, contributing to our success and excellence in serving clients.</span></div>
                </div>
            </div>
            <CustomerReview />
        </>
    )
}
