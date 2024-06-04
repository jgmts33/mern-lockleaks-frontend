"use client";
import {
    Button, Switch
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { SelectSwitch, UnselectSwitch } from "./utils/Icons";
import { getCookieValue } from '@/axios/token';

export const COOKIE_SETTING_OPTIONS = [
    {
        placeholder: "Strictly necessary",
        name: "necessary",
        selected: false
    },
    {
        placeholder: "Perfomance Cookies",
        name: "performance",
        selected: false
    },
    {
        placeholder: "Functional Cookies",
        name: "functional",
        selected: false
    },
    {
        placeholder: "Targeting Cookies",
        name: "targeting",
        selected: false
    },
]

export default function CookieSettigs({ onClose, onAccept }) {

    const [selectBtn, setSelectBtn] = useState(0);

    const [cookieSettingContent, setCookieSettingContent] = useState(COOKIE_SETTING_OPTIONS);

    const cookieSettingButtons = [
        "Confirm Selection",
        "Accept All",
        "Cancel"
    ]

    useEffect(() => {

        let selectedCounts = 0, isEverSet = false;
        for (let cookie of cookieSettingContent) {
            const cookieValue = getCookieValue(cookie.name);
            if (cookieValue == 'allowed') {
                let _cookieSettingContent = cookieSettingContent.slice(0);
                _cookieSettingContent.find(c => c.name === cookie.name).selected = true;
                setCookieSettingContent(_cookieSettingContent);
                selectedCounts++;
                isEverSet = true;
            } else if (cookieValue == 'un-allowed') {
                let _cookieSettingContent = cookieSettingContent.slice(0);
                _cookieSettingContent.find(c => c.name === cookie.name).selected = false;
                setCookieSettingContent(_cookieSettingContent);
                isEverSet = true;
            }
        }
        if (selectedCounts == 4) setSelectBtn(1);
        if (!isEverSet) {
            setCookieSettingContent(prev => {
                const data = prev.map(item => {
                    return { ...item, selected: true }
                });

                return data;
            })
            setSelectBtn(1);
        }
    }, []);

    const handleClickConfirm = useCallback((allAccpet = false) => {
        console.log("cookieSettingContent:", cookieSettingContent, allAccpet);
        const expires = new Date('2030-12-30').toUTCString();
        let _cookieSettingContent = cookieSettingContent.slice(0);
        for (let index = 0; index < _cookieSettingContent.length; index++) {
            let cookieValue = 'un-allowed';
            if (allAccpet) _cookieSettingContent[index].selected = true;
            if (_cookieSettingContent[index].selected) cookieValue = 'allowed';
            document.cookie = `${_cookieSettingContent[index].name}=${cookieValue}; expires=${expires}; path=/`;
        }
        setCookieSettingContent(_cookieSettingContent);
        onAccept();

    }, [cookieSettingContent]);

    return (
        <div className='flex flex-col pt-8'>

            {/* This section for define cookie settings header*/}

            <div className="gap-10 max-w-[1480px] mx-auto max-xl:px-3">
                <p className="font-bold text-5xl text-center max-xl:text-[40px]">COOKIE SETTINGS</p>
                <p className='mt-5 p-3'>When you visit any of our websites, it may store or retrieve information on your browser, mostly in the form of cookies.  This information might be about you, your device and  is mostly used to make the site work as you exept it to. The informstion does not ussually directly identify you, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and manage your preferences. Please note, blocking some types of cookies may impact your experience of the site and the services we are able to offer.</p>
            </div>

            {/* This section for define cookie settings content*/}

            <div className='flex flex-col max-w-[337px] mx-auto mb-10'>
                {
                    cookieSettingContent.map((content, index) => <div key={index} className='flex'>
                        <div className='mt-7'>
                            <Switch
                                size="md"
                                color="default"
                                thumbIcon={({ isSelected, className }) =>
                                    isSelected ? (
                                        <SelectSwitch className={className} />
                                    ) : (
                                        <UnselectSwitch className={className} />
                                    )
                                }
                                isSelected={content.selected}
                                onValueChange={(value) => {
                                    setCookieSettingContent(prev => {
                                        const data = prev.map(item => {
                                            if (item.name === content.name) {
                                                return { ...item, selected: value }
                                            }
                                            return item
                                        });
                                        const counts = data.filter((item) => item.selected == true).length;
                                        if (counts == 4) {
                                            setSelectBtn(1);
                                        } else {
                                            setSelectBtn(0);
                                        }
                                        return data;
                                    });
                                }}
                            >
                            </Switch>
                        </div>
                        <div className="bg-transparent text-white p-3 rounded-lg mt-4 block w-full text-left">
                            <p>{content.placeholder}</p>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className='max-lg:px-3'>
                <div className='bg-gradient-to-tr mx-auto mb-10 from-gray-600/40 to-gray-800/40 p-2 border-gray-600 border rounded-[30px] w-full max-w-[890px] flex items-center max-xl:flex-col max-xl:px-3 max-xl:max-w-[750px]'>
                    {
                        cookieSettingButtons.map((items, index) => {
                            return (
                                <Button
                                    key={index}
                                    radius="full"
                                    className={selectBtn == index ? "mx-auto w-1/3 max-xl:w-full bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg px-7 py-7 text-lg" : "mx-auto w-1/3 max-xl:w-full bg-transparent text-white shadow-lg px-7 py-7 text-lg"} size='lg'
                                    onClick={() => {
                                        if (index != 2) handleClickConfirm(!!index);
                                        onClose();
                                    }}
                                >
                                    <span>{items}</span>
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
