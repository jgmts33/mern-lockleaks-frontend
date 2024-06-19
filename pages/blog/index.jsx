"use client";
import React from 'react'
import Image from 'next/image';
import {
  Button, Pagination, PaginationItemType,
  Spinner
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight } from "@/components/utils/Icons";
import { getBlogList } from '@/axios/blog';
import { useRouter } from 'next/router';

export default function BlogList() {

  const router = useRouter();
  const icons = {
    right: <ChevronRight />,
  };

  const [selectedPagination, setSelectPagination] = useState(1);
  const [allPagination, setAllPagination] = useState(0);
  const [list, setList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const getBlogListInfo = async () => {

    setIsProcessing(true);

    const res = await getBlogList();
    if (res.status == 'success') setList(res.data);

    setIsProcessing(false);
  }

  useEffect(() => {
    setAllPagination(Math.ceil(list.length / 9));
  }, [list.length]);

  const handlePageChange = (page) => {
    setSelectPagination(page)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPagination]);

  useEffect(() => {
    getBlogListInfo();
  }, []);

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

  return (
    <div className="text-white relative flex flex-col pb-20 mt-10 max-sm:mt-5 px-4 container mx-auto">

      {/* This section for define blog title*/}

      <span className='font-medium text-5xl text-center mb-10'>BLOG</span>

      {/* This section for define blog content*/}

      {
        isProcessing ?
          <div className='w-full flex justify-center'>
            <Spinner />
          </div>
          :
          <div className='grid grid-cols-3 gap-6 max-lg:flex-wrap max-lg:justify-center max-xl:grid-cols-2 max-lg:grid-cols-1'>

            {list.slice((selectedPagination - 1) * 9, selectedPagination * 9).map((blog, index) => {
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl w-full max-w-[480px] flex flex-col p-3 hover:cursor-pointer hover:shadow-xl"
                  onClick={() => router.push(`/blog/${blog.title.replaceAll(" ", "-")}-${blog.id}`)}
                >
                  <img className="h-80 w-full mt-2 p-2 rounded-[20px]" src={`https://server.lockleaks.com/images?filename=${blog.banner}`} alt="Modern building architecture" />
                  <div className="p-5 flex-1">
                    <p className="font-semibold text-xl">{blog.title}</p>
                  </div>
                  <div className='flex gap-5 mt-5 ml-3 max-lg:mx-auto justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                      <img className="h-8 w-8 rounded-md" src={`https://server.lockleaks.com/images?filename=${blog.moderatorInfo.avatar}`} alt="Modern building architecture" />
                      <div className='flex flex-col'>
                        <span className='font-light text-sm justify-start'>{blog.moderatorInfo.name}</span>
                        <span className='font-light text-xs'>{blog.moderatorInfo.description}</span>
                      </div>
                    </div>
                    <div className='flex'>
                      <Button
                        radius="lg"
                        className="bg-transparent text-white"
                        size='lg'
                        onPress={() => router.push(`/blog/${blog.title.replaceAll(" ", "-")}-${blog.id}`)}
                      >
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Article</span>
                        <Image src="/assets/vector.svg" width={28} height={28} className='-ml-2 -mt-1' alt='vector' />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
      }
      {
        allPagination > 1 ?
          <div className='flex justify-between pt-16'>
            {
              selectedPagination > 1 ? <Button
                radius="full"
                className="font-light bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg text-lg max-md:text-[15px]" size='md'
                onClick={() => setSelectPagination(p => (p > 1 ? p - 1 : p))}
              >
                <div className='rotate-[-180deg]'>{icons.right}</div>
                <span>Back</span>
              </Button> : <div></div>
            }
            <Pagination
              disableCursorAnimation
              onChange={handlePageChange}
              total={allPagination}
              initialPage={1}
              page={selectedPagination}
              renderItem={renderItem}
              variant="light"
            />
            {
              selectedPagination < allPagination ? <Button
                radius="full"
                className="font-light bg-gradient-to-tr from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg text-lg max-md:text-[15px]"
                size='md'
                onClick={() => setSelectPagination(p => (p < allPagination ? p + 1 : p))}
              >
                <span>Next</span>
                <div>{icons.right}</div>
              </Button> : <div></div>}
          </div>
          :
          <></>
      }
    </div >
  )
}

