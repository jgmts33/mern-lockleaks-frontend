"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { GoogleSearch, Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import GoogleIcon from '@/public/assets/background/Google.svg';
import { useDispatch, useSelector } from 'react-redux';
import { scanProgress as scanProgressInfo, setScanProgress } from "../../lib/bot/botSlice";
import { getUsernames } from '@/axios/usernames';
import { scan } from '../../axios/bot';
import { getScrapedDataList } from '../../axios/download';

export default function Google() {

    const [scanResult, setScanResult] = useState({
        total_google_links: 0,
        total_google_images: 0,
        total_google_videos: 0
    });
    const scanProgress = useSelector(scanProgressInfo);

    const dispatch = useDispatch();
    const [usernames, setUsernames] = useState([]);

    const icons = {
        googlesearch: <GoogleSearch fill="currentColor" size={16} />,
        components: <Components fill="currentColor" size={16} />,
    };

    const getScrapedDataListInfo = async () => {

        const res = await getScrapedDataList(false, 'google', true);

        if (res.status == 'success') {
            if (res.data[0]) setScanResult(res.data[0]);
        } else {
            console.log(res.data);
        }
    };

    const handleScan = useCallback(async () => {
        if (!usernames.length || scanProgress) return;
        dispatch(setScanProgress(0.01));
        const res = await scan({
            usernames,
            only: 'google'
        });

        if (res.status == 'success') {
            dispatch(setScanProgress(100));
            getScrapedDataListInfo();
        }
        else {
            console.log(res.data);
        }
    }, [usernames, scanProgress]);

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
        getScrapedDataListInfo();
    }, []);

    const ScannerContent = [
        {
            icon: icons.googlesearch,
            title: "GOOGLE SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google Search, resulting in the detection of </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_links || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        },
        {
            icon: icons.googlesearch,
            title: "GOOGLE IMAGES SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google Images Search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_images || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        }, {
            icon: icons.googlesearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated an automated Google Videos Search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_google_videos || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

            {/* This section for define file google scan header*/}

            <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
                <div>
                    <span className='font-extrabold text-lg'>GOOGLE MODULE</span>
                </div>
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

            {/* This section for define google scan content*/}

            <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full pb-8">
                {
                    ScannerContent.map((items, index) => {
                        return (
                            <div key={index} className='flex flex-col px-5'>
                                <div className='flex justify-between p-7 max-md:flex-col'>
                                    <div className='flex px-5 gap-5 w-1/4 max-md:w-full max-md:px-0'>
                                        <div>{items.icon}</div>
                                        <span className='font-semibold text-sm'>{items.title}</span>
                                    </div>
                                    <div className='px-20 flex justify-start w-3/4 max-md:w-full max-md:px-0 max-md:mt-2'>
                                        <span className='font-normal text-xs'>{items.content}</span>
                                    </div>
                                </div>
                                <hr className='w-full' />
                            </div>
                        )
                    })
                }
                <div className='mt-10 mx-auto'>
                    <Image src={GoogleIcon} width={100} height={100} alt='google'></Image>
                </div>
            </div>

            {/* This section for define google scan footer*/}

            <div className="flex items-center px-16 py-8 justify-start bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-5 max-md:flex-col max-md:px-5">
                <div className='flex gap-5 items-center'>
                    <div>{icons.components}</div>
                    <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                </div>
                <div className='px-20 max-md:px-0 font-normal text-xs space-x-1 items-center'>
                    <span>Generated a removal report with </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{
                        (scanResult.total_google_links || 0) +
                        (scanResult.total_google_images || 0) +
                        (scanResult.total_google_videos || 0)
                    }</span>
                    <span>copyright infringements and forwarded it to Search Engines.</span>
                </div>
            </div>
        </div>
    )
}
