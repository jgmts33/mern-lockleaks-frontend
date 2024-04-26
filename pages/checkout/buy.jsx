"use client";
import Image from 'next/image';
import {
    Button,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';

export default function BUY() {

    return (
        <div className="flex flex-col text-white w-full">
            <div className='flex justify-center mx-auto mt-32 mb-[10px] max-sm:mt-5 gap-10 max-xl:flex-col max-sm:items-center max-sm:mx-auto max-sm:px-2'>
                <div className="flex bg-white/5 shadow-sm rounded-[20px] w-[720px] max-sm:w-full h-[1252px] max-sm:h-auto flex-col gap-4 px-20 max-sm:px-6 max-sm:pb-6">
                    <p className='font-medium text-6xl mt-20'>ORDER</p>
                    <div className='flex flex-col'>
                        <p className='mt-10'>Tell Us Jow Many Usernames You're Using.</p>
                        <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                            <option>1 INCLUDED</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </div>
                    <div>
                        <p className='mt-10'>Tell Us Jow Many Usernames You're Using.</p>
                        <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                            <option>1 INCLUDED</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col bg-gradient-to-tr mx-auto from-[#dd7272] to-[#7d1eeb] h-[540px] rounded-[20px] z-10 p-5 w-full max-w-[422px] text-center ">
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
        </div >
    )
}
