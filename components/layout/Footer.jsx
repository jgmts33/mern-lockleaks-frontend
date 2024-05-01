import React from 'react'
import { FaceBook, LinkedIn, TwitterV2, TikTok, Instagram, Redit } from '@/components/utils/Icons';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';

export default function Footer() {

  const icons = {
    twitter: <TwitterV2 fill="currentColor" />,
    linkedin: <LinkedIn fill="currentColor" />,
    facebook: <FaceBook fill="currentColor" />,
    tiktok: <TikTok fill="currentColor" />,
    instagram: <Instagram fill="currentColor" />,
    redit: <Redit fill="currentColor" />,
  };

  return (
    <div className='w-full bg-black px-10 relative'>
      <div className='max-w-[1512px] mx-auto relative z-10'>
        <div className='flex items-start justify-between text-large font-semibold text-[17px] py-16 max-lg:flex-col gap-10'>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Services</p>
            <Link href={"/scantakedown"}>Scan & Takedown</Link>
            <Link href={"/ai"}>Artificial Intelligence</Link>
            <Link href={"/copyright"}>Copyright</Link>
            <Link href={"/camdmca"}>Cam DMCA Content Protection</Link>
            <Link href={"/creatordmca"}>Creator DMCA Content Protection</Link>
            <Link href={"/catfishing"}>Catifishing & Impersonation</Link>
            <Link href={"/recovery"}>Username History Recovery Removal</Link>
            <Link href={"/freeanalyse"}>Monthly Analytics & PDF Reports</Link>
            <Link href={"/dmcabadges"} className='z-10'>DMCA Badges</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Company</p>
            <Link href={"/blog"}>Blog</Link>
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
            <Link href={"/terms-of-service"}>Terms of Service</Link>
            <Link href={"/cookie-policy"}>Cookie Policy</Link>
            <Link href={"/cookie-settings"}>Cookie Settings</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Support</p>
            <Link href={"/help"}>Help & Support</Link>
            <Link href={"/contact-us"}>Contact Us</Link>
            <Link href={"/deletedata"}>Delete Data</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <div className='flex justify-start'>
              <p className='font-semibold text-xl pb-4'>Subscribe To our newsletter</p>
            </div>
            <div className='relative w-full justify-starter items-center'>
              <input
                type="email"
                name="email"
                placeholder='placeholder'
                className='outline-none p-4 w-full pr-64 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                required
              />
              <Button className="absolute bottom-0 right-1 h-4 bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg rounded-full px-7 py-6 text-lg top-2" size='sm'>
                SEND
                <span>{icons.shine}</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-0 max-md:flex-col max-md:items-center max-md:gap-5'>
          <Link href="/">
            <Image src="/assets/logo.svg" width={250} height={200} alt="logo" className='-mt-5' />
          </Link>
          <p className='font-light text-xs text-center pb-8 text-white max-md:pb-0'>Copyright © 2024 LockLeaks.</p>
          <div className='flex gap-7 justify-end mt-0 mb-10'>
            <Link href={"https://tiktok.com/lockleaks"}>{icons.tiktok}</Link>
            <Link href={"https://www.instagram.com/lockleaks"}>{icons.instagram}</Link>
            <Link href={"https://www.twitter.com/@lockleaks"}>{icons.twitter}</Link>
            <Link href={"https://linkedin.com/@lockleaks"}>{icons.linkedin}</Link>
            <Link href={"https://www.facebook.com/lockleaks"}>{icons.facebook}</Link>
            <Link href={"https://www.reddit.com/r/LockLeaks"}>{icons.redit}</Link>
          </div>
        </div>
      </div>
      <div className='w-full h-56 bg-[#362666] blur-3xl absolute bottom-0 left-0 bg-opacity-35 rounded-t-3xl'>
      </div>
    </div>
  )
}
