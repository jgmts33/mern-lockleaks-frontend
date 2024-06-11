"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import dynamic from "next/dynamic";
import { createNewBlog, getBlogDetails, updateBlog } from '@/axios/blog';

const TextEditer = dynamic(() => import("@/components/text-editor"), {
    ssr: false,
});

export default function CreatePost() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    const [bannerPreviewImgUrl, setBannerPreviewImgUrl] = useState('');
    const [avatarPreviewImgUrl, setAvatarPreviewImgUrl] = useState('');
    const [tagsStr, setTagsStr] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionProcessing, setActionIsProcessing] = useState(false);

    const [blogDetails, setBlogDetails] = useState({
        title: "",
        moderatorInfo: {
            name: "",
            description: "",
            avatar: ""
        },
        shortContent: "",
        content: "",
        banner: null,
        tags: []
    });

    const handleImageUpload = (files, target) => {
        if (!files.length) return;
        console.log(files[0]);
        if (target == 'banner') {
            setBannerPreviewImgUrl(URL.createObjectURL(files[0]));
            setBlogDetails(p => ({ ...p, banner: files[0] }))
        }
        if (target == 'avatar') {
            setAvatarPreviewImgUrl(URL.createObjectURL(files[0]));
            setBlogDetails(p => ({ ...p, moderatorInfo: { ...p.moderatorInfo, avatar: files[0] } }))
        }
    }

    const handleSubmit = useCallback(async () => {
        if ((!blogDetails.banner || !blogDetails.moderatorInfo.avatar) && !searchParams.get('id')) return;
        if (!tagsStr.split(",").length) return;
        setActionIsProcessing(true);
        const formData = new FormData();
        formData.append('title', blogDetails.title);
        formData.append('banner', blogDetails.banner);
        formData.append('shortContent', blogDetails.shortContent);
        formData.append('moderatorInfo[name]', blogDetails.moderatorInfo.name);
        formData.append('moderatorInfo[avatar]', blogDetails.moderatorInfo.avatar);
        formData.append('moderatorInfo[description]', blogDetails.moderatorInfo.description);
        formData.append('content', blogDetails.content);
        formData.append('tags', tagsStr.split(",").slice(0, 5));

        if (searchParams.get('id')) {
            const res = await updateBlog(searchParams.get('id'), formData);

            if (res.status == 'success') router.push("/admin/blog")
            else {
                console.log("Error:", res.data);
            }
        } else {
            const res = await createNewBlog(formData);

            if (res.status == 'success') router.push("/admin/blog")
            else {
                console.log("Error:", res.data);
            }
        }
        setActionIsProcessing(false);

    }, [blogDetails, searchParams.get('id'), tagsStr]);

    useEffect(() => {
        setMounted(true);
        console.log(router);
        (async () => {
            setIsProcessing(true);
            if (searchParams.get('id')) {
                const res = await getBlogDetails(searchParams.get('id'));
                setBannerPreviewImgUrl(`https://server.lockleaks.com/images?filename=${res.data.banner}`);
                setAvatarPreviewImgUrl(`https://server.lockleaks.com/images?filename=${res.data.moderatorInfo.avatar}`);
                setTagsStr(res.data.tags.join(","));
                setBlogDetails({
                    ...res.data,
                    banner: null,
                    moderatorInfo: {
                        ...res.data.moderatorInfo,
                        avatar: null,
                    }
                });
            }
            setIsProcessing(false);
        })();
    }, []);

    return (
        <div className='flex flex-col bg-gradient-to-tr px-5 space-y-6 text-white w-full'>
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>BLOG</span>
            </div>
            <div className='flex justify-end mt-10'>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => router.push("/admin/blog")}>
                    Back
                </Button>
            </div>
            {
                isProcessing ?
                    <div className='w-full flex justify-center mt-6'>
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <>
                        <div className='grid grid-cols-2 max-md:grid-cols-1 w-full gap-6 items-end'>
                            <div>
                                <p className='mb-4'>BLog Details</p>
                                <div className='flex gap-4 max-sm:flex-col items-end'>
                                    <div className='space-y-4'>
                                        <div className='flex flex-col w-64 h-64 bg-white/10 shadow-sm border border-gray-500 rounded-[16px]'>
                                            <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                                                {
                                                    bannerPreviewImgUrl ?
                                                        <Image
                                                            src={bannerPreviewImgUrl}
                                                            width={256}
                                                            height={256}
                                                            className=' w-full h-full rounded-2xl object-cover'
                                                            alt='uploaded_photo'
                                                        />
                                                        :
                                                        <p className="font-light text-sm text-white">+ Upload Photo</p>
                                                }
                                                <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files, 'banner')} accept=".png" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='space-y-4 w-full'>
                                        <Input
                                            type="text"
                                            label="Title"
                                            value={blogDetails.title}
                                            onChange={(e) => setBlogDetails(p => ({ ...p, title: e.target.value }))}
                                        />
                                        <Input
                                            type="text"
                                            label="Short Description"
                                            value={blogDetails.shortContent}
                                            onChange={(e) => setBlogDetails(p => ({ ...p, shortContent: e.target.value }))}
                                        />
                                        <Input
                                            type="text"
                                            label="Tags with ','"
                                            value={tagsStr}
                                            onChange={(e) => setTagsStr(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-4'>Moderator Infomation</p>
                                <div className='flex gap-4'>
                                    <div className='space-y-4'>
                                        <div className='flex flex-col w-32 h-32 bg-white/10 shadow-sm border border-gray-500 rounded-[16px]'>
                                            <label className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                                                {
                                                    avatarPreviewImgUrl ?
                                                        <Image
                                                            src={avatarPreviewImgUrl}
                                                            width={100}
                                                            height={100}
                                                            className=' w-full h-full rounded-2xl object-cover'
                                                            alt='uploaded_photo'
                                                        />
                                                        :
                                                        <p className="font-light text-sm text-white text-center">+ Upload Moderator Photo</p>
                                                }
                                                <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files, 'avatar')} accept=".png" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='space-y-4 w-full '>
                                        <Input
                                            type="text"
                                            label="Moderator Name"
                                            value={blogDetails.moderatorInfo.name}
                                            onChange={(e) => setBlogDetails(p => ({ ...p, moderatorInfo: { ...p.moderatorInfo, name: e.target.value } }))}
                                        />
                                        <Input
                                            type="text"
                                            label="Description"
                                            value={blogDetails.moderatorInfo.description}
                                            onChange={(e) => setBlogDetails(p => ({ ...p, moderatorInfo: { ...p.moderatorInfo, description: e.target.value } }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {mounted ?
                            <TextEditer
                                value={blogDetails.content}
                                setValue={(value) => setBlogDetails(p => ({ ...p, content: value }))}
                            /> : <></>
                        }
                        <div className='flex justify-end'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg w-40 mb-5"
                                onPress={handleSubmit}
                                isLoading={isActionProcessing}
                            >
                                Post
                            </Button>
                        </div>
                    </>
            }
        </div>
    )
}
;