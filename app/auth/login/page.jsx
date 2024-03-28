"use client";
import Image from 'next/image';
import {
    Button, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Lock, Envelop, Twitter, Facebook, Google, WarningModal, Error } from "@/components/utils/Icons";
import { useRouter } from 'next/navigation';
import * as yup from "yup";

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
    };

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [emailerror, setEmailError] = useState("");
    const [passworderror, setPasswordError] = useState("");

    useEffect(() => {
        setEmailError("");
        setPasswordError("")
    }, [email, password])

    const handleLogin = () => {
        if (email == "") {
            setEmailError("You must type email");
        }
        else if (email != "" && !/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email must be contain @ and .**");
        }
        else if (password == "") {
            setPasswordError("You must type password");
        }
        else if ((password.length < 6 || password.length > 12)) {
            setPasswordError("You must type 6~12 characters.");
        }
        // router.push("/userpanel/dashboard");
    }


    return (
        <div className='px-10 max-sm:px-3 flex min-h-[calc(100vh-80px)] w-screen'>

            {/* This section for define Login page content*/}

            <div className='w-full flex items-center justify-center'>
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top- left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
                <div className="w-[562px] flex flex-col items-center gap-10 text-white z-30">
                    <div className='text-center max-w-[354px] mb-4'>
                        <p className="font-light text-2xl leading-[60px]">Welcome!</p>
                        <p className="font-medium text-5xl ">Log in</p>
                    </div>
                    <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-6 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
                        <div className='relative w-full'>
                            <p className='font-light text-white pb-2'>Email Address</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.envelop}</i>
                            <input
                                type="email"
                                name="email"
                                placeholder='youremail@example.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30'
                                required
                            />
                        </div>
                        <div className={('text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs ') + (emailerror != "" ? "block" : "hidden")}><span>{icons.error}</span>&nbsp;<span>{emailerror}</span></div>
                        <div className='relative w-full'>
                            <p className='font-light text-white pb-2'>Password</p>
                            <i className='absolute bottom-3 left-6 h-4'>{icons.lock}</i>
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30'
                                required
                            />
                        </div>
                        <div className={('text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs ') + (passworderror != "" ? "block" : "hidden")}><span>{icons.error}</span>&nbsp;<span>{passworderror}</span></div>
                        <div className='flex justify-end'>
                            <Link href="/auth/forgot-password" title='forgot-password' underline="none" className='text-white z-30'><span className='font-light text-sm'>Forgot Password?</span></Link>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-4 z-30" size='lg' onClick={() => handleLogin()}>
                            Log in
                        </Button>
                        <div className='flex justify-center'>
                            <span className='font-light text-sm'>or continue with</span>
                        </div>
                        <div className='flex relative gap-x-4 gap-y-2 w-96 mx-auto max-sm:justify-center max-sm:w-60'>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30" size='md'>
                                {icons.google}
                            </Button>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30" size='md'>
                                {icons.facebook}
                            </Button>
                            <Button radius="lg" className="text-white shadow-lg w-full mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30" size='md'>
                                {icons.twitter}
                            </Button>
                        </div>
                        <div className='mx-auto text-center mb-10 z-30'>
                            <span className='font-light text-sm'>Don't have an account?</span> <Link href='/auth/register' underline='always' className='text-white'>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center'>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='mx-auto flex items-center justify-center -mb-20'>{icons.warningmodal}</div>
                                <span className='font-medium text-5xl text-center'>Warning</span>
                                <span className='font-light text-xl'></span>
                            </ModalBody>
                            <ModalFooter>
                                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight mt-4 w-full" size='md'>
                                    Success
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-52 bg-[#532a88] bg-opacity-50 blur-3xl' />
        </div>
    );
}
