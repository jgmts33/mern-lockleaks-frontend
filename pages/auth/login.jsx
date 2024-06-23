"use client";
import Image from 'next/image';
import {
    Button, Link, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure
} from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { Lock, Envelop, Twitter, Facebook, Google, WarningModal, Error, Success } from "@/components/utils/Icons";
import React, { useRef } from "react";
import { login } from '@/axios/auth';
import GoogleAuth from '@/components/auth/google';
import FaceBookAuth from '@/components/auth/facebook';
import TwitterAuth from '@/components/auth/twitter';
import { setTokens } from '@/axios/token';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function Login() {

    const icons = {
        lock: <Lock />,
        envelop: <Envelop />,
        google: <Google />,
        twitter: <Twitter />,
        facebook: <Facebook />,
        warningmodal: <WarningModal />,
        error: <Error />,
        success: <Success />,
    };

    const router = useRouter();
    const userInfo = useSelector(info);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [modalValue, setModalValue] = useState({
        status: "",
        content: "",
        userInfo: null,
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            password
        });

        if (res.status == "success") {
            if (res.data.roles.find(p => p == 'admin')) {
                setModalValue({
                    status: "failed",
                    content: "You are Admin. Please go to your private login page."
                });
            }
            else setModalValue({
                status: "success",
                content: "Congratulations!, welcome to visit our lockleaks site",
                userInfo: { ...res.data }
            })
            onOpen();
        } else {
            setModalValue({
                status: "failed",
                content: res.data || "Something went wrong!"
            });
            onOpen();
            console.log("error:", res.data);
        }

        setIsProcessing(false);
    }, [email, password]);

    const handleConfirmClick = useCallback(() => {
        if (modalValue.status === "success") {
            if (modalValue.userInfo.ban) {
                setModalValue({
                    status: "failed",
                    content: "You were banned, please contact support."
                });
                onOpen();
                return;
            }
            setTokens(modalValue.userInfo.tokens);
            window.open("/app/dashboard", '_self');
            // router.push("/app/dashboard");
            // dispatch(setUserInfo(modalValue.userInfo));
        } else {
            onOpenChange(false);
        }
    }, [modalValue.status]);

    // useEffect(() => {
    //     console.log("userInfo:", userInfo);
    //     if (userInfo?.roles.includes("admin") || userInfo?.roles.includes("moderator")) router.push("/admin/dashboard");
    //     if (userInfo?.roles.includes("user")) router.push("/app/dashboard");
    // }, [userInfo]);

    return (

        <div className='px-10 max-sm:px-3 flex min-h-[calc(100vh-80px)] w-full'>

            {/* This section for define Login page content*/}

            <div className='w-full flex items-center justify-center'>
                <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
                <div className="w-[562px] max-sm:w-full flex flex-col items-center text-white z-20">
                    <div className='text-center max-w-[354px] mb-4 max-sm:mb-0 max-sm:mt-0'>
                        <p className="font-light text-2xl leading-[60px]">Welcome!</p>
                        <p className="font-medium text-5xl ">Log in</p>
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
                                className='w-full outline-none p-2 pl-16 pr-28 max-sm:pr-0 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30 notranslate'
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
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30 notranslate'
                                required
                            />
                        </div>
                        <div className='flex justify-end'>
                            <Link href="/auth/forgot-password" title='forgot-password' underline="none" className='text-white z-30'><span className='font-light text-sm'>Forgot Password?</span></Link>
                        </div>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-4 z-30"
                            size='lg'
                            onClick={handleLogin}
                            isLoading={isProcessing}
                        >
                            <span>Log in</span>
                        </Button>
                        <div className='flex justify-center'>
                            <span className='font-light text-sm'>or continue with</span>
                        </div>
                        <div className='flex relative gap-x-4 gap-y-2 w-96 mx-auto max-sm:justify-center max-sm:w-60'>
                            <GoogleAuth />
                            {/* <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30" size='md'>
                                {icons.facebook}
                            </Button> */}
                            <FaceBookAuth />
                            <TwitterAuth />
                        </div>
                        <div className='mx-auto text-center z-30'>
                            <span className='font-light text-sm'>Don't have an account?</span> <Link href='/auth/register' underline='always' className='text-white'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={handleConfirmClick}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='mx-auto flex items-center justify-center -mb-24'>{modalValue.status === 'success' ? icons.success : icons.warningmodal}</div>
                                <span className='font-medium text-5xl text-center capitalize'>{modalValue.status}!</span>
                                <span className='font-light text-xl'>{modalValue.content} </span>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    radius="lg"
                                    className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 ${modalValue.status === "success" ? 'from-[#84e584] to-[#35d35c]' : 'from-[#9C3FE4] to-[#C65647]'}`}
                                    size='md'
                                    onClick={handleConfirmClick}
                                >
                                    {modalValue.status === 'success' ? <span>Confirm</span> : <span>Try Again</span>}
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
            <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-52 bg-[#532a88] bg-opacity-50 blur-3xl' />
        </div>
    );
}
