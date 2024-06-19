"use client";
import { MoreDetails, UpDownScroll } from "@/components/utils/Icons";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userInfo as info } from '@/lib/auth/authSlice';
import { scanProgress as scanProgressInfo, setScanProgress } from "@/lib/bot/botSlice";
import { getScrapedDataList } from "@/axios/download";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { DEFAULT_SCAN_RESULT, ENDPOINT, DEFAULT_EXTRA_REPORT } from "@/config/config";
import { getExtraReport } from "@/axios/user";
import { getTickets } from "@/axios/ticket";
import { getSocialScanResult } from "@/axios/social";
import { getAIFaceScanResult } from "@/axios/ai-face";

export default function AdminDashbaord() {

    const router = useRouter();

    const userInfo = useSelector(info);
    const scanProgress = useSelector(scanProgressInfo);

    const DEFAULT = DEFAULT_SCAN_RESULT;

    const dispatch = useDispatch();
    const [scanResult, setScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [lastScanResult, setLastScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [personalAgentCount, setPersonalAgentCount] = useState({
        total: 0,
        last: 0
    })
    const [social, setSocial] = useState({
        total: 0,
        last: 0
    })
    const [aiBots, setAiBots] = useState({
        total: 0,
        last: 0
    })
    const [extraReport, setExtraReport] = useState(DEFAULT_EXTRA_REPORT);

    const icons = {
        moredetails: <MoreDetails />,
        updownscroll: <UpDownScroll />,
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
            title: " Adult Tubes",
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
            subtitle: "total orders last 7 days",
            lastscan: 0,
            total: 0
        },
        {
            title: "Total Users",
            subtitle: "total users last 7 days",
            lastscan: 0,
            total: 0
        },
    ]);

    const getScrapedDataListInfo = async () => {

        const res = await getScrapedDataList(true);

        if (res.status == 'success') {

            if (res.data?.length >= 1) {
                setLastScanResult(res.data[0]);
            }

            let _scanResult = {
                total_google_links: 0,
                total_google_images: 0,
                total_google_videos: 0,
                total_bing_links: 0,
                total_bing_images: 0,
                total_bing_videos: 0,
                good_count: 0,
                other_count: 0,
                bad_count: 0,
                new_count: 0,
                report_count: 0,
                no_report_count: 0,
                matches_count: 0,
                no_matches_count: 0,
                status: 'available'
            };

            for (let item of res.data) {
                _scanResult.total_google_links += item.total_google_links
                _scanResult.total_google_images += item.total_google_images
                _scanResult.total_google_videos += item.total_google_videos
                _scanResult.total_bing_links += item.total_bing_links
                _scanResult.total_bing_images += item.total_bing_images
                _scanResult.total_bing_videos += item.total_bing_videos
                _scanResult.good_count += item.good_count
                _scanResult.other_count += item.other_count
                _scanResult.bad_count += item.bad_count
                _scanResult.new_count += item.new_count
                _scanResult.report_count += item.report_count
                _scanResult.no_report_count += item.no_report_count
                _scanResult.matches_count += item.matches_count
                _scanResult.no_matches_count += item.no_matches_count
            };

            setScanResult(_scanResult);

        } else {
            console.log(res.data);
        }
    };

    const getTicketsInfo = async () => {
        const res = await getTickets();

        if (res.status == 'success') {
            let total = 0, last = 0;
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].count != 0 && last == 0) last = res.data[index].count;
                total += res.data[index].count;
            }

            setPersonalAgentCount({
                total,
                last: last
            })
        }
    }

    const getSocialScrapedDataInfo = async () => {
        const res = await getSocialScanResult();
        if (res.status == 'success') {
            setSocial({
                total: res.data.totalResult,
                last: res.data.lastResult
            });
        }
    }

    const getAIBotsScrapedDataInfo = async () => {
        const res = await getAIFaceScanResult();
        if (res.status == 'success') {
            setAiBots({
                total: res.data.totalResult,
                last: res.data.lastResult
            });
        }
    }

    const getExtraReportInfo = async () => {
        const res = await getExtraReport();

        if (res.status == 'success') setExtraReport(res.data);
    }

    useEffect(() => {
        let _overview = [
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
                lastscan: aiBots.last,
                total: aiBots.total
            },
            {
                title: " Adult Tubes",
                subtitle: "total last scan",
                lastscan:
                    lastScanResult.matches_count +
                    lastScanResult.no_matches_count +
                    lastScanResult.no_report_count +
                    lastScanResult.report_count,
                total:
                    scanResult.matches_count +
                    scanResult.no_matches_count +
                    scanResult.no_report_count +
                    scanResult.report_count

            },
            {
                title: "Social Media",
                subtitle: "total last scan",
                lastscan: social.last,
                total: social.total
            },
            {
                title: "Personal Agent",
                subtitle: "total last scan",
                lastscan: personalAgentCount.last,
                total: personalAgentCount.total
            },
            {
                title: "File Hosted",
                subtitle: "total last scan",
                lastscan: lastScanResult.good_count,
                total: scanResult.good_count
            },
        ];

        if (userInfo?.roles?.find(p => p == 'admin')) {
            _overview = [
                ..._overview,
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
                },]
        }
        setDashboardOverview(_overview);
    }, [scanResult, lastScanResult, extraReport, userInfo, personalAgentCount, social, aiBots]);

    useEffect(() => {
        getScrapedDataListInfo();
        getExtraReportInfo();
        getTicketsInfo();
        getSocialScrapedDataInfo();
        getAIBotsScrapedDataInfo();

        const socket = io(ENDPOINT);

        socket.on(`${userInfo.id}:scrape`, (value) => {
            console.log("scrape-progress:", value)
            if (value) dispatch(setScanProgress(value));
        });

        socket.on(`admin:dashboardInfo`, async (value) => {
            if (value == 'scan-finished') {
                getScrapedDataListInfo();
                getExtraReportInfo();
            }
        })

        socket.on(`update_ticket_count`, (value) => {
            setPersonalAgentCount(p => ({
                last: value.last_count,
                total: p.total + value.count
            }))
        })

        socket.on(`social-scan-finished`, (value) => {
            setSocial(p => ({
                last: value,
                total: p.total + value
            }))
        })

        socket.on(`ai-face-scan-finished`, (value) => {
            setAiBots(p => ({
                last: value,
                total: p.total + value
            }))
        })

        return () => {
            socket.disconnect();
        }

    }, [dispatch, userInfo.id]);

    useEffect(() => {
        if (scanProgress.current == scanProgress.all && scanProgress.current != 0) {
            getScrapedDataListInfo();
            setTimeout(() => {
                dispatch(setScanProgress({
                    current: 0,
                    all: 0
                }));
            }, 30 * 1000);
        }
    }, [scanProgress]);

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
