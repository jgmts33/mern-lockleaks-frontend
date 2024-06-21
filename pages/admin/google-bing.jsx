"use client";
import {
    Button,
    ScrollShadow,
    Spinner
} from '@nextui-org/react';
import { GoogleSearch, Components, BingSearch } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { acceptOrder, getScrapedDataList } from '@/axios/download';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';

export default function GoogleBing() {

    const [googleScrapedData, setGoogleScrapedData] = useState([]);
    const [bingScrapedData, setBingScrapedData] = useState([]);
    const [isLoading, setIsLoading] = useState({
        google: false,
        bing : false,
    });
    const [isProcessing, setIsProcessing] = useState({
        index: -1,
        type: ''
    });
    const userInfo = useSelector(info);

    const icons = {
        googlesearch: <GoogleSearch />,
        components: <Components />,
        bingsearch: <BingSearch />,
    };

    const getGoogleScrapedDataListInfo = async () => {
        setIsLoading(p => ({...p, google: true}));
        const resGoogle = await getScrapedDataList(true, 'google');
        if (resGoogle.status == 'success') setGoogleScrapedData(resGoogle.data);
        setIsLoading(p => ({...p, google: false}));
    }

    const getBingScrapedDataListInfo = async () => {
        setIsLoading(p => ({...p, bing: true}));
        const resBing = await getScrapedDataList(true, 'bing');
        if (resBing.status == 'success') setBingScrapedData(resBing.data);
        setIsLoading(p => ({...p, bing: false}));
    }

    const handleAccept = useCallback(async (folder_name, index, only) => {
        setIsProcessing({
            index,
            type:only
        })
        if (only == 'google' && googleScrapedData[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator')) return;
        if (only == 'bing' && bingScrapedData[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator')) return;

        const res = await acceptOrder(folder_name);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${folder_name}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            if (only == 'google') setGoogleScrapedData((p) => {
                let data = p.slice();
                data[index].accepted = true;
                return data;
            });

            if (only == 'bing') setBingScrapedData((p) => {
                let data = p.slice();
                data[index].accepted = true;
                return data;
            });

        } else {
            console.log("Error");
        }

        setIsProcessing({
            index : -1,
            type: ''
        })
    }, [userInfo, googleScrapedData, bingScrapedData]);

    useEffect(() => {
        getGoogleScrapedDataListInfo();
        getBingScrapedDataListInfo();

        const socket = io(ENDPOINT);

        socket.on(`scanner-finished`, async (value) => {
            if (value == 'google') {
                getGoogleScrapedDataListInfo();
            }
            if (value == 'bing') {
                getBingScrapedDataListInfo();
            }
        })

        return () => socket.disconnect();
    }, []);

    const [googleScannerContent, setGoogleScannerContent] = useState([
        {
            icon: icons.googlesearch,
            title: "TOTAL ORDERS:",
            content: 0
        },
        {
            icon: icons.googlesearch,
            title: "ACCEPTED ORDERS:",
            content: 0
        }, {
            icon: icons.googlesearch,
            title: "PENDING ORDERS:",
            content: 0
        }
    ]);


    const [bingScannerContent, setBingScannerContent] = useState([
        {
            icon: icons.bingsearch,
            title: "TOTAL ORDERS:",
            content: 0
        },
        {
            icon: icons.bingsearch,
            title: "ACCEPTED ORDERS:",
            content: 0
        }, {
            icon: icons.bingsearch,
            title: "PENDING ORDERS:",
            content: 0
        }
    ]);

    useEffect(() => {

        if (userInfo?.roles?.find(p => p == 'admin')) setGoogleScannerContent([
            {
                icon: icons.googlesearch,
                title: "TOTAL ORDERS:",
                content: googleScrapedData.length
            }, {
                icon: icons.googlesearch,
                title: "ACCEPTED ORDERS:",
                content: googleScrapedData.filter(p => p.accepted == true).length
            }, {
                icon: icons.googlesearch,
                title: "PENDING ORDERS:",
                content: googleScrapedData.filter(p => p.accepted == false).length
            }
        ])
        else setGoogleScannerContent([
            {
                icon: icons.googlesearch,
                title: "TOTAL ORDERS:",
                content: googleScrapedData.length
            }, {
                icon: icons.googlesearch,
                title: "PENDING ORDERS:",
                content: googleScrapedData.filter(p => p.accepted == false).length
            }
        ])
    }, [googleScrapedData, userInfo]);

    useEffect(() => {
        if (userInfo?.roles?.find(p => p == 'admin')) setBingScannerContent([
            {
                icon: icons.bingsearch,
                title: "TOTAL ORDERS:",
                content: bingScrapedData.length
            },
            {
                icon: icons.bingsearch,
                title: "ACCEPTED ORDERS:",
                content: bingScrapedData.filter(p => p.accepted == true).length
            }, {
                icon: icons.bingsearch,
                title: "PENDING ORDERS:",
                content: bingScrapedData.filter(p => p.accepted == false).length
            }
        ])
        else setBingScannerContent([
            {
                icon: icons.bingsearch,
                title: "TOTAL ORDERS:",
                content: bingScrapedData.length
            }, {
                icon: icons.bingsearch,
                title: "PENDING ORDERS:",
                content: bingScrapedData.filter(p => p.accepted == false).length
            }
        ])
    }, [bingScrapedData, userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 w-full py-5 text-white max-lg:mx-auto max-lg:px-3">
            <div className='max-lg:mx-auto'>
                <div className='flex items-center'>
                    <div>
                        <span className='font-extrabold text-lg'>GOOGLE & BING ORDERS</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full max-xl:flex-col gap-5'>
                <div className='flex flex-col w-full max-md:gap-3'>
                    <div className='flex flex-col mt-5'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>Google</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full pb-8">
                            {
                                googleScannerContent.map((item, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                            <div className='flex justify-between p-7'>
                                                <div className='flex px-5 gap-5 w-1/2'>
                                                    <div>{item.icon}</div>
                                                    <span className='font-semibold text-sm'>{item.title}</span>
                                                </div>
                                                <div className='px-20 flex justify-start w-1/2'>
                                                    <span className='font-bold text-base'>{item.content}</span>
                                                </div>
                                            </div>
                                            <div className='flex px-6'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 max-md:p-4 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isLoading.google ?
                                        <div class="w-full justify-center flex">
                                            <Spinner />
                                        </div>
                                        :
                                        googleScrapedData.length ? googleScrapedData.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-4 max-sm:gap-2'>
                                                    <div className='bg-white/20 p-3 w-full rounded-[16px] font-normal text-sm'>
                                                        {`${item.user_id} - ${item.scrape_date}.zip`}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            radius="lg"
                                                            className={item.status == 'available' ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"}
                                                            size='sm'
                                                            isLoading={ isProcessing.index == index && isProcessing.type == 'google' }
                                                            onClick={() => {
                                                                if (item.status == 'available') handleAccept(item.scrape_date, index, 'google');
                                                            }}
                                                        >
                                                            {item.status == 'available' ? item.accepted ? <span>Accepted</span> : <span>Accept</span> : <span>Expired</span>}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                            <p>There is no any order yet.</p>
                                }
                            </div>
                        </ScrollShadow>
                    </div>
                </div>
                <div className='flex flex-col w-full max-lg:flex-col max-md:gap-3'>
                    <div className='flex flex-col mt-5 max-lg:mt-0'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>Bing</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 max-md:mt-3 w-full pb-8">
                            {
                                bingScannerContent.map((item, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                            <div className='flex justify-between p-7'>
                                                <div className='flex px-5 gap-5 w-1/2'>
                                                    <div>{item.icon}</div>
                                                    <span className='font-semibold text-sm'>{item.title}</span>
                                                </div>
                                                <div className='px-20 flex justify-start w-1/2'>
                                                    <span className='font-bold text-base'>{item.content}</span>
                                                </div>
                                            </div>
                                            <div className='flex px-6'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 max-md:p-4 rounded-[16px] mt-5 w-full max-sm:mt-2'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isLoading.bing ?
                                        <div class="w-full justify-center flex">
                                            <Spinner />
                                        </div>
                                        :
                                        bingScrapedData.length ? bingScrapedData.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-4 max-sm:gap-2'>
                                                    <div className='bg-white/20 p-3 w-full rounded-[16px] font-normal text-sm'>
                                                        {`${item.user_id} - ${item.scrape_date}.zip`}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            radius="lg"
                                                            className={item.status == 'available' ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"}
                                                            size='sm'
                                                            isLoading={ isProcessing.index == index && isProcessing.type == 'bing' }
                                                            onClick={() => {
                                                                if (item.status == 'available') handleAccept(item.scrape_date, index, 'bing');
                                                            }}
                                                        >
                                                            {item.status == 'available' ? item.accepted ? <span>Accepted</span> : <span>Accept</span> : <span>Expired</span>}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                            <p>There is no any order yet.</p>
                                }
                            </div>
                        </ScrollShadow>
                    </div>
                </div>
            </div >
        </div >
    )
}
