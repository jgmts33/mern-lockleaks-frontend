"use client";
import {
    Button,
    ScrollShadow,
    Spinner
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

        socket.on(`social-profile-submission`, async (value) => {
            setSocialMediaSubmitionsList(p => ([value, ...p]));
        });

        socket.on(`social-scan-finished`, async (value) => {
            console.log("value:", value);
            setSocialMediaScanList(p => ([value, ...p]));
        });

        return () => socket.disconnect();
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
                        <ScrollShadow className="h-[calc(100vh-600px)]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isProcessing.scan ?
                                        <div class="w-full justify-center flex">
                                            <Spinner />
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
                        <ScrollShadow className="h-[calc(100vh-600px)]">
                            <div className='flex flex-col gap-5 px-2'>
                                {
                                    isProcessing.submission ?
                                        <div class="w-full justify-center flex">
                                            <Spinner />
                                        </div>
                                        :
                                        socialMediaSubmitionsList.length ? socialMediaSubmitionsList.map((item, index) => {
                                            return (
                                                <div key={index} className='flex items-center gap-4 max-xl:flex-col max-xl:gap-2'>
                                                    <div className='flex bg-white/10 py-3 w-full rounded-[16px] px-6'>
                                                        <span className='font-normal text-sm'>{item.name}</span>
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
