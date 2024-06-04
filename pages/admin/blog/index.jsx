"use client";
import {
    Button, ScrollShadow
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
                            <div className='w-full flex justify-center'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
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
