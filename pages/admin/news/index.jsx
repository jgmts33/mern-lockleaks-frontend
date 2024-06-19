"use client";
import {
    Button, Chip, ScrollShadow,
    Spinner
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteNews, getNewsList, sendNews } from '@/axios/news';

export default function News() {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSendingNews, setIsSendingNews] = useState(-1);
    const [isProcessingDelete, setIsProcessingDelete] = useState(-1);
    const [receiverCount, setReceiverCount] = useState({
        count: 0,
        id: null
    });

    const getNewsListInfo = async () => {

        setIsProcessing(true);

        const res = await getNewsList();
        if (res.status == 'success') setList(res.data);

        setIsProcessing(false);
    }

    const handleDelete = async (id) => {
        setIsProcessingDelete(id);
        const res = await deleteNews(id);

        if (res.status == 'success') {
            setList(p => p.filter(item => item.id != id))
        }
        setIsProcessingDelete(-1);
    }

    const handleCreatePost = () => {
        router.push("/admin/news/create-post")
    }

    const handleSendNews = async (id) => {
        setIsSendingNews(id);
        const res = await sendNews(id);
        if (res.status == 'success') {
            setReceiverCount({
                id,
                count: res.data.count
            });

            setTimeout(() => {
                setReceiverCount({
                    id: null,
                    count: 0
                });
            }, 3000);
        } else {
            console.log(res.data);
        }
        setIsSendingNews(-1);
    }

    useEffect(() => {
        getNewsListInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>NEWSLETTERS</span>
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
                            list.length ? list.map((news, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-2'>
                                        <div className='flex justify-between py-7 items-center'>
                                            <div className='flex'>
                                                <span className={'font-semibold text-lg'}>{news.title}</span>
                                            </div>
                                            <div className='flex gap-4 items-center'>
                                                {receiverCount.id == news.id ? <Chip size='sm' color='primary' >{receiverCount.count} users received news.</Chip> : <></>}
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => handleSendNews(news.id)}
                                                    isLoading={isSendingNews == news.id}
                                                >
                                                    Send News
                                                </Button>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => router.push(`/admin/news/create-post?id=${news.id}`)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => handleDelete(news.id)}
                                                    isLoading={isProcessingDelete == news.id}
                                                >
                                                    Delete
                                                </Button>

                                            </div>
                                        </div>
                                        <hr className='w-full' />
                                    </div>
                                )
                            }) : <p className='text-center mt-4'>There is not any created news</p>
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}
