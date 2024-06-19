"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import {
    Button,
    Spinner
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight } from "@/components/utils/Icons";
import RightChat from '@/public/assets/setup/rightchat.svg';
import LeftChat from '@/public/assets/setup/leftchat.svg';
import { useRouter } from 'next/navigation';
import { getHelpCategories, searchHelpAriticles } from '@/axios/help';
import { Crisp } from 'crisp-sdk-web';

export default function Help() {
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [isCategoryProcessing, setIsCategoryProcessing] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const icons = {
        search: <Search />,
        collobation: <Collobation />,
        chat: <RecoveryChat />,
        direction: <ArrowRight />,
    };

    const getCategoriesInfo = async () => {

        setIsCategoryProcessing(true);

        const res = await getHelpCategories();
        if (res.status == 'success') setCategories(res.data);

        setIsCategoryProcessing(false);
    }

    const QuestionContent = [
        {
            content: "I've just subscribed to a service. What happens next?"
        }, {
            content: "What payment methods are accepted for subscriptions?"
        }, {
            content: "How often are reports generated, and what do they include?"
        }, {
            content: "Is there a limit to the number of takedown requests I can make within my subscription?"
        }, {
            content: "How to Cancel Your Subscription?"
        }, {
            content: "Are DMCA badges provided with the subscription, and how can I integrate them into my website?"
        }
    ]

    const handleGoCategory = (categoryName) => {
        router.push(`/help/articles?category=${categoryName.replaceAll(" ", "-").replaceAll("&", "_")}`)
    }

    const handleGoDetail = () => {
        router.push("/help/details")
    }

    useEffect(() => {
        getCategoriesInfo();
    }, []);

    return (
        <div className="text-white flex flex-col max-sm:px-3 mx-auto" >

            {/* This section for define Help Page Title*/}

            <div className='mt-10 max-sm:mt-5 max-md:px-3 max-md:text-center'>
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 left-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute top-0 right-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                <p className='font-medium text-7xl text-center max-lg:text-5xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-10 items-center max-w-[1050px] max-sm:flex-col z-10'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-3 rounded-lg bg-white text-black'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        required
                    />
                </div>
                <Button
                    radius="lg"
                    className="bg-gradient-to-tr mx-auto z-10 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg"
                    size='lg'
                    onClick={() => router.push(`/help/articles?search=${searchValue}`)}
                >
                    <span>Search</span>
                    <span className='w-5 h-5'>{icons.search}</span>
                </Button>
            </div>
            <div className='flex mx-auto mt-10'>
                <span className='font-medium text-5xl'>CATEGORIES</span>
            </div>

            {/* This section for define Help Page content*/}
            {
                isCategoryProcessing ?
                    <div className='w-full flex justify-center mt-20 max-xl:mt-10'>
                        <Spinner />
                    </div>
                    :
                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-10 mx-auto mt-20 max-xl:mt-10 z-10'>
                        {
                            categories.map((category, index) => {
                                return (
                                    <div key={index} className="flex max-w-[597px] bg-white/10 bg-opacity-20 shadow-sm rounded-lg px-8 py-5 cursor-pointer" onClick={() => handleGoCategory(category.name)}>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex items-start gap-5'>
                                                <span>{icons.collobation}</span>
                                                <span className='font-medium text-3xl bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent max-md:text-lg'>{category.name}</span>
                                            </div>
                                            <div className='pt-3'>
                                                <span className='font-normal text-base mt-3 max-md:text-xs'>{category.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
            <div className='relative max-xl:hidden'>
                <Image src={RightChat} width={250} height={150} alt="right-chat" className='absolute right-0 -top-20 z-10' />
                <Image src={LeftChat} width={190} height={50} alt="left-chat" className='absolute right-32 top-32 z-10' />
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-20 right-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
                <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={533} height={542} className='max-2xl:hidden absolute -top-20 left-0 bg-[#0d091a] bg-opacity-20 blur-3xl' />
            </div>
            <div className='mt-20 mx-auto max-w-[600px] text-center max-xl:mt-10'>
                <span className='font-medium text-5xl max-md:text-4xl'>Frequently Asked Questions</span>
            </div>
            <div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-10 mx-auto mt-20 max-xl:mt-10 max-lg:mt-10 mb-10 z-10'>
                {
                    QuestionContent.map((items, index) => {
                        return (
                            <div key={index} className="flex max-w-[466px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-5 cursor-pointer" onClick={() => handleGoDetail()}>
                                <div className='flex flex-col w-full'>
                                    <div className='flex items-center gap-5'>
                                        <span className='-ml-5'>{icons.chat}</span>
                                        <span className='font-medium text-3xl mt-3 bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>{items.title}</span>
                                    </div>
                                    <div className='pt-3'>
                                        <span className='font-normal text-base mt-3'>{items.content}</span>
                                    </div>
                                    <div className='mt-3'>
                                        {icons.direction}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-between mt-16 max-xl:mt-5 max-xl:justify-around max-sm:flex-col mb-10'>
                <div className='flex flex-col max-sm:items-center'>
                    <span className='font-medium text-4xl max-sm:text-center'>Need further assistance? </span>
                    <span>Contact our customer support team now.</span>
                </div>
                <div className='max-sm:mt-10 max-md:mx-auto max-md:justify-center max-lg:items-center max-md:mmx-auto'>
                    <Button
                        radius="lg"
                        className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-sm"
                        size='md'
                        onClick={() => Crisp.chat.open()}
                    >
                        <span>Chat Now</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
