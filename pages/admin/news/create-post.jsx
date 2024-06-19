"use client";
import {
    Button, Input,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import dynamic from "next/dynamic";
import { createNews, getNewsDetails, updateNews } from '@/axios/news';

const TextEditer = dynamic(() => import("@/components/text-editor"), {
    ssr: false,
});

export default function CreatePost() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionProcessing, setActionIsProcessing] = useState(false);

    const [newsDetails, setNewsDetails] = useState({
        title: "",
        content: ""
    });

    const handleSubmit = useCallback(async () => {
        setActionIsProcessing(true);

        if (searchParams.get('id')) {
            const res = await updateNews(searchParams.get('id'), newsDetails);

            if (res.status == 'success') router.push("/admin/news")
            else {
                console.log("Error:", res.data);
            }
        } else {
            const res = await createNews(newsDetails);

            if (res.status == 'success') router.push("/admin/news")
            else {
                console.log("Error:", res.data);
            }
        }
        setActionIsProcessing(false);

    }, [newsDetails, searchParams.get('id')]);

    useEffect(() => {
        setMounted(true);
        console.log(router);
        (async () => {
            setIsProcessing(true);
            if (searchParams.get('id')) {
                const res = await getNewsDetails(searchParams.get('id'));
                if (res.status == 'success') {
                    setNewsDetails(res.data);
                }
            }
            setIsProcessing(false);
        })();
    }, []);

    return (
        <div className='flex flex-col bg-gradient-to-tr px-5 space-y-6 text-white w-full'>
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>NEWSLETTER</span>
            </div>
            <div className='flex justify-end mt-10'>
                <Button radius="lg" className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md' onClick={() => router.push("/admin/news")}>
                    Back
                </Button>
            </div>
            {
                isProcessing ?
                    <div class="w-full justify-center flex mt-6">
                        <Spinner />
                    </div>
                    :
                    <div className='space-y-6'>
                        <div className='w-full'>
                            <Input
                                type="text"
                                label="Title"
                                value={newsDetails.title}
                                onChange={(e) => setNewsDetails(p => ({ ...p, title: e.target.value }))}
                            />
                        </div>
                        {mounted ?
                            <TextEditer
                                value={newsDetails.content}
                                setValue={(value) => setNewsDetails(p => ({ ...p, content: value }))}
                            />
                            : <></>
                        }
                        <div className='flex justify-end'>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 text-lg w-40 mb-5"
                                onPress={handleSubmit}
                                isLoading={isActionProcessing}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
            }
        </div>
    )
}
;