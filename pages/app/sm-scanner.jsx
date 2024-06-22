"use client";
import {
    Button, Progress
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { getSocialUsername } from '@/axios/social-usernames';
import { socialScan } from '@/axios/bot';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import { getCurrentSocialScannerStatus } from '@/axios/social';
import { useRouter } from 'next/router';

export default function SMscanner() {

    const userInfo = useSelector(info);
    const [value, setValue] = React.useState(0);
    const [socialUsername, setSocialUsername] = useState('');
    const [scanResult, setScanResult] = useState(0)
    const [limit, setLimit] = useState(0);

    const icons = {
        components: <Components />,
    };

    const handleScan = useCallback(async () => {

        if (!socialUsername || !limit) return;
        setValue(90);
        const res = await socialScan(socialUsername);
        setValue(100);
        setTimeout(() => {
            setValue(0);
        }, 30 * 1000);
        if (res.status == 'success') {
            setScanResult(res.data.result);
        }


    }, [socialUsername, limit])

    const getSocialUsernameInfo = async () => {

        const res = await getSocialUsername();

        if (res.status == 'success') {
            setSocialUsername(res.data.username);
        }
    }

    const getCurrentStatus = useCallback(async () => {

        const res = await getCurrentSocialScannerStatus();

        if (res.status == 'success') {
            setLimit(userInfo.subscription.features.sm_scanner - res.data.count);

            if (res.data.inProgress) {
                setScanProgress(res.data.inProgress.progress * 100);
            }

        }
    }, [userInfo]);

    useEffect(() => {
        if ( !userInfo ) return;
        getSocialUsernameInfo();
        getCurrentStatus();

        const socket = io(ENDPOINT);

        socket.on(`social-scan-finished`, (value) => {
            if (value.user_id == userInfo.id) {
                setScanResult(value.result);
                setLimit(p => p - 1);
                setTimeout(() => {
                    setValue(0);
                }, 30 * 1000);
            }
        })

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

                {/* This section for define Social Media Scanner header*/}

                <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                    <div>
                        <span className='font-extrabold text-lg'>SOCIAL MEDIA SCANNER</span>
                    </div>
                    <div className='flex flex-col items-center gap-1 max-sm:hidden'>
                        <Button
                            radius="lg"
                            className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!value ? "from-purple-light to-purple-weight" : value == 100 ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                            isDisabled={!!value}
                            onPress={() => {
                                if (!value) handleScan()
                            }}
                        >
                            {
                                value == 0 ? <span>START</span> : value == 100 ? <span>FINISHED</span> : <span>Processing</span>
                            }
                        </Button>
                        <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'>Left: <span className='notranslate'>{limit}</span> </p>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl max-sm:hidden"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                    <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:mt-0 sm:hidden">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base text-center'>How Does It Work?</span>
                            <span className='font-normal text-xs pt-3'>Upload your ID card, then select the platform icon. Place the link or links of the profiles you want to report, and press the SUBMIT button.</span>
                        </div>
                    </div>
                </div>

                {/* This section for define Social Media Scanner content*/}

                <div className='grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:flex-col max-md:flex max-md:gap-0'>
                    <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:mt-5">
                        <div className='flex'>
                            <span className='font-normal text-base'><span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Warning:</span> Your government-issued ID is already in our database and does not need to be uploaded again. It will be used if necessary to delete the profiles you report. </span>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10 max-sm:hidden">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base text-center'>How Does It Work?</span>
                            <span className='font-normal text-xs pt-3'>Upload your ID card, then select the platform icon. Place the link or links of the profiles you want to report, and press the SUBMIT button.</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1 sm:hidden'>
                        <Button
                            radius="lg"
                            className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!value ? "from-purple-light to-purple-weight" : value == 100 ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                            isDisabled={!!value}
                            onPress={() => {
                                if (!value) handleScan()
                            }}
                        >
                            {
                                value == 0 ? <span>START</span> : value == 100 ? <span>FINISHED</span> : <span>Processing</span>
                            }
                        </Button>
                        <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'>Left: {limit} </p>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl sm:hidden"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>

                {/* This section for define Social Media Scanner list*/}

                <div className='flex flex-col mt-10 max-sm:mt-5'>
                    <div className='flex flex-col'>
                        <div className='flex gap-3 py-7 px-5'>
                            {icons.components}
                            <div className='flex items-center space-x-1 font-normal text-base'>
                                Scanning On <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg px-1'>4</span> websites.
                            </div>
                        </div>
                        <hr className='w-full'></hr>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex gap-3 py-7 px-5'>
                            {icons.components}
                            <div className='flex items-center space-x-1 font-normal text-base'>
                                Profiles Matched: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg px-1'>{scanResult}.</span>
                            </div>
                        </div>
                        <hr className='w-full'></hr>
                    </div>
                </div>

                {/* This section for define Social Media Scanner footer*/}

                <div className="flex items-center px-20 py-5 justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-5 max-lg:flex-col max-lg:px-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-lg:px-0 space-x-1 items-center'>
                        <span className='font-normal text-xs'>Generated a removal report with
                            <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-lg px-1'>{scanResult}</span>
                            <span className='font-normal text-sm'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
