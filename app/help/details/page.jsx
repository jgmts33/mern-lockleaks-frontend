import React from 'react'
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight } from "@/src/utils/Icons";
import Help from '@/public/assets/help.svg';

export default function Details() {

    const icons = {
        search: <Search fill="currentColor" size={16} />,
        collobation: <Collobation fill="currentColor" size={16} />,
        chat: <RecoveryChat fill="currentColor" size={16} />,
        direction: <ArrowRight fill="currentColor" size={16} />,
    };

    return (
        <div className="text-white relative container flex flex-col max-md:px-3" >

            {/* This section for define Help Page Title*/}

            <div className='mt-28 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center max-xl:text-5xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-20 items-center max-w-[1050px] max-md:flex-col'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-3 rounded-lg bg-white text-black'
                        required
                    />
                </div>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg" size='lg'>
                    Search{icons.search}
                </Button>
            </div>
            <div className='flex mx-auto mt-20 max-w-[868px] text-center'>
                <span className='font-medium text-5xl max-xl:text-4xl'>I just purchased a plan. What happens now?</span>
            </div>
            <div className='max-w-[1242px] mx-auto mt-20'>
                <span>
                    Lorem ipsum dolor sit amet consectetur. Nibh commodo sit metus massa ipsum blandit egestas urna. Nunc porttitor sed amet etiam ut porttitor faucibus a. Tincidunt fringilla proin curabitur pulvinar. Amet netus dignissim quis non euismod nunc sit massa. Senectus diam pharetra arcu ultricies enim amet maecenas. Vivamus sagittis ut massa facilisis nec sit ornare varius tristique. Pharetra quis ante id sit volutpat. Et augue sollicitudin quisque scelerisque posuere porta justo ac. Fermentum venenatis felis tellus id. Egestas id lacinia tincidunt amet faucibus pellentesque egestas vel nunc. Vestibulum vitae eget aliquet morbi tincidunt sagittis. Malesuada adipiscing posuere vitae sed elit nec egestas dolor. Hac nibh vulputate id venenatis mattis. Aliquam tristique consectetur vel vestibulum. Quis sollicitudin risus sed enim sed. Ut sollicitudin elit metus eu. A cursus morbi posuere neque nam in nunc. Augue eleifend vestibulum pellentesque consequat amet non ultrices. Maecenas nunc mi ipsum amet malesuada consectetur hac cursus sollicitudin.
                </span>
            </div>
            <div className="flex z-10 backdrop-blur-sm bg-white/5 shadow-sm rounded-[20px] w-full flex-col max-md:p-5 gap-4 text-center mt-20">
                <Image src={Help} width={200} height={150} className='w-full h-full' alt="Modern building architecture" />
            </div>
            <div className='max-w-[432px] mx-auto mt-10'>
                <div className='flex'><span className='font-medium text-3xl text-center'>Was the article helpful?</span></div>
                <div className='flex justify-around mt-5'>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg " size='lg'>
                        Bill Monthly
                    </Button>
                    <Button radius="lg" className="from-gray-800 to-gray-900 border border-gray-950 mx-auto px-7 py-5 text-lg text-white shadow-lg" size='lg'>
                        Bill Yearly
                    </Button>
                </div>
            </div>
            <div className='flex justify-between mt-20 max-xl:justify-around max-sm:flex-col mb-10'>
                <div className='flex flex-col max-sm:mx-auto'>
                    <span className='font-medium text-4xl max-sm:text-center'>Need further assistance? </span>
                    <span>Contact our customer support team now.</span>
                </div>
                <div className='max-sm:mt-10 max-md:mx-auto max-md:justify-center max-lg:items-center max-md:mmx-auto'>
                    <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm" size='md'>
                        Chat Now
                    </Button>
                </div>
            </div> 
        </div>
    )
}
