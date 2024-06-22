"use client";
import Image from 'next/image';
import {
    Button, Progress
} from '@nextui-org/react';
import { BingSearch, Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import BingIcon from '@/public/assets/background/Bing.svg';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { getUsernames } from '@/axios/usernames';
import { scan } from '@/axios/bot';
import { getScrapedDataList } from '@/axios/download';
import { DEFAULT_SCAN_RESULT, ENDPOINT } from '@/config/config';
import { io } from 'socket.io-client';
import { getCurrentScannerStatus } from '@/axios/scanner';
import { useRouter } from 'next/router';

export default function Bing() {

    const userInfo = useSelector(info);
    const [scanResult, setScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [scanProgress, setScanProgress] = useState({
        current: 0,
        all: 0
    })
    const [usernames, setUsernames] = useState([]);
    const [limit, setLimit] = useState(0);

    const icons = {
        bingsearch: <BingSearch />,
        components: <Components />,
    };

    const getScanResult = async () => {

        const res = await getScrapedDataList(false, 'bing', true);

        if (res.status == 'success') {
            if (res.data[0]) setScanResult(res.data[0]);
        } else {
            console.log(res.data);
        }
    };

    const handleScan = useCallback(async () => {
        if (!usernames.length || scanProgress.current || !limit) return;
        setScanProgress({
            current: 0.01,
            all: 100
        });
        scan({
            usernames,
            only: 'bing'
        });
    }, [usernames, scanProgress, limit]);

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

        const res = await getCurrentScannerStatus('bing');

        if (res.status == 'success') {
            setLimit(userInfo.subscription.features.bing - res.data.count);

            if (res.data.inProgress) {
                setScanProgress({
                    current: res.data.inProgress.progress,
                    all: 1
                });
            }

        }
    }, [userInfo]);

    useEffect(() => {
        if ( !userInfo ) return;
        getUsernamesInfo();
        getCurrentStatus();

        const socket = io(ENDPOINT);

        socket.on(`${userInfo.id}:scrape-bing`, (value) => {
            if (value) setScanProgress(value);
            localStorage.setItem('bing-scanner', JSON.stringify(value));
        });

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    useEffect(() => {
        if (scanProgress.current == scanProgress.all && scanProgress.current != 0) {
            getScanResult();
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
            icon: icons.bingsearch,
            title: "BING SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated automated searches on Bing Search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_links || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        },
        {
            icon: icons.bingsearch,
            title: "BING IMAGES SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated automated searches on Bing Images Search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_images || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        }, {
            icon: icons.bingsearch,
            title: "BING VIDEO SEARCH",
            content: <div className='flex items-center space-x-1 font-normal text-xs'>
                <div className='space-x-2'>
                    <span>Initiated automated searches on Bing Video Search, resulting in the detection of</span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult.total_bing_videos || 0}</span>
                    <span>new copyright infringements.</span>
                </div>
            </div>
        },
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

            {/* This section for define bing scan header*/}

            <div className='flex gap-16 items-start max-md:flex-col max-md:gap-5'>
                <div><span className='font-extrabold text-lg'>BING MODULE</span></div>
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

            {/* This section for define bing scan content*/}

            <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-3 pb-10">
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
                                        {items.content}
                                    </div>
                                </div>
                                <hr className='w-full' />
                            </div>
                        )
                    })
                }
                <div className='mt-10 mx-auto'>
                    <Image src={BingIcon} width={80} height={80} alt='bing'></Image>
                </div>
            </div>

            {/* This section for define bing scan footer*/}

            <div className="flex items-center px-20 py-8 justify-start bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-5 max-md:flex-col max-md:px-1">
                <div className='flex gap-5 items-center max-md:gap-1'>
                    <div>{icons.components}</div>
                    <span className='font-normal text-base'>SEARCH RESULTS REMOVAL MODULE</span>
                </div>
                <div className='px-20 max-md:px-5 font-normal text-xs space-x-1'>
                    <span className='font-normal text-xs'>Generated a removal report with </span>
                    <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{
                        (scanResult.total_bing_links || 0) +
                        (scanResult.total_bing_images || 0) +
                        (scanResult.total_bing_videos || 0)
                    }</span>
                    <span>copyright infringements and forwarded it to Search Engines.</span>
                </div>
            </div>
        </div>
    )
}
