"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import { Uppercase, Bold, Italic, TextAlignCenter, TextAlignLeft, TextAlignRight, TextsCenter, List, DynamicalList, AlignLeft, AlignRight, Pin, PaperPin, UploadPicture, Video, Help, ArrowDown } from "@/components/utils/Icons";


export default function CreatePost() {
    const router = useRouter();
    const [selectblog, setSlectBlog] = useState(0);
    const [value, setValue] = useState('');

    const icons = {
        Uppercase: <Uppercase fill="currentColor" size={16} />,
        Bold: <Bold fill="currentColor" size={16} />,
        Italic: <Italic fill="currentColor" size={16} />,
        TextAlignCenter: <TextAlignCenter fill="currentColor" size={16} />,
        TextAlignLeft: <TextAlignLeft fill="currentColor" size={16} />,
        TextAlignRight: <TextAlignRight fill="currentColor" size={16} />,
        TextsCenter: <TextsCenter fill="currentColor" size={16} />,
        List: <List fill="currentColor" size={16} />,
        DynamicalList: <DynamicalList fill="currentColor" size={16} />,
        AlignLeft: <AlignLeft fill="currentColor" size={16} />,
        AlignRight: <AlignRight fill="currentColor" size={16} />,
        Pin: <Pin fill="currentColor" size={16} />,
        PaperPin: <PaperPin fill="currentColor" size={16} />,
        UploadPicture: <UploadPicture fill="currentColor" size={16} />,
        Video: <Video fill="currentColor" size={16} />,
        Help: <Help fill="currentColor" size={16} />,
        ArrowDown: <ArrowDown fill="currentColor" size={16} />,
    };

    const blogContent = [
        {
            title: "Title"
        }, {
            title: "Title"
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 space-y-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex mt-5 w-full px-3'>
                <Input type="text" label="Title" />
            </div>
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 text-white px-10 max-sm:gap-3  w-full bg-gradient-to-br bg-[#242222] border py-5 items-center border-gray-600 rounded-[20px]'>
                <div className='flex w-full gap-10 items-center justify-center cursor-pointer'>
                    <span>{icons.Uppercase}</span>
                    <span>{icons.Bold}</span>
                    <span>{icons.Italic}</span>
                    <span>{icons.ArrowDown}</span>
                    <hr className="w-5 bg-gray-400 rotate-90"></hr>
                </div>
                <div className='flex w-full gap-10 items-center justify-center cursor-pointer'>
                    <span>{icons.TextAlignLeft}</span>
                    <span>{icons.TextAlignCenter}</span>
                    <span>{icons.TextAlignRight}</span>
                    <span>{icons.TextsCenter}</span>
                    <hr className="w-5 bg-gray-400 rotate-90"></hr>
                </div>
                <div className='flex w-full gap-8 items-center justify-center cursor-pointer'>
                    <span>{icons.List}</span>
                    <span>{icons.ArrowDown}</span>
                    <span>{icons.DynamicalList}</span>
                    <span>{icons.ArrowDown}</span>
                    <span>{icons.AlignLeft}</span>
                    <span>{icons.AlignRight}</span>
                    <hr className="w-5 bg-gray-400 rotate-90"></hr>
                </div>
                <div className='flex w-full gap-10 items-center justify-center cursor-pointer'>
                    <span>{icons.Pin}</span>
                    <span>{icons.PaperPin}</span>
                    <span>{icons.UploadPicture}</span>
                    <span>{icons.Video}</span>
                    <span>{icons.Help}</span>
                </div>
            </div>
            <div className='w-full items-center rounded-[20px] bg-[#242222] h-[300px] border-gray-600'>
                <textarea className='w-full h-full bg-[#242222] rounded-[20px] p-5'></textarea>
            </div>
            <div className='flex justify-end'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                    START
                </Button>
            </div>
        </div>
    )
}
