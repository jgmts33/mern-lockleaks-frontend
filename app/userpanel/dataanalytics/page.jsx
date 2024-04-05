"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Warning } from "@/components/utils/Icons";
import React from 'react';

export default function DataAnalytics() {

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>DATA ANALYTICS</span>
            </div>
            <div className='flex gap-10 max-xl:flex-col max-lg:gap-0'>
                <div className="flex flex-col max-w-[400px] max-xl:mx-auto max-lg:max-w-full w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                    <div className='mx-auto'>
                        <span className='font-extrabold text-lg'>Data Analytics and Insights</span>
                    </div>
                    <div className='mt-20 mx-auto'>
                        <span className='font-normal text-xs'>The analysis is ready to download in PDF format.</span>
                    </div>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-sm mx-auto mt-16" size='sm'>
                        Download
                    </Button>
                </div>
                <div className="flex flex-col max-w-[960px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 px-16 py-10 pb-20 max-md:px-5 max-xl:mt-0 max-lg:mt-5">
                    <div className='flex gap-5 max-md:flex-col'>
                        <div>{icons.warning}</div>
                        <div>
                            <span className='font-normal text-xs'>This Data Analystic And INSIGHTS REPORT ENCOMPASSES ALL THE DATA COLLECTED OVER A MONTH, METICULOUSLY PROCESSED BY OUR TEAM OF AGENTS. WE CONDUCT COMPREHENSIVE DATA COLLECTION, SCANNING, AND VERIFICATION PROCESSES TO UNDERSTAND THE REASONS BEHIND CONTENT LEAKS OR ITS USE BY OTHER PARTIES, ESPECIALLY IN CASES OF CATFISHING. WE INVESTIGATE WHETHER THERE HAVE BEEN INSTANCES OF DECEPTION INVOLVING CONTENT OR MODEL PROFILE,AS WELL AS ANY SUSPICIONS RELATED TO FRAUDULENT ACTIVITIES OR SIMPLE IMPERSONATION THAT LED TO CONTENT LEAKS. THIS REPORT PROVIDES A DETAILED ANALYSIS ACCOMPANIED BY ILLUSTRATIONS TO GIVE YOU A COMPREHENSIVE UNDERSTANDING OF THE FINDINGS.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
