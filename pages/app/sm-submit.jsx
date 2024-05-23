"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React, { useCallback, useState } from 'react';

export default function SMsubmit() {
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [linksStr, setLinksStr] = useState('');
    const [data, setData] = useState({
        social: '',
        links: []
    })

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        SMfacebook: <SMfacebook fill="currentColor" size={16} />,
        SMinstagram: <SMinstagram fill="currentColor" size={16} />,
        SMtwitter: <SMtwitter fill="currentColor" size={16} />,
        SMtelegram: <SMtelegram fill="currentColor" size={16} />,
        SMreddit: <SMreddit fill="currentColor" size={16} />,
    };

    const SOcialMediaButtons = [
        {
            icon: icons.SMfacebook,
            value: 'facebook',
        }, {
            icon: icons.SMinstagram,
            value: 'instagram',
        }, {
            icon: icons.SMtwitter,
            value: 'twitter',
        }, {
            icon: icons.SMtelegram,
            value: 'telegram',
        }, {
            icon: icons.SMreddit,
            value: 'reddit',
        }
    ]

    const handleSubmit = useCallback(() => {
        console.log("linksStr:", linksStr);
    },[linksStr]);

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto max-lg:px-3">

                {/* This section for define Social Submit header*/}

                <div className='flex gap-16 items-center max-lg:mx-auto'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA SUBMIT</span></div>
                </div>
                {/* This section for define Social Submit content*/}

                <div className='grid grid-cols-3 gap-10 max-2xl:gap-2 max-xl:flex-col max-xl:flex max-xl:gap-0'>
                    <div className="flex flex-col max-w-[462px] max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-8 pb-10 max-sm:mt-5">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base'>Select The Platform Icon Where You Want To Report The Profile.</span>
                            <div className='flex justify-around mt-5 max-lg:justify-between px-2 max-xl:gap-0 max-sm:gap-2'>
                                {
                                    SOcialMediaButtons.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                radius="sm"
                                                size='md'
                                                isIconOnly
                                                className={('bg-transparent p-6 ') + (data.social == item.value ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "")}
                                                onPress={() => {
                                                    setData({ ...data, social: item.value })
                                                }}
                                            >
                                                <span>{item.icon}</span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                            <textarea
                                className='bg-white/15 rounded-lg mt-3 h-20 p-2'
                                placeholder='https://domain.com/@username https://domain.com/@username ...'
                                value={linksStr}
                                onChange={(e) => setLinksStr(e.target.value)}
                            />
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 py-5 text-sm mx-auto mt-7"
                                size='sm'
                                onPress={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                {/* This section for define Social Media Submit result*/}

                <div className="flex items-center px-20 py-8 justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-xl:flex-col max-xl:px-3 max-sm:mt-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-xl:px-5 space-x-1'>
                        <span className='font-normal text-xs'>Generated a removal report with</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                        <span className='font-normal text-xs'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
