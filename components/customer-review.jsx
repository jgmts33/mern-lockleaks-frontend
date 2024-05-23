import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight, DiscordAlt, FacebookAlt, InstagramAlt, RedditAlt, Star, TelegramAlt, TiktokAlt, TwitterXAlt } from './utils/Icons';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import Link from 'next/link';
import { getCustomerReviews } from '../axios/customer-review';

export default function CustomerReview() {

    const icons = {
        left: <ChevronLeft fill="currentColor" size={16} />,
        right: <ChevronRight fill="currentColor" size={16} />,
        star: <Star fill="currentColor" size={16} />,
        telegram: <TelegramAlt fill="currentColor" size={16} />,
        discord: <DiscordAlt fill="currentColor" size={16} />,
        tiktok: <TiktokAlt fill="currentColor" size={16} />,
        instagram: <InstagramAlt fill="currentColor" size={16} />,
        twitter: <TwitterXAlt fill="currentColor" size={16} />,
        facebook: <FacebookAlt fill="currentColor" size={16} />,
        reddit: <RedditAlt fill="currentColor" size={16} />,
    };

    const [swiperRef, setSwiperRef] = useState(null);
    const [list, setList] = useState([]);

    const customReview = [
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    ]

    const getCustomerRewviewsInfo = async () => {
        const res = await getCustomerReviews();

        if (res.status == 'success') {
            setList(res.data);
        }
    }

    useEffect(() => {
        getCustomerRewviewsInfo();
    }, []);

    return (
        <div className='container relative text-white max-md:max-w-[650px] mx-auto w-[calc(100vw-50px)] mt-10 max-sm:mt-20 mb-5 px-2'>
            <p className='font-medium text-5xl max-xl:text-[30px] max-xl:text-center'>Customer Reviews</p>
            <div className="mt-10 relative">
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={3}
                    centeredSlides={true}
                    spaceBetween={10}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={{
                        nextEl: ".swiper-custom-next",
                        prevEl: ".swiper-custom-prev"
                    }}
                    loop={true}
                    modules={[Navigation]}
                    breakpoints={{
                        1420: {
                            slidesPerView: 3,
                        },
                        900: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    }}
                    initialSlide={2}
                    style={{ width: "calc(100% - 110px)" }}
                >
                    {list.map((item, index) => <SwiperSlide key={index}>
                        <div
                            className={"mx-auto text-left w-full rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 p-10 max max-sm:p-4 cursor-pointer hover:opacity-90 duration-300"}
                            onClick={() => {
                                if (item.refer_link) window.open(item.refer_link, '_blank');
                            }}
                        >
                            <div className='ml-3 mt-2 max-sm:flex-col max-sm:mx-auto  flex items-center gap-4 w-full'>
                                <Image src={`https://server.lockleaks.com/images?filename=${item.avatar}`} alt='floyed' width={61} height={61} className='rounded-full' />
                                <div className='space-y-3'>
                                    <p className='font-semibold text-xl bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent max-sm:text-center'>{item.name}</p>
                                    <p className='font-light text-xs opacity-80 max-sm:text-center'>{item.title}</p>
                                </div>
                            </div>
                            <div className='flex gap-4 mt-4 max-sm:justify-center'>
                                {
                                    item.telegram ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.telegram}`, '_blank');
                                        }}>
                                            {icons.telegram}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.discord ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.discord}`, '_blank');
                                        }}>
                                            {icons.discord}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.tiktok ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.tiktok}`, '_blank');
                                        }}>
                                            {icons.tiktok}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.instagram ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.instagram}`, '_blank');
                                        }}>
                                            {icons.instagram}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.twitter ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.twitter}`, '_blank');
                                        }}>
                                            {icons.twitter}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.facebook ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.facebook}`, '_blank');
                                        }}>
                                            {icons.facebook}
                                        </span>
                                        : <></>
                                }
                                {
                                    item.reddit ?
                                        <span className='hover:bg-black bg-transparent rounded-full p-1' onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://${item.reddit}`, '_blank');
                                        }}>
                                            {icons.reddit}
                                        </span>
                                        : <></>
                                }
                            </div>
                            <p className='text-base font-normal opacity-80 pt-4'>{item.content}</p>
                        </div></SwiperSlide>)}
                </Swiper>
            </div>
            <button className="swiper-custom-prev bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] bg-opacity-20 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg absolute z-10 bottom-[calc(50%-80px)] left-2">
                {icons.left}
            </button>
            <button className="swiper-custom-next bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] bg-opacity-20 text-white shadow-full w-10 h-10 flex items-center justify-center rounded-lg  absolute z-10 bottom-[calc(50%-80px)] right-2">
                {icons.right}
            </button>
        </div>
    )
}
