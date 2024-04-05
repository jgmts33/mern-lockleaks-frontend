"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';

export default function Blog() {
    const router = useRouter();
    const [selectblog, setSlectBlog] = useState(0)

    const blogContent = [
        {
            title: "Title"
        }, {
            title: "Title"
        }
    ]

    const handleCreatePost = () =>{
        router.push("/jdieij83dklxosoehfjf/blog/createpost")
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 space-y-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex items-center space-x-20'> 
                <Button radius="lg" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={()=>handleCreatePost()}>
                    Create post
                </Button>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='md'>
                    Edit existing
                </Button>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 px-10 py-5 rounded-[16px] max-w-[1000px] mt-10 w-full'>
                <ScrollShadow className='h-[350px]'>
                    {
                        blogContent.map((items, index) => {
                            return (
                                <div key={index} className='flex flex-col px-5'>
                                    <div className='flex justify-between p-7 items-center'>
                                        <div className='flex'>
                                            <span className={'font-semibold text-base'}>{items.title}</span>
                                        </div>
                                        <div className='flex'>
                                            <Button radius="full" className={selectblog == index ? "bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" : "bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base"} size='sm' onClick={() => setSlectBlog(index)}>
                                                Choose
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='flex px-6'>
                                        <hr className='w-full' />
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex justify-end pr-12 pt-32">
                    <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm'>
                        Save
                    </Button>
                    </div>
                </ScrollShadow>
            </div>
        </div>
    )
}
