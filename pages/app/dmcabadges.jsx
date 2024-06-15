"use client";
import Image from 'next/image';
import {
    Button,
    ScrollShadow
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { downloadDmcaImages, getDmcaImages, getDmcaImagesPositions } from '@/axios/dmca';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function DmcaBadges() {

    const [copied, setCopied] = useState(-1);
    const [list, setList] = useState([]);

    const getDmcaImagesInfo = async () => {
        const res = await getDmcaImages();
        const positionsRes = await getDmcaImagesPositions();

        if (positionsRes.data.length) {
            let _list = [];
            positionsRes.data?.map((item, index) => {
                const data = res.data.find((badge) => badge.id == item);
                _list.push(data);
            });
            setList(_list);
        } else {
            setList(res.data);
        }
    }

    const handleDownload = async (filename) => {
        const res = await downloadDmcaImages(filename);

        if (res.status == 'success') {
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }

    useEffect(() => {
        getDmcaImagesInfo();
    }, []);

    useEffect(() => {
        console.log("list:", list);
    },[list])

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 max-sm:px-2 container text-white max-lg:mx-auto">

            {/* This section for define dmcabadges header?*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex flex-col mt-10 gap-3 max-lg:text-center'>
                <span className='font-normal text-xs text-white/65'>Click the "Download Badge" button to download the DMCA badge.</span>
                <span className='font-normal text-xs text-white/65'>Press the "Embed Your Badge" button to automatically copy the embed code for your website.</span>
            </div>

            {/* This section for define dmcabadges content?*/}
            <ScrollShadow className='h-[620px]'>
                <div className='grid grid-cols-3 gap-5 max-2xl:grid-cols-2 max-lg:grid-cols-1 p-5 max-sm:p-2'>
                    {
                        list.map((item, index) => <div key={index} className='flex flex-col gap-2 relative w-[380px] bg-cover border border-gray-500 rounded-[20px] cursor-pointer mx-auto'>
                            <div className="flex justify-center items-center relative h-[220px] max-w-full backdrop-blur-3xl bg-white/10 rounded-[20px] px-2 py-4">
                                <Image
                                    src={`https://server.lockleaks.com/images?filename=${item?.name}`}
                                    width={200}
                                    height={100}
                                    className='rounded-2xl max-w-full max-h-full'
                                    alt={item?.name}
                                />
                            </div>
                            <div className='flex justify-between w-full gap-2 p-2 pt-0'>
                                <Button
                                    radius="lg"
                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base w-40"
                                    size='sm'
                                    onClick={() => handleDownload(item.name)}
                                >
                                    <span>Download</span>
                                </Button>
                                <CopyToClipboard text={`<img src="https://server.lockleaks.com/images?filename=${item.name}" alt="${item.name.slice(0, -4)}" />`}
                                    onCopy={() => {
                                        setCopied(index)
                                        setTimeout(() => {
                                            setCopied(-1);
                                        }, 1000)
                                    }}>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-8 py-5 text-base"
                                        size='sm'
                                    >
                                        {copied == index ? <span>Copied</span> : <span>Embeded your badge</span>}
                                    </Button>
                                </CopyToClipboard>

                            </div>
                        </div>)
                    }
                </div>
            </ScrollShadow>
        </div>
    )
}
