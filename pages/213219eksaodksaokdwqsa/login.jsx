"use client";
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { Lock, Envelop, Twitter, Facebook, Google, WarningModal, Error, Success, WarningOnModal } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import React, { useRef } from "react";
import { login } from '@/axios/auth';
import { setUserInfo } from '@/lib/auth/authSlice';
import { setTokens } from '@/axios/token';

export default function Login() {
    const router = useRouter();
    const icons = {
        lock: <Lock fill="currentColor" size={16} />,
        envelop: <Envelop fill="currentColor" size={16} />,
        google: <Google fill="currentColor" size={16} />,
        twitter: <Twitter fill="currentColor" size={16} />,
        facebook: <Facebook fill="currentColor" size={16} />,
        warningmodal: <WarningModal fill="currentColor" size={16} />,
        error: <Error fill="currentColor" size={16} />,
        success: <Success fill="currentColor" size={16} />,
    };
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleKeyDown = (event, keyName) => {
        if (event.keyCode == 13 && keyName == "email") {
            passwordInputRef.current.focus();
        }
        else if (event.keyCode == 13 && keyName == "password") {
            handleLogin()
        }
    }

    const handleLogin = useCallback(async () => {

        if (email != "" && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
            setEmailError("Invalid Email Address");
            return;
        }

        setIsProcessing(true);
        const res = await login({
            email,
            password,
            admin: true
        });

        if (res.status == "success") {
            setTokens(res.data.tokens);
            window.open("/app/dashboard", '_self');
        } else {
            console.log("error:", res.data);
        }

        setIsProcessing(false);
    }, [email, password]);

    return (

        <div className='px-10 max-sm:px-3 flex min-h-[calc(100vh-80px)] w-full'>

            {/* This section for define Login page content*/}

            <div className='w-full flex items-center justify-center'>
                <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
                <div className="w-[562px] max-sm:w-full flex flex-col items-center text-white z-30">
                    <div className='text-center max-w-[354px] mb-4 max-sm:mb-0 max-sm:mt-0'>
                        <p className="font-light text-2xl leading-[60px]">Welcome Admin!</p>
                    </div>
                    <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-5 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
                        <div className='relative w-full'>
                            <p className='font-light text-white pb-2'>Email Address</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.envelop}</i>
                            <input
                                type="email"
                                name="email"
                                placeholder='youremail@example.com'
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, "email")}
                                ref={emailInputRef}
                                className='w-full outline-none p-2 pl-16 pr-28 max-sm:pr-0 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30'
                                required
                            />
                        </div>
                        <div className={('text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs ') + (emailError != "" ? "block" : "hidden")}><span>{icons.error}</span>&nbsp;<span>{emailError}</span></div>
                        <div className='relative w-full'>
                            <p className='font-light text-white pb-2'>Password</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.lock}</i>
                            <input
                                type="password"
                                name="password"
                                ref={passwordInputRef}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, "password")}
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30'
                                required
                            />
                        </div>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-6 z-30"
                            size='lg'
                            onClick={() => handleLogin()}
                            isLoading={isProcessing}
                        >
                            Log in
                        </Button>
                    </div>
                </div>
            </div>
            <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-52 bg-[#532a88] bg-opacity-50 blur-3xl' />
        </div>
    );
}
