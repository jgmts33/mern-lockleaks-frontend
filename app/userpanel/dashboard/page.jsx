"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { MoreDetails, UpDownScroll } from "@/components/utils/Icons";
import React from 'react';

export default function Dashbaord() {

    const icons = {
        moredetails: <MoreDetails fill="currentColor" size={16} />,
        updownscroll: <UpDownScroll fill="currentColor" size={16} />,
    };

    const DashboardOverview = [
        {
            title: "Search engines",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Unauthorized Content Upload",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Adult tube sites",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Social media",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Personal Agent",
            lastscan: 123456,
            total: 123456
        },
        {
            title: "Forums",
            lastscan: 123456,
            total: 123456
        },
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-10 py-10 text-white">
            <div>
                <span className='font-extrabold text-lg'>OVERVIEW OF INFIRNGEMENT</span>
            </div>
            <div className='grid grid-cols-3 gap-10 py-10'>
                {
                    DashboardOverview.map((items, index) => {
                        return (
                            <div key={index} className="flex flex-col max-w-[480px] bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[20px] px-10 py-5">
                                <div className='flex justify-between px-3 py-3'>
                                    <div className='px-5 cursor-pointer'><span className='font-medium text-lg'>{items.title}</span></div>
                                    <div>{icons.moredetails}</div>
                                </div>
                                <div className='flex gap-5'>
                                    <div>{icons.updownscroll}</div>
                                    <div className='flex flex-col'>
                                        <span className='text-[#A29EB1]'>last scan:</span>
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
