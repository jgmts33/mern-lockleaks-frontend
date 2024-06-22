"use client";
import {
    Button, ScrollShadow,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { downloadSrapedData, getScrapedDataList } from '@/axios/download';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';

export default function DownloadData() {

    const userInfo = useSelector(info);
    const [list, setList] = useState([]);
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
        if ( !userInfo ) return;
        const socket = io(ENDPOINT);

        getScrapedDataListInfo();

        socket.on(`scraped_data_expired_${userInfo.id}`, (value) => {
            console.log(`scraped_data_expired_${userInfo.id}:`, value);
            setList(p => p.filter((item) => item.id != value));
        });

        socket.on(`scanner-finished-${userInfo.id}`, () => {
            getScrapedDataListInfo();
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
                                <div class="w-full justify-center flex">
                                    <Spinner />
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
