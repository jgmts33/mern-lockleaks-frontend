"use client";
import Image from 'next/image';
import React from "react";
import {
    Button,
    Link,
    Checkbox,
    useDisclosure,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
} from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { Lock, Envelop, Twitter, Facebook, Google, Error, Success, WarningModal } from "@/components/utils/Icons";
import { register } from '@/axios/auth';
import GoogleAuth from '@/components/auth/google';
import { useRouter } from 'next/router';
import FaceBookAuth from '@/components/auth/facebook';
import TwitterAuth from '@/components/auth/twitter';
import { userInfo as info } from '@/lib/auth/authSlice';
import { setTokens } from '@/axios/token';
import { useSelector } from 'react-redux';

export default function Register() {

    const icons = {
        lock: <Lock/>,
        envelop: <Envelop/>,
        google: <Google/>,
        twitter: <Twitter/>,
        facebook: <Facebook/>,
        error: <Error/>,
        warningmodal: <WarningModal/>,
        success: <Success/>,
    };

    const router = useRouter();
    const userInfo = useSelector(info);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isagreeSelected, setIsAgreeSelected] = useState(false);
    const [isTermSelected, setIsTermSelected] = useState(false);
    const [email, setEmail] = useState("");
    const [passwordStength, setPasswordStength] = useState("");
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [modalValue, setModalValue] = useState({
        status: "",
        content: "",
        data: null
    });

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

    const validationForm = useCallback(() => {
        let errors = {};
        if (!email) {
            errors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "email is invalid";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        else if (password.length < 6 ) {
            errors.password = "Password must be at least 6 characters"
        }
        else if (confirmPassword != password) {
            errors.password = "Passwords Not Matched!"
        }
        if ( !isTermSelected ) {
            errors.terms = "You should accept to register"
        }
        console.log(confirmPassword, password, isTermSelected)
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }, [password, confirmPassword, email, isTermSelected]);

    const handleRegister = useCallback(async () => {
        if (!validationForm()) return;
        setIsProcessing(true);

        const res = await register({
            email,
            password
        });

        if (res.status === 'success') {
            setModalValue({
                status: "success",
                content: "Congratulations, your account has been successfully created",
                data: res.data
            })
            onOpen();
        }

        else {
            setModalValue({
                status: "failed",
                content: res.data || "Something went wrong!"
            });
            onOpen();
            console.log("error:", res.data);
        }

        setIsProcessing(false);
    }, [email, password, confirmPassword, isTermSelected]);

    const handleConfirmClick = useCallback(() => {
        if (modalValue.status === "success") {
            setTokens(modalValue.data.tokens);
            // router.push("/app/dashboard");
            window.open("/app/dashboard", '_self');
        } else {
            onOpenChange(false);
        }
    }, [modalValue]);

    // useEffect(() => {
    //     console.log("userInfo:", userInfo);
    //     if (userInfo?.roles.includes("admin") || userInfo?.roles.includes("moderator")) router.push("/admin/dashboard");
    //     if (userInfo?.roles.includes("user")) router.push("/app/dashboard");
    // }, [userInfo]);

    return (
        <div className='px-10 max-sm:px-2 flex w-full min-h-[calc(100vh-80px)]'>

            {/* This section for keep Register Content*/}

            <div className='w-full flex items-center justify-center'>
                <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl z-10' />
                <div className="w-[562px] max-sm:w-full flex flex-col items-center text-white z-20">
                    <div className='text-center max-w-[354px] mb-4 max-sm:mb-0 max-sm:mt-0'>
                        <p className="font-light text-2xl leading-[60px]">Welcome!</p>
                        <p className="font-medium text-5xl ">Sign up</p>
                    </div>
                    <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-5 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
                        <div className='relative w-full'>
                            <p className='font-[300] text-white pb-2'>Email Address</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.envelop}</i>
                            <input
                                type="email"
                                name="email"
                                placeholder='youremail@gmail.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                                required
                            />
                        </div>
                        {
                            errors.email ?
                                <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-sm'>{icons.error}&nbsp;{errors.email}</div>
                                :
                                false
                        }
                        <div className='relative w-full'>
                            <p className='font-[300] text-white pb-2'>Password</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.lock}</i>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 px-3'
                                required
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
                            <p className='font-[300] text-white pb-2'>Repeat Password</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.lock}</i>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                                required
                            />
                        </div>
                        {
                            errors.password ?
                                <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-sm'>{icons.error}&nbsp;{errors.password}</div>
                                :
                                false
                        }
                        <div className="flex flex-col gap-2 text-[#CCCDD0]">
                            <Checkbox isSelected={isagreeSelected} onValueChange={(value) => setIsAgreeSelected(value)} radius="none">
                                <p className='font-light text-xs pt-3 pl-2'>I consent to receive valuable updates from Lock Leaks and acknowledge that I can unsubscribe at any time. No spam, guaranteed.</p>
                            </Checkbox>
                            <Checkbox isSelected={isTermSelected} onValueChange={(value) => setIsTermSelected(value)} radius="none">
                                <span className='font-light text-xs pl-2'>I agree to Lock Leaks's</span> <Link href='/terms-of-service' className='text-white' underline='always'><span className='font-medium text-xs'>Terms of Service</span></Link>
                            </Checkbox>
                            {
                            errors.terms ?
                                <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-sm'>{icons.error}&nbsp;{errors.terms}</div>
                                :
                                false
                        }
                        </div>
                        <Button
                            radius="lg"
                            isLoading={isProcessing}
                            onClick={() => handleRegister()}
                            className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-full mt-4"
                            size='lg'
                        >
                            <span>Sign Up</span>
                        </Button>
                        <div className='flex justify-center'>
                            <span className='font-light text-sm'>or continue with</span>
                        </div>
                        <div className='flex relative gap-x-4 gap-y-2 w-96 mx-auto max-sm:w-60  max-sm:justify-center max-sm:items-center'>
                            <GoogleAuth />
                            <FaceBookAuth />
                            <TwitterAuth />
                        </div>
                        <div className='max-auto text-center'>
                            <span className='font-light text-sm'>Already have an account</span> <Link href='/auth/login' underline='always' className='text-white'><span className='font-medium text-sm'>Login</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onClose={handleConfirmClick}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center'>
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
                                    onClick={() => handleConfirmClick()}
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
