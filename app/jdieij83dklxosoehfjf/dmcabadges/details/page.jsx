"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React from 'react';
import Saturn from '@/public/assets/background/saturn.svg';
import Fire from '@/public/assets/background/fire.svg';
import Multicolor from '@/public/assets/background/multicolor.svg';

export default function DmcaBadgeDetails() {

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex max-w-[450px] justify-between mt-10 gap-3 max-lg:text-center'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                    Choose File
                </Button>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                    Upload Image
                </Button>
            </div>
            <div className='grid grid-cols-3 gap-10 max-lg:mx-auto max-lg:justify-center max-lg:items-center max-lg:flex-col max-lg:flex max-lg:gap-0'>
                <div>
                    <div className="flex border max-w-[450px] max-md:max-w-full border-gray-500 rounded-[23px] mt-10 cursor-pointer">
                        <Image src={Saturn} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between px-2 pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                            Set Position
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                            Remove
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex shadow-gray-50 max-w-[450px] max-md:max-w-full border border-gray-500 rounded-[23px] mt-10 w-full cursor-pointer">
                        <Image src={Multicolor} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between px-2 pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                            Set Position
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-7 py-5 text-base" size='sm'>
                            Remove
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex shadow-gray-50 max-w-[450px] max-md:max-w-full border border-gray-500 rounded-[25px] mt-10 w-full cursor-pointer">
                        <Image src={Fire} width={250} height={250} className='w-full height-full' alt='saturn' />
                    </div>
                    <div className='flex justify-between px-2 pt-5'>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base" size='sm'>
                            Set Position
                        </Button>
                        <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-7 py-5 text-base" size='sm'>
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
