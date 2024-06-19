"use client";
import {
    Button, ScrollShadow
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { downloadSrapedData, getScrapedDataList } from '@/axios/download';
import moment from 'moment/moment';
import { scanProgress as scanProgressInfo } from "@/lib/bot/botSlice";
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';

export default function DownloadData() {

    const userInfo = useSelector(info);
    const [list, setList] = useState([]);
    const scanProgress = useSelector(scanProgressInfo);
    const [isProcessing, setIsProcessing] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const getScrapedDataListInfo = async () => {
        setIsLoading(true);
        const res = await getScrapedDataList();

        if (res.status == 'success') {
            setList(res.data);
        } else {
            console.log(res.data);
        }
        setIsLoading(false);
    }

    const convertToDate = (str) => {
        const dateParts = str.split("_")[0].split("-");
        const dateObj = moment(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`, "YYYY-MM-DD");

        return dateObj.format("MMMM DD, YYYY");
    }

    const handleDownload = useCallback(async (folder_name, index) => {
        setIsProcessing(index);
        const res = await downloadSrapedData(folder_name);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${folder_name}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setList((p) => {
                let data = p.slice();
                data[index].downloaded = true;
                return data;
            });

        } else {
            console.log("Error");
        }
        setIsProcessing(-1);
    }, [list]);

    useEffect(() => {
        if (scanProgress == 100) getScrapedDataListInfo();
    }, [scanProgress]);

    useEffect(() => {

        const socket = io(ENDPOINT);

        if (!userInfo) return;
        getScrapedDataListInfo();

        socket.on(`scraped_data_expired_${userInfo.id}`, (value) => {
            console.log(`scraped_data_expired_${userInfo.id}:`, value);
            setList(p => p.filter((item) => item.id != value));
        });

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 container text-white max-lg:mx-auto">

            {/* This section for define download data header?*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DOWNLOAD DATA</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-5 w-full max-md:px-4 max-sm:mt-20'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-8 gap-5 scroll-y max-md:px-4 max-sm:gap-3'>
                        {
                            isLoading ?
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
                                list.length ? list.map((item, index) => {
                                    return (
                                        <div key={index} className='flex items-center gap-4 max-xl:gap-5 max-sm:gap-2'>
                                            <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px] justify-between items-end max-sm:items-start max-sm:flex-col gap-3'>
                                                <p className='max-sm:font-normal font-bold max-sm:text-sm'>
                                                    {item.scrape_date}-Scanner
                                                </p>
                                            </div>
                                            <div>
                                                <Button
                                                    radius="lg"
                                                    className={item.status == 'available' ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"}
                                                    size='sm'
                                                    isLoading={isProcessing == index}
                                                    onClick={() => {
                                                        if (item.status == 'available') handleDownload(item.scrape_date, index);
                                                    }}
                                                >
                                                    {item.status == 'available' ? item.downloaded ? <span>Downloaded</span> : <span>Download</span> : <span>Expired</span>}
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

            {/* This section for define download data warning?*/}

            {/* <div className='flex bg-white/10 shadow-sm py-5 px-16 max-sm:px-5 gap-7 rounded-[16px] border border-gray-500 max-w-[1300px] items-center mt-10 w-full max-sm:mt-20'>
                <div>{icons.warning}</div>
                <div className='flex gap-16 max-md:flex-col max-md:gap-1'>
                    <span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Scan name February 27, 2024</span>
                    <span className='font-semibold text-base '>Date Has Expired</span>
                </div>
            </div> */}
        </div>
    )
}
