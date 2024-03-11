import React from 'react'
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import Saturn from '@/public/assets/saturn.svg';
import Robertgroup from '@/public/assets/robert.svg';
import Chat from '@/public/assets/services/chat.svg';
import Reversechat from '@/public/assets/reverse-chat.svg';
import { Shine, ROBERTCHAT } from "@/src/utils/Icons";


export default function page() {

  const icons = {
    shine: <Shine fill="currentColor" size={16} />,
    robertchat: <ROBERTCHAT fill="currentColor" size={16} />,
  };

  const freeanalyseContent = {
    firstDescription: "Discover potential content leaks on your account (s) with our complimentary analysis.",
    secondDescription: "Decide whether our service is right for you based on the results.",
    thirdDescription: "Receive Your Results via Email: Get your analysis report within 24 hours delivered straight to your inbox."
  }

  return (
    <div className="text-white relative container flex flex-col" >

      {/* This section for define Freeanalyse Content*/}

      <div className='flex mt-20 mx-auto gap-10 max-w-[1500px] max-xl:flex-col max-xl:justify-center max-xl:items-center'>
        <div>
          <Image class="h-72 w-80 mt-2 object-cover max-md:w-full p-2 max-xl:justify-center rounded-[20px]" src={Saturn} alt="Modern building architecture" />
        </div>
        <div className='flex flex-col text-center mx-auto -mt-8 max-w-[603px] max-xl:flex-wrap'>
          <p className='font-medium text-5xl max-lg:text-3xl'>FREE ANALYZE</p>
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
        <div>
          <Image class="h-72 w-80 mt-2 object-cover max-md:w-full p-2 rounded-[20px]" src={Saturn} />
        </div>
      </div>

      {/* This section for define show photos for freeanalyse*/}

      <div className='flex w-full px-60 justify-center mt-80 max-xl:flex-col max-xl:hidden'>
        <div className='w-1/2 flex justify-center items-center'>
          <div className=' relative '>
            <Image class="h-[560px] w-80 object-cover max-md:w-full rounded-[20px]" src={Robertgroup} alt="Modern building architecture" />
            <Image src={Chat} width={500} height={370} className="-top-40 left-[115px] -rotate-[45deg] absolute  max-xl:!w-[200px] max-xl:right-[320px]" />
            <Image src={Chat} width={200} height={170} className="top-14 left-[220px] absolute max-xl:!w-[200px] max-xl:right-[320px]" />
          </div>
        </div>
        <div className='flex w-1/2'>
          <div className='bg-white/5 shadow-sm rounded-[30px] absolute right-[350px] bottom-[380px] w-72 h-72'>
            <Image class="h-[560px] w-52 -mt-[95px] max-md:w-full" src={Reversechat} alt="Modern building architecture" />
          </div>
          <div className="flex bg-white/15 border border-gray-500 shadow-sm shadow-gray-10 rounded-[20px] p-2 cursor-pointer w-[350px] absolute rotate-[12deg] right-56 -mt-[60px]">
            <div>{icons.robertchat}</div>
            <div>
              <p className='font-semibold text-xl mt-3'>CRISP</p>
              <p className='font-normal text-base mt-2 uppercase'>support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
