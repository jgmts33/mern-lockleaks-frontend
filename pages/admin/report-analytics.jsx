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
import { downloadFile, getDataAnalyticsList, getDataReportList } from '../../axios/user';

export default function Scanner() {

    const [dataReportList, setDataReportList] = useState([]);
    const [dataAnalyticsList, setDataAnalyticsList] = useState([]);
    const [isProcessing, setIsProcessing] = useState({
        report: false,
        analytics: false
    });
    const [actionProcessing, setActionProcessing] = useState("");

    const getDataReportListInfo = async () => {
        setIsProcessing(p => ({ ...p, report: true }));
        const res = await getDataReportList(true);
        if (res.status == 'success') setDataReportList(res.data);
        setIsProcessing(p => ({ ...p, report: false }));
    }

    const getDataAnalyticsListInfo = async () => {
        setIsProcessing(p => ({ ...p, analytics: true }));
        const res = await getDataAnalyticsList(true);
        if (res.status == 'success') setDataAnalyticsList(res.data);
        setIsProcessing(p => ({ ...p, analytics: false }));
    }

    // const handleAccept = useCallback(async (folder_name, index) => {
    //     if (scrapedData[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator')) return;
    //     const res = await acceptOrder(folder_name);

    //     if (res.status == 'success') {
    //         const blob = new Blob([res.data]);
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `${folder_name}.zip`;
    //         document.body.appendChild(a);
    //         a.click();
    //         window.URL.revokeObjectURL(url);

    //         setScrapedData((p) => {
    //             let data = p.slice();
    //             data[index].accepted = true;
    //             return data;
    //         });

    //     } else {
    //         console.log("Error");
    //     }
    // }, [scrapedData, userInfo]);

    const handleDownload = async (fileName) => {
        setActionProcessing(fileName);
        const res = await downloadFile(fileName);
        if (res.status == 'success') {
            const decodedData = atob(res.data);
            const byteCharacters = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                byteCharacters[i] = decodedData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteCharacters.buffer);
            const arrayBuffer = byteArray.buffer;
            const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);

            // Create a temporary anchor element and simulate a click to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.pdf`; // Customize the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL to free up memory
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
        setActionProcessing("");
    }

    useEffect(() => {
        getDataReportListInfo();
        getDataAnalyticsListInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DATA REPORT AND ANALYTICS</span>
            </div>
            <div className='flex w-full gap-5 max-xl:flex-col'>
                <div className='flex flex-col bg-white/10 border border-gray-500 px-5 py-5 rounded-[16px] mt-5 w-full'>
                    <p>Data Report List</p>
                    <ScrollShadow className="h-[calc(100vh-240px)] mt-5">
                        <div className='flex flex-col scroll px-2 gap-5 max-sm:px-2'>
                            {
                                isProcessing.report ?
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                                    :
                                    dataReportList.length ? dataReportList.map((item, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-4 max-sm:gap-2'>
                                                <div className='bg-white/20 p-3 w-full rounded-[16px] font-normal text-sm'>
                                                    {item.data_report}
                                                </div>
                                                <div>
                                                    <Button
                                                        radius="lg"
                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base"
                                                        size='sm'
                                                        isLoading={actionProcessing == item.data_report}
                                                        onClick={() => handleDownload(item.data_report)}
                                                    >
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                        :
                                        <p>There is no any data yet.</p>
                            }
                        </div>
                    </ScrollShadow>
                </div>
                <div className='flex flex-col bg-white/10 border border-gray-500 px-5 py-5 rounded-[16px] mt-5 w-full'>
                    <p>Data Analytics List</p>
                    <ScrollShadow className="h-[calc(100vh-240px)] mt-5">
                        <div className='flex flex-col scroll px-2 gap-5 max-sm:px-2'>
                            {
                                isProcessing.analytics ?
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                                    :
                                    dataAnalyticsList.length ? dataAnalyticsList.map((item, index) => {
                                        return (
                                            <div key={index} className='flex items-center gap-4 max-sm:gap-2'>
                                                <div className='bg-white/20 p-3 w-full rounded-[16px] font-normal text-sm'>
                                                    {item.data_analytics}
                                                </div>
                                                <div>
                                                    <Button
                                                        radius="lg"
                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base"
                                                        size='sm'
                                                        isLoading={actionProcessing == item.data_analytics}
                                                        onClick={() => handleDownload(item.data_analytics)}
                                                    >
                                                        Download
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
            </div>
        </div>
    )
}
