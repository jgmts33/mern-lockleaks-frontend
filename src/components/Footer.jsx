import React from 'react'
import { FaceBook, LinkedIn, TwitterV2 } from '../utils/Icons';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {

  const icons = {
    twitter: <TwitterV2 fill="currentColor" size={16} />,
    linkedin: <LinkedIn fill="currentColor" size={16} />,
    facebook: <FaceBook fill="currentColor" size={16} />,
  };


  return (
    <div className='w-full bg-black px-10 relative'>
      <div className='max-w-[1512px] mx-auto relative z-30'>
        <div className='flex items-start justify-between text-large font-semibold text-[17px] py-16 max-md:flex-col gap-10'>
          <div>
            <Link href="/" className="text-white text-xl font-semibold">Your Logo</Link>
            <div className='flex gap-2 items-center mt-6'>
              <Link href={"#"}>{icons.twitter}</Link>
              <Link href={"#"}>{icons.linkedin}</Link>
              <Link href={"#"}>{icons.facebook}</Link>
            </div>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Services</p>
            <Link href={"/pricing"} >Pricing</Link>
            <Link href={"/scan"} >Scan & TokeDown</Link>
            <Link href={"/artificial"} >Artificial Intelligence</Link>
            <Link href={"/copyright"} >CopyRight</Link>
            <Link href={"/com-dmca"} >Com DMCA Content Protection</Link>
            <Link href={"/creator-dmca"} >Creator DMCA Content Protection</Link>
            <Link href={"/catifishing"} >Catifishing & Impersonation</Link>
            <Link href={"/username-history"} >Username History Recovery REmoval</Link>
            <Link href={"/monthly-analytics"} >Monthly Analytics & PDF Reports</Link>
            <Link href={"/dmca-badges"} >DMCA BADGES</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Company</p>
            <Link href={"/blog"} >Blog</Link>
            <Link href={"/about"} >About Us</Link>
            <Link href={"/privacy"} >Privacy Policy</Link>
            <Link href={"/terms"} >Terms of SERVICES</Link>
            <Link href={"/cookie-policy"} >Cookie Policy</Link>
            <Link href={"/cookie-settings"} >Cookie Settings</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>SUPPORT</p>
            <Link href={"/help"} >Help & Support</Link>
            <Link href={"/contact-us"} >Contact US</Link>
          </div>
        </div>
        <p className='font-light text-xs text-center pb-8 text-white'>Copyright © 2023 LockLeaks.</p>
      </div>
      <div className='w-full h-52 bg-[#362666] blur-3xl absolute bottom-0 left-0 bg-opacity-35 rounded-t-3xl z-20'>
        <Image src="assets/bg-footer.svg" className='absolute bottom-0' alt='bg-footer' />
      </div>
    </div>
  )
}
