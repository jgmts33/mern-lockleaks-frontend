"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { Facebook, Google, Twitter, Error } from '../../components/utils/Icons';
import { getAccessToken } from '../../axios/token';
import { resetPassword } from '../../axios/auth';
import { useRouter } from 'next/router';
import moment from 'moment/moment';


export default function AccountSetting() {

    const router = useRouter();
    const userInfo = useSelector(info);
    const [isPasswordResetProcessing, setIsPasswordResetProcessing] = useState(false);
    const [isChangePasswordSuccessed, setIsChangePasswordSuccessed] = useState(false);

    const icons = {
        google: <Google fill="currentColor" size={16} />,
        twitter: <Twitter fill="currentColor" size={16} />,
        facebook: <Facebook fill="currentColor" size={16} />,
        error: <Error fill="currentColor" size={16} />,
    };

    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleSetNewPassword = useCallback(async () => {

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setIsPasswordResetProcessing(true);
        const accessToken = await getAccessToken();

        const res = await resetPassword(accessToken, newPassword);

        if (res.status == 'success') {
            setIsChangePasswordSuccessed(true);
            setIsPasswordResetProcessing(false);

            setTimeout(() => {
                setIsChangePasswordSuccessed(false);
                setNewPassword("");
            }, 2000);
        }
    }, [newPassword]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 text-white max-lg:mx-auto">

            {/* This section for define Account Settings header*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>ACCOUNT SETTINGS</span>
            </div>
            <div className='grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-3'>

                {/* This section for define Personal Details*/}

                <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Personal Details</span>
                    </div>
                    <div className='flex flex-col px-5 mt-10 gap-5'>

                        {!userInfo?.social ? <div className='space-y-5'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full"
                                size='sm'
                            >
                                Change Password
                            </Button>
                            <div className='flex flex-col w-full'>
                                <label className='font-normal text-xs text-white/65'>Enter new password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setError("");
                                    }}
                                    className='w-full outline-none p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30 notranslate'
                                    translate='no'
                                    required
                                />
                                {
                                    error ? <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs mt-2'>{icons.error}&nbsp;{error}</div> : <div className='w-full h-8'></div>
                                }
                            </div>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full"
                                size='sm'
                                isLoading={isPasswordResetProcessing}
                                onPress={handleSetNewPassword}
                            >
                                {isChangePasswordSuccessed ? <span>Changed successfully!</span> : <span>Save</span>}
                            </Button>
                        </div> : <Button
                            radius="lg"
                            className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full"
                            size='sm'
                        >
                            <span>Connected with</span>
                            <span>{userInfo?.social ? icons[userInfo?.social] : ""}</span>
                        </Button>}
                    </div>
                </div>

                {/* This section for define Subscription info*/}
                {
                    userInfo?.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Subscription info</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5'>
                                <div className='mt-10'>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full"
                                        size='sm'
                                    >
                                        <span>Actve until {moment(userInfo?.subscription.expire_date).format("DD.MM.YYYY")}</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                        size='sm'
                                    >
                                        Payment Method: <span className='capitalize bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{userInfo?.subscription.payment_method}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                }

                {/* This section for define Contract Lockleaks*/}
                {
                    userInfo?.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Contract Lockleaks</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5'>
                                <div className='mt-10'>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                        size='sm'
                                    >
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </div>
                }

                {/* This section for define Tutorials*/}

                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Tutorials</span>
                    </div>
                    <div className='flex flex-col px-5 gap-5'>
                        <div className='mt-10'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                size='sm'
                                onPress={() => window.open("/help", '_blank')}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
