"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';
import tinymce from 'react';

export default function CreatePost() {
    const router = useRouter();
    const [selectblog, setSlectBlog] = useState(0);
    const [content, setContent] = useState('<p>Hello world</p>');

    const blogContent = [
        {
            title: "Title"
        }, {
            title: "Title"
        }
    ]

    useEffect(() => {
        window.initTinyMCE = () => {
            tinymce.init({
                selector: '.tinyMCE',
                skin_url: '/skins/lightgray',
                setup: function (editor) {
                    editor.on('change', function () {
                        editor.save();
                    });
                },
            });
        };
    })

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 space-y-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex mt-5 w-full px-3'>
                <Input type="text" label="Title" />
            </div>
            <textarea className="tinyMCE" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
    )
}
