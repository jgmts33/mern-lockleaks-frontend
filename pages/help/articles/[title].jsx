import React, { useCallback, useEffect, useState } from 'react'
import {
    Button,
    Spinner,
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
                        <Spinner />
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
