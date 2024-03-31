"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow
} from '@nextui-org/react';
import React from 'react';
import { Chain } from "@/components/utils/Icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AIFaceImages() {
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
        router.push("/userpanel/AIfaceimages/details");
    }

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e[0]));
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-3 py-10 container text-white max-lg:mx-auto">
            <div className='flex mt-5 gap-20 max-md:flex-col max-md:gap-5 max-md:text-center max-md:mx-auto'>
                <span className='font-extrabold text-lg'>AI FACE IMAGES</span>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base" size='sm'>
                    START
                </Button>
            </div>
            <div className='mt-10 max-md:text-center'>
                <span className='font-semibold text-base max-md:text-sm'>Upload a reference photo</span>
            </div>
            <div className='flex max-w-[770px] justify-between mt-5 max-lg:flex-col max-lg:gap-3 max-md:text-center'>
                <span className='font-extrabold text-lg max-md:text-base'>Upload Photo for Removal</span>
                <span className='font-extrabold text-lg max-md:text-base'>Photo for Removal Refference</span>
            </div>
            <div className='grid grid-cols-3 gap-10 max-lg:flex-col max-lg:flex'>
                <div className='flex flex-col w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5'>
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                        <div className="flex items-center justify-center pt-5 pb-6">
                            <span className="font-light text-lg text-white">+ Upload Photo</span>
                        </div>
                        <input type="file" className="hidden" onChange={(e)=>handleChange(e.target.files)} />
                    </label>
                </div>
                <div className='flex flex-col w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5'>
                    <Image src={file} width={100} height={100} alt='uploaded_photo' className={file ? 'block w-full h-full rounded-[16px]' : 'hidden'}></Image>
                </div>
                <ScrollShadow className="h-[383px]">
                    <div className='mx-auto'>
                        {
                            AIImageLists.map((items, index) => {
                                return (
                                    <div key={index} className='flex mt-5 items-center gap-10 max-md:flex-col max-md:gap-5 max-md:items-start'>
                                        <div className='flex bg-gradient-to-br bg-white/10 shadow-sm p-3 w-full max-w-[250px] justify-start px-7 items-center gap-3 rounded-[16px]'>
                                            {items.icon}
                                            <span>{items.content}</span>
                                        </div>
                                        <div>
                                            <Button radius="lg" className={selectedimage == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 border border-gray-600 text-white text-base") : ("bg-gradient-to-tr bg-white/15 text-white border border-gray-600 text-base px-5 flex justify-start")} size='sm' onClick={() => setSelectImage(index)}>select</Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </ScrollShadow>
            </div>
            <div className='flex mt-10 justify-end'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-10 text-base" size='md' onClick={() => handleGoDetails()}>
                    Next
                </Button>
            </div>
        </div>
    )
}
