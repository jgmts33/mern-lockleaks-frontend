"use client";
import {
    Button, ScrollShadow
} from '@nextui-org/react';
import { Components, WarningIcon } from "@/components/utils/Icons";
import React, { useEffect, useState } from 'react';
import { downloadTestResult, testBots } from '@/axios/user';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import {userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';

export default function TestBots() {

    const userInfo = useSelector(info)
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(-1);
    const [workingBots, setWorkingBots] = useState([]);

    const icons = {
        components: <Components />,
        warningicon: <WarningIcon />,
    };

    const handleTestBots = async () => {
        setIsLoading(true);
        const res = await testBots();
        console.log(res.data);
        if (res.status == 'success') {

        }
        setIsLoading(false);
    }

    const handleDownload = async (file, index) => {
        setIsProcessing(index);

        const res = await downloadTestResult(file);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }

        setIsProcessing(-1);
    }

    useEffect(() => {

        const socket = io(ENDPOINT);

        socket.on(`test_scanner_finished_${userInfo.id}`, (value) => {
            setWorkingBots(p => ([
                ...p,
                {
                    format: 'Scanner',
                    name: value
                }
            ]))
        });

        socket.on(`test_sm_scanner_finished_${userInfo.id}`, (value) => {
            setWorkingBots(p => ([
                ...p,
                {
                    format: 'SM Scanner',
                    name: value
                }
            ]))
        });

        socket.on(`test_ai_face_finished_${userInfo.id}`, (value) => {
            setWorkingBots(p => ([
                ...p,
                {
                    format: 'AI Face',
                    name: value
                }
            ]))
        });

        socket.on(`test_rr_photo_finished_${userInfo.id}`, (value) => {
            setWorkingBots(p => ([
                ...p,
                {
                    format: 'R&R Photo',
                    name: value
                }
            ]))
        });

        socket.on(`test_rr_user_finished_${userInfo.id}`, (value) => {
            setWorkingBots(p => ([
                ...p,
                {
                    format: 'R&R User',
                    name: value
                }
            ]))
        });

        return () => {
            socket.disconnect();
        }
        
    },[userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">
            <div className='flex gap-16 items-center max-lg:mx-auto'>
                <div><span className='font-extrabold text-lg'>TEST BOTS</span></div>
            </div>
            <div className='flex flex-col mt-5 space-y-3 max-lg:mx-auto'>
                <div className='max-sm:mx-auto'>
                    <span className=''>Info</span>
                </div>
                <div>
                    <Button
                        radius="full"
                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-6 text-base"
                        size='sm'
                        isLoading={isLoading}
                        onClick={handleTestBots}
                    >
                        START TEST
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1  gap-5 mt-10'>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base max-lg:text-center'>STATUS</span>
                    <div className="flex flex-col bg-white/15 border border-gray-500 mt-2 p-5 rounded-[16px] w-full pb-8">
                        <div className='flex flex-col'>
                            <div className='flex justify-between p-7'>
                                <div className='flex gap-2 px-3'>
                                    <div>{icons.components}</div>
                                    <span className='font-semibold text-sm'>WORK BOTS:</span>
                                </div>
                                <div className='px-20 flex justify-start w-1/2'>
                                    <span className="text-[#52C055] font-bold text-base">{workingBots.length}</span>
                                    <span className='font-bold text-base'>/5</span>
                                </div>
                            </div>
                            <div className='flex px-6'>
                                <hr className='w-full' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <span className='font-semibold text-base max-lg:text-center'>WORKING BOTS</span>
                    <div className="flex flex-col bg-white/15 border border-gray-500 mt-2 rounded-[16px] w-full pb-8">
                        <ScrollShadow className='h-80'>
                            {
                                workingBots.map((item, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5'>
                                            <div className='flex justify-between p-7'>
                                                <div>
                                                    <span>{item.format}</span>
                                                </div>
                                                <div>
                                                    <Button
                                                        radius="full"
                                                        className="border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"
                                                        size='sm'
                                                        isLoading={isProcessing == index}
                                                        onClick={() => handleDownload(item.name, index)}
                                                    >
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex px-6'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ScrollShadow>
                    </div>
                </div>
            </div>
        </div>
    )
}
