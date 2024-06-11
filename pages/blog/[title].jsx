"use client";
import React from 'react'
import Image from 'next/image';
import {
    Button
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ChevronRight, Eye } from "@/components/utils/Icons";
import RobertHand from '@/public/assets/copyright/robert-hand.svg';
import { useRouter } from 'next/router';
import { getBlogDetailsWithViews, getSimilarBlogs } from '@/axios/blog';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import moment from 'moment/moment';

export default function Blog() {

    const router = useRouter();
    const [bannerPreviewImgUrl, setBannerPreviewImgUrl] = useState('');
    const [avatarPreviewImgUrl, setAvatarPreviewImgUrl] = useState('');
    const [similarBlogs, setSimilarBlogs] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
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
        views: 0,
        tags: [],
        createdAt: new Date()
    });

    useEffect(() => {

        (async () => {

            if (router.query.title?.split("-")) {
                const titleWords = router.query.title?.split("").reverse().join("").split("-") || ['0'];
                console.log("titleWords:", titleWords);
                setIsProcessing(true);
                const res = await getBlogDetailsWithViews(Number(titleWords[0].split("").reverse().join("")));
                if (res.status == 'success') {
                    const similarBlogsRes = await getSimilarBlogs(res.data.id, res.data.tags);
                    setBannerPreviewImgUrl(`https://server.lockleaks.com/images?filename=${res.data.banner}`);
                    setAvatarPreviewImgUrl(`https://server.lockleaks.com/images?filename=${res.data.moderatorInfo.avatar}`);
                    setBlogDetails({
                        ...res.data,
                        banner: null,
                        moderatorInfo: {
                            ...res.data.moderatorInfo,
                            avatar: null,
                        }
                    });
                    setSimilarBlogs(similarBlogsRes.data);
                }

                setIsProcessing(false);
            }
        })();
    }, [router.query]);

    const icons = {
        right: <ChevronRight />,
        eye: <Eye />,
    };

    return (
        <>
            {
                isProcessing ?
                    <div className='w-full flex justify-center mt-10 min-h-[calc(100vh-600px)] items-center'>
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
                        <div className="text-white relative flex flex-col mx-auto w-full px-3 container">
                            <div className='w-full h-[400px] relative flex items-center justify-center gap-4'>
                                <Image src={bannerPreviewImgUrl} width={1300} height={400} alt="Service" className='object-cover w-full h-full absolute bg-slate-400' />
                                <div className='flex gap-2 relative z-10 backdrop-blur-2xl bg-gray-800/30 p-4 rounded-lg'>
                                    <Image width={40} height={40} className="h-10 w-10 rounded-md" src={avatarPreviewImgUrl} alt="Modern building architecture" />
                                    <div className='flex flex-col'>
                                        <span className='font-light text-sm justify-start'>{blogDetails.moderatorInfo.name}</span>
                                        <span className='font-light text-xs'>{blogDetails.moderatorInfo.description}</span>
                                    </div>
                                </div>

                                <div className="flex gap-1 items-center relative z-10 backdrop-blur-2xl bg-gray-800/30 px-2 py-1 text-sm rounded-lg">
                                    <span>{blogDetails.views}</span><span> {icons.eye}</span>
                                </div>

                                <div className="flex gap-1 items-center relative z-10 backdrop-blur-2xl bg-gray-800/30 px-2 py-1 text-sm rounded-lg">
                                    {moment(new Date(blogDetails.createdAt)).format("MMM DD, YYYY")}
                                </div>
                            </div>
                            <div className='flex justify-start mt-5 gap-5 z-10'>
                                <Button
                                    radius="full"
                                    className="bg-gradient-to-tr flex items-center from-gray-800/80 to-gray-800/40  border-gray-600 border text-white shadow-lg max-md:text-[15px] px-6"
                                    size='sm'
                                    onPress={() => router.push("/")}
                                >
                                    <span className='text-sm'>Lock Leaks</span><span> {icons.right}</span>
                                </Button>
                                <Button
                                    radius="full"
                                    className="bg-gradient-to-tr flex items-center from-gray-800/80 to-gray-800/40 text-white shadow-lg max-md:text-[15px] px-6"
                                    size='sm'
                                    onPress={() => router.push("/blog")}
                                >
                                    <span className='text-sm'>Blog</span><span> {icons.right}</span>
                                </Button>
                                <Button
                                    radius="full"
                                    className="bg-gradient-to-tr flex items-center from-[#c775e0] to-[#c233af] border-gray-600 text-white shadow-lg max-md:text-[13px] px-6 max-sm:hidden"
                                    size='sm'
                                >
                                    <span className='text-sm'>{blogDetails.title}</span><span> {icons.right}</span>
                                </Button>
                            </div>
                            {/* This section for define Blog Format Page Header*/}

                            <div className='mt-10 flex gap-2 divide-x-1 max-sm:divide-x-0 container mx-auto max-sm:flex-col'>
                                <div className='flex flex-col p-6 max-sm:p-2 relative flex-1 max-sm:order-2'>
                                    <span className='max-xl:text-center font-medium text-5xl mx-auto'>{blogDetails.title}</span>
                                    <div className='mt-5 overflow-y-auto ql-editor' >
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails.content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }} />
                                    </div>
                                </div>
                                <div className='w-[320px] p-4 max-sm:order-1 max-sm:w-full'>
                                    <div className='flex gap-x-4 gap-y-2 flex-wrap'>
                                        {
                                            blogDetails.tags.map((item) => <div
                                                key={item}
                                                className=' backdrop-blur-2xl bg-gray-800 px-2 py-1 text-sm rounded-lg'
                                            >
                                                <p>{item}</p>
                                            </div>)
                                        }
                                    </div>
                                    <div className='flex flex-col w-full mt-6 gap-5 max-md:mx-auto divide-y-1' >
                                        {
                                            similarBlogs.map((item, index) => {
                                                return (
                                                    <div key={index}
                                                        className="w-full"
                                                        onClick={() => router.push(`/blog/format?id=${item.id}`)}
                                                    >
                                                        <div className="flex flex-col py-3 gap-2">
                                                            <Image
                                                                width={400}
                                                                height={128}
                                                                className="h-32 w-full rounded object-cover"
                                                                src={`https://server.lockleaks.com/images?filename=${item.banner}`}
                                                                alt="Modern building architecture"
                                                            />
                                                            <div className='flex gap-2'>
                                                                <Image
                                                                    width={32}
                                                                    height={32}
                                                                    className="h-8 w-8"
                                                                    src={`https://server.lockleaks.com/images?filename=${item.moderatorInfo.avatar}`}
                                                                    alt="Modern building architecture"
                                                                />
                                                                <div className='flex flex-col'>
                                                                    <span className='font-light text-sm justify-start'>{item.moderatorInfo.name}</span>
                                                                    <span className='font-light text-xs'>{item.moderatorInfo.description}</span>
                                                                </div>
                                                            </div>
                                                            <p className="font-semibold text-sm">{item.title}</p>
                                                            <p className="text-[10px]">{item.shortContent}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* This section for define Blog Format Page Cards*/}

                            {/* <div className='w-full flex mx-auto gap-10 max-lg:flex-col max-xl:flex-col max-md:px-3 relative'>
                                <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={160} height={180} className='max-md:hidden absolute -top-56 left-96 bg-[#532a88] bg-opacity-30 blur-3xl z-0' />
                                {similarBlogs.length ? <Image src="/assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-32 right-44 bg-[#532a88] bg-opacity-30 blur-3xl z-0' /> : <></>}
                                <div className='flex flex-col top-24 w-full mt-16 gap-10 max-md:mx-auto z-10' >
                                    {
                                        similarBlogs.slice(0, 2).map((item, index) => {
                                            return (
                                                <div key={index}
                                                    className="bg-gradient-to-br w-full max-md:max-w-[600px] max-xl:max-w-[1000px] max-lg:max-w-[750px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md hover:cursor-pointer hover:opacity-80"
                                                    onClick={() => router.push(`/blog/format?id=${item.id}`)}
                                                >
                                                    <div className="flex max-sm:flex-col">
                                                        <div className="p-3 flex flex-col max-sm:w-full w-1/2">
                                                            <img className="h-80 w-full mt-2 p-2 rounded-3xl" src={`https://server.lockleaks.com/images?filename=${item.banner}`} alt="Modern building architecture" />
                                                            <div className='flex gap-2 mt-5 ml-3'>
                                                                <img className="h-8 w-8" src={`https://server.lockleaks.com/images?filename=${item.moderatorInfo.avatar}`} alt="Modern building architecture" />
                                                                <div className='flex flex-col'>
                                                                    <span className='font-light text-sm justify-start'>{item.moderatorInfo.name}</span>
                                                                    <span className='font-light text-xs'>{item.moderatorInfo.description}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=" p-5 max-sm:w-full w-1/2 pt-8">
                                                            <p className="font-semibold text-xl">{item.title}</p>
                                                            <p className="font-normal text-base mt-5">{item.shortContent}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex flex-col w-full gap-10 max-xl:mt-8 max-md:mx-auto max-md:px-3 mb-10 z-10'>
                                    {
                                        similarBlogs.slice(2, 4).map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-br w-full max-md:max-w-[700px] max-xl:max-w-[1000px] from-gray-600/40 to-gray-800/40 border border-gray-600 mx-auto rounded-xl shadow-md hover:cursor-pointer hover:opacity-80"
                                                    onClick={() => router.push(`/blog/format?id=${item.id}`)}
                                                >
                                                    <div className="flex max-sm:flex-col">
                                                        <div className="max-sm:w-full p-3 flex flex-col w-1/2">
                                                            <img className="h-80 w-full mt-2 p-2 rounded-3xl" src={`https://server.lockleaks.com/images?filename=${item.banner}`} alt="Modern building architecture" />
                                                            <div className='flex gap-2 mt-5 ml-3'>
                                                                <img className="h-8 w-8" src={`https://server.lockleaks.com/images?filename=${item.moderatorInfo.avatar}`} alt="Modern building architecture" />
                                                                <div className='flex flex-col'>
                                                                    <span className='font-light text-sm justify-start'>{item.moderatorInfo.name}</span>
                                                                    <span className='font-light text-xs'>{item.moderatorInfo.description}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-5 shrink-0 max-sm:w-full w-1/2 pt-8">
                                                            <p className="font-semibold text-xl">{item.title}</p>
                                                            <p className="font-normal text-base mt-5">{item.shortContent}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> */}
                        </div>
                    </>
            }

        </>
    )
}
