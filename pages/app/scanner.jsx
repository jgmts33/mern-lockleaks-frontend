"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { GoogleSearch, BingSearch, Complete } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { getUsernames } from '@/axios/usernames';
import { scan } from '../../axios/bot';
import { scanProgress as scanProgressInfo, scanResult as scanRusultInfo, setScanProgress, setScanResult } from "../../lib/bot/botSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function Scanner() {

    const scanProgress = useSelector(scanProgressInfo);
    const scanResult = useSelector(scanRusultInfo);

    const dispatch = useDispatch();
    const [usernames, setUsernames] = useState([]);

    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        bingsearch: <BingSearch fill="currentColor" size={16} />,
        complete: <Complete fill="currentColor" size={16} />,
    };

    const handleScan = useCallback(async () => {
        if (!usernames.length || scanProgress) return;
        dispatch(setScanProgress(0.1));
        const res = await scan({ usernames });

        if (res.status == 'success') {
            dispatch(setScanProgress(100));
            dispatch(setScanResult(res.data));
            console.log("res.data:", res.data);
        }
        else {
            console.log(res.data);
        }
    }, [usernames, scanProgress])

    const getUsernamesInfo = async () => {
        const res = await getUsernames();

        if (res.status == 'success') {
            setUsernames(res.data);
        }
        else {
            console.log(res.data);
        }
    }

    useEffect(() => {
        getUsernamesInfo();
    }, []);

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
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">

                {/* This section for define scanner header*/}

                <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                    <div><span className='font-extrabold text-lg'>SCANNER</span></div>
                    <div>
                        <Button
                            radius="lg"
                            className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!scanProgress ? "from-purple-light to-purple-weight" : scanProgress == 100 ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                            size='sm'
                            disabled={scanProgress}
                            onPress={() => handleScan()}
                        >
                            {
                                scanProgress == 0 ? "START" : scanProgress == 100 ? "FINISHED" : "Processing"
                            }
                        </Button>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl"
                        color='secondary'
                        value={scanProgress}
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
