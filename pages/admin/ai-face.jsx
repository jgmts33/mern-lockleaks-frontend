"use client";
import {
    Button,
    ScrollShadow,
    Spinner
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import { acceptAIFaceScanner, getAIFaceScanResultsList } from '@/axios/ai-face';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';

export default function AIface() {

    const userInfo = useSelector(info);
    const [aiFaceScanList, setAIFaceScanList] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScanAcceptProcessing, setIsScanAcceptProcessing] = useState(-1);

    const icons = {
        components: <Components />,
    };

    const getAIBotsScanInfo = async () => {
        setIsProcessing(true);
        const res = await getAIFaceScanResultsList();

        if (res.status == 'success') setAIFaceScanList(res.data);
        setIsProcessing(false);
    }

    const handleScanAccept = useCallback(async (file, index) => {
        setIsScanAcceptProcessing(index);

        if (aiFaceScanList[index]?.downloaded == true && userInfo.roles.find(p => p == 'moderator')) return;

        const res = await acceptAIFaceScanner(file);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setAIFaceScanList(prevState => {
                return prevState.map(p => {
                    if (p.file == file) return {
                        ...p,
                        downloaded: true
                    }
                    else return p;
                });
            });
        }

        setIsScanAcceptProcessing(-1);
    }, [userInfo, aiFaceScanList])

    const [aiBotsScannerContent, setAIBotsScannerContent] = useState([
        {
            icon: icons.components,
            title: "TOTAL ORDERS:",
            content: 0
        },
        {
            icon: icons.components,
            title: "ACCEPTED ORDERS:",
            content: 0
        }, {
            icon: icons.components,
            title: "PENDING ORDERS:",
            content: 0
        }
    ]);

    useEffect(() => {
        setAIBotsScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: aiFaceScanList.length
            },
            {
                icon: icons.components,
                title: "ACCEPTED ORDERS:",
                content: aiFaceScanList.filter(p => p.downloaded == true).length
            }
            ,
            {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: aiFaceScanList.filter(p => p.downloaded == false).length
            }
        ])
    }, [aiFaceScanList]);

    useEffect(() => {
        getAIBotsScanInfo();

        const socket = io(ENDPOINT);

        socket.on(`ai-face-scan-finished`, async (value) => {
            setAIFaceScanList(p => ([value, ...p]));
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto max-lg:px-3">
            <div className='max-lg:mx-auto'>
                <div className='flex gap-16 items-center'>
                    <span className='font-extrabold text-lg'>AI FACE ORDERS</span>
                </div>
            </div>
            <div className='flex w-full gap-5 max-2xl:flex-col'>
                <div className='flex flex-col w-full mt-5'>
                    <div className='flex flex-col w-full'>
                        <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                            {
                                aiBotsScannerContent.map((items, index) => {
                                    return (
                                        <div key={index} className='flex flex-col px-5 max-sm:px-0'>
                                            <div className='flex justify-between p-7'>
                                                <div className='flex px-5 gap-5 w-1/2'>
                                                    <div>{items.icon}</div>
                                                    <span className='font-semibold text-sm'>{items.title}</span>
                                                </div>
                                                <div className='px-20 flex justify-start w-1/2'>
                                                    <span className='font-bold text-base'>{items.content}</span>
                                                </div>
                                            </div>
                                            <div className='flex px-5'>
                                                <hr className='w-full' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[calc(100vh-560px)]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isProcessing ?
                                        <div class="w-full justify-center flex">
                                            <Spinner />
                                        </div>
                                        :
                                        aiFaceScanList.length ? aiFaceScanList.map((items, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-4 max-xl:flex-col max-xl:gap-2'>
                                                    <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6'>
                                                        <span className='font-normal text-sm'>{items.file}</span>
                                                    </div>
                                                    <Button
                                                        radius="lg"
                                                        className="border border-white/40 px-4 bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base"
                                                        size='sm'
                                                        onClick={() => handleScanAccept(items.file, index)}
                                                        isLoading={isScanAcceptProcessing == index}
                                                    >
                                                        {items.downloaded ? "Accepted" : "Accept"}
                                                    </Button>
                                                </div>
                                            )
                                        }) :
                                            <p>There is no any order yet.</p>
                                }
                            </div>
                        </ScrollShadow>
                    </div>
                </div>
            </div>
        </div>
    )
}
