"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { Search, Collobation, RedStar, RecoveryChat } from "@/components/utils/Icons";
import RightChat from '@/public/assets/setup/rightchat.svg';
import LeftChat from '@/public/assets/setup/leftchat.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { getHelpArticleByCategory, getHelpCategories } from '@/axios/help';
import { Crisp } from 'crisp-sdk-web';

export default function Categories() {

    const router = useRouter();
    const params = useSearchParams();
    const [selectedCategoryId, setSelectCategoryId] = useState(-1);
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isCategoryProcessing, setIsCategoryProcessing] = useState(false);
    const [isArticleProcessing, setIsArticleProcessing] = useState(false);

    const icons = {
        chat: <RecoveryChat />,
        search: <Search />,
        collobation: <Collobation />,
        redstar: <RedStar />,
    };

    const getCategoriesInfo = useCallback(async () => {

        setIsCategoryProcessing(true);

        const res = await getHelpCategories();
        if (res.status == 'success') {
            setCategories(res.data);
        }

        setIsCategoryProcessing(false);
    }, [params.get('category')]);

    useEffect(() => {
        if (categories.length && params.get('category')) setSelectCategoryId(categories.find(p => p.name == params.get('category').replaceAll("-", " ").replaceAll("_", "&"))?.id);
    }, [params.get('category'), categories]);

    const getCActiclesInfo = async (categoryId) => {

        setIsArticleProcessing(true);

        const res = await getHelpArticleByCategory(categoryId);
        if (res.status == 'success') {
            setArticles(res.data);
        }

        setIsArticleProcessing(false);
    }

    const handleGoCategory = (categoryName) => {
        router.push(`/help/articles?category=${categoryName.replaceAll(" ", "-").replaceAll("&", "_")}`, { scroll: false });
    }

    useEffect(() => {
        if (selectedCategoryId != -1) {
            getCActiclesInfo(selectedCategoryId);
        }
    }, [selectedCategoryId]);

    useEffect(() => {
        getCategoriesInfo();
    }, []);

    return (
        <div className="text-white relative flex flex-col mx-auto min-[1500px]:px-32 w-full" >

            {/* This section for define Help Page Title*/}

            <div className='mt-10 max-sm:mt-5 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center max-md:text-4xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-10 items-center max-w-[1050px] max-md:flex-col'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-3 rounded-lg bg-white text-black'
                        required
                    />
                </div>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg" size='lg'>
                    <span>Search</span><span>{icons.search}</span>
                </Button>
            </div>
            <div className='flex mx-auto mt-10'>
                <span className='font-medium text-5xl max-md:text-4xl'>CATEGORIES</span>
            </div>

            {/* This section for define Help Page content*/}
            <div className='w-full relative'>
                <div className="flex z-10 gap-10 backdrop-blur-sm bg-white/5 shadow-sm rounded-[20px] w-full p-20 max-xl:p-0 mt-20 max-xl:flex-col max-xl:mx-auto max-xl:justify-center max-xl:items-center">
                    <div className='flex flex-col min-w-[300px] w-[300px] gap-3 max-md:mx-auto max-md:justify-center max-md:items-center max-md:w-full'>
                        <div className='max-xl:pt-10'><span className='font-medium text-3xl'>Categories</span></div>
                        {
                            isCategoryProcessing ?
                                <div className='w-full flex mt-5 ml-10'>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                categories.length ? categories.map((category, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                selectedCategoryId == category.id ?
                                                    <Button
                                                        radius="lg"
                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white px-5 py-5 shadow-lg text-lg max-sm:text-base"
                                                        size='md'
                                                        onClick={() => handleGoCategory(category.name)}
                                                    >
                                                        <span>{category.name}</span>
                                                    </Button>
                                                    :
                                                    <Button
                                                        radius="lg"
                                                        className="bg-transparent text-white px-5 py-5 shadow-lg text-lg max-sm:text-base"
                                                        size='md'
                                                        onClick={() => handleGoCategory(category.name)}
                                                    >
                                                        <span>{category.name}</span>
                                                    </Button>
                                            }
                                        </div>
                                    )
                                })
                                    :
                                    <p>There is not any created category yet. </p>
                        }
                    </div>
                    <div className='flex flex-col gap-5 max-xl:w-full max-xl:px-5 max-md:mx-auto max-md:text-lg max-xl:mt-10 mb-10 max-sm:w-full max-sm:px-3 flex-1 relative'>
                        {
                            isArticleProcessing ?
                                <div className='flex mt-8 mx-auto'>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                articles.map((article, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white/10 bg-opacity-20 shadow-sm rounded-lg p-5 cursor-pointer w-full"
                                            onClick={() => router.push(`/help/articles/${article.title.replaceAll("?", "").replaceAll(" ", "-").replaceAll("&", "_").replaceAll("/", "")}-${article.id}`)}
                                        >
                                            <div className='flex justify-between w-full'>
                                                <div className='flex gap-5'>
                                                    <span>{icons.collobation}</span>
                                                    <span className='font-medium text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-lg'>{article.title}</span>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='flex'>{icons.redstar}{icons.redstar}{icons.redstar}{icons.redstar}{icons.redstar}</div>
                                                    <did className="mx-auto"><span className='font-normal text-base'>popular</span></did>
                                                </div>
                                            </div>
                                            <div className='pt-3 max-w-[810px]'>
                                                <span className='font-normal w-full text-base mt-3'>{article.content}</span>
                                            </div>
                                        </div>
                                    )
                                })

                        }
                    </div>
                </div>
                <div className='relative'>
                    <Image src={RightChat} width={250} height={150} alt="right-chat" className='absolute -right-32 -top-44 max-2xl:hidden' />
                    <Image src={LeftChat} width={190} height={50} alt="left-chat" className='absolute right-0 -top-8 max-2xl:hidden' />
                </div>
            </div>
            <div className='flex justify-between max-sm:justify-center max-sm:mx-auto mt-28 max-md:space-y-5 max-xl:mt-16 max-xl:justify-around max-md:flex-col mb-20'>
                <div className='flex flex-col max-sm:items-center max-md:space-y-3'>
                    <span className='font-medium text-4xl text-center max-sm:text-center'>Need further assistance? </span>
                    <span className='max-sm:text-center max-md:mx-auto'>Contact our customer support team now.</span>
                </div>
                <div className='max-sm:mt-10 max-md:mx-auto max-md:justify-center max-lg:items-center max-md:mmx-auto'>
                    <Button 
                        radius="lg" 
                        className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm" 
                        size='md'
                        onPress={() => Crisp.chat.open()}
                    >
                        <span>Chat Now</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
