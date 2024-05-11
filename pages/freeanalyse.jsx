"use client"
import React from 'react'
import Image from 'next/image';
import {
  Button, Link
} from '@nextui-org/react';
import AI from '@/public/assets/services/artifical-intelligence.svg';
import SCAN from '@/public/assets/services/scan.svg';
import Robertgroup from '@/public/assets/robert.svg';
import Chat from '@/public/assets/services/chat.svg';
import Reversechat from '@/public/assets/reverse-chat.svg';
import { Shine, Robertchat, RecoveryChat } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';


export default function FreeAnalyse() {

  const icons = {
    shine: <Shine fill="currentColor" size={16} />,
    robertchat: <Robertchat fill="currentColor" size={16} />,
    chat: <RecoveryChat fill="currentColor" size={16} />,
  };

  const freeanalyseContent = {
    firstDescription: "Discover potential content leaks on your account (s) with our complimentary analysis.",
    secondDescription: "Decide whether our service is right for you based on the results.",
    thirdDescription: "Receive Your Results via Email: Get your analysis report within 24 hours delivered straight to your inbox."
  }

  return (
    <>
      <div className="text-white relative container flex flex-col mx-auto" >

        {/* This section for define Freeanalyse Content*/}

        <div className='flex mt-10 max-sm:mt-5 pb-10 mx-auto gap-10 max-w-[1500px] items-center max-xl:justify-center max-xl:items-center'>
          <div className='flex items-center gap-5 max-sm:px-3'>
            <Image className="max-xl:hidden mt-2 object-cover max-md:w-full p-2 max-xl:justify-center rounded-[20px]" src={AI} width={250} height={250} alt="Modern building architecture" />
          </div>
          <div className='flex flex-col text-center mx-auto mt-0 max-w-[603px] max-xl:flex-wrap'>
            <div className='flex justify-between items-center max-sm:gap-3'>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-10 left-0 bg-opacity-5 blur-3xl' />
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-10 right-0 bg-opacity-5 blur-3xl' />
              <div className='hidden max-xl:block'><Image className="mt-2 object-cover rounded-[20px]" src={AI} width={150} height={150} alt="Modern building architecture" /></div>
              <div className='mx-auto'><p className='font-medium text-5xl max-lg:text-3xl'>FREE ANALYZE</p></div>
              <div className='hidden max-xl:block'><Image className="mt-2 object-cover p-2 rounded-[20px]" src={SCAN} width={150} height={150} alt='saturn' /></div>
            </div>
            <div className='flex flex-col mt-10'>
              <div className='mt-5'>
                <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg text-sm" size='md'>
                  Click for support
                  <span>{icons.shine}</span>
                </Button>
              </div>
              <p className='mt-10'>{freeanalyseContent.firstDescription}</p>
              <p className='mt-10'>{freeanalyseContent.secondDescription}</p>
              <p className='mt-10'>{freeanalyseContent.thirdDescription}</p>
            </div>
          </div>
          <div>
            <Image className="max-xl:hidden mt-2 object-cover p-2 rounded-[20px]" src={SCAN} width={200} height={200} alt='saturn' />
          </div>
        </div>

        {/* This section for define show photos for freeanalyse*/}

        <div className='flex w-full px-60 justify-around mt-52 max-xl:hidden'>
          <div className='flex justify-center items-center'>
            <div className='relative'>
              <Image className="h-[560px] w-80 max-md:w-full rounded-[20px]" src={Robertgroup} alt="Modern building architecture" />
              <Image src={Chat} width={500} height={370} className="-top-40 left-[115px] -rotate-[45deg] absolute  max-xl:!w-[200px] max-xl:right-[320px]" alt='chat' />
              <Image src={Chat} width={200} height={170} className="top-14 left-[220px] absolute max-xl:!w-[200px] max-xl:right-[320px]" alt='chat' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='bg-white/5 shadow-sm rounded-[30px] absolute right-64 bottom-[380px] w-72 h-72 z-10'>
              <Image src={Reversechat} className="mt-24 max-md:w-full" width={200} height={150} alt="Modern building architecture" />
            </div>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='max-xl:hidden absolute top-94 left-0 bg-[#362666] bg-opacity-5 blur-3xl' />
            <div className="flex backdrop-blur-sm bg-white/5 border border-gray-500 shadow-sm shadow-gray- rounded-[20px] p-2 right-32 cursor-pointer w-[350px] absolute rotate-[12deg] -mt-[60px]">
              <div className='absolute'>{icons.robertchat}</div>
              <div className='flex justify-start flex-col'>
                <div className='flex justify-start ml-20'><Image src="/assets/logo.svg" width={230} height={150} alt="logo" /></div>
                <div className='justify-center items-center flex'><p className='font-normal text-base mt-2 uppercase'>support</p></div>
              </div>
            </div>
          </div>
          <div className='flex flex-col mt-28 max-2xl:mr-12 z-10'>
            <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg text-sm" size='md'>
              Contact Us
            </Button>
          </div>
        </div>
        <div className='hidden max-xl:block max-md:px-3'>
          <div className='bg-white/5 shadow-sm rounded-[30px] w-1/2 max-sm:w-full mx-auto h-340px p-5'>
            <div className="flex backdrop-blur-sm bg-white/5 border border-gray-500 shadow-sm shadow-gray-10 rounded-[20px] cursor-pointer">
              <div className='absolute'>{icons.chat}</div>
              <div className='flex justify-start flex-col max-sm:w-full'>
                <div className='flex justify-start ml-20 max-sm:mx-auto'><Image src="/assets/logo.svg" width={230} height={150} alt="logo" /></div>
                <div className='max-sm:mx-auto'><p className='font-normal text-base mt-2 uppercase'>support</p></div>
              </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
              <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg  text-sm" size='md'>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CustomerReview />
    </>
  )
}
