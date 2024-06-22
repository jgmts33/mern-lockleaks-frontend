"use client";
import { MoreDetails, UpDownScroll } from "@/components/utils/Icons";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { userInfo as info } from '@/lib/auth/authSlice';
import { getScrapedDataList } from "@/axios/download";
import { io } from "socket.io-client";
import { DEFAULT_SCAN_RESULT, ENDPOINT } from "@/config/config";
import { getTicketsByUser } from "@/axios/ticket";
import { getSocialScanResultByUser } from "@/axios/social";
import { getAIFaceScanResultByUser } from "@/axios/ai-face";

export default function Dashbaord() {

    const router = useRouter();

    const userInfo = useSelector(info);

    const [scanResult, setScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [lastScanResult, setLastScanResult] = useState(DEFAULT_SCAN_RESULT);
    const [personalAgentCount, setPersonalAgentCount] = useState({
        total: 0,
        last: 0
    });
    const [social, setSocial] = useState({
        total: 0,
        last: 0
    })
    const [aiBots, setAiBots] = useState({
        total: 0,
        last: 0
    })

    const getScrapedDataListInfo = async () => {

        const res = await getScrapedDataList(!!userInfo?.roles.find(p => p == 'admin'));

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
            };;

            res.data.map((item) => {
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
            });

            setScanResult(_scanResult);

        } else {
            console.log(res.data);
        }
    };

    const getSocialScrapedDataInfo = async () => {
        const res = await getSocialScanResultByUser();
        if (res.status == 'success') {
            setSocial({
                total: res.data.totalResult,
                last: res.data.lastResult
            });
        }
    }

    const getAIBotsScrapedDataInfo = async () => {
        const res = await getAIFaceScanResultByUser();
        if (res.status == 'success') {
            setAiBots({
                total: res.data.totalResult,
                last: res.data.lastResult
            });
        }
    }

    const getTicketsByUserInfo = async () => {
        const res = await getTicketsByUser();

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
    ]);

    useEffect(() => {
        setDashboardOverview([
            {
                title: "Search Engines",
                path: "",
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
                lastscan: aiBots.last,
                total: aiBots.total
            },
            {
                title: " Adult Tubes",
                path: "/app/adult-website",
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
                path: "/app/sm-scanner",
                lastscan: social.last,
                total: social.total
            },
            {
                title: "Personal Agent",
                lastscan: personalAgentCount.last,
                total: personalAgentCount.total
            },
            {
                title: "File Hosted",
                path: "/app/file-hosted",
                lastscan: lastScanResult.good_count,
                total: scanResult.good_count
            }
        ])
    }, [scanResult, lastScanResult, personalAgentCount, social, aiBots]);

    useEffect(() => {
        if ( !userInfo ) return;
        getScrapedDataListInfo();
        getTicketsByUserInfo();
        getSocialScrapedDataInfo();
        getAIBotsScrapedDataInfo();

        const socket = io(ENDPOINT);

        socket.on(`update_ticket_count_${userInfo.id}`, (value) => {
            setPersonalAgentCount(p => ({
                last: value.last_count,
                total: p.total + value.count
            }))
        })

        socket.on(`ai-face-scan-finished`, (value) => {
            if ( value.user_id == userInfo.id ) getAIBotsScrapedDataInfo();
        })

        socket.on(`social-profile-submission`, (value) => {
            if ( value.user_id == userInfo.id ) getSocialScrapedDataInfo();
        })

        socket.on(`scanner-finished-${userInfo.id}`, () => {
            getScrapedDataListInfo();
        });

        socket.on(`social-scan-finished`, (value) => {
            if ( value.user_id == userInfo.id ) getSocialScrapedDataInfo();
        })

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 pt-5 text-white container">

            {/* This section for define dashboard header*/}

            <div className='flex max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>OVERVIEW OF INFIRNGEMENT</span>
            </div>

            {/* This section for define dashboard content*/}

            <div className='grid grid-cols-3 gap-10 py-10 max-xl:grid-cols-2 max-md:grid-cols-1 max-lg:justify-center max-lg:items-center max-lg:mx-auto max-sm:py-5 max-sm:gap-5'>
                {
                    dashboardOverview.map((items, index) => {
                        return (
                            <div key={index} className="flex flex-col max-w-[480px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5">
                                <div className='flex justify-between py-3'>
                                    <div className='px-8 cursor-pointer '>
                                        <span className='font-medium text-lg hover:text-gray-200'>{items.title}</span>
                                    </div>
                                    <div>{icons.moredetails}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div>{icons.updownscroll}</div>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A29EB1]'>last scan:</span>
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
