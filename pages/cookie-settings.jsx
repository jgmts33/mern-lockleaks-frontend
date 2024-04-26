"use client";
import Image from 'next/image';
import {
    Button, Switch
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { SelectSwitch, UnselectSwitch } from "@/components/utils/Icons";

export default function CookieSettigs() {

    const [isselected, setSelectBtn] = useState(1);

    const cookieSettingContent = [
        {
            placeholder: "Strictly necessary"
        },
        {
            placeholder: "Perfomance Cookies"
        },
        {
            placeholder: "Functional Cookies"
        },
        {
            placeholder: "Targeting Cookies"
        },
    ]

    const cookieSettingButtons = [
        "Confirm Selection",
        "Accept All",
        "Cancel"
    ]

    return (
        <div className="flex flex-col text-white w-full max-xl:px-3">
            <div className='flex flex-col mt-10 max-sm:mt-5 bg-transparent bg-opacity-20 shadow-sm shadow-gray-50 border border-gray-500 p-5 mb-20 rounded-[20px] max-w-[1400px] mx-auto cursor-pointer'>

                {/* This section for define cookie settings header*/}

                <div className="gap-10 max-w-[1480px] mx-auto max-xl:px-3">
                    <p className="font-bold text-7xl text-center max-xl:text-[40px]">COOKIE SETTINGS</p>
                    <p className='mt-5 p-3'>When you visit any of our websites, it may store or retrieve information on your browser, mostly in the form of cookies.  This information might be about you, your device and  is mostly used to make the site work as you exept it to. The informstion does not ussually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and manage your preferences. Please note, blocking some types of cookies may impact your experience of the site and the services we are able to offer.</p>
                </div>

                {/* This section for define cookie settings content*/}

                <div className='flex flex-col max-w-[337px] mx-auto mb-10'>
                    {
                        cookieSettingContent.map((content, index) => {
                            return (
                                <div key={index} className='flex'>
                                    <div className='mt-7'>
                                        <Switch
                                            defaultSelected
                                            size="md"
                                            color="default"
                                            thumbIcon={({ isSelected, className }) =>
                                                isSelected ? (
                                                    <SelectSwitch className={className} />
                                                ) : (
                                                    <UnselectSwitch className={className} />
                                                )
                                            }
                                        >
                                        </Switch>
                                    </div>
                                    <div>
                                        <select className="form-select bg-transparent text-white p-3 rounded-lg mt-5 block w-full">
                                            <option>{content.placeholder}</option>
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='max-lg:px-3'>
                    <div className='bg-gradient-to-tr mx-auto mb-10 from-gray-600/40 to-gray-800/40 p-2 border-gray-600 border rounded-[30px] w-full max-w-[890px] flex items-center max-xl:flex-col max-xl:px-3 max-xl:max-w-[750px]'>
                        {
                            cookieSettingButtons.map((items,index) => {
                                return (
                                    <Button key={index} radius="full" className={isselected == index ? "mx-auto w-1/3 max-xl:w-full bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-7 text-lg" : "mx-auto w-1/3 max-xl:w-full bg-transparent text-white shadow-lg px-7 py-7 text-lg"} size='lg' onClick={()=>setSelectBtn(index)}>
                                        {items}
                                    </Button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
