"use client"
import React from 'react'
import Image from 'next/image';
import {
  Button, Link
} from '@nextui-org/react';
import AIScan from '@/public/assets/services/ai-scan.svg';
import Robertgroup from '@/public/assets/robert.svg';
import ImgDoubleChatGroup from '@/public/assets/free-analys/double-chat-group.svg';
import ImgContactUs from '@/public/assets/free-analys/contact-us.svg';
import ImgChat from '@/public/assets/free-analys/chat.svg';
import ImgSupportLogo from '@/public/assets/free-analys/support-logo.svg';
import { Shine, Robertchat, RecoveryChat } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';
import { Bell, Complete } from '../components/utils/Icons';


export default function FreeAnalyse() {

  const icons = {
    shine: <Shine fill="currentColor" size={16} />,
    robertchat: <Robertchat fill="currentColor" size={16} />,
    chat: <RecoveryChat fill="currentColor" size={16} />,
    complete: <Complete fill="currentColor" size={16} />,
    bell: <Bell fill="currentColor" size={16} />,
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

        <div className=' mt-28 max-sm:mt-5 pb-10 mx-auto gap-10 items-center max-xl:justify-center max-xl:items-center relative w-full max-md:px-6'>
          <Image className="max-xl:hidden mt-2 object-cover p-2 rounded-[20px] absolute left-0 " src={ImgDoubleChatGroup} width={350} height={560} alt='saturn' />
          <div className='flex flex-col text-center mx-auto mt-8 max-w-[603px] max-xl:flex-wrap'>
            <div className='flex justify-between items-center max-sm:gap-3'>
              <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-10 left-0 bg-opacity-5 blur-3xl' />
              <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={150} className='max-2xl:hidden absolute bg-[#8f51f3] z-0 top-10 right-0 bg-opacity-5 blur-3xl' />
              <div className='mx-auto'><p className='font-medium text-5xl max-lg:text-3xl'>FREE TRIAL</p></div>
              <div className='hidden max-xl:block'><Image className="mt-2 object-cover p-2 rounded-[20px] max-md:hidden" src={AIScan} width={150} height={150} alt='saturn' /></div>
            </div>
            <div className='flex flex-col text-lg space-y-4 mt-8 max-md:mt-4'>
              <p>{freeanalyseContent.firstDescription}</p>
              <p>{freeanalyseContent.secondDescription}</p>
              <p>{freeanalyseContent.thirdDescription}</p>
            </div>
            <Button
              radius="lg"
              className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-max mx-auto mt-10 px-14"
              size='lg'
            >
              Get Free Trial
              <span>{icons.shine}</span>
            </Button>
          </div>
          <Image className="max-xl:hidden mt-2 object-cover p-2 rounded-[20px] absolute right-[15%] top-20" src={AIScan} width={150} height={150} alt='saturn' />
        </div>

        {/* This section for define show photos for freeanalyse*/}

        <div className='flex w-full mt-20 max-xl:hidden items-start justify-between'>
          <div className='flex items-start justify-center w-1/2 mt-16'>
            <Image className="h-[555px] w-80 max-md:w-full rounded-[20px]" src={Robertgroup} alt="Robert" />
            <Image className="max-md:w-full rounded-[20px]" width={320} height={247} src={ImgChat} alt="Reverse Chat" />
          </div>
          <div className='w-1/2 relative'>
            <Image className="max-md:w-full rounded-[20px]" width={600} height={387} src={ImgContactUs} alt="Contact Us" />
            <Button
              radius="lg"
              className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-max mx-auto mt-10 absolute z-10 bottom-6 left-24"
              size='lg'
            >
              Contact Us
              <span>{icons.shine}</span>
            </Button>
          </div>
        </div>

        <div className='text-center relative'>
          <p className='font-medium text-5xl max-lg:text-3xl text-center'>FREE TRIAL</p>
          <p className='mt-10 max-md:mt-4 text-[34px] leading-tight max-w-[800px] w-full mx-auto max-md:px-4'>Test Our App for <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>3 Days</span> – No Payment Required!</p>
          <Image className="max-md:w-full rounded-[20px] absolute top-16 right-24 rotate-[-20deg] max-md:hidden" width={220} height={160} src={ImgChat} alt="Reverse Chat" />
        </div>
        <div className='flex mt-10 gap-4 font-medium max-md:flex-col max-sm:px-6'>
          <div className='flex flex-col items-center'>
            <div className='space-y-3'>
              <p className='text-[28px]'>Discover Potential Content Leaks:</p>
              <ul className='list-disc ml-5'>
                <li>Experience our complimentary analysis to uncover any content leaks on your accounts.</li>
              </ul>
              <p className='text-[28px]'>Evaluate Our Service:</p>
              <ul className='list-disc ml-5'>
                <li>Decide if our service is right for you based on the detailed results of your free trial.</li>
              </ul>
              <p className='text-[28px]'>Receive Your Results via Email:</p>
              <ul className='list-disc ml-5'>
                <li>Get your comprehensive analysis report within 24 hours, delivered straight to your inbox.</li>
              </ul>
              <p className='text-[28px]'>Protect Your Content Now:</p>
              <ul className='list-disc ml-5'>
                <li>If any infringing content is detected, our expert agents will act swiftly to issue DMCA takedown notices to the relevant authorities.</li>
                <li>We work diligently to remove any illicit copies of your content identified through both software and manual scans.</li>
              </ul>
              <p className='text-[28px]'>Quick and Effective:</p>
              <ul className='list-disc ml-5'>
                <li>Our strong affiliations with file hosting sites ensure prompt consideration of our DMCA takedown notices, aligning with our clients' business policies.</li>
              </ul>
            </div>
            <Image className="my-10" width={422} height={138} src={ImgSupportLogo} alt="Support Logo" />
            <div className='space-y-2'>
              <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent text-[28px] w-max'>One-Time Free Trial:</p>
              <p className='text-lg'>The free trial is one-time only and cannot be used more than once or with different usernames.</p>
            </div>
          </div>
          <div className={'bg-gradient-to-tr from-gray-600/40 to-gray-800/40 rounded-3xl cursor-pointer max-w-[590px] border-[0.4px] border-white/10 px-[54px] py-[62px] w-full max-sm:px-6'}>
            <p className='text-[63px] text-center'>FREE</p>
            <p className='text-[63px] text-center'>3-Day</p>
            <Button
              radius="lg"
              className="w-full mt-6 bg-gradient-to-r mx-auto from-[#B759FF] to-[#F68171] border-gray-600 border text-white shadow-lg text-lg"
              size='lg'
            // onClick={() => router.push("/checkout/buy")}
            >
              Get Free Trial
            </Button>
            <p className='font-semibold text-xl mt-8'>USERNAMES : 1</p>
            <div className='space-y-4 mt-4'>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>Analyzer Tool Search</p>
              </div>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>Re-verify & Re-analyze Tool</p>
              </div>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>Google Results, Images & Videos Removal Report</p>
              </div>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>Bing Results, Images & Videos Removal Report</p>
              </div>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>Confidential DMCA Takedown</p>
              </div>
              <div className='flex items-center gap-2'>
                {icons.complete}
                <p className='flex flex-wrap'>5 Takedowns Daily</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mt-6'>
              {icons.bell}
              <p className='text-2xl'>Important Notice:</p>
            </div>
            <p className='text-lg font-light mt-4'>
              These features are for the trial version only. The LockLeaks team will handle strictly 5 takedowns from Search Engines! To benefit from all features, please purchase a subscription!
            </p>
          </div>
        </div>
      </div >
      <CustomerReview />
    </>
  )
}
