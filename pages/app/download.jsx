"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Warning } from "@/components/utils/Icons";
import { downloadSrapedData, getDownloadList } from '../../axios/download';
import moment from 'moment/moment';

export default function DownloadData() {

    const [list, setList] = useState([]);

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    const getDownloadListInfo = async () => {
        const res = await getDownloadList();

        if (res.status == 'success') {
            setList(res.data);
        } else {
            console.log(res.data);
        }
    }

    const convertToDate = (str) => {
        const dateParts = str.split("_")[0].split("-");
        const dateObj = moment(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`, "YYYY-MM-DD");

        return dateObj.format("MMMM DD, YYYY");
    }

    const handleDownload = async (folder_name) => {
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
        } else {
            console.log("Error");
        }
    }

    useEffect(() => {
        getDownloadListInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 container text-white max-lg:mx-auto">

            {/* This section for define download data header?*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DOWNLOAD DATA</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1100px] mt-5 w-full max-md:px-4 max-sm:mt-20'>
                <ScrollShadow className="h-[350px]">
                    <div className='flex flex-col scroll px-8 gap-5 scroll-y max-md:px-4 max-sm:gap-3'>
                        {
                            list.map((item, index) => {
                                return (
                                    <div key={index} className='flex items-end gap-10 max-xl:gap-5 max-sm:gap-2'>
                                        <div className='flex bg-white/20 shadow-sm p-3 w-full rounded-[16px] justify-between items-end max-sm:items-start max-sm:flex-col gap-3'>
                                            <p className='max-sm:font-normal font-bold max-sm:text-sm bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>
                                                {item.scrape_date}
                                            </p>
                                            <small className='max-sm:text-right max-sm:w-full'>{convertToDate(item.scrape_date)}</small>
                                        </div>
                                        <div>
                                            <Button
                                                radius="lg"
                                                className={item ? "bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" : "bg-gradient-to-tr bg-white/10 text-white shadow-lg text-base"}
                                                size='sm'
                                                onClick={() => handleDownload(item.scrape_date)}
                                            >
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>

            {/* This section for define download data warning?*/}

            <div className='flex bg-white/10 shadow-sm py-5 px-16 max-sm:px-5 gap-7 rounded-[16px] border border-gray-500 max-w-[1300px] items-center mt-10 w-full max-sm:mt-20'>
                <div>{icons.warning}</div>
                <div className='flex gap-16 max-md:flex-col max-md:gap-1'>
                    <span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Scan name February 27, 2024</span>
                    <span className='font-semibold text-base '>Date Has Expired</span>
                </div>
            </div>
        </div>
    )
}
