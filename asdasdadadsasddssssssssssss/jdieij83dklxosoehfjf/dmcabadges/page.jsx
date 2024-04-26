"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { Chain } from "@/components/utils/Icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dmcabadges() {
    const router = useRouter();
    const icons = {
        chain: <Chain fill="currentColor" size={16} />,
    };

    const [selectedimage, setSelectImage] = useState(0);
    const [file, setFile] = useState();

    const AIImageLists = [
        {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }, {
            icon: icons.chain,
            content: "Example.img"
        }
    ]

    const handleGoDetails = () => {
        router.push("/jdieij83dklxosoehfjf/dmcabadges/details");
    }

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e[0]));
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-3 py-5 container text-white max-lg:mx-auto">
            <div className='flex max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA Badges</span>
            </div>
            <div className='flex justify-between w-full mt-10 max-lg:max-w-full max-lg:justify-around'>
                <div className='flex w-full'>
                    <Button radius="md" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base border border-white/40" size='md' onClick={() => handleGoDetails()}>
                        DMCA Badges
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 mt-5'>
                <div className='flex flex-col w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5'>
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                        <div className="flex items-center justify-center pt-5 pb-6">
                            <span className="font-light text-lg text-white">+ Upload Photo</span>
                        </div>
                        <input type="file" className="hidden" onChange={(e) => handleChange(e.target.files)} />
                    </label>
                </div>
                <div className='flex flex-col w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5 max-md:mt-0'>
                    <Image src={file} width={100} height={100} alt='uploaded_photo' className={file ? 'block w-full h-full rounded-[16px]' : 'hidden'}></Image>
                </div>
                <div className='flex mt-5'>
                    <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 border border-gray-600 text-white text-lg " size='lg'>Upload</Button>
                </div>
            </div>
        </div>
    )
}