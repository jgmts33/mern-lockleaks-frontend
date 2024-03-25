"use client";
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import Link from "next/link";
import HeroImg from "@/public/assets/Hero.png";
import KeyIcon from "@/public/assets/Key.svg";
import { useEffect, useState } from 'react';

export default function Home() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStength, setPasswordStength] = useState("");

  const passwordStrengthCheck = (password) => {
    const passwordLength = password.length;
    // Checking lower alphabet in string 
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let specialChar = false;
    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

    for (let i = 0; i < passwordLength; i++) {
      if (password[i] >= "a" && password[i] <= "z") {
        hasLower = true;
      }
      if (password[i] >= "A" && password[i] <= "Z") {
        hasUpper = true;
      }
      if (password[i] >= "0" && password[i] <= "9") {
        hasDigit = true;
      }
      if (!normalChars.includes(password[i])) {
        specialChar = true;
      }
    }

    // Strength of password 
    let strength = "Weak";
    if (hasLower && hasUpper && hasDigit && specialChar && passwordLength >= 16) {
      strength = "Strong";
    } else if ((hasLower || hasUpper) && specialChar && passwordLength >= 6) {
      strength = "Medium";
    }

    setPasswordStength(strength);
  }

  useEffect(() => {
    if (password.length) passwordStrengthCheck(password);
    else setPasswordStength("");
  }, [password]);

  return (
    <div className='px-10 max-sm:px-2 flex w-full min-h-[calc(100vh-80px)]'>

    {/* This section for define reset password page header*/}

    <div className='w-1/2 justify-center items-center px-16 hidden lg:flex'>
        <Image src={HeroImg} alt="Hero Image" className='w-full max-w-[878px] h-auto' />
      </div>

      {/* This section for define reset password page content*/}

      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <div className="w-[562px] flex flex-col items-center gap-10 text-white">
          <div className='text-center max-w-[354px] mb-4'>
            <p className="text-[40px] font-medium leading-[60px]">Reset Password</p>
            <p className="text-base font-[300] ">Enter your new password and confirm it below to reset your account password.</p>
          </div>
          <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-6 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
            <div className='relative w-full'>
              <p className='font-[300] text-white pb-2'>Enter new Password</p>
              <Image src={KeyIcon} alt="Key Icon" className='absolute bottom-3 left-6 h-4' />
              <input
                type="password"
                name="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
              />
              <div className='absolute flex gap-2 items-center bottom-3 right-4'>
                {
                  passwordStength ? <div className='flex gap-1 items-center'>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength == "Weak" ? 'bg-red-500' : 'bg-[#6CB76F]')}></div>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength != "Weak" ? 'bg-[#6CB76F]' : 'bg-[#CCCDD0]')}></div>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength == "Strong" ? 'bg-[#6CB76F]' : 'bg-[#CCCDD0]')}></div>
                  </div> : <></>
                }
                <p className={'text-sm ' + (passwordStength == "Weak" ? '!text-red-500' : passwordStength == "Strong" ? "!text-green-500" : "")}>{passwordStength}</p>
              </div>
            </div>
            <div className='relative w-full'>
              <p className='font-[300] text-white pb-2'>Confirm Password</p>
              <Image src={KeyIcon} alt="Key Icon" className='absolute bottom-3 left-6 h-4' />
              <input
                type="password"
                name="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
              />
            </div>
            <Link href="/">
              <Button radius="lg" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-full mt-4" size='lg'>
                Confirm
              </Button>
            </Link>
            <Button radius="lg" className="bg-transparent text-white shadow-lg w-full" size='lg'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
