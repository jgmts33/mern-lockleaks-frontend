"use client";
import Image from 'next/image';
import {
    Button, Link
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { deleteDmcaImage, getDmcaImages, updateDmcaImageOrder } from '../../../axios/dmca';

const handleBack = () => {
    history.back()
}

export default function DmcaBadgeDetails() {

    const [list, setList] = useState([]);

    const getDmcaImagesInfo = async () => {
        const res = await getDmcaImages();

        if (res.status == 'success') {
            setList(res.data);
        }
    }

    const handleDelete = async (id) => {
        const res = await deleteDmcaImage(id);

        if (res.status == 'success') {
            setList(pre => {
                let data = pre;
                return data.filter((p) => p.id != id);
            });
        }
    }

    const handleSetPosition = async (id, order) => {
        const res = await updateDmcaImageOrder(id, order);

        if (res.status == 'success') {
            getDmcaImagesInfo();
        }
    }

    useEffect(() => {
        getDmcaImagesInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA BADGES</span>
            </div>
            <div className='flex justify-end mt-10 px-5'>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => handleBack()}>
                    Back
                </Button>
            </div>
            <div className='grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 max-lg:gap-3'>
                {
                    list.map((item, index) => <div key={index}>
                        <div className="flex border max-w-[450px] max-md:max-w-full aspect-square border-gray-500 rounded-[23px] mt-10 cursor-pointer">
                            <Image
                                src={`https://server.lockleaks.com/images?filename=${item.name}`}
                                width={450}
                                height={450}
                                className='w-full height-full rounded-2xl object-cover object-top'
                                alt={item.name}
                            />
                        </div>
                        <div className='flex justify-between pr-5 pt-5'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-8 py-5 text-base"
                                size='sm'
                                onClick={() => {

                                }}
                            >
                                Set Position
                            </Button>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg px-8 py-5 text-base"
                                size='sm'
                                onClick={() => handleDelete(item.id)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
