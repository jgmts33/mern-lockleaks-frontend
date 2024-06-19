"use client";
import {
    Button,
    ScrollShadow
} from '@nextui-org/react';
import { Components } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { acceptSocialProfiles, acceptSocialScanner, getSocialProfileSubmitions, getSocialScanResultsList } from '@/axios/social';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';

export default function SocialMedia() {

    const userInfo = useSelector(info);
    const [selectGoogleAccept, setSelectGoogleAccept] = useState(0)
    const [isProcessing, setIsProcessing] = useState({
        scan: false,
        submission: false
    });
    const [isScanAcceptProcessing, setIsScanAcceptProcessing] = useState(-1);
    const [isSubmitionAcceptProcessing, setIsSubmitionAcceptProcessing] = useState(-1);
    const [socialMediaSubmitionsList, setSocialMediaSubmitionsList] = useState([]);
    const [socialMediaScanList, setSocialMediaScanList] = useState([]);


    const icons = {
        components: <Components />,
    };

    const [socialMediaScannerContent, setSocialMediaScannerContent] = useState([
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
    ])

    const [socialMediaSubmitContent, setSocialMediaSubmitContent] = useState([
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
    ])

    const getSocialMediaProfileSubmitionsInfo = async () => {
        setIsProcessing(p => ({ ...p, submission: true }));
        const res = await getSocialProfileSubmitions();

        if (res.status == 'success') setSocialMediaSubmitionsList(res.data);
        setIsProcessing(p => ({ ...p, submission: false }));
    }

    const getSocialMediaScanInfo = async () => {
        setIsProcessing(p => ({ ...p, scan: true }));
        const res = await getSocialScanResultsList();

        if (res.status == 'success') setSocialMediaScanList(res.data);
        setIsProcessing(p => ({ ...p, scan: false }));
    }

    const handleSMSubmissionAccept = useCallback(async (file_name, index) => {
        if (socialMediaSubmitionsList[index]?.accepted == true && userInfo.roles.find(p => p == 'moderator')) return;
        setIsSubmitionAcceptProcessing(index);
        const res = await acceptSocialProfiles(file_name);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file_name}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setSocialMediaSubmitionsList(prevState => {
                return prevState.map(p => {
                    if (p.name == file_name) return {
                        ...p,
                        accepted: true
                    }
                    else return p;
                });
            });
        }
        setIsSubmitionAcceptProcessing(-1);
    }, [userInfo, socialMediaSubmitionsList]);

    const handleScanAccept = useCallback(async (file, index) => {
        setIsScanAcceptProcessing(index);

        if (socialMediaScanList[index]?.downloaded == true && userInfo.roles.find(p => p == 'moderator')) return;

        const res = await acceptSocialScanner(file);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${file}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setSocialMediaScanList(prevState => {
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
    }, [userInfo, socialMediaScanList])

    useEffect(() => {
        setSocialMediaSubmitContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: socialMediaSubmitionsList.length
            },
            {
                icon: icons.components,
                title: "ACCEPTED ORDERS:",
                content: socialMediaSubmitionsList.filter(p => p.accepted == true).length
            }
            ,
            {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: socialMediaSubmitionsList.filter(p => p.accepted == false).length
            }
        ])
    }, [socialMediaSubmitionsList]);

    useEffect(() => {
        setSocialMediaScannerContent([
            {
                icon: icons.components,
                title: "TOTAL ORDERS:",
                content: socialMediaScanList.length
            },
            {
                icon: icons.components,
                title: "ACCEPTED ORDERS:",
                content: socialMediaScanList.filter(p => p.downloaded == true).length
            }
            ,
            {
                icon: icons.components,
                title: "PENDING ORDERS:",
                content: socialMediaScanList.filter(p => p.downloaded == false).length
            }
        ])
    }, [socialMediaScanList]);

    useEffect(() => {
        getSocialMediaProfileSubmitionsInfo();
        getSocialMediaScanInfo();

        const socket = io(ENDPOINT);

        socket.on(`admin:socialMediaSubmition`, async (value) => {
            if (value == 'uploaded') {
                getSocialMediaProfileSubmitionsInfo();
            }
        });

        socket.on(`admin:socialScanFinished`, async (value) => {
            setSocialMediaScanList(p => ([...p, value]));
        });

        return () => socket.close();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto max-lg:px-3">
            <div className='max-lg:mx-auto'>
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA ORDERS</span></div>
                </div>
            </div>
            <div className='flex w-full gap-5 max-2xl:flex-col'>
                <div className='flex flex-col mt-10 max-sm:mt-5 w-full'>
                    <div className='flex flex-col w-full'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>SOCIAL MEDIA SCANNER</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                            {
                                socialMediaScannerContent.map((items, index) => {
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
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 max-sm:p-4 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[calc(100vh-560px)]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isProcessing.scan ?
                                        <div className='w-full flex justify-center'>
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        socialMediaScanList.length ? socialMediaScanList.map((items, index) => {
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
                <div className='flex flex-col w-full mt-10 max-lg:mt-0'>
                    <div className='flex flex-col w-full'>
                        <div className='flex mx-auto'>
                            <span className='font-semibold text-base max-lg:text-center'>SOCIAL MEDIA SUBMIT</span>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 mt-5 rounded-[16px] w-full pb-8">
                            {
                                socialMediaSubmitContent.map((items, index) => {
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
                    <div className='flex flex-col bg-white/10 border border-gray-500 p-10 max-sm:p-4 rounded-[16px] mt-5 w-full'>
                        <ScrollShadow className="h-[320px]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isProcessing.submission ?
                                        <div className='w-full flex justify-center'>
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        socialMediaSubmitionsList.length ? socialMediaSubmitionsList.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-4 max-xl:flex-col max-xl:gap-2'>
                                                    <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6'>
                                                        <span className='font-normal text-sm'>social.{item.user_id}.{item.name}.zip</span>
                                                    </div>
                                                    <Button
                                                        radius="lg"
                                                        className="border border-white/40 px-4 bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base"
                                                        size='sm'
                                                        onClick={() => handleSMSubmissionAccept(item.name, index)}
                                                        isLoading={isSubmitionAcceptProcessing == index}
                                                    >
                                                        {item.accepted ? "Accepted" : "Accept"}
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
