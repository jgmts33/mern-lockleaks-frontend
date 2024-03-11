"use client";
import React from 'react'
import Image from 'next/image';
import {
  Button
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight } from "@/src/utils/Icons";
import Saturn from '@/public/assets//blog/saturn.svg';
import Moon from '@/public/assets//blog/moon.svg';
import Mars from '@/public/assets//blog/mars.svg';
import Woman from '@/public/assets/woman.svg';

export default function Blog() {
  const icons = {
    right: <ChevronRight fill="currentColor" size={16} />,
  };

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
  ]

  return (
    <div className="text-white relative container flex flex-col pb-20 mt-10">

      {/* This section for define blog title*/}

      <span className='font-medium text-5xl text-center'>BLOG</span>

      {/* This section for define blog title*/}

      <div className='grid grid-cols-3 gap-6 z-20 max-lg:flex-wrap max-lg:justify-center mt-10 max-xl:grid-cols-2 max-lg:grid-cols-1'>
        {
          BlogCardContent.map((blog, index) => {
            return (
              <div key={index} class="bg-gradient-to-br max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                <div className="flex flex-col">
                  <div className="shrink-0 p-3 flex flex-col">
                    <Image className="h-80 w-full mt-2 object-cover p-2 rounded-[20px]" src={blog.photo} alt="Modern building architecture" />
                    <div class="p-5">
                      <p class="font-semibold text-xl">{blog.title}</p>
                      <p class="font-normal text-base mt-5">{blog.description}</p>
                    </div>
                    <div className='flex gap-2 mt-5 ml-3 max-lg:mx-auto '>
                      <Image class="h-6 w-6" src={Woman} alt="Modern building architecture" />
                      <div className='flex flex-col'>
                        <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                        <span className='font-light text-xs'>San Diego, California</span>
                      </div>
                      <div className='flex justify-end'> 
                      <Button radius="lg" className="bg-transparent text-white mt-4" size='lg'>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>See Solution</span>
                        <Image src="assets/vector.svg" className='w-7 h-7 -ml-2 -mt-1' alt='vector' />
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
    </div >
  )
}

