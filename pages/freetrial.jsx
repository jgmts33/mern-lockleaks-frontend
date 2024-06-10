"use client"
import React from 'react'
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import ImgChat from '@/public/assets/free-analys/chat.svg';
import ImgBush2 from '@/public/assets/free-analys/bush-2.svg';
import ImgBush3 from '@/public/assets/free-analys/bush-3.svg';
import ImgBush4 from '@/public/assets/free-analys/bush-4.svg';
import Person from '@/public/assets/free-analys/person.svg';
import Download from '@/public/assets/free-analys/download.svg';
import Line from '@/public/assets/free-analys/line.svg';
import Confirm from '@/public/assets/free-analys/confirm.svg';
import { Shine, Robertchat, RecoveryChat, Bell, Complete } from "@/components/utils/Icons";
import CustomerReview from '@/components/customer-review';
import { useRouter } from 'next/router';
import { Crisp } from 'crisp-sdk-web';


export default function FreeTrial() {

  const router = useRouter();

  const icons = {
    shine: <Shine />,
    robertchat: <Robertchat />,
    chat: <RecoveryChat />,
    complete: <Complete />,
    bell: <Bell />,
  };

  return (
    <>
      <div className="text-white relative container flex flex-col mx-auto mb-8" >
        <div className='relative w-full mt-16'>
          <Image className="max-xl:hidden object-cover rounded-[20px] absolute left-0 top-0 inset-0 blur-2xl" src={ImgBush2} width={1000} height={1000} alt='saturn' />
          <div className='text-center relative'>
            <p className='font-medium text-5xl max-lg:text-3xl text-center'>FREE TRIAL</p>
            <p className='mt-10 max-md:mt-4 text-[34px] max-sm:text-lg leading-tight max-w-[800px] w-full mx-auto max-md:px-4'>Test Our App for <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>3 Days</span> <br />- No Payment Required!</p>
            <Image className="max-md:w-full rounded-[20px] text-center absolute top-16 right-24 rotate-[-20deg] max-md:hidden" width={220} height={160} src={ImgChat} alt="Reverse Chat" />
          </div>
          <Image className="max-xl:hidden object-cover rounded-[20px] absolute right-36 -top-32 blur-3xl" src={ImgBush3} width={600} height={600} alt='saturn' />
        </div>
        <div className='flex mt-10 gap-10 font-medium max-md:flex-col max-sm:px-6 relative'>
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
            <div className='w-full relative my-10'>
              <p className='text-[40px] font-extrabold text-center'>Tutorial<span className='bg-gradient-to-r from-[#B759FF] to-[#F68171] bg-clip-text text-transparent px-2'>Free</span>Trial</p>
              <div className='w-full flex justify-between items-center mt-4 text-lg'>
                <div className='flex gap-4 items-center'>
                  <Image className="" src={Person} width={36} height={36} alt='Person' />
                  <p> Create Account</p>
                </div>
                <div className='flex gap-4 items-center'>
                  <Image className="" src={Download} width={36} height={36} alt='Download' />
                  <p> Get Free Trial for 3 Days!</p>
                </div>
              </div>
              <div className='flex items-center justify-between mt-4 px-4 relative text-3xl font-extrabold'>
                <div className='px-2 w-14 h-14 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center'>{1}</div>
                <Image className="flex-1" src={Line} width={100} height={2} alt='Line' />

                <div className='px-2 w-14 h-14 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center'>{2}</div>
                <Image className="flex-1" src={Line} width={100} height={2} alt='Line' />
                <div className='px-2 w-14 h-14 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center'>{3}</div>
              </div>
              <div className='flex gap-3 items-center mt-4 mx-auto w-max'>
                <Image src={Confirm} width={32} height={32} alt='Confirm' />
                <p> Verify Email</p>
              </div>
            </div>
          </div>
          <div className={'bg-gradient-to-tr from-[#3BC940]/10 to-gray-800/40 rounded-3xl cursor-pointer max-w-[590px] border-[0.4px] border-white/10 px-[54px] py-[62px] w-full max-sm:px-6 h-max'}>
            <p className='text-[63px] text-center'>FREE</p>
            <p className='text-5xl text-center'>3-Days</p>
            <Button
              radius="lg"
              className="w-full mt-6 bg-gradient-to-r mx-auto from-[#B759FF] to-[#F68171] border-gray-600 border text-white shadow-lg text-lg"
              size='lg'
              onClick={() => router.push("/checkout?plan=trial")}
            >
              <span>Get Free Trial</span>
            </Button>
            <p className='font-semibold text-xl mt-8'>USERNAMES : 1</p>
            <div className='space-y-4 mt-4'>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>Analyzer Tool Search</p>
              </div>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>Re-verify & Re-analyze Tool</p>
              </div>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>Google Results, Images & Videos Removal Report</p>
              </div>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>Bing Results, Images & Videos Removal Report</p>
              </div>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>Confidential DMCA Takedown</p>
              </div>
              <div className='flex items-center gap-2'>
                <span>{icons.complete}</span>
                <p className='flex flex-wrap'>5 Takedowns Daily</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mt-6'>
              {icons.bell}
              <p className='text-2xl'>Important Notice:</p>
            </div>
            <p className='text-lg font-light mt-4 mb-10'>
              These features are for the trial version only. The Lock Leaks team will handle strictly 5 takedowns from Search Engines! To benefit from all features, please purchase a subscription!
            </p>
          </div>
        </div>
        <div className='w-full flex justify-between mt-10 items-start'>
          <div className='space-y-2'>
            <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent text-[28px] w-max'>One-Time Free Trial:</p>
            <p className='text-lg'>The free trial is one-time only and cannot be used more than once or with different usernames.</p>
          </div>
          <Button
            radius="lg"
            className="bg-gradient-to-r from-[#B759FF] to-[#F68171] border-gray-600 border text-white shadow-lg text-lg relative z-10"
            size='lg'
            onClick={() => Crisp.chat.open()}
          >
            <span>Contact us</span>
          </Button>
        </div>
      </div >
      <div className='w-full relative'>
        <Image className="max-xl:hidden object-cover rounded-[20px] absolute right-20 bottom-20 blur-2xl" src={ImgBush4} width={400} height={400} alt='saturn' />
        <CustomerReview />
      </div>
    </>
  )
}
