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
        {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-base'>
                <span>Scanning on</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10.</span>
                <span>websites.</span>
            </div>
        }, {
            icon: icons.components,
            content: <div className='flex items-center space-x-1 font-normal text-base'>
                <span>Profiles Matched:</span>
                <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10.</span>
            </div>
        },
    ]

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
                <div className='flex gap-16 items-center max-md:flex-col max-md:gap-5'>
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
                <div className='grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:flex-col max-md:flex max-md:gap-0'>
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
                                    {items.content}
                                    </div>
                                    <hr className='w-full'></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex items-center px-20 py-5 justify-between bg-white/15 shadow-sm shadow-gray-50 border border-gray-500 rounded-[16px] mt-5 w-full p-5 max-lg:flex-col max-lg:px-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-lg:px-0 space-x-1 items-center'>
                        <span className='font-normal text-xs'>Generated a removal report with</span> 
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-normal text-lg'>10.</span> 
                        <span className='font-normal text-sm'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
