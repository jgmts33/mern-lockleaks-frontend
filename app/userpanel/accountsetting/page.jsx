"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';

export default function AccountSetting() {

    return (
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
            <div className='mt-5'>
                <span className='font-extrabold text-lg'>ACCOUNT SETTINGS</span>
            </div>
            <div className='grid grid-cols-4 gap-10'>
                <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 p-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Personal Details</span>
                    </div>
                    <div className='flex flex-col px-10 mt-10 gap-5'>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Connected with
                            </Button>
                        </div>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Change Password
                            </Button>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-normal text-xs text-white/65'>Enter new password</label>
                            <textarea className='bg-white/10 rounded-lg'></textarea>
                        </div>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 p-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Subscription info</span>
                    </div>
                    <div className='flex flex-col px-10 gap-5'>
                        <div className='mt-10'>
                            <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Actve until 22.02.2024
                            </Button>
                        </div>
                        <div>
                            <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Connected with
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 px-10 py-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Contract Lockleaks</span>
                    </div>
                    <div className='flex flex-col px-10 gap-5'>
                        <div className='mt-10'>
                            <Button radius="lg" className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full" size='sm'>
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 px-10 py-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Tutorials</span>
                    </div>
                    <div className='flex flex-col px-10 gap-5'>
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
