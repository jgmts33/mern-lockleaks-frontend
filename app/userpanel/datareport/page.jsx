"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import { Warning, PaperClip, PaperPlane } from "@/components/utils/Icons";
import React from 'react';

export default function DataReport() {

    const icons = {
        warning: <Warning fill="currentColor" size={16} />,
        paperclip: <PaperClip fill="currentColor" size={16} />,
        paperplane: <PaperPlane fill="currentColor" size={16} />,
    };

    return (
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='mt-5'>
                    <span className='font-extrabold text-lg'>DATA REPORT</span>
                </div>
                <div className='flex gap-10'>
                    <div className="flex flex-col max-w-[400px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 cursor-pointer">
                        <div className='mx-auto'>
                            <span className='font-extrabold text-lg'>Data Report PDF</span>
                        </div>
                        <div className='mt-20 text-center'>
                            <span className='font-normal text-xs'>10 Days Remaining Until The Data Report Is Ready For Viewing</span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-5 py-5 text-sm mx-auto mt-32" size='sm'>
                            Download
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[960px] w-full bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 px-16 py-10 pb-20 cursor-pointer">
                        <div className='flex gap-5'>
                            <div>{icons.warning}</div>
                            <div>
                                <span className='font-normal text-xs'>THIS 'DATA REPORT' IS A COMPREHENSIVE REPORT OF ALL THE FUNCTIONS USED, ALL THE REMOVALS MADE, AND THE REPORTS SENT FOR REMOVAL. HOWEVER, IT IS IN PDF FORMAT FOR EASIER VIEWING AND ACCESSIBILITY, ALLOWING CLIENTS TO DOWNLOAD THE REPORT IN PDF FORMAT TO KEEP IT ON THEIR DEVICE/COMPUTER AND REVIEW OUR WORK  AND THE EFFORTS OF OUR AUTOMATED PROGRAM.</span>
                            </div>
                        </div>
                        <div className='flex mt-10 gap-5 pt-20'>
                            <div className='flex items-center'>{icons.paperclip}</div>
                            <div className='flex justify-between max-w-[960px] w-full bg-white/10 rounded-[16px] p-10 items-center'>
                                <div>
                                    <span>Lorem ipsum dolor sit amet consectetur. Risus dolor ut curabitur aliquet. Eu su...</span>
                                </div>
                                <div>{icons.paperplane}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
