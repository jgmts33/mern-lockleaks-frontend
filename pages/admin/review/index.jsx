"use client";
import {
    Button, ScrollShadow,
    Spinner
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerReviews, deleteCustomerReview } from '@/axios/customer-review';

export default function ReviewManagement() {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const getCustomerReviewsList = async () => {

        setIsProcessing(true);

        const res = await getCustomerReviews();
        if (res.status == 'success') setList(res.data);

        setIsProcessing(false);
    }

    const handleDelete = async (id) => {

        const res = await deleteCustomerReview(id);

        if (res.status == 'success') {
            setList(p => p.filter(item => item.id != id))
        }
    }

    const handleCreatePost = () => {
        router.push("/admin/review/create-post")
    }

    useEffect(() => {
        getCustomerReviewsList();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>Embeded Reviews</span>
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
                            list.length ? list.map((customerReview, index) => {
                                return (
                                    <div key={index} className='flex flex-col px-2'>
                                        <div className='flex justify-between py-7 items-center w-full relative'>
                                            <div className='flex gap-4 items-center max-sm:flex-col'>
                                                <p className='font-semibold text-lg'>{customerReview.name}</p>
                                                <p className='truncate max-sm:hidden'>{customerReview.content.slice(0, 50)}...</p>
                                            </div>
                                            <div className='flex gap-4 items-center'>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => router.push(`/admin/review/create-post?id=${customerReview.id}`)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => handleDelete(customerReview.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                        <hr className='w-full' />
                                    </div>
                                )
                            }) : <p className='text-center mt-4'>There is not any created customer reviews</p>
                    }
                </ScrollShadow>
            </div>
        </div>
    )
}
