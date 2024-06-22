"use client";
import Image from 'next/image';
import {
    Button, Progress, ScrollShadow
} from '@nextui-org/react';
import { Chain, Components, UploadIcon } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import AIFaceImageExample from '@/public/assets/kyc-submit/selfie-ai.jpg';
import { aiFaceScan } from '@/axios/bot';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { getCurrentAIFaceScannerStatus } from '@/axios/ai-face';
import { useRouter } from 'next/router';

export default function AIImage() {

    const userInfo = useSelector(info);
    const [value, setValue] = React.useState(0);
    const [scanResult, setScanResult] = useState(0);
    const [limit, setLimit] = useState(0);
    const fileUploadRef = useRef(null);
    const [previewImgUrl, setPreviewImgUrl] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const icons = {
        chain: <Chain />,
        components: <Components />,
        uploadIcon: <UploadIcon />,
    };

    const handleImageUpload = (event, type) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const handleScan = useCallback(async () => {

        if (!uploadedFile || !limit) return;

        const formData = new FormData();

        formData.append('photo', uploadedFile);

        setValue(90);
        const res = await aiFaceScan(formData);
        setValue(100);
        setTimeout(() => {
            setValue(0);
        }, 30 * 1000);
        if (res.status == 'success') {
            setUploadedFile(null);
            setPreviewImgUrl('');
            setScanResult(res.data.result);
        }


    }, [uploadedFile, limit])

    const scanResults = [
        {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-sm'>
                Scanning on<span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-base px-1'>1M</span>websites.
            </div>
        }, {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-sm'>
                Total Profiles & Images Matched:<span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-base px-1'>{scanResult}.</span>
            </div>
        },
    ]

    const uploadImageDisplay = async () => {
        try {
            const _uploadedFile = fileUploadRef.current.files[0];
            const cachedURL = URL.createObjectURL(_uploadedFile);
            setUploadedFile(_uploadedFile)
            setPreviewImgUrl(cachedURL);

        } catch (error) {
            console.error(error);
            setUploadedFile(null);
            setPreviewImgUrl('');
        }
    }

    const getCurrentStatus = useCallback(async () => {

        const res = await getCurrentAIFaceScannerStatus();

        if (res.status == 'success') {
            setLimit(userInfo.subscription.features.ai_face - res.data.count);

            if (res.data.inProgress) {
                setScanProgress(res.data.inProgress.progress * 100);
            }

        }
    }, [userInfo]);

    useEffect(() => {
        if ( !userInfo ) return;
        getCurrentStatus();

        const socket = io(ENDPOINT);

        socket.on(`ai-face-scan-finished`, (value) => {
            setLimit(p => p - 1);
            if (value.user_id == userInfo.id) {
                setUploadedFile(null);
                setPreviewImgUrl('');
                setScanResult(value.result);
            }
        })

        return () => {
            socket.disconnect();
        }

    }, [userInfo]);

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">

                {/* This section for define AI FACE PROFILES header*/}

                <div className='flex gap-16 items-start max-md:flex-col max-md:gap-5'>
                    <div className='flex felx'>
                        <div><span className='font-extrabold text-lg'>AI FACE PROFILES</span></div>
                    </div>
                    <div className="flex flex-col sm:hidden bg-white/15 border border-gray-500 rounded-[16px] p-10">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base text-center'>How Doew It Work?</span>
                            <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1 max-sm:hidden'>
                        <Button
                            radius="lg"
                            className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!value ? "from-purple-light to-purple-weight" : value == 100 ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                            isDisabled={!!value}
                            onPress={() => {
                                if (!value) handleScan()
                            }}
                        >
                            {
                                value == 0 ? <span>START</span> : value == 100 ? <span>FINISHED</span> : <span>Processing</span>
                            }
                        </Button>
                        <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'>Left: <span className='notranslate'>{limit}</span> </p>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl max-sm:hidden"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>

                {/* This section for define AI face images upload*/}
                <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-8'>
                    <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] p-5 text-center justify-center">
                        <p className='font-extrabold text-lg'>Upload Selfie Photo</p>
                        <div className='flex flex-col w-full h-[250px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                            <div className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                                {
                                    previewImgUrl
                                        ?
                                        <img
                                            src={previewImgUrl}
                                            alt="Preview Image Url"
                                            className='h-full w-full object-cover rounded-2xl'
                                        />
                                        :
                                        <div className="flex flex-col items-center justify-center pt-5">
                                            {icons.uploadIcon}
                                            <p>Drag & Drop to Upload File</p>
                                            <p>Or</p>
                                            <Button
                                                radius="lg"
                                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-2"
                                                size='sm'
                                                onClick={handleImageUpload}
                                            >
                                                <span>Browse File</span>
                                            </Button>
                                        </div>
                                }
                                <input
                                    type="file"
                                    id="file"
                                    ref={fileUploadRef}
                                    accept=".png,.jpg,.jpeg"
                                    onChange={uploadImageDisplay}
                                    hidden
                                    onDrop={uploadImageDisplay}
                                />
                            </div>
                        </div>
                        <div className='h-10 mt-7'>
                            {
                                previewImgUrl ? <Button
                                    radius="full"
                                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm mx-auto"
                                    size="sm"
                                    onClick={(e) => handleImageUpload(e, 'id_card')}
                                >
                                    <span>Change Image</span>
                                </Button> : <></>
                            }
                        </div>
                    </div>
                    <div className="border border-gray-500 rounded-[16px]">
                        <Image
                            src={AIFaceImageExample}
                            width={400}
                            height={400}
                            className='object-cover w-full h-full rounded-2xl'
                        />
                    </div>
                    <div className='flex flex-col gap-6 max-lg:flex-row max-sm:flex-col max-lg:col-span-2 max-sm:col-span-1'>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] w-full p-10 max-sm:mt-0">
                            <div className='flex text-center mx-auto'>
                                <span className='font-normal text-base'><span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Warning:</span> Requests are reviewed, and the contract is stored in the database and used to verify that Lock Leaks is authorized to act on behalf of the client to initiate the removal process. </span>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] p-10 max-sm:hidden">
                            <div className='flex flex-col'>
                                <span className='font-normal text-base text-center'>How Doew It Work?</span>
                                <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-1 sm:hidden'>
                            <Button
                                radius="lg"
                                className={"bg-gradient-to-tr text-white shadow-lg px-7 text-lg " + (!value ? "from-purple-light to-purple-weight" : value == 100 ? "from-green-700 to-green-800" : "from-purple-light to-purple-weight")}
                                isDisabled={!!value}
                                onPress={() => {
                                    if (!value) handleScan()
                                }}
                            >
                                {
                                    value == 0 ? <span>START</span> : value == 100 ? <span>FINISHED</span> : <span>Processing</span>
                                }
                            </Button>
                            <p className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'>Left: {limit} </p>
                        </div>
                        <Progress
                            size="md"
                            aria-label="Loading..."
                            className="max-w-2xl sm:hidden"
                            color='secondary'
                            value={value}
                            showValueLabel={true}
                        />
                    </div>
                </div>

                {/* This section for define AI face images scan list*/}

                <div className='flex flex-col mt-5'>
                    {
                        scanResults.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col p-1'>
                                    <div className='flex gap-5 p-3'>
                                        <div>{items.icon}</div>
                                        <div>{items.content}</div>
                                    </div>
                                    <hr className='w-full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center px-20 py-8 gap-20 bg-white/15 border border-gray-500 rounded-[16px] w-full max-lg:px-5 p-5 max-lg:py-5 max-md:flex-col max-md:gap-5 mt-6">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <div><span className='font-normal text-base'>AI RESULTS REMOVAL MODULE</span></div>
                    </div>
                    <div className='flex items-center space-x-1 max-lg:flex-wrap'>
                        <span className='font-normal text-xs'>Generated a removal report with
                            <span className='px-1 bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{scanResult}</span>
                            copyright infringements, including AI results, matched photos, and profiles, and forwarded it to AI Engines.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
