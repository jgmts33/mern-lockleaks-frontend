"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Warning} from "@/components/utils/Icons";
import React from 'react';

export default function DataReport() {

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
    };

    return (
            <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
                <div className='mt-5 max-lg:mx-auto'>
                    <span className='font-extrabold text-lg'>DATA REPORT</span>
                </div>
                <div className='flex gap-10 max-xl:flex-col max-lg:gap-3'>
                    <div className="flex flex-col max-w-[400px] max-xl:max-w-full w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10">
                        <div className='mx-auto'>
                            <span className='font-extrabold text-lg'>Data Report PDF</span>
                        </div>
                        <div className='mt-10 text-center space-x-1 items-center'>
                            <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10.</span>
                            <span className='font-normal text-xs'>Days Remaining Until The Data Report Is Ready For Viewing</span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-sm mx-auto mt-20" size='sm'>
                            Download
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[960px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 max-xl:mt-0 px-16 py-10 pb-20">
                        <div className='flex gap-5'>
                            <div>{icons.warning}</div>
                            <div>
                                <span className='font-normal text-xs'>THIS 'DATA REPORT' IS A COMPREHENSIVE REPORT OF ALL THE FUNCTIONS USED, ALL THE REMOVALS MADE, AND THE REPORTS SENT FOR REMOVAL. HOWEVER, IT IS IN PDF FORMAT FOR EASIER VIEWING AND ACCESSIBILITY, ALLOWING CLIENTS TO DOWNLOAD THE REPORT IN PDF FORMAT TO KEEP IT ON THEIR DEVICE/COMPUTER AND REVIEW OUR WORK  AND THE EFFORTS OF OUR AUTOMATED PROGRAM.</span>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div> 
    ) 
}
