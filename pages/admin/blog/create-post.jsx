"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input,
    Spinner
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
                    <div class="w-full justify-center flex mt-6">
                        <Spinner />
                    </div>
                    :
                    <>
                        <div className='grid grid-cols-2 max-md:grid-cols-1 w-full gap-6 items-end'>
                            <div>
                                <p className='mb-4'>Blog Details</p>
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