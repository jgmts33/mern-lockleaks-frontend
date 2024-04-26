"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight, Eye } from "@/components/utils/Icons";
import Space from '@/public/assets/space.svg';
import Saturn from '@/public/assets/saturn.svg';
import Woman from '@/public/assets/woman.svg';
import RobertHand from '@/public/assets/copyright/robert-hand.svg';

export default function BlogFormat() {
    const icons = {
        right: <ChevronRight fill="currentColor" size={16} />,
        eye: <Eye fill="currentColor" size={16} />,
    };

    const ArticleContent = {
        title: "ARTICLE TITLE",
        description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida pulvinar. Ultricies suscipit malesuada nunc eu. Iaculis etiam morbi sit faucibus. Integer lectus at amet amet quisque neque nunc. Est id ipsum accumsan ullamcorper. Urna sit quis id pellentesque diam turpis elit erat. Morbi enim blandit ultrices laoreet dapibus neque. At sit id amet at in. In maecenas nisl luctus odio nisi. Vestibulum id bibendum nec lectus aenean duis. Amet egestas interdum risus sem turpis vestibulum eu. In vulputate eu mi fringilla tellus ut proin nunc. Cursus ipsum enim erat amet neque gravida. At malesuada neque quam pharetra id tristique sagittis scelerisque.",
    }

    const CardLlist = [
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        },
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        }
    ]

    const CardRlist = [
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        },
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        }
    ]

    return (
        <>
            <Image src={RobertHand} className='max-2xl:hidden absolute right-0 top-[630px]' alt='rober-hand' />
            <div className="text-white container relative flex flex-col mx-auto">

                {/* This section for define Blog Format Page Header*/}

                <div className='px-3'>
                    <div className='flex max-xl:flex-col mx-auto max-xl:mx-auto mt-10 container bg-white/10 bg-opacity-20 shadow-sm shadow-gray-50 border-gray-600 rounded-3xl '>
                        <Image src={Space} alt="Service" className='max-xl:w-full' />
                        <div className='flex flex-col max-sm:pt-24 max-sm:p-8 p-16 relative '>
                            <span className='max-w-1/2 max-xl:text-center font-medium text-5xl mx-auto'>{ArticleContent.title}</span>
                            <span className='max-w-1/2 max-xl:text-center font-normal text-base mt-5'>{ArticleContent.description}</span>
                            <Button radius="full" className="absolute flex items-center top-8 right-8 bg-gradient-to-tr from-gray-800/80 to-gray-800/40 border-gray-600 border text-white shadow-lg max-md:text-[13px] px-6 opacity-40" size='md'>
                                <p className='text-medium font-normal'>100</p>
                                {icons.eye}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* This section for define Blog Format Page Actions*/}

                <div className='flex justify-start mt-10 max-sm:mt-5 gap-5 max-xl:mx-auto max-xl:flex-col max-xl:w-1/2 '>
                    <Button radius="full" className="bg-gradient-to-tr flex items-center from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg max-md:text-[15px] px-6" size='md'>
                        <p className='text-medium font-normal'>Lockleaks</p>
                        {icons.right}
                    </Button>
                    <Button radius="full" className="bg-gradient-to-tr flex items-center v from-gray-800/80 to-gray-800/40 text-white shadow-lg max-md:text-[15px] px-6" size='md'>
                        <p className='text-medium font-normal'>Blog</p>
                        {icons.right}
                    </Button>
                    <Button radius="full" className="bg-gradient-to-tr flex items-center from-gray-800/80 to-gray-800/40 border-gray-600 text-white shadow-lg max-md:text-[13px] px-6" size='md'>
                        <p className='text-medium font-normal'>Example post blog( Title)</p>
                        {icons.right}
                    </Button>
                </div>
                <div className='font-light flex mt-32 gap-5 justify-start max-xl:mx-auto max-xl:flex-col max-xl:w-1/2 max-xl:mt-5'>
                    <Button radius="full" className="bg-gradient-to-tr flex items-center from-gray-800/80 to-gray-800/40 border-gray-600 border text-white shadow-lg max-md:text-[13px] px-6" size='md'>
                        <p className='text-medium font-normal'>TAGS (Example interview)</p>
                    </Button>
                </div>

                {/* This section for define Blog Format Page Cards*/}

                <div className='w-full flex mx-auto gap-5 max-lg:flex-col max-xl:flex-col max-md:px-3'>
                    <div className='flex flex-col top-24 w-full mt-32 gap-10 max-md:mx-auto' >
                        {
                            CardLlist.map((item, index) => {
                                return (
                                    <div key={index} className="bg-gradient-to-br max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                                        <div className="flex max-md:flex-col">
                                            <div className="shrink-0 w-1/2 p-3 flex flex-col max-md:mx-auto">
                                                <Image className="h-80 w-full mt-2 max-md:h-[150px] p-2 rounded-3xl" src={Saturn} alt="Modern building architecture" />
                                                <div className='flex gap-2 mt-5 ml-3 max-lg:mx-auto'>
                                                    <Image className="h-6 w-6" src={Woman} alt="Modern building architecture" />
                                                    <div className='flex flex-col'>
                                                        <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                                                        <span className='font-light text-xs'>San Diego, California</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5 w-1/2 max-lg:mx-auto max-md:w-full max-lg:text-center pt-12">
                                                <p className="font-semibold text-xl">{item.title}</p>
                                                <p className="font-normal text-base mt-5">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='flex flex-col mt-80 w-full gap-10 max-xl:mt-8 max-md:mx-auto max-md:px-3 mb-10'>
                        {
                            CardRlist.map((item, index) => {
                                return (
                                    <div key={index} className="bg-gradient-to-br max-md:max-w-[700px] max-xl:max-w-[1000px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                                        <div className="flex max-md:flex-col">
                                            <div className="shrink-0 w-1/2 p-3 flex flex-col max-md:mx-auto">
                                                <Image className="h-80 w-full mt-2 p-2 max-md:h-[150px] rounded-[20px]" src={Saturn} alt="Modern building architecture" />
                                                <div className='flex gap-2 mt-5 ml-3 max-lg:mx-auto'>
                                                    <Image className="h-6 w-6" src={Woman} alt="Modern building architecture" />
                                                    <div className='flex flex-col'>
                                                        <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                                                        <span className='font-light text-xs'>San Diego, California</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5 w-1/2 max-lg:text-center max-md:w-full max-lg:mx-auto pt-12">
                                                <p className="font-semibold text-xl">{item.title}</p>
                                                <p className="font-normal text-base mt-5">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
