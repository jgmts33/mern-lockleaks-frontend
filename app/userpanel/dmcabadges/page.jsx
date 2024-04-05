"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React from 'react';
import Saturn from '@/public/assets/background/saturn.svg';
import Fire from '@/public/assets/background/fire.svg';
import Multicolor from '@/public/assets/background/multicolor.svg';

export default function DmcaBadges() {

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">

            {/* This section for define dmcabadges header?*/}

            <div className='mt-5 max-lg:mx-auto max-lg:mt-0'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex flex-col mt-10 gap-3 max-lg:text-center'>
                <span className='font-normal text-xs text-white/65'>Click the "Download Badge" button to download the DMCA badge.</span>
                <span className='font-normal text-xs text-white/65'>Press the "Embed Your Badge" button to automatically copy the embed code for your website.</span>
            </div>

            {/* This section for define dmcabadges content?*/}

            <div className='grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-xl:mx-auto max-xl:justify-center max-xl:items-center max-lg:gap-0'>
                <div className='flex flex-col'>
                    <div className="flex border max-w-[450px] max-md:min-w-full border-gray-500 rounded-[23px] mt-10 cursor-pointer">
                        <Image src={Saturn} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between pt-5 max-md:gap-2'>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-6 py-5 text-base" size='sm'>
                                Download
                            </Button>
                        </div>
                        <div className='flex pr-5'>
                            <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white px-4 shadow-lg py-5 text-base" size='sm'>
                                Embed your badge
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex shadow-gray-50 max-w-[450px] max-md:min-w-full border border-gray-500 rounded-[23px] mt-10 w-full cursor-pointer">
                        <Image src={Multicolor} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between pt-5 max-md:gap-2 max-md:space-x-0 w-full'>
                        <div className='flex'>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-6 py-5 text-base" size='sm'>
                                Download
                            </Button>
                        </div>
                        <div className='flex pr-5'>
                            <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-4 py-5 text-base" size='sm'>
                                Embed your badge
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex shadow-gray-50 max-w-[450px] max-md:min-w-full border border-gray-500 rounded-[25px] mt-10 w-full cursor-pointer">
                        <Image src={Fire} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between pt-5 max-md:gap-2'>
                        <div className='flex'>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-6 py-5 text-base" size='sm'>
                                Download
                            </Button>
                        </div>
                        <div className='flex pr-5'>
                            <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-4 py-5 text-base" size='sm'>
                                Embed your badge
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
