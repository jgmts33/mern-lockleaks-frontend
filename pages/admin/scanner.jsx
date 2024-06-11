"use client";
import {
    Button, ScrollShadow
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
    const [isProcessing, setIsProcessing] = useState(false);
    const userInfo = useSelector(info);

    const icons = {
        updownscroll: <UpDownScroll/>,
        moredetails: <MoreDetails/>,
    };

    const [scannerDetails, setScannerDetails] = useState({
        title: "STATUS GOOGLE & BING",
        total_orders: 0,
        accept_orders: 0,
        pending_orders: 0
    });

    const getScrapedDataListInfo = async () => {
        setIsProcessing(true);
        const res = await getScrapedDataList(true);
        console.log("res:", res);
        if (res.status == 'success') setScrapedData(res.data);
        setIsProcessing(false);
    }

    const handleAccept = useCallback(async (folder_name, index) => {
        if ( scrapedData[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator') ) return;
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

        socket.on(`admin:dashboardInfo`, async (value) => {
            if (value == 'scan-finished') {
                getScrapedDataListInfo();
            }
        });

        socket.on(`scraped_data_expired_admin`, (value) => {
            console.log(`scraped_data_expired_admin:`, value);
            setScrapedData(p => p.filter((item) => !value.find((_value) => _value.id == item.id)));
        });

        return () => socket.close();
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
                                isProcessing ?
                                    <div className='w-full flex justify-center'>
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    scrapedData.length ? scrapedData.map((item, index) => {
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
                                {userInfo?.roles?.find(p => p == 'admin') ?<div className='flex gap-2'>
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
