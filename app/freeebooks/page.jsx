"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button, Pagination, PaginationItemType
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Shine, Star } from "@/components/utils/Icons";
import Ebook from '@/public/assets/ebooks/ebooks.svg';

export default function FreeEBooks() {
    const icons = {
        left: <ChevronLeft fill="currentColor" size={16} />,
        right: <ChevronRight fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
        shine: <Shine fill='currentColor' size={16} />,
        star: <Star fill='currentColor' size={16} />
    };

    const [selectedPagination, setSelectPagination] = useState(1);
    const [allPagination, setAllPagination] = useState(0);
    const [selectPaginationBtn, setSelectPaginationBtn] = useState(false);

    const EbooksCardContent = [
        {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",        
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }, {
            photo: Ebook,
            name: "E-Book Name",
        }
    ]

    const Reviews = [
        {
            stars: icons.star
        },
        {
            stars: icons.star
        },
        {
            stars: icons.star
        },
        {
            stars: icons.star
        },
        {
            stars: icons.star
        }
    ]

    useEffect(() => {
        setAllPagination(Math.ceil(EbooksCardContent.length / 9));
    }, [EbooksCardContent.length]);

    const handlePageChange = (page) => {
        setSelectPagination(page)
    }

    const renderItem = ({
        ref,
        key,
        value,
        isActive,
        setPage,
        className,
    }) => {

        if (value === PaginationItemType.DOTS) {
            return <button key={key} className={className}>...</button>;
        }

        return (
            <button
                key={key}
                ref={ref}
                className={className + (isActive ? " text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : "")}
                onClick={() => setPage(value)}
            >
                {value}
            </button>
        );
    }

    const handlePaginationLeftBtnClick = () => {
        setSelectPaginationBtn(false);
        setSelectPagination(p => (p > 1 ? p - 1 : p));
    }

    const handlePaginationRightBtnClick = () =>{
        setSelectPaginationBtn(true);
        setSelectPagination(p => (p < allPagination ? p + 1 : p));
    }

    return (
        <div className="text-white relative container flex flex-col pb-20 mt-10 max-sm:px-3 mx-auto">

            {/* This section for define E-books title*/}

            <div className='flex flex-col mx-auto text-center'>
                <div><span className='font-medium text-5xl text-center uppercase'>free e-books download</span></div>
                <div className='max-w-[720px] mt-5'><span className='font-normal text-base'>Lorem ipsum dolor sit amet consectetur. Faucibus dui iaculis cursus id. Sit diam velit eget bibendum fusce faucibus quis a vel. Porttitor ultrices tellus elementum aliquet quis. Auctor turpis facilisi augue est diam.</span></div>
            </div>

            {/* This section for define search part*/}

            <div className='flex mx-auto justify-center gap-5 w-full mt-20 items-center max-w-[1050px] max-sm:flex-col'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Print your request here'
                        className='w-full outline-none p-3 rounded-lg backdrop-blur-sm bg-white/15 shadow-sm text-white'
                        required
                    />
                </div>
                <Button radius="lg" className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg" size='lg'>
                    Search<span className='w-5 h-5'>{icons.search}</span>
                </Button>
            </div>

            <div className='flex mx-auto mt-12'>
                <span className='font-medium text-3xl'>Download E-books</span>
            </div>

            {/* This section for define blog content*/}

            <div className='grid grid-cols-3 gap-6 max-lg:flex-wrap max-lg:justify-center mt-10 max-xl:grid-cols-2 max-lg:grid-cols-1'>
                {
                    EbooksCardContent.slice((selectedPagination - 1) * 9, selectedPagination * 9).map((books, index) => {
                        return (
                            <div key={index} className="bg-gradient-to-br max-w-[500px] w-full max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] bg-[#292929] border border-gray-600 mx-auto rounded-xl shadow-md">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className='relative'>
                                            <Image className="h-52 pt-6 rounded-[20px]" src={books.photo} alt="Modern building architecture" />
                                        </div>
                                        <div className='flex p-2'>
                                            <Button radius="lg" className="font-medium backdrop-blur-sm max-md:text-xs bg-white/10 border border-gray-500 shadow-gray-50 text-white w-full px-12 py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>
                                                <span>{books.name}</span>
                                            </Button>
                                            <Button radius="lg" className="font-medium bg-gradient-to-tr max-md:text-xs from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg w-full py-5 text-base" size='md'>
                                                <span>{icons.shine}</span>Download pdf
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center gap-32 pt-16 max-sm:gap-20'>
                <div>
                    <Button isIconOnly className={selectPaginationBtn == false ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "backdrop-blur-sm bg-white/10"} aria-label="Like" onClick={() => handlePaginationLeftBtnClick()}>
                        {icons.left}
                    </Button>
                </div>
                <div>
                    <Pagination
                        disableCursorAnimation
                        onChange={handlePageChange}
                        total={allPagination}
                        initialPage={1}
                        page={selectedPagination}
                        renderItem={renderItem}
                        variant="light"
                    />
                </div>
                <div>
                    <Button isIconOnly className={selectPaginationBtn == true  ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "backdrop-blur-sm bg-white/10"} aria-label="Like" onClick={() => handlePaginationRightBtnClick()}>
                        <div>{icons.right}</div>
                    </Button>
                </div>
            </div>
        </div >
    )
}

