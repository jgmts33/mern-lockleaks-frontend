"use client";
import Image from 'next/image';
import {
    Button, Link, Checkbox, Chip, cn, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Lock, Envelop, Twitter, Facebook, Google, Error, Success } from "@/components/utils/Icons";
import React from "react";

export default function Register() {

    const icons = {
        lock: <Lock fill="currentColor" size={16} />,
        envelop: <Envelop fill="currentColor" size={16} />,
        google: <Google fill="currentColor" size={16} />,
        twitter: <Twitter fill="currentColor" size={16} />,
        facebook: <Facebook fill="currentColor" size={16} />,
        error: <Error fill="currentColor" size={16} />,
        success: <Success fill="currentColor" size={16} />,
    };

    const [password, setPassword] = useState("");
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isagreeSelected, setIsAgreeSelected] = useState(false);
    const [isTermSelected, setIsTermSelected] = useState(false);
    const [email, setEmail] = useState("");
    const [passwordStength, setPasswordStength] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [incorrectPassword, setIncorrectPassword] = useState(false);

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

    const handleRegister = () => {
        if (password != repeatpassword) {
            setIncorrectPassword(true);
        }
        else {
            onOpenChange(!isOpen)
            onOpen()
        }
    }

    return (
        <div className='px-10 max-sm:px-2 flex w-screen min-h-[calc(100vh-80px)]'>

            {/* This section for keep Register Content*/}

            <div className='w-full flex items-center justify-center max-lg:pt-10'>
                <div className="w-[562px] flex flex-col items-center text-white">
                    <div className='text-center max-w-[354px]'>
                        <p className="font-medium text-5xl ">Sign up</p>
                        <p className="font-light text-2xl leading-[60px]">Welcome!</p>
                    </div>
                    <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
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
                        <div className='relative w-full'>
                            <p className='font-[300] text-white pb-2'>Password</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.lock}</i>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
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
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                            />
                        </div>
                        {
                            incorrectPassword == true ?
                                <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs'>{icons.error}&nbsp;The password you entered is incorrect.</div>
                                :
                                false
                        }
                        <div className="flex flex-col gap-2 text-[#CCCDD0]">
                            <Checkbox isSelected={isagreeSelected} onValueChange={setIsAgreeSelected} radius="none">
                                <p className='font-light text-xs pt-3 pl-2'>I consent to receive valuable updates from WEBSITE NAME and acknowledge that I can unsubscribe at any time. No spam, guaranteed.</p>
                            </Checkbox>
                            <Checkbox isSelected={isTermSelected} onValueChange={setIsTermSelected} radius="none">
                                <span className='font-light text-xs pl-2'>I agree to WEBSITE NAMEr's</span> <Link href='/termservice' className='text-white' underline='always'><span className='font-medium text-xs'>Terms of Service</span></Link>
                            </Checkbox>
                        </div>
                        <Button radius="lg" onClick={() => handleRegister()} className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-full mt-4" size='lg'>
                            Sign Up
                        </Button>
                        <div className='flex justify-center'>
                            <span className='font-light text-sm'>or continue with</span>
                        </div>
                        <div className='flex relative gap-x-4 gap-y-2 w-96 mx-auto max-sm:w-60  max-sm:justify-center max-sm:items-center'>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600" size='md'>
                                {icons.google}
                            </Button>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600" size='md'>
                                {icons.facebook}
                            </Button>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600" size='md'>
                                {icons.twitter}
                            </Button>
                        </div>
                        <div className='max-auto text-center mb-10'>
                            <span className='font-light text-sm'>Already have an account</span> <Link href='/auth/login' underline='always' className='text-white'><span className='font-medium text-sm'>Login</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center'>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='mx-auto flex items-center justify-center -mb-32'>{icons.success}</div>
                                <span className='font-medium text-5xl text-center'>Success!</span>
                                <span className='font-light text-xl'>Congratulations, your account has been successfully created</span>
                            </ModalBody>
                            <ModalFooter>
                                <Button radius="lg" className="bg-gradient-to-tr from-[#84e584] to-[#35d35c] mt-4 w-full" size='md'>
                                    Success
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
