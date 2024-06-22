"use client";
import {
    Button,
} from '@nextui-org/react';
import { Components, SMfacebook, SMinstagram, SMtwitter, SMtelegram, SMreddit } from "@/components/utils/Icons";
import React, { useCallback, useEffect, useState } from 'react';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import { getDailySubmitionCount, socialProfileSubmit } from '@/axios/social';
import { useRouter } from 'next/router';

export default function SMsubmit() {

    const userInfo = useSelector(info);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [selectedSocialMedia, setSelectedSocialMedia] = useState('facebook.com');
    const [warning, setWarning] = useState('');
    const [linksStr, setLinksStr] = useState('');
    const [links, setLinks] = useState([]);
    const [leftCount, setLeftCount] = useState(0);
    const [submittedResult, setSubmittedResult] = useState(0);

    const icons = {
        components: <Components/>,
        SMfacebook: <SMfacebook/>,
        SMinstagram: <SMinstagram/>,
        SMtwitter: <SMtwitter/>,
        SMtelegram: <SMtelegram/>,
        SMreddit: <SMreddit/>,
    };

    const SOcialMediaButtons = [
        {
            icon: icons.SMfacebook,
            value: 'facebook.com',
            validValues: [
                'www.facebook.com',
                'facebook.com',
                'https://facebook.com',
                'https://www.facebook.com'
            ]
        }, {
            icon: icons.SMinstagram,
            value: 'instagram.com',
            validValues: [
                'www.instagram.com',
                'instagram.com',
                'https://instagram.com',
                'https://www.instagram.com'
            ]
        }, {
            icon: icons.SMtwitter,
            value: 'twitter.com',
            validValues: [
                'www.twitter.com',
                'twitter.com',
                'https://twitter.com',
                'https://www.twitter.com',
                'www.x.com',
                'x.com',
                'https://x.com',
                'https://www.x.com'
            ]
        }, {
            icon: icons.SMtelegram,
            value: 't.me',
            validValues: [
                't.me',
                'https://t.me'
            ]
        }, {
            icon: icons.SMreddit,
            value: 'reddit.com',
            validValues: [
                'reddit.com',
                'www.reddit.com',
                'https://reddit.com/',
                'https://www.reddit.com/'
            ]
        }
    ]

    const findIndexByIdentifier = (identifier) => {
        return SOcialMediaButtons.findIndex(button => button.value === identifier);
    };

    // Helper function to check if a given URL is valid for a specific platform
    const isValidUrlForPlatform = (url, platformIdentifier) => {
        const platform = SOcialMediaButtons.find(button => button.value === platformIdentifier);
        return platform.validValues.some(validValue => url.startsWith(validValue));
    };

    const handleSubmit = async (data) => {
        if (!data.length) return;
        setIsActionProcessing(true);
        const res = await socialProfileSubmit(data);
        if (res.status == 'success') {
            setSubmittedResult(data.length);
            setLeftCount(p => (p - (data.length || 0)));
            setLinksStr("");
            setLinks([]);
        }
        setIsActionProcessing(false);
    };

    const getDailySubmitionCountInfo = useCallback(async () => {
        const res = await getDailySubmitionCount();

        if (res.status == 'success') {
            setLeftCount(userInfo.subscription.features.sm_submit - (res.data.totalCount || 0));
        }
    }, [userInfo]);


    useEffect(() => {
        if (userInfo.email) {
            getDailySubmitionCountInfo();
        }
    }, [userInfo]);

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
                        <span className='font-normal text-base'><span className='font-normal text-base bg-gradient-to-r from-purple-light to-purple-weight bg-clip-text text-transparent'>Warning:</span> Your government-issued ID is already in our database and does not need to be uploaded again. It will be used if necessary to delete the profiles you report. </span>
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
                                                    const _links = linksStr.split("\n").filter(p => p.trim() !== "");
                                                    console.log("_links:", _links);
                                                    if (!_links.length) {
                                                        const filterdLinks = links.filter(p => isValidUrlForPlatform(p, item.value));
                                                        console.log("filterdLinks:", filterdLinks);
                                                        setSelectedSocialMedia(item.value);
                                                        setLinksStr(filterdLinks.join("\n"));
                                                        return;
                                                    }
                                                    if (isValidUrlForPlatform(_links[_links.length - 1], selectedSocialMedia)) {
                                                        const remainedLinks = links.filter(p => !isValidUrlForPlatform(p, selectedSocialMedia));
                                                        console.log("remainedLinks:", remainedLinks);
                                                        setLinks([...remainedLinks, ..._links]);
                                                        const filterdLinks = links.filter(p => isValidUrlForPlatform(p, item.value));
                                                        console.log("filterdLinks:", filterdLinks);
                                                        setLinksStr(filterdLinks.join("\n"));
                                                        setSelectedSocialMedia(item.value);
                                                    }
                                                    else {
                                                        setWarning("Please type the correct url format!");
                                                        return;
                                                    }
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
                                <span className='ml-4 bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-semibold'> Left: <span className='notranslate'>{leftCount}</span></span></p>
                            <textarea
                                className='bg-white/15 rounded-lg mt-3 h-32 p-2 notranslate'
                                placeholder='Type one or multiple links with Enter split here'
                                value={linksStr}
                                onChange={(e) => {
                                    setWarning(""); // Clear any existing warning

                                    const _links = e.target.value.split("\n").filter(p => p.trim() !== ""); // Trimmed and non-empty lines

                                    // Find the index of the selected social media platform
                                    const selectedIndex = findIndexByIdentifier(selectedSocialMedia);

                                    const remainedLinks = links.filter(p => !isValidUrlForPlatform(p, selectedSocialMedia));

                                    if (remainedLinks.length + _links.length > leftCount) {
                                        setWarning("Reached The limit!");
                                        return;
                                    }
                                    if (e.target.value.endsWith('\n')) {
                                        if (selectedIndex >= 0 && _links.length > 0 && isValidUrlForPlatform(_links[_links.length - 1], selectedSocialMedia)) {
                                            // 
                                        } else {
                                            setWarning("Please type the correct url format!");
                                            return;
                                        }
                                    }
                                    setLinksStr(e.target.value);
                                }}
                            />
                            <p className={'text-red-700 text-sm mt-2 duration-300 ' + (warning ? 'opacity-100' : 'opacity-0')}>{warning ? warning : "Not Warning"}</p>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 py-5 text-sm mx-auto mt-7"
                                size='sm'
                                isLoading={isActionProcessing}
                                onPress={() => {
                                    const _links = linksStr.split("\n").filter(p => p.trim() !== ""); // Trimmed and non-empty lines

                                    // Find the index of the selected social media platform
                                    const selectedIndex = findIndexByIdentifier(selectedSocialMedia);

                                    const remainedLinks = links.filter(p => !isValidUrlForPlatform(p, selectedSocialMedia));

                                    let requestLinks = [];
                                    if (_links.length) {

                                        if (remainedLinks.length + _links.length > leftCount) {
                                            setWarning("Reached The limit!");
                                            return;
                                        }
                                        if (selectedIndex >= 0 && _links.length > 0 && isValidUrlForPlatform(_links[_links.length - 1], selectedSocialMedia)) {
                                            setLinks([...remainedLinks, ..._links]);
                                            requestLinks = [...remainedLinks, ..._links];
                                        } else {
                                            setWarning("Please type the correct url format!");
                                            return;
                                        }
                                    }
                                    handleSubmit(requestLinks);
                                }}
                            >
                                <span>Submit</span>
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
                        <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent font-medium text-lg'>{submittedResult}</span>
                        <span className='font-normal text-xs'>copyright infringements, including  AI Results, matched photos & profiles, and forwarded it to  Social Media Platforms.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
