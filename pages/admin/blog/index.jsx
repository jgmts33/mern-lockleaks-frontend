"use client";
import {
    Button, ScrollShadow,
    Spinner
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBlog, getBlogList } from '@/axios/blog';

export default function Blog() {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const getBlogListInfo = async () => {

        setIsProcessing(true);

        const res = await getBlogList();
        if (res.status == 'success') setList(res.data);

        setIsProcessing(false);
    }

    const handleDelete = async (id) => {

        const res = await deleteBlog(id);

        if (res.status == 'success') {
            setList(p => p.filter(item => item.id != id))
        }
    }

    const handleCreatePost = () => {
        router.push("/admin/blog/create-post")
    }

    useEffect(() => {
        getBlogListInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex items-center space-x-20 max-lg:justify-between mt-5'>
                <Button radius="lg" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => handleCreatePost()}>
                    Create post
                </Button>
            </div>
            <div className='flex flex-col flex-1 bg-white/10 shadow-sm border border-gray-500 px-6 max-sm:px-4 py-5 rounded-[16px] mt-6 w-full'>
                <ScrollShadow className='h-[calc(100vh-260px)]'>
                    {
                        isProcessing ?
                            <div class="w-full justify-center flex">
                                <Spinner />
                            </div>
                            :
                            list.length ? list.map((blog, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-2'>
                                        <div className='flex justify-between py-7 items-center'>
                                            <div className='flex'>
                                                <span className={'font-semibold text-lg'}>{blog.title}</span>
                                            </div>
                                            <div className='flex gap-4 items-center'>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => router.push(`/admin/blog/create-post?id=${blog.id}`)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => handleDelete(blog.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <hr className='w-full' />
                                    </div>
                                )
                            }) : <p className='text-center mt-4'>There is not any created blog</p>
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}
