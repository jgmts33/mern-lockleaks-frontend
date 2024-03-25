"use client";
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import Link from "next/link";
import HeroImg from "@/public/assets/Hero.svg";
import { useEffect, useState } from 'react';
import { GradientKey, Envelop } from "@/components/utils/Icons";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const icons = {
    envelop: <Envelop fill="currentColor" size={16} />,
    gradiant_key: <GradientKey fill="currentColor" size={16} />,
  };

  return (
    <div className='px-10 max-sm:px-2 mx-auto flex w-screen min-h-[calc(100vh-80px)]'>

      {/* This section for keep forgot password image*/}

      <div className='w-1/2 justify-center items-center px-16 hidden lg:flex'>
        <Image src={HeroImg} alt="Hero Image" className='w-full max-w-[878px] h-auto' />
      </div>

      {/* This section for define forgot password content*/}

      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className="w-[562px] flex flex-col items-center gap-10 text-white">
          <div className='text-center max-w-[354px]'>
            <div className='rounded-full mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-3 w-12'>{icons.gradiant_key}</div>
            <p className="text-[40px] mt-5 font-medium leading-[60px]">Don't worry</p>
            <p className="text-base font-[300] opacity-80">Enter your email address below, and we'll send you a link to reset your password.</p>
          </div>
          <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-6 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
            <div className='relative w-full'>
              <p className='font-[300] text-white pb-2'>Provide Your Email Address</p>
              <i className='absolute bottom-3 left-6 h-4'>{icons.envelop}</i>
              <input
                type="email"
                name="email"
                placeholder='youremail@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
              />
            </div>
              <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-4" size='lg'>
                Send
              </Button>
            <Button radius="lg" className="bg-transparent text-white shadow-lg w-full" size='lg'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
