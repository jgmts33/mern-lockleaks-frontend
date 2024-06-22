"use client";
import {
    Button, Progress
} from '@nextui-org/react';
import { GoogleSearch, BingSearch, Complete } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { getUsernames } from '@/axios/usernames';
import { getScrapedDataList } from "@/axios/download";
import { scan } from '@/axios/bot';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import { DEFAULT_SCAN_RESULT, ENDPOINT } from '@/config/config';
import { io } from 'socket.io-client';
import { getCurrentScannerStatus } from '@/axios/scanner';
import { useRouter } from 'next/router';

export default function Scanner() {

    const userInfo = useSelector(info);
    const [scanProgress, setScanProgress] = useState({
        current: 0,
        all: 0
    })
    const [scanResult, setScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [usernames, setUsernames] = useState([]);
    const [limit, setLimit] = useState(0);

    const icons = {
        googlesearch: <GoogleSearch />,
        bingsearch: <BingSearch />,
        complete: <Complete />,
    };

    const handleScan = useCallback(async () => {
        if (!usernames.length || scanProgress.current || !limit) return;
        setScanProgress({
            current: 0.01,
            all: 100
        });
        scan({ usernames });

    }, [usernames, scanProgress, limit]);

    const getScannerResult = async () => {

        const res = await getScrapedDataList(false, "", true);

        if (res.status == 'success') {
            if (res.data?.length >= 1) {
                setScanResult(res.data[0]);
            }

        } else {
            console.log(res.data);
        }
    };

    const getUsernamesInfo = async () => {
        const res = await getUsernames();

        if (res.status == 'success') {
            setUsernames(res.data);
        }
        else {
            console.log(res.data);
        }
    }

    const getCurrentStatus = useCallback(async () => {

        const res = await getCurrentScannerStatus();
        if (res.status == 'success') {
            setLimit(userInfo.subscription.features.scanner - res.data.count);

            if (res.data.inProgress) {
                setScanProgress({
                    current: res.data.inProgress.progress,
                    all: 1
                });
            }

        }
    }, [userInfo, setLimit]);

    useEffect(() => {
        if ( !userInfo ) return;
        getUsernamesInfo();
        getCurrentStatus();

        const socket = io(ENDPOINT);

        socket.on(`${userInfo.id}:scrape`, (value) => {
            if (value) setScanProgress(value);
        });

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    useEffect(() => {
        if (scanProgress.current == scanProgress.all && scanProgress.current != 0) {
            getScannerResult();
            setLimit(p => p - 1);
            setTimeout(() => {
                setScanProgress({
                    current: 0,
                    all: 0
                });
            }, 30 * 1000);
        }
    }, [scanProgress]);


    const ScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated an automated Google Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_links}</span>
                <span className='font-normal text-xs'>new copyright infringements.</span>
            </div>
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated an automated Google Images Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_images}</span>
                <span className='font-normal text-xs'>new copyright infringements</span>
            </div>
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated an automated Google Videos Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_videos}</span>
                <span className='font-normal text-xs'>new copyright infringements.</span>
            </div>
        },
        {
            icon: icons.bingsearch,
            title: "BING SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated automated searches on Bing Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_links}</span>
                <span className='font-normal text-xs'>new copyright infringements.</span>
            </div>
        },
        {
            icon: icons.bingsearch,
            title: "BING IMAGES SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated automated searches on Bing Images Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_images}</span>
                <span className='font-normal text-xs'>new copyright infringements.</span>
            </div>
        },
        {
            icon: icons.bingsearch,
            title: "BING VIDEO SEARCH",
            content: <div className='px-20 justify-start w-3/4 max-md:w-full max-md:px-5 max-md:mt-2 space-x-1'>
                <span className='font-normal text-xs'>Initiated automated searches on Bing Video Search, resulting in the detection of</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_videos}</span>
                <span className='font-normal text-xs'>new copyright infringements.</span>
            </div>
        },
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

                {/* This section for define scanner header*/}

                <div className='flex gap-16 items-start max-md:flex-col max-md:gap-5'>
                    <div><span className='font-extrabold text-lg'>SCANNER</span></div>
                    <div className='flex flex-col items-center gap-1'>
                        <Button
                            radius="lg"
                            className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!scanProgress.current ? "from-purple-light to-purple-weight" : scanProgress.current == scanProgress.all ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                            isDisabled={scanProgress.current}
                            onPress={() => handleScan()}
                        >
                            {
                                scanProgress.current == 0 ? <span>START</span> : scanProgress.current == scanProgress.all ? <span>FINISHED</span> : <span>Processing</span>
                            }
                        </Button>
                        <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'>Left: <span className='notranslate'>{limit}</span> </p>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl"
                        color='secondary'
                        value={scanProgress.current * 100 / (scanProgress.all ? scanProgress.all : 1)}
                        showValueLabel={true}
                    />
                </div>

                {/* This section for define scanner content*/}

                <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-5">
                    {
                        ScannerContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5 max-md:px-0'>
                                    <div className='flex px-4 py-5 max-md:flex-col'>
                                        <div className='flex px-5 gap-5 w-1/4 max-md:w-full'>
                                            <div>{items.icon}</div>
                                            <div className='flex'><span className='font-semibold text-sm'>{items.title}</span></div>
                                        </div>
                                        {items.content}
                                    </div>
                                    <hr className='w-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/* This section for define scanner footer*/}

                <div className="flex items-center px-20 max-lg:px-3 max-lg:flex-col py-8 max-md:flex-col justify-start bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.complete}</div>
                        <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-md:px-0 font-normal text-xs space-x-1 max-sm:text-clip'>
                        <span className='font-normal text-xs'>Generated a removal report with</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{
                            scanResult.total_google_links +
                            scanResult.total_google_images +
                            scanResult.total_google_videos +
                            scanResult.total_bing_links +
                            scanResult.total_bing_images +
                            scanResult.total_bing_videos
                        }</span>
                        <span>copyright infringements and forwarded it to Search Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
