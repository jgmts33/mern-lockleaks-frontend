"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input,
    Switch
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import dynamic from "next/dynamic";
import { getCustomerReviewDetails, createNewCustomerReview, updateNewCustomerReview, } from '../../../axios/customer-review';
import { DiscordAlt, FacebookAlt, InstagramAlt, RedditAlt, SelectSwitch, TelegramAlt, TiktokAlt, TwitterXAlt, UnselectSwitch } from '../../../components/utils/Icons';

const TextEditer = dynamic(() => import("../../../components/text-editor"), {
    ssr: false,
});

export default function CreatePost() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const icons = {
        telegram: <TelegramAlt fill="currentColor" size={16} />,
        discord: <DiscordAlt fill="currentColor" size={16} />,
        tiktok: <TiktokAlt fill="currentColor" size={16} />,
        instagram: <InstagramAlt fill="currentColor" size={16} />,
        twitter: <TwitterXAlt fill="currentColor" size={16} />,
        facebook: <FacebookAlt fill="currentColor" size={16} />,
        reddit: <RedditAlt fill="currentColor" size={16} />,
    };

    const [referLinkEnable, setReferLinkEnable] = useState(false);
    const [avatarPreviewImgUrl, setAvatarPreviewImgUrl] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionProcessing, setActionIsProcessing] = useState(false);

    const [customerReviewDetails, setCustomerReviewDetails] = useState({
        name: "",
        title: "",
        avatar: null,
        content: "",
        refer_link: "",
        discord: "",
        tiktok: "",
        telegram: "",
        twitter: "",
        facebook: "",
        instagram: "",
        reddit: ""
    });

    const handleImageUpload = (files) => {
        if (!files.length) return;
        console.log(files[0]);
        setAvatarPreviewImgUrl(URL.createObjectURL(files[0]));
        setCustomerReviewDetails(p => ({ ...p, avatar: files[0] }))
    }

    const handleSubmit = useCallback(async () => {
        if (!customerReviewDetails.avatar && !searchParams.get('id')) return;
        setActionIsProcessing(true);
        const formData = new FormData();
        formData.append('name', customerReviewDetails.name);
        formData.append('title', customerReviewDetails.title);
        formData.append('content', customerReviewDetails.content);
        formData.append('avatar', customerReviewDetails.avatar);
        formData.append('refer_link', customerReviewDetails.refer_link);
        formData.append('discord', customerReviewDetails.discord);
        formData.append('tiktok', customerReviewDetails.tiktok);
        formData.append('telegram', customerReviewDetails.telegram);
        formData.append('twitter', customerReviewDetails.twitter);
        formData.append('facebook', customerReviewDetails.facebook);
        formData.append('instagram', customerReviewDetails.instagram);
        formData.append('reddit', customerReviewDetails.reddit);

        if (searchParams.get('id')) {
            const res = await updateNewCustomerReview(searchParams.get('id'), formData);

            if (res.status == 'success') router.push("/admin/review")
            else {
                console.log("Error:", res.data);
            }
        } else {
            const res = await createNewCustomerReview(formData);

            if (res.status == 'success') router.push("/admin/review")
            else {
                console.log("Error:", res.data);
            }
        }
        setActionIsProcessing(false);

    }, [customerReviewDetails, searchParams.get('id')]);

    useEffect(() => {
        (async () => {
            setIsProcessing(true);
            if (searchParams.get('id')) {
                const res = await getCustomerReviewDetails(searchParams.get('id'));
                setAvatarPreviewImgUrl(`https://server.lockleaks.com/images?filename=${res.data.avatar}`);
                setReferLinkEnable(!!res.data.refer_link);
                setCustomerReviewDetails({
                    ...res.data,
                    avatar: null
                });
            }
            setIsProcessing(false);
        })();
    }, []);

    return (
        <div className='flex flex-col bg-gradient-to-tr px-5 space-y-6 text-white w-full'>
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>Embeded Customer Reviews</span>
            </div>
            <div className='flex justify-end mt-10'>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => router.push("/admin/review")}>
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
                        <div className='grid grid-cols-2 max-md:grid-cols-1 w-full gap-6 items-start'>
                            <div className="flex flex-col max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] p-8 pb-10">
                                <p className='mb-4'>Customer Review Details</p>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-4'>
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
                                                        <p className="font-light text-sm text-white">+ Upload Photo</p>
                                                }
                                                <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files)} accept=".png" />
                                            </label>
                                        </div>
                                        <div className='space-y-4 flex-1'>
                                            <Input
                                                type="text"
                                                label="Name"
                                                value={customerReviewDetails.name}
                                                onChange={(e) => setCustomerReviewDetails(p => ({ ...p, name: e.target.value }))}
                                            />
                                            <Input
                                                type="text"
                                                label="Title"
                                                value={customerReviewDetails.title}
                                                onChange={(e) => setCustomerReviewDetails(p => ({ ...p, title: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex gap-4 items-center mt-4'>
                                        <p>Enable Refer Link</p>
                                        <Switch
                                            size="lg"
                                            color="default"
                                            onValueChange={(value) => {
                                                setReferLinkEnable(value);
                                                setCustomerReviewDetails(p => ({ ...p, refer_link: '' }))
                                            }}
                                            thumbIcon={({ isSelected, className }) =>
                                                isSelected ? (
                                                    <SelectSwitch className={className} />
                                                ) : (
                                                    <UnselectSwitch className={className} />
                                                )
                                            }
                                            isSelected={referLinkEnable}
                                        />
                                    </div>
                                    {
                                        referLinkEnable ? <Input
                                            type="text"
                                            label="Refer link"
                                            value={customerReviewDetails.refer_link}
                                            onChange={(e) => setCustomerReviewDetails(p => ({ ...p, refer_link: e.target.value }))}
                                        /> : <></>
                                    }
                                    <textarea
                                        className='bg-white/15 rounded-lg mt-3 h-[196px] p-2'
                                        placeholder='Customer talk here...'
                                        value={customerReviewDetails.content}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, content: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] p-8 pb-10">
                                <p className='mb-4'>Social Profile Links</p>
                                <div className='space-y-4'>
                                    <Input
                                        type="text"
                                        label="Telegram"
                                        value={customerReviewDetails.telegram}
                                        startContent={<span>{icons.telegram}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, telegram: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Discord"
                                        value={customerReviewDetails.discord}
                                        startContent={<span>{icons.discord}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, discord: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Tiktok"
                                        value={customerReviewDetails.tiktok}
                                        startContent={<span>{icons.tiktok}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, tiktok: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Instagram"
                                        value={customerReviewDetails.instagram}
                                        startContent={<span>{icons.instagram}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, instagram: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Twitter"
                                        value={customerReviewDetails.twitter}
                                        startContent={<span>{icons.twitter}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, twitter: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Facebook"
                                        value={customerReviewDetails.facebook}
                                        startContent={<span>{icons.facebook}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, facebook: e.target.value }))}
                                    />
                                    <Input
                                        type="text"
                                        label="Reddit"
                                        value={customerReviewDetails.reddit}
                                        startContent={<span>{icons.reddit}</span>}
                                        onChange={(e) => setCustomerReviewDetails(p => ({ ...p, reddit: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg w-40 mb-5"
                                onPress={handleSubmit}
                                isLoading={isActionProcessing}
                            >
                                {searchParams.get("id") ? "Update" : "Create"}
                            </Button>
                        </div>
                    </>
            }
        </div >
    )
}
;