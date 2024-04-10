"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { MoreDetails, UpDownScroll } from "@/components/utils/Icons";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AdminDashbaord() {

    const icons = {
        moredetails: <MoreDetails fill="currentColor" size={16} />,
        updownscroll: <UpDownScroll fill="currentColor" size={16} />,
    };

    const DashboardOverview = [
        {
            title: "Search Engines",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "AI Bots",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Adult Tube Websites",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Total users",
            subtitle:"total users last 7 days",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Social Media",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Personal Agent",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Forums",
            subtitle:"total last scan",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Total orders",
            subtitle:"total orders last 7 days",
            lastscan: 123456,
            total: 123456
        },
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 max-sm:pt-16 text-white">
            <div className='flex max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>OVERVIEW OF INFIRNGEMENT</span>
            </div>
            <div className='grid grid-cols-4 gap-5 py-10 max-sm:py-2 max-xl:grid-cols-3 max-md:grid-cols-1 max-lg:justify-center max-lg:items-center max-lg:mx-auto'>
                {
                    DashboardOverview.map((items, index) => {
                        return (
                            <div key={index} className="flex flex-col max-w-[480px] bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5">
                                <div className='flex justify-between px-3 py-3'>
                                    <div className='px-5 cursor-pointer'><span className='font-medium text-lg'>{items.title}</span></div>
                                    <div>{icons.moredetails}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div>{icons.updownscroll}</div>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A29EB1]'>{items.subtitle}</span>
                                        <span className='py-1'>{items.lastscan}</span>
                                        <div className='flex gap-5 py-5 items-center'>
                                            <div><span className='gap-5 font-medium text-lg text-[#A29EB1]'>ToTal:</span></div>
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
