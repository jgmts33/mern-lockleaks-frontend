"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Donate() {

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
        <div className="flex flex-col text-white w-full">

            {/* This section for define aboutus page header*/}

            <div className="text-center mt-20">
                <div className='mx-auto'><p className="font-medium text-huge uppercase max-lg:text-4xl">lmk price</p></div>
            </div>

            {/* This section for define Innovation and Progress*/}

            <div className='max-lg:px-3'>
                <div className="mt-24 flex flex-col rounded-3xl bg-[#0E142B] container relative px-10 py-20 mx-auto">
                    <div className='flex w-full'>
                        <div className='w-full max-w-[1050px]'>
                            <div className='gap-5'><span className='font-medium text-5xl max-xl:text-4xl'>DONATE</span><span className='bg-gradient-to-r font-medium text-5xl from-purple-light to-purple-weight bg-clip-text text-transparent'>PAGE</span></div>
                            <div><p className='max-w-[539px] max-xl:mx-auto mt-5'>We focus on constant innovation and progress, continuously adapting to changes in the digital protection field. We are committed to staying updated with the latest technologies and methods to provide efficient and competitive solutions for our clients.</p></div>
                        </div>
                        <div className='max-lg:hidden w-full max-w-[553px]'>
                            <Image src="assets/setup/message.svg" alt='message' width={300} height={170} className="top-20 right-[460px] max-xl:right-80 absolute" />
                            <Image src="assets/setup/bubble.svg" alt='bubble' width={443} height={404} className="top-0 right-0 absolute" />
                        </div>
                    </div>
                </div>
            </div>

            {/* This section for define Team information */}

            <div className='max-lg:px-3 mt-20 text-center'>
                <div className='mx-auto'><span className='font-medium text-5xl max-xl:text-4xl'>The Team</span></div>
                <div className='max-w-3xl mx-auto mt-5'><span className='font-normal text-base max-xl:text-center'>Our team comprises dedicated professionals with extensive experience in the digital protection industry. Each member brings a unique set of skills and expertise, contributing to our success and excellence in serving clients.</span></div>
            </div>
        </div>
    )
}
