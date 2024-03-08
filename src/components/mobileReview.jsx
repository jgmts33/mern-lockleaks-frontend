import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight, Star } from '../utils/Icons';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function MobileReview() {
    const icons = {
        left: <ChevronLeft fill="currentColor" size={16} />,
        right: <ChevronRight fill="currentColor" size={16} />,
        star: <Star fill="currentColor" size={16} />,
    };

    const [swiperRef, setSwiperRef] = useState(null);

    const customReview = [
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
        { title: "Floyd Miles", subTitle: "Vice President, GoPro", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
    ]

    return (
        <div className='my-20 container relative text-white'>
            <p className='font-medium text-5xl max-xl:text-[40px] max-xl:text-center'>Customer Reviews</p>
            <div className="mt-16 relative">
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
                    style={{ width: "calc(100% - 160px)" }}
                >
                    {customReview.map((item, index) => <SwiperSlide key={index}><div className="mx-auto text-left w-full max-w-[570px] flex flex-wrap outline-none rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 bg-opacity-60 p-10 max-sm:p-4 cursor-pointer">
                        <div className='ml-3 mt-2 flex items-center gap-4 w-full'>
                            <img src="assets/floyed.svg" />
                            <div>
                                <p className='font-semibold text-xl bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{item.title}</p>
                                <p className='font-light text-xs opacity-80'>{item.subTitle}</p>
                                <div className='flex'>
                                    <span>{icons.star}</span>
                                    <span>{icons.star}</span>
                                    <span>{icons.star}</span>
                                    <span>{icons.star}</span>
                                    <span>{icons.star}</span>
                                </div>
                            </div>
                            <span>{icons.twitter}</span>
                        </div>
                        <p className='text-base font-normal opacity-80 pt-4'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div></SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    )
}