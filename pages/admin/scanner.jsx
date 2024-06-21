"use client";
import {
    Button, ScrollShadow,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { UpDownScroll, MoreDetails } from "@/components/utils/Icons";
import { acceptOrder, getScrapedDataList } from '@/axios/download';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';

export default function Scanner() {

    const [scrapedData, setScrapedData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useSelector(info);

    const icons = {
        updownscroll: <UpDownScroll />,
        moredetails: <MoreDetails />,
    };

    const [scannerDetails, setScannerDetails] = useState({
        title: "STATUS GOOGLE & BING",
        total_orders: 0,
        accept_orders: 0,
        pending_orders: 0
    });

    const getScrapedDataListInfo = async () => {
        setIsLoading(true);
        const res = await getScrapedDataList(true);
        console.log("res:", res);
        if (res.status == 'success') setScrapedData(res.data);
        setIsLoading(false);
    }

    const handleAccept = useCallback(async (folder_name, index) => {
        setIsProcessing(index);
        if (scrapedData[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator')) return;
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

            setScrapedData((p) => {
                let data = p.slice();
                data[index].accepted = true;
                return data;
            });

        } else {
            console.log("Error");
        }
        setIsProcessing(-1);
    }, [scrapedData, userInfo]);

    useEffect(() => {
        setScannerDetails(p => ({
            ...p,
            total_orders: scrapedData.length,
            accept_orders: scrapedData.filter(p => p.accepted).length,
            pending_orders: scrapedData.filter(p => !p.accepted).length
        }))
    }, [scrapedData]);

    useEffect(() => {
        getScrapedDataListInfo();

        const socket = io(ENDPOINT);

        socket.on(`scanner-finished`, async (value) => {
            if (value == '') {
                getScrapedDataListInfo();
            }
        });

        socket.on(`scraped_data_expired_admin`, (value) => {
            console.log(`scraped_data_expired_admin:`, value);
            setScrapedData(p => p.filter((item) => !value.find((_value) => _value.id == item.id)));
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>SCANNER ORDERS</span>
            </div>
            <div className='flex w-full gap-5 max-xl:flex-col'>
                <div className='flex flex-col bg-white/10 border border-gray-500 px-5 py-10 rounded-[16px] mt-5 w-full'>
                    <ScrollShadow className="h-[320px]">
                        <div className='flex flex-col scroll px-5 gap-5 max-sm:px-2'>
                            {
                                isLoading ?
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                                    :
                                    scrapedData.length ? scrapedData.map((item, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-4 max-sm:gap-2'>
                                                <div className='bg-white/20 p-3 w-full rounded-[16px] font-normal text-sm'>
                                                    {item.scrape_date}
                                                </div>
                                                <div>
                                                    <Button
                                                        radius="lg"
                                                        className={item.status == 'available' ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"}
                                                        size='sm'
                                                        isLoading={isProcessing == index}
                                                        onClick={() => {
                                                            if (item.status == 'available') handleAccept(item.scrape_date, index);
                                                        }}
                                                    >
                                                        {item.status == 'available' ? item.accepted ? "Accepted" : "Accept" : "Expired"}
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                        :
                                        <p>There is no any order yet.</p>
                            }
                        </div>
                    </ScrollShadow>
                </div>
                <div className="flex flex-col w-full h-1/2 mt-5 max-w-[500px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-2 max-lg:mx-auto max-sm:mt-7">
                    <div className='flex justify-between pl-3 py-3'>
                        <div className='px-5 cursor-pointer'><span className='font-medium text-lg'>{scannerDetails.title}</span></div>
                        <div>{icons.moredetails}</div>
                    </div>
                    <div className='flex gap-5'>
                        <div>{icons.updownscroll}</div>
                        <div className='flex flex-col'>
                            <span className='text-[#A29EB1]'>total orders:</span>
                            <span className='py-1'>{scannerDetails.total_orders}</span>
                            <div className='flex flex-col space-y-2 py-3'>
                                {userInfo?.roles?.find(p => p == 'admin') ? <div className='flex gap-2'>
                                    <span className='gap-5 font-normal text-[18px] text-[#A29EB1]'>Accepted orders:</span>
                                    <span className='gap-5 font-normal text-[18px] text-white'>{scannerDetails.accept_orders}</span>
                                </div> : <></>}
                                <div className='flex gap-2'>
                                    <span className='font-normal text-[18px] text-[#A29EB1]'>Pending orders:</span>
                                    <span className='font-normal text-[18px] text-[white]'>{scannerDetails.pending_orders}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
