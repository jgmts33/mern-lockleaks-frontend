import React, { useCallback, useEffect, useState } from 'react'
import {
    Button,
} from '@nextui-org/react';
import { Search, Collobation, RecoveryChat, ArrowRight, Like, Dislike } from "@/components/utils/Icons";
import { useRouter } from 'next/router';
import { getHelpArticle } from '@/axios/help';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { reactToArticle } from '@/axios/help';
import { getUserId } from '../../../axios/token';

export default function Details() {

    const router = useRouter();
    const [isArticleProcessing, setIsArticleProcessing] = useState(false);
    const [userId, setUserId] = useState(null);
    const [articleInfo, setArticleInfo] = useState({
        title: '',
        content: '',
        categoryId: null,
        likes: [],
        dislikes: []
    })

    const icons = {
        search: <Search />,
        collobation: <Collobation />,
        chat: <RecoveryChat />,
        direction: <ArrowRight />,
        like: <Like />,
        dislike: <Dislike />
    };

    const handleReactArticle = useCallback(async (react) => {


        if (!router.query.title?.split("-").length || !userId || articleInfo.likes.find(p => p == userId) || articleInfo.dislikes.find(p => p == userId)) return;

        const res = await reactToArticle(router.query.title?.split("-")[router.query.title?.split("-").length - 1], { user_id: userId, react });

        if (res.status == 'success') {
            if (react == 'like') setArticleInfo(p => ({ ...p, likes: [...p.likes, userId] }));
            else setArticleInfo(p => ({ ...p, dislikes: [...p.dislikes, userId] }));
        }

    }, [router.query, userId, articleInfo])

    useEffect(() => {
        (async () => {
            if (router.query.title?.split("-")) {
                const titleWords = router.query.title?.split("").reverse().join("").split("-") || ['0'];
                setIsArticleProcessing(true);
                const res = await getHelpArticle(Number(titleWords[0].split("").reverse().join("")));
                if (res.status == 'success') {
                    setArticleInfo(res.data);
                }
                setIsArticleProcessing(false);
            }
            const user_id = await getUserId();
            setUserId(user_id);
        })();
    }, [router.query]);

    return (
        <div className="text-white relative flex flex-col max-md:px-3 mx-auto container" >

            {/* This section for define Help Page Title*/}

            <div className='mt-10 max-sm:mt-5 max-md:px-3 max-md:text-center'>
                <p className='font-medium text-7xl text-center max-xl:text-5xl'>HELP CENTER</p>
            </div>
            <div className='flex mx-auto justify-center gap-5 w-full mt-10 items-center max-w-[1050px] max-md:flex-col'>
                <div className='w-full'>
                    <input
                        type="text"
                        name="search"
                        placeholder='Type your questions here'
                        className='w-full outline-none p-3 rounded-lg bg-white text-black'
                        required
                    />
                </div>
                <Button
                    radius="lg"
                    size='lg'
                    className="bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-10 py-5 text-lg"
                >
                    <span>Search</span><span>{icons.search}</span>
                </Button>
            </div>
            {
                isArticleProcessing ?
                    <div className='flex mt-10 mx-auto'>
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
                        <div className='flex mx-auto mt-12 max-w-[868px] text-center'>
                            <span className='font-medium text-5xl max-xl:text-4xl'>{articleInfo.title}</span>
                        </div>
                        <div className='max-w-[1242px] mx-auto mt-8 max-md:mt-5'>
                            <div className='ql-editor' >
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleInfo.content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }} />
                            </div>
                        </div>
                        {userId ? <div className='max-w-[432px] mx-auto mt-20 mb-20 max-sm:mt-10'>
                            <div className='flex'><span className='font-medium text-3xl text-center'>Was the article helpful?</span></div>
                            <div className='flex justify-around mt-5'>
                                <Button
                                    radius="lg"
                                    className="bg-gradient-to-tr mx-auto from-[#c775e0] to-[#c233af] border-gray-600 border text-white shadow-lg "
                                    size='lg'
                                    onPress={() => handleReactArticle('like')}
                                >
                                    <span>Yes</span>
                                    <span>{icons.like}</span>
                                    <span>{articleInfo.likes?.length || ''}</span>
                                </Button>
                                <Button
                                    radius="lg"
                                    className="from-gray-800 to-gray-900 border border-gray-950 mx-auto px-7 py-5 text-lg text-white shadow-lg"
                                    size='lg'
                                    onPress={() => handleReactArticle('dislike')}
                                >
                                    <span>No</span>
                                    <span>{icons.dislike}</span>
                                    <span>{articleInfo.dislikes?.length || ''}</span>
                                </Button>
                            </div>
                        </div> : <></>}
                    </>
            }

        </div>
    )
}
