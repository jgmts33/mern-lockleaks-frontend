"use client";
import {
    Button,
    ScrollShadow,
    Spinner
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { acceptOrder, getScrapedDataList } from '@/axios/download';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import { getRRPhotoScanResultsList } from '@/axios/rr-photo';
import { getRRUserScanResultsList } from '@/axios/rr-user';

export default function RRContent() {

    const [rrPhotoScrapedData, setRRPhotoScrapedData] = useState([]);
    const [rrUserScrapedData, setRRUserScrapedData] = useState([]);
    const [isLoading, setIsLoading] = useState({
        photo: false,
        user: false,
    });
    const [isProcessing, setIsProcessing] = useState({
        index: -1,
        type: ''
    });
    const userInfo = useSelector(info);

    const icons = {
        components: <Components />,
    };

    const getRRPhotoScrapedDataListInfo = async () => {
        setIsLoading(p => ({ ...p, photo: true }));
        const res = await getRRPhotoScanResultsList();
        if (res.status == 'success') setRRPhotoScrapedData(res.data);
        setIsLoading(p => ({ ...p, photo: false }));
    }

    const getRRUserScrapedDataListInfo = async () => {
        setIsLoading(p => ({ ...p, user: true }));
        const res = await getRRUserScanResultsList();
        if (res.status == 'success') setRRUserScrapedData(res.data);
        setIsLoading(p => ({ ...p, user: false }));
    }

    const handleAccept = useCallback(async (folder_name, index, type) => {
        setIsProcessing({
            index,
            type: type
        })
        if (type == 'photo' && rrPhotoScrapedData[index]?.downloaded == true && userInfo.roles.find(p => p == 'moderator')) return;
        if (type == 'user' && rrUserScrapedData[index]?.downloaded == true && userInfo.roles.find(p => p == 'moderator')) return;

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

            if (type == 'photo') setRRPhotoScrapedData((p) => {
                let data = p.slice();
                data[index].downloaded = true;
                return data;
            });

            if (type == 'user') setRRUserScrapedData((p) => {
                let data = p.slice();
                data[index].downloaded = true;
                return data;
            });

        } else {
            console.log("Error");
        }

        setIsProcessing({
            index: -1,
            type: ''
        })
    }, [userInfo, rrPhotoScrapedData, rrUserScrapedData]);

    useEffect(() => {
        getRRPhotoScrapedDataListInfo();
        getRRUserScrapedDataListInfo();

        const socket = io(ENDPOINT);

        socket.on(`rr-photo-scan-finished`, async (value) => {
            getRRPhotoScrapedDataListInfo();
        })

        socket.on(`rr-user-scan-finished`, async (value) => {
            getRRUserScrapedDataListInfo();
        })

        return () => socket.disconnect();
    }, []);

    const [rrPhotoScannerContent, setRRPhotoScannerContent] = useState([
        {
            icon: icons.components,
            title: "TOTAL ORDERS:",
            content: 0
        },
        {
            icon: icons.components,
            title: "ACCEPTED ORDERS:",
            content: 0
        }, {
            icon: icons.components,
            title: "PENDING ORDERS:",
            content: 0
        }
    ]);


    const [rrUserScannerContent, setRRUserScannerContent] = useState([
        {
            icon: icons.components,
            title: "TOTAL ORDERS:",
            content: 0
        },
        {
            icon: icons.components,
            title: "ACCEPTED ORDERS:",
            content: 0
        }, {
            icon: icons.components,
            title: "PENDING ORDERS:",
            content: 0
        }
    ]);

    useEffect(() => {

        if (userInfo?.roles?.find(p => p == 'admin')) setRRPhotoScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: rrPhotoScrapedData.length
            }, {
                icon: icons.components,
                title: "ACCEPTED ORDERS:",
                content: rrPhotoScrapedData.filter(p => p.accepted == true).length
            }, {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: rrPhotoScrapedData.filter(p => p.accepted == false).length
            }
        ])
        else setRRPhotoScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: rrPhotoScrapedData.length
            }, {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: rrPhotoScrapedData.filter(p => p.accepted == false).length
            }
        ])
    }, [rrPhotoScrapedData, userInfo]);

    useEffect(() => {
        if (userInfo?.roles?.find(p => p == 'admin')) setRRUserScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: rrUserScrapedData.length
            },
            {
                icon: icons.components,
                title: "ACCEPTED ORDERS:",
                content: rrUserScrapedData.filter(p => p.accepted == true).length
            }, {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: rrUserScrapedData.filter(p => p.accepted == false).length
            }
        ])
        else setRRUserScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: rrUserScrapedData.length
            }, {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: rrUserScrapedData.filter(p => p.accepted == false).length
            }
        ])
    }, [rrUserScrapedData, userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 w-full py-5 text-white max-lg:mx-auto max-lg:px-3">
            <div className='max-lg:mx-auto'>
                <div className='flex items-center'>
                    <div>
                        <span className='font-extrabold text-lg'>R & R User Content Orders</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full max-xl:flex-col gap-5'>
                <div className='flex flex-col w-full max-md:gap-3'>
                    <div className='flex flex-col mt-5'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>R & R User Content Photo</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full pb-8">
                            {
                                rrPhotoScannerContent.map((item, index) => {
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
                                        rrPhotoScrapedData.length ? rrPhotoScrapedData.map((item, index) => {
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
                                                            isLoading={isProcessing.index == index && isProcessing.type == 'google'}
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
                            <span className='font-semibold text-base max-lg:text-center'>R & R User Content User</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 max-md:mt-3 w-full pb-8">
                            {
                                rrUserScannerContent.map((item, index) => {
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
                                        rrUserScrapedData.length ? rrUserScrapedData.map((item, index) => {
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
                                                            isLoading={isProcessing.index == index && isProcessing.type == 'bing'}
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
