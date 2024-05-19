"use client";
import React from 'react'
import Image from 'next/image';
import {
  Button, Pagination, PaginationItemType
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight } from "@/components/utils/Icons";
import Saturn from '@/public/assets//blog/saturn.svg';
import Moon from '@/public/assets//blog/moon.svg';
import Mars from '@/public/assets//blog/mars.svg';
import Woman from '@/public/assets/woman.svg';

export default function Blog() {
  const icons = {
    right: <ChevronRight fill="currentColor" size={16} />,
  };

  const [seletedBlog, setSelectBlog] = useState(0);
  const [selectedPagination, setSelectPagination] = useState(1);
  const [allPagination, setAllPagination] = useState(0)

  const BlogCardContent = [
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Mars
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Saturn
    },
    {
      title: "Popular  admain template you can use for your business",
      description: "Losing money and respect due to pirated content.",
      photo: Moon
    }
  ]

  useEffect(() => {
    setAllPagination( Math.ceil(BlogCardContent.length / 9) );
  }, [BlogCardContent.length]);

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
        className={ className + ( isActive ? " text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : "")}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  }

  return (
    <div className="text-white relative flex flex-col pb-20 mt-10 max-sm:mt-5 max-sm:px-3 mx-auto">

      {/* This section for define blog title*/}

      <span className='font-medium text-5xl text-center'>BLOG</span>

      {/* This section for define blog content*/}

      <div className='grid grid-cols-3 gap-6 max-lg:flex-wrap max-lg:justify-center mt-10 max-xl:grid-cols-2 max-lg:grid-cols-1'>
        {          
          BlogCardContent.slice((selectedPagination - 1) * 9, selectedPagination * 9).map((blog, index) => {
            return (
              <div key={index} className="bg-gradient-to-br max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                <div className="flex flex-col">
                  <div className="shrink-0 p-3 flex flex-col">
                    <Image className="h-80 w-full mt-2 p-2 rounded-[20px]" src={blog.photo} alt="Modern building architecture" />
                    <div className="p-5">
                      <p className="font-semibold text-xl">{blog.title}</p>
                      <p className="font-normal text-base mt-5">{blog.description}</p>
                    </div>
                    <div className='flex gap-5 mt-5 ml-3 max-lg:mx-auto justify-between'>
                      <div className='flex gap-3'>
                        <Image className="h-6 w-6" src={Woman} alt="Modern building architecture" />
                        <div className='flex flex-col'>
                          <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                          <span className='font-light text-xs'>San Diego, California</span>
                        </div>
                      </div>
                      <div className='flex'>
                        <Button radius="lg" className="bg-transparent text-white" size='lg'>
                          <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Article</span>
                          <Image src="/assets/vector.svg" width={28} height={28} className='-ml-2 -mt-1' alt='vector' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-between pt-16'>
        <div>
          <Button
            radius="full"
            className="font-light bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg text-lg max-md:text-[15px]" size='md'
            onClick={() => setSelectPagination(p => (p > 1 ? p - 1 : p))}
          >
            <div className='rotate-[-180deg]'>{icons.right}</div>
            <span>Back</span>
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
          <Button
            radius="full"
            className="font-light bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg text-lg max-md:text-[15px]"
            size='md'
            onClick={() => setSelectPagination(p => (p < allPagination ? p + 1 : p))}
          >
            <span>Next</span>
            <div>{icons.right}</div>
          </Button>
        </div>
      </div>
    </div >
  )
}

