"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight, EYE } from "@/src/utils/Icons";
import SPACE from '@/public/assets/space.svg';
import SATURN from '@/public/assets/saturn.svg';
import WOMAN from '@/public/assets/woman.svg';

export default function BlogFormat() {
    const icons = {
        right: <ChevronRight fill="currentColor" size={16} />,
        eye: <EYE fill="currentColor" size={16} />,
    };

    const article_content = {
        title: "ARTICLE TITLE",
        description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida pulvinar. Ultricies suscipit malesuada nunc eu. Iaculis etiam morbi sit faucibus. Integer lectus at amet amet quisque neque nunc. Est id ipsum accumsan ullamcorper. Urna sit quis id pellentesque diam turpis elit erat. Morbi enim blandit ultrices laoreet dapibus neque. At sit id amet at in. In maecenas nisl luctus odio nisi. Vestibulum id bibendum nec lectus aenean duis. Amet egestas interdum risus sem turpis vestibulum eu. In vulputate eu mi fringilla tellus ut proin nunc. Cursus ipsum enim erat amet neque gravida. At malesuada neque quam pharetra id tristique sagittis scelerisque.",
    }

    const card_Llist = [
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        },
        {
            title: "Popular  admain template you can use for your business",
            description: "Lorem ipsum dolor sit amet consectetur. Tellus nullam a nunc euismod. Suspendisse orci diam elementum faucibus natoque odio blandit. Neque sed vivamus elementum vitae nulla leo id sem pharetra. Amet viverra purus consectetur enim sit consequat velit amet. Orci nec volutpat mi tortor. Blandit urna vel consectetur aliquam id malesuada sit gravida..."
        }
    ]

    const card_Rlist = [
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
        <div className="text-white relative container flex flex-col">
            <div className='flex mt-20 container max-2xl:justify-center max-2xl:mx-auto max-md:max-w-[600px] max-lg:text-center max-lg:flex-wrap bg-white/5 shadow-sm bg-opacity-60 rounded-3xl'>
                <div className='max-md:w-[1000px] max-md:justify-content'>
                    <Image src={SPACE} className='max-md:hidden' alt="space" />
                </div>
                <div className='flex w-2/3 justify-center flex-col p-16'>
                    <span className='font-medium text-5xl text-center max-md:flex-wrap'>{article_content.title}</span>
                    <span className='text-starter mt-10'>{article_content.description}</span>
                </div>
            </div>
            <div className='flex justify-start mt-10 gap-5 max-xl:mx-auto max-xl:flex-col max-xl:w-1/2'>
                <Button radius="full" className="font-light bg-gradient-to-tr from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg text-lg" size='md'>
                    Lockleaks{icons.right}
                </Button>
                <Button radius="full" className="font-light bg-gradient-to-tr v from-gray-800/80 to-gray-800/40 text-white shadow-lg text-lg" size='md'>
                    Blog{icons.right}
                </Button>
                <Button radius="full" className="font-light bg-gradient-to-tr from-gray-800/80 to-gray-800/40 border--gray-600 text-white shadow-lg text-lg" size='md'>
                    Example post blog( Title){icons.right}
                </Button>
            </div>
            <div className='font-light flex mt-32 gap-5 justify-between max-xl:mx-auto max-xl:flex-col max-xl:w-1/2 max-xl:mt-5'>
                <Button radius="full" className="bg-gradient-to-tr from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg text-lg" size='md'>
                    TAGS (Example interview){icons.right}
                </Button>
                <Button radius="full" className="bg-gradient-to-tr opacity-60 from-gray-800/80 to-gray-800/40 text-white shadow-lg text-lg" size='md'>
                    Blog+{icons.eye}
                </Button>
            </div>
            <div className='w-full flex mx-auto gap-5 max-lg:flex-col max-xl:flex-col'>
                <div className='flex flex-col top-24 w-full mt-32 gap-10 max-md:mx-auto' >
                    {
                        card_Llist.map((item, index) => {
                            return (
                                <div key={index} class="bg-gradient-to-br max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                                    <div class="flex">
                                        <div class="shrink-0 max-lg:w-full w-1/2 p-3 flex flex-col">
                                            <Image class="h-80 w-full mt-2 object-cover max-md:w-full p-2 rounded-[20px]" src={SATURN} alt="Modern building architecture" />
                                            <div className='flex gap-2 mt-5 ml-3 max-lg:mx-auto'>
                                                <Image class="h-6 w-6" src={WOMAN} alt="Modern building architecture" />
                                                <div className='flex flex-col'>
                                                    <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                                                    <span className='font-light text-xs'>San Diego, California</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-5 w-1/2 max-lg:mx-auto max-lg:text-center">
                                            <p class="font-semibold text-xl">{item.title}</p>
                                            <p class="font-normal text-base mt-5">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col mt-80 w-full gap-10 max-xl:mt-8 max-md:mx-auto'>
                    {
                        card_Rlist.map((item, index) => {
                            return (
                                <div key={index} class=" bg-gradient-to-br max-md:max-w-[700px] max-xl:max-w-[1000px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md">
                                    <div class="flex">
                                        <div class="shrink-0 max-lg:w-full w-1/2 p-3 flex flex-col">
                                            <Image class="h-80 w-full mt-2 object-cover p-2 rounded-[20px]" src={SATURN} alt="Modern building architecture" />
                                            <div className='flex gap-2 mt-5 ml-3 max-lg:mx-auto'>
                                                <Image class="h-6 w-6" src={WOMAN} alt="Modern building architecture" />
                                                <div className='flex flex-col'>
                                                    <span className='font-light text-sm justify-start'>Fitbit Incorporated</span>
                                                    <span className='font-light text-xs'>San Diego, California</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-5 w-1/2 max-lg:text-center max-lg:mx-auto">
                                            <p class="font-semibold text-xl">{item.title}</p>
                                            <p class="font-normal text-base mt-5">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
