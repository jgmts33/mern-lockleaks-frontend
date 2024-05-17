"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { downloadDmcaImages, getDmcaImages } from '../../axios/dmca';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function DmcaBadges() {

    const [copied, setCopied] = useState(-1);
    const [list, setList] = useState([]);

    const getDmcaImagesInfo = async () => {
        const res = await getDmcaImages();

        if (res.status == 'success') {
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

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 container text-white max-lg:mx-auto">

            {/* This section for define dmcabadges header?*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex flex-col mt-10 gap-3 max-lg:text-center'>
                <span className='font-normal text-xs text-white/65'>Click the "Download Badge" button to download the DMCA badge.</span>
                <span className='font-normal text-xs text-white/65'>Press the "Embed Your Badge" button to automatically copy the embed code for your website.</span>
            </div>

            {/* This section for define dmcabadges content?*/}

            <div className='grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-10 max-xl:mx-auto max-xl:justify-center max-xl:items-center max-lg:gap-0'>
                {
                    list.map((item, index) => <div key={index}>
                        <div className="flex items-center justify-center border max-w-[450px] max-md:max-w-full aspect-square border-gray-500 rounded-[23px] mt-10 cursor-pointer">
                            <Image
                                src={`https://server.lockleaks.com/images?filename=${item.name}`}
                                width={200}
                                height={100}
                                className='rounded-2xl'
                                alt={item.name}
                            />
                        </div>
                        <div className='flex justify-between pt-5 w-full px-1'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base w-40"
                                size='sm'
                                onClick={() => handleDownload(item.name)}
                            >
                                Download
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
                                    {copied == index ? "Copied" : "Embeded your badge"}
                                </Button>
                            </CopyToClipboard>

                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
