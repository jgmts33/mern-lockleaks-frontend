"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Lock, Shine } from "@/src/utils/Icons";

export default function Pricing() {

    const icons = {
        lock: <Lock fill="currentColor" size={16} />,
        shine: <Shine fill="currentColor" size={16} />,
    };

    const [activePrice, setActivePrice] = useState("");

    return (
        <>
            <div className="flex flex-col text-white w-full container">
                <div className="text-center gap-10 mt-20">
                    <p className="font-bold text-7xl max-lg:text-[40px] max-md:justify-center">PRICING</p>
                </div>
                <div className='flex w-full mt-32 justify-between'>
                    <div className='w-max flex flex-col'>
                        <p className='font-medium text-2xl lowercase'>SPECIAL OFFER FOR AGENCY AND BUSINESS</p>
                        <Button radius="lg" className="mt-5 bg-gradient-to-tr mx-auto from-[#9C3FE4] to-[#C65647] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                            Protect Content Now!
                            <span>{icons.shine}</span>
                        </Button>
                    </div>
                    <div className='w-max flex flex-col'>
                        <p className='font-medium text-2xl lowercase'>HOW CAN FANS GIFT YOU A PLAN?</p>
                        <Button radius="lg" className="mt-5 bg-gradient-to-tr mx-auto from-[#262627] to-[#3a3838] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                            Protect Content Now!
                            <span>{icons.shine}</span>
                        </Button>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <p className='font-medium text-5xl mt-36'>PRICING TABLE</p>
                </div>
                <div className='relative bg-gradient-to-tr mx-auto from-[#262627] to-[#3a3838] border-gray-600 border rounded-full'>
                    <Button radius="lg" className="mt-5 bg-gradient-to-tr mx-auto from-[#9C3FE4] to-[#C65647] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                        Bill Monthly
                        <span>{icons.shine}</span>
                    </Button>
                    <Button radius="lg" className="mt-5 bg-gradient-to-tr mx-auto from-[#262627] to-[#3a3838] border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" size='lg'>
                        Bill Yearly
                        <span>{icons.shine}</span>
                    </Button>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}
