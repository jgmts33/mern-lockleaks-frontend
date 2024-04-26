"use client";
import Image from 'next/image';
import {
    Button, Link,
} from '@nextui-org/react';
import { Shine, } from "@/components/utils/Icons";
import React from 'react';

export default function TermService() {

    const icons = {
        shine: <Shine fill="currentColor" size={16} />,
    };

    const PravicyPolicy = {
        title: "Terms of Services",
    }

    const TermServiceContent = [
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
        {
            id: '',
            content: "Lorem ipsum dolor sit amet consectetur. Venenatis risus dui metus in lectus vitae. Lobortis cursus viverra vitae molestie magnis. Nullam lorem sed nunc vulputate tellus. Sit neque lectus in enim hac vel blandit at. Rhoncus ipsum mi mi ridiculus a hac aliquet donec nibh. Mattis non non id lectus mattis quam. Ultricies auctor et dictum gravida. Eu viverra vulputate augue etiam. Tortor commodo vitae mollis turpis diam felis et faucibus dictum."
        },
    ]

    return (
        <>
            <div className="flex flex-col mx-auto items-center max-w-[1470px] justify-center text-white w-full font-normal text-base">

                {/* This section for define term service header*/}

                <div className='text-center mt-10 max-sm:mt-5'>
                    <p className='font-medium text-5xl uppercase max-lg:text-[30px]'>{PravicyPolicy.title}</p>
                </div>

                {/* This section for define term service content*/}

                <div className='mt-8 max-2xl:mt-2 grid grid-cols-3 gap-10 max-md:gap-2 mb-10 max-xl:px-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
                    {
                        TermServiceContent.map((termservice, index) => {
                            return (
                                <div key={index} className="flex py-10 max-w-[490px] bg-white/10 bg-opacity-20 shadow-sm border border-gray-500 rounded-[40px] p-5 cursor-pointer top-6 mt-6">
                                    <div className='flex flex-col'>
                                        {icons.shine}
                                        <p className='mt-5 font-normal text-base'>{termservice.content.slice(0, 100)}...</p>
                                        <Button radius="lg" className="bg-transparent justify-start text-white mt-4 flex gap-2 items-center" size='lg'>
                                            <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>Read More</span>
                                            <Image src="assets/vector.svg" width={28} height={28} className='-ml-2 -mt-1' alt='vector' />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}