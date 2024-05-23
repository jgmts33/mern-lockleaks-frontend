"use client";
import Image from 'next/image';
import {
    Button, Link, Progress
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React, { useCallback, useState } from 'react';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';

export default function SMsubmit() {

    const userInfo = useSelector(info);

    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [selectedSocialMedia, setSelectedSocialMedia] = useState('facebook');
    const [warning, setWarning] = useState('');
    const [linksStr, setLinksStr] = useState('');
    const [data, setData] = useState([{
        social: 'facebook',
        links: []
    }]);

    const icons = {
        components: <Components fill="currentColor" size={16} />,
        SMfacebook: <SMfacebook fill="currentColor" size={16} />,
        SMinstagram: <SMinstagram fill="currentColor" size={16} />,
        SMtwitter: <SMtwitter fill="currentColor" size={16} />,
        SMtelegram: <SMtelegram fill="currentColor" size={16} />,
        SMreddit: <SMreddit fill="currentColor" size={16} />,
    };

    const SOcialMediaButtons = [
        {
            icon: icons.SMfacebook,
            value: 'facebook',
        }, {
            icon: icons.SMinstagram,
            value: 'instagram',
        }, {
            icon: icons.SMtwitter,
            value: 'twitter',
        }, {
            icon: icons.SMtelegram,
            value: 'telegram',
        }, {
            icon: icons.SMreddit,
            value: 'reddit',
        }
    ]

    const checkLinkValidation = (url) => {
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(url)) {
            return false;
        }
        return true;
    };

    const handleSubmit = useCallback(() => {
        console.log("data:", data);
    }, [data]);

    return (
        <>
            <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto max-lg:px-3">

                {/* This section for define Social Submit header*/}

                <div className='flex gap-16 items-center max-lg:mx-auto'>
                    <div><span className='font-extrabold text-lg'>SOCIAL MEDIA SUBMIT</span></div>
                </div>
                {/* This section for define Social Submit content*/}

                <div className='grid grid-cols-3 gap-10 max-2xl:gap-2 max-xl:flex-col max-xl:flex max-xl:gap-0'>
                    <div className="flex flex-col items-center justify-center text-center max-w-[462px] max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-8 pb-10 max-sm:mt-5">
                        <p>
                            Requests Are Reviewed,And Government-Issued IDs Are Required For Verification.Without The Upload Of A Government-Issued ID, These Profiles.
                            <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'> Cannot Be Removed</span>
                        </p>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 py-5 text-sm mx-auto mt-7"
                            size='sm'
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="flex flex-col max-w-[462px] max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-8 pb-10 max-sm:mt-5">
                        <div className='flex flex-col'>
                            <span className='font-normal text-base'>Select The Platform Icon Where You Want To Report The Profile.</span>
                            <div className='flex justify-around mt-5 max-lg:justify-between px-2 max-xl:gap-0 max-sm:gap-2'>
                                {
                                    SOcialMediaButtons.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                radius="sm"
                                                size='md'
                                                isIconOnly
                                                className={('bg-transparent p-6 ') + (selectedSocialMedia == item.value ? "bg-gradient-to-tr from-purple-light to-purple-weight" : "")}
                                                onPress={() => {
                                                    setData(pre => {
                                                        let newState = pre.slice(0);
                                                        newState.map((x, index) => {
                                                            if (x.social == selectedSocialMedia) {
                                                                newState[index].links = linksStr.split("\n");
                                                            }
                                                        });
                                                        return newState;
                                                    });
                                                    if (data.find(x => x.social == item.value)) {
                                                        setLinksStr(data.find(x => x.social == item.value).links.join('\n'));
                                                    }
                                                    else setLinksStr('');
                                                    setSelectedSocialMedia(item.value);
                                                }}
                                            >
                                                <span>{item.icon}</span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                            <p className='mt-4 text-sm'>Please type links in the text box below, one link per line.</p>
                            <p>( Max Profiles per day: {userInfo.subscription.features.social_media_profile_submition} ) 
                            <span className='ml-4 bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'> Left: {userInfo.subscription.features.social_media_profile_submition}</span></p>
                            <textarea
                                className='bg-white/15 rounded-lg mt-3 h-32 p-2'
                                placeholder='https://domain.com/@username'
                                value={linksStr}
                                onChange={(e) => {
                                    setWarning("");
                                    const links = e.target.value.split("\n");
                                    if (e.target.value.endsWith('\n')) {
                                        if (!checkLinkValidation(links[links.length - 2])) {
                                            console.log("links[links.length - 1]):", links[links.length - 2]);
                                            setWarning("Please type the correct url format!");
                                            return;
                                        }
                                        if (userInfo.subscription.features.social_media_profile_submition < links.length) return;
                                    }
                                    setLinksStr(e.target.value);
                                }}
                            />
                            <p className='text-red-700 text-sm mt-2'>{warning}</p>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 py-5 text-sm mx-auto mt-7"
                                size='sm'
                                onPress={() => {
                                    setData(pre => {
                                        let newState = pre.slice(0);
                                        newState.map((x, index) => {
                                            if (x.social == selectedSocialMedia) {
                                                newState[index].links = linksStr.split("\n");
                                            }
                                        });
                                        return newState;
                                    });
                                    setLinksStr("");
                                    setSelectedSocialMedia('facebook');
                                    handleSubmit();
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center max-w-[462px] max-xl:max-w-full bg-white/15 border border-gray-500 rounded-[16px] mt-10 p-8 pb-10 max-sm:mt-5">
                        <p className='text-lg'>How Doew It Work?</p>
                        <p className='text-sm mt-4'> Upload your ID card, then select the platform icon. Place the link or links of the profiles you want to report, and press the SUBMIT button.</p>
                    </div>
                </div>

                {/* This section for define Social Media Submit result*/}

                <div className="flex items-center px-20 py-8 justify-between bg-white/15 border border-gray-500 rounded-[16px] mt-10 w-full p-5 max-xl:flex-col max-xl:px-3 max-sm:mt-5">
                    <div className='flex gap-5 items-center'>
                        <div>{icons.components}</div>
                        <span className='font-normal text-base'>SOCIAL MEDIA RESULTS REMOVAL MODULE</span>
                    </div>
                    <div className='px-20 max-xl:px-5 space-x-1'>
                        <span className='font-normal text-xs'>Generated a removal report with</span>
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>10</span>
                        <span className='font-normal text-xs'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
