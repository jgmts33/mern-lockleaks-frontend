"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';
import { Editor } from '@tinymce/tinymce-react';

export default function CreatePost() {
    const router = useRouter();
    const [selectblog, setSlectBlog] = useState(0);
    const [value, setValue] = useState('');

    const blogContent = [
        {
            title: "Title"
        }, {
            title: "Title"
        }
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 space-y-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex mt-5 w-full px-3'>
                <Input type="text" label="Title" />
            </div>
            <Editor
                apiKey='j9vvbxoc4iq2zp87e9zuryasu0roc91682u6ayc1btavtr7u'
                value={value}
                theme="dark"
                onChange={(newValue, editor) => setValue(newValue)}
            />
            <textarea className='h-[100px] rounded-lg p-3' placeholder='Type here'>{value}</textarea>
            <div className='flex justify-end'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg" size='sm'>
                    START
                </Button>
            </div>
        </div>
    )
}
