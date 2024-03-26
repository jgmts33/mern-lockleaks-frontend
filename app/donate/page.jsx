"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Donate() {

    const [selectedAccount, setSelectAccount] = useState(true)

    const DonateContent = [
        {
            content: "Donation is a way to support a project or organization through financial donations. Your contribution will help us develop and improve our activities, making them more accessible and of higher quality for our users."
        }, {
            content: "We thank everyone who is ready to provide us with help and support. Your generosity will help us continue to work and develop, making the world a better and brighter place. Any donation, be it large or small, is appreciated by us and will be well spent for everyone."
        }, {
            content: "If you want to contribute to our activities, you can make a donation through various payment systems or bank transfer. We guarantee transparency and responsible use of all funds received."
        },
    ]

    return (
        <div className="flex flex-col text-white max-sm:px-3">

            {/* This section for define aboutus page header*/}

            <div className="text-center mt-20">
                <div className='mx-auto'><p className="font-medium text-huge uppercase max-lg:text-4xl">lmk price</p></div>
            </div>

            {/* This section for define Innovation and Progress*/}

            <div className='max-lg:px-3'>
                <div className="mt-10 flex flex-col rounded-3xl bg-[#0E142B] container relative px-10 py-20 mx-auto max-w-[calc(100vw-50px)]">
                    <div className='w-[calc(100vw-600px)] max-lg:w-full'>
                        <div className='w-full max-w-[1050px] max-lg:mx-auto'>
                            <div className='flex gap-5'>
                                <div><span className='bg-gradient-to-r font-medium text-5xl from-purple-light to-purple-weight bg-clip-text text-transparent max-xl:text-4xl'>DONATE</span></div>
                                <div><span className='font-medium text-5xl max-xl:text-4xl'>PAGE</span></div>
                            </div>
                            <div className='flex max-w-[588px] py-5'>
                                <ul className='flex flex-col space-y-4'>
                                    {
                                        DonateContent.map((items, index) => {
                                            return (
                                                <li key={index}>{items.content}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='static max-lg:hidden w-full max-w-[553px]'>
                            <Image src="assets/setup/message.svg" alt='message' width={300} height={170} className="top-20 right-96 max-xl:right-80 absolute" />
                            <Image src="assets/setup/bubble.svg" alt='bubble' width={443} height={404} className="absolute top-10 right-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* This section for define Support information */}

            <div className='mt-20 text-center max-sm:px-3'>
                <div className='mx-auto'><span className='font-medium text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-sm:text-2xl'>Thank you for your support and trust! </span></div>
                <div className='mx-auto max-w-[1100px]'><span className='font-medium text-3xl max-sm:text-2xl'>Together we can achieve great success and change the world for the better</span></div>
                <div className='flex mx-auto justify-center mt-10'>
                    <Image src="assets/donate/lock.svg" alt='message' width={150} height={150} />
                </div>
            </div>
            <div className='bg-gradient-to-tr max-sm:w-full mx-auto mt-20 from-gray-600/40 to-gray-800/40 p-1 border-gray-600 border rounded-[30px] max-w-[576px] gap-2 items-center container mb-20'>
                <Button radius="full" className={selectedAccount ? "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg max-sm:text-base" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg max-sm:text-base"} onClick={() => setSelectAccount(true)} size='lg'>
                    PayPal Reddirect
                </Button>
                <Button radius="full" className={selectedAccount ? "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg max-sm:text-base" : "bg-gradient-to-tr mx-auto w-1/2 from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg max-sm:text-base"} onClick={() => setSelectAccount(false)} size='lg'>
                    Buym Ecoffe
                </Button>
            </div>
        </div>
    )
}
