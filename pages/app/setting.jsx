"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';


export default function AccountSetting() {

    const userInfo = useSelector(info);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 container text-white max-lg:mx-auto">

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
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full" size='sm'>
                                <span>Connected with</span>
                            </Button>
                        </div>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full" size='sm'>
                                <span>Change Password</span>
                            </Button>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-normal text-xs text-white/65'>Enter new password</label>
                            <textarea className='bg-white/10 rounded-lg'></textarea>
                        </div>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full" size='sm'>
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* This section for define Subscription info*/}
                {
                    userInfo.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Subscription info</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5'>
                                <div className='mt-10'>
                                    <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full" size='sm'>
                                        <span>Actve until 22.02.2024</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                        Connected with
                                    </Button>
                                </div>
                            </div>
                        </div>
                }

                {/* This section for define Contract Lockleaks*/}
                {
                    userInfo.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Contract Lockleaks</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5'>
                                <div className='mt-10'>
                                    <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
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
                            <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
