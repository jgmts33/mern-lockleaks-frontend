"use client";
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { GradientKey, Envelop } from "@/components/utils/Icons";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const icons = {
    envelop: <Envelop fill="currentColor" size={16} />,
    gradiant_key: <GradientKey fill="currentColor" size={16} />,
  };

  return (
    <div className='px-10 max-sm:px-2 mx-auto flex w-full min-h-[calc(100vh-80px)]'>

      {/* This section for define forgot password content*/}

      <div className='w-full flex items-center justify-center max-sm:mt-5'>
      <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
      <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
        <div className="w-[562px] flex flex-col items-center gap-10 text-white">
          <div className='text-center max-w-[354px] max-sm:mt-16'>
            <div className='rounded-full mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-3 w-12'>{icons.gradiant_key}</div>
            <p className="text-[40px] mt-5 font-medium leading-[60px]">Don't worry</p>
            <p className="text-base font-[300] opacity-80 max-sm:mt-5">Enter your email address below, and we'll send you a link to reset your password.</p>
          </div>
          <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-6 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent max-sm:mt-10'>
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
              <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-4 max-sm:mt-16" size='lg'>
                Send
              </Button>
            <Button radius="lg" className="bg-transparent text-white shadow-lg w-full max-sm:mt-10" size='lg'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
