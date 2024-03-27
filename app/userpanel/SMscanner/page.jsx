"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components} from "@/components/utils/Icons";
import React from 'react';

export default function SMscanner() {
    const [value, setValue] = React.useState(25);

    const icons = {
        components: <Components fill="currentColor" size={16} />,
    };

    const ScannerContent = [
        {
            icon: icons.bingsearch,
            title: "GOOGLE SEARCH",
            content: "Initiated an automated Google search, resulting in the detection of 10 new copyright infringements."
        },
        {
            icon: icons.bingsearch,
            title: "GOOGLE IMAGES SEARCH",
            content: "Initiated an automated Google Images search, resulting in the detection of 10 new copyright infringements"
        }, {
            icon: icons.bingsearch,
            title: "GOOGLE VIDEOS SEARCH",
            content: "Initiated an automated Google Images search, resulting in the detection of 10 new copyright infringements."
        }
    ]

    const ScanList = [
        "Scanning on 10 websites. ",
        "Profiles Matched: 10"
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-10 py-10 container text-white">
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA SCANNER</span></div>
                    <div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                            START
                        </Button>
                    </div>
                    <Progress
                        size="md"
                        aria-label="Loading..."
                        className="max-w-2xl"
                        color='secondary'
                        value={value}
                        showValueLabel={true}
                    />
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                        <div className='flex'>
                            <span className='font-normal text-base'>Requests are reviewed,and government-issued IDs are required for verification.Without the upload of a government-issued ID, these profiles.<span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Cannot Be Removed</span></span>
                        </div>
                        <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-sm mx-auto mt-10" size='sm'>
                            Upload ID
                        </Button>
                    </div>
                    <div className="flex flex-col bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-10 p-10 pb-10">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base text-center'>How Doew It Works?</span>
                            <span className='font-normal text-xs pt-3'>Choose the reference image, upload your photo, upload your ID card picture, and then press Start.</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mt-10'>
                    {
                        ScanList.map((items,index)=>{
                            return(
                                <div key={index} className='flex flex-col'>
                                    <div className='flex gap-3 py-7 px-5'>
                                    {icons.components}
                                    <span className='font-normal text-base'>{items}</span>
                                    </div>
                                    <hr className='w-full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center px-20 py-5 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 w-full p-5">
                    <div className='flex gap-10 items-center'>
                        {icons.components}
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20'>
                        <span className='font-normal text-xs'>Generated a removal report with 10 copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
