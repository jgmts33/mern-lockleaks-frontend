"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { MoreDetails, UpDownScroll } from "@/components/utils/Icons";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { scanResult as scanRusultInfo, lastScanResult as lastScanResultInfo, extraReport as extraReportInfo, setExtraReport } from "../../lib/bot/botSlice";
import { useRouter } from 'next/router';
import { getExtraReport, getUsersListInfo } from '../../axios/user';


export default function AdminDashbaord() {

    const router = useRouter();

    const scanResult = useSelector(scanRusultInfo);
    const lastScanResult = useSelector(lastScanResultInfo);
    const extraReport = useSelector(extraReportInfo);
    const dispatch = useDispatch();

    const icons = {
        moredetails: <MoreDetails/>,
        updownscroll: <UpDownScroll/>,
    };

    const [dashboardOverview, setDashboardOverview] = useState([
        {
            title: "Search Engines",
            path: "",
            lastscan: 0,
            total: 0
        },
        {
            title: "AI Bots",
            lastscan: 0,
            total: 0
        },
        {
            title: " Adult Tube Websites",
            path: "/app/adult-website",
            lastscan: 0,
            total: 0
        },
        {
            title: "Social Media",
            path: "/app/sm-scanner",
            lastscan: 0,
            total: 0
        },
        {
            title: "Personal Agent",
            lastscan: 0,
            total: 0
        },
        {
            title: "File Hosted",
            path: "/app/file-hosted",
            lastscan: 0,
            total: 0
        },
        {
            title: "Total Orders",
            subtitle:"total orders last 7 days",
            lastscan: 0,
            total: 0
        },
        {
            title: "Total Users",
            subtitle:"total users last 7 days",
            lastscan: 0,
            total: 0
        },
    ]);

    const getExtraReportInfo = async () => {
        const res = await getExtraReport();

        if (res.status == 'success') dispatch(setExtraReport(res.data));
    }

    useEffect(() => {
        setDashboardOverview([
            {
                title: "Search Engines",
                subtitle: "total last scan",
                lastscan:
                    lastScanResult.total_google_links +
                    lastScanResult.total_google_images +
                    lastScanResult.total_google_videos +
                    lastScanResult.total_bing_links +
                    lastScanResult.total_bing_images +
                    lastScanResult.total_bing_videos,
                total:
                    scanResult.total_google_links +
                    scanResult.total_google_images +
                    scanResult.total_google_videos +
                    scanResult.total_bing_links +
                    scanResult.total_bing_images +
                    scanResult.total_bing_videos
            },
            {
                title: "AI Bots",
                subtitle: "total last scan",
                lastscan: 0,
                total: 0
            },
            {
                title: " Adult Tube Websites",
                subtitle: "total last scan",
                lastscan: 
                    lastScanResult.matches_count+
                    lastScanResult.no_matches_count+
                    lastScanResult.no_report_count+
                    lastScanResult.report_count,
                total: 
                    scanResult.matches_count+
                    scanResult.no_matches_count+
                    scanResult.no_report_count+
                    scanResult.report_count
                
            },
            {
                title: "Social Media",
                subtitle: "total last scan",
                lastscan: 0,
                total: 0
            },
            {
                title: "Personal Agent",
                subtitle: "total last scan",
                lastscan: 0,
                total: 0
            },
            {
                title: "File Hosted",
                subtitle: "total last scan",
                lastscan: lastScanResult.good_count,
                total: scanResult.good_count
            },
            {
                title: "Total Orders",
                subtitle: "total orders in 7 days",
                lastscan: extraReport.order.weekly,
                total: extraReport.order.total
            },
            {
                title: "Total Users",
                subtitle: "total users in 7 days",
                lastscan: extraReport.user.weekly,
                total: extraReport.user.total
            },
        ])
    }, [scanResult, lastScanResult, extraReport]);

    useEffect(() => {
        getExtraReportInfo();
    },[])

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white">
            <div className='flex max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>OVERVIEW OF INFIRNGEMENT</span>
            </div>
            <div className='grid grid-cols-4 gap-5 py-10 max-sm:py-2 max-xl:grid-cols-3 max-md:grid-cols-1 max-lg:justify-center max-lg:items-center max-lg:mx-auto'>
                {
                    dashboardOverview.map((items, index) => {
                        return (
                            <div key={index} className="flex flex-col max-w-[480px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5">
                                <div className='flex justify-between py-3'>
                                    <div className='px-8 cursor-pointer '>
                                        <span className='font-medium text-lg hover:text-gray-200' onClick={() => router.push(items.path)}>{items.title}</span>
                                    </div>
                                    <div>{icons.moredetails}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div>{icons.updownscroll}</div>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A29EB1]'>{items.subtitle}</span>
                                        <span className='py-1'>{items.lastscan}</span>
                                        <div className='flex gap-5 py-5 items-center'>
                                            <div><span className='gap-5 font-medium text-lg text-[#A29EB1]'>Total:</span></div>
                                            <div><span className='font-bold text-base'>{items.total}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
