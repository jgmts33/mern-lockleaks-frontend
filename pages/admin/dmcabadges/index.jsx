"use client";
import {
    Button
} from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadDmcaImage } from '@/axios/dmca';

export default function Dmcabadges() {
    const router = useRouter();

    const [previewImgUrl, setPreviewImgUrl] = useState('');
    const [file, setFile] = useState();

    const handleGoDetails = () => {
        router.push("/admin/dmcabadges/details");
    }

    const handleChange = (files) => {
        if (!files.length) return;
        setPreviewImgUrl(URL.createObjectURL(files[0]));
        setFile(files[0]);
    }

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadDmcaImage(formData);

        if ( res.status == 'success' ) {
            setFile(null);
            setPreviewImgUrl('');
        } else {
            console.log(res.data);
        }

    }, [file])

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='flex max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>DMCA Badges</span>
            </div>
            <div className='flex justify-between w-full mt-10 max-lg:max-w-full max-lg:justify-around'>
                <div className='flex w-full'>
                    <Button radius="md" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base border border-white/40" size='md' onClick={() => handleGoDetails()}>
                        DMCA Badges
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 mt-5'>
                <div className='flex flex-col w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5'>
                    <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                        <div className="flex items-center justify-center pt-5 pb-6">
                            <span className="font-light text-lg text-white">+ Upload Photo</span>
                        </div>
                        <input type="file" className="hidden" onChange={(e) => handleChange(e.target.files)} accept=".png" />
                    </label>
                </div>
                <div className='flex flex-col justify-center items-center w-full h-[383px] max-md:h-[300px] bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-5 max-md:mt-0'>
                    {
                        previewImgUrl ?
                            <img
                                src={previewImgUrl}
                                // width={200}
                                // height={100}
                                className='rounded-2xl'
                                alt='uploaded_photo'
                            />
                            : <></>
                    }
                </div>
                <div className='flex mt-5'>
                    <Button
                        radius="lg"
                        className="bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 border border-gray-600 text-white text-lg "
                        size='lg'
                        type='submit'
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </div>
    )
}
