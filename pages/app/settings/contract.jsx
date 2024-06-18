"use client";
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from "react-redux";

import { userInfo as info } from '@/lib/auth/authSlice';
import { useRouter } from 'next/navigation';
import { Button, ScrollShadow } from '@nextui-org/react';
import { getUsernames } from '@/axios/user';
import Image from 'next/image';
import Stamp from '@/public/assets/stamp.png';
import Logo from '@/public/assets/logo.svg';
import { DownloadIcon } from '@/components/utils/Icons';
import { downloadContract } from '@/components/utils/contract-to-pdf';
import { getSocialUsername } from '@/axios/social-usernames';

export default function ContractView() {

    const userInfo = useSelector(info);
    const router = useRouter();
    const [usernames, setUsernames] = useState([]);
    const [socialUsername, setSocialUsername] = useState(null);

    const icons = {
        downloadIcon: <DownloadIcon />,
    }

    const CONTENT = [
        {
            title: 'Services Provided:',
            content: 'Lock Leaks agrees to provide the Client with access to its platform and features. The Client agrees to utilize these services in accordance with the terms outlined here in.'
        },
        {
            title: 'Ownership and Authorization:',
            content: 'The Client acknowledges that all content posted or hosted on Lock Leaks is subject to copyright laws. By using the services provided, the Client affirms that they have the legal authority to post or host the content and grant authorization to Lock Leaks.'
        },
        {
            title: 'DMCA Authorization:',
            content: 'By accepting this contract, the Client authorizes Lock Leaks to act on their behalf for Digital Millennium Copyright Act (DMCA) compliance. Any copyright infringement notices or inquiries should be directed to Lock Leaks at dmca@lockleaks.com.'
        },
        {
            title: 'Data Handling and Privacy:',
            content: 'Lock Leaks agrees to handle all personal data provided by the Client in accordance with its Privacy Policy.'
        },
        {
            title: 'Contract Parties:',
            content: 'This Agreement is between the Client and AD BOOST S.R.L., the entity that owns and operates the Lock Leaks platform.'
        },
        {
            title: 'Termination of Agreement:',
            content: 'Either party may terminate this Agreement at any time with prior written notice.'
        },
        {
            title: 'Governing Law:',
            content: 'This Agreement shall be governed by and construed in accordance with the laws of Romania. IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.'
        }
    ]

    const getUsernamesInfo = useCallback(async () => {

        const usernamesRes = await getUsernames(userInfo.id);
        if (usernamesRes.status == 'success') {
            setUsernames(usernamesRes.data);
        }
        else {
            router.push("/app/settings");
        }
    }, [userInfo]);

    const getSocialUsernameInfo = useCallback(async () => {

        const socialUsernameRes = await getSocialUsername(userInfo.id);
        if (socialUsernameRes.status == 'success') {
            setSocialUsername(socialUsernameRes.data);
        }
        else {
            router.push("/app/settings");
        }
    }, [userInfo]);

    const handleDownloadContract = useCallback(() => {
        downloadContract(userInfo, usernames, socialUsername.username);
    }, [userInfo, usernames, socialUsername])

    useEffect(() => {
        getUsernamesInfo();
        getSocialUsernameInfo();
    }, []);

    useEffect(() => {
        if (userInfo.contract.status != 'approved') {
            router.push("/app/settings");
        }
    }, [userInfo]);

    return (
        <div className="flex flex-col px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='max-lg:mx-auto'>
                <div className='flex gap-16 items-center'>
                    <div><span className='font-extrabold text-lg'>Lock Leaks Contract Agreement</span></div>
                </div>
                <div className='flex justify-end mt-5'>
                    <Button
                        radius="lg"
                        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base"
                        size='md'
                        onClick={() => history.go(-1)}
                    >
                        <span>Back</span>
                    </Button>
                </div>
            </div>
            <div className='w-full flex flex-col'>
                <div className="flex flex-col gap-4 w-full h-full bg-white/15 border border-gray-500 rounded-[20px] max-md:mx-auto p-10 max-sm:p-5 mt-5">
                    {
                        CONTENT.map((item, index) => <div className='space-y-2' key={index}>
                            <p className='font-semibold text-lg bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{index + 1}. {item.title}</p>
                            <p>{item.content}</p>
                        </div>)
                    }
                </div>
                <div className='grid grid-cols-2 max-md:grid-cols-1 gap-6 my-6'>
                    <div className="flex flex-col gap-4 w-full h-full bg-white/15 border border-gray-500 rounded-[20px] max-md:mx-auto p-10 max-sm:p-5">
                        <p className='font-semibold text-lg'>For Lock Leaks:</p>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900'> <strong>Full Name:</strong> <span className='notranslate'>Cosmin Ridel</span> </div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 '>  <strong>Signature:</strong> <span className='notranslate'>Cosmin Ridel</span></div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 '>  <strong>Date:</strong> {moment(userInfo?.contract.date).format('MMM DD, YYYY')} </div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 notranslate'>dmca@lockleaks.com </div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 notranslate'>lockleaks.com</div>
                        <Image
                            src={Logo}
                            width={150}
                            height={150}
                            className='object-cover rounded-full'
                        />
                        <Image
                            src={Stamp}
                            width={100}
                            height={100}
                            className='object-cover rounded-full'
                        />
                        <div className='mt-6 text-sm italic space-y-2'>
                            <p className='notranslate'>AD BOOST S.R.L.</p>
                            <p className='notranslate'>Romania, Bacau, Strada Letea 32, Bloc A, Ap. 116, 600343</p>
                            <p className='notranslate'>Register Code (CUI): 48091747</p>
                            <p className='notranslate'>VAT: RO48091747</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full h-full bg-white/15 border border-gray-500 rounded-[20px] max-md:mx-auto p-10 max-sm:p-5">
                        <p className='font-semibold text-lg '>For <span className='notranslate'>{userInfo?.name}:</span></p>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 '> <strong>Full Name:</strong> <span className='notranslate'>{userInfo?.name} </span></div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 '>  <strong>Signature:</strong> <span className='notranslate'>{userInfo?.name} </span></div>
                        <div className='py-4 px-5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 '>  <strong>Date:</strong> {moment(userInfo?.contract.date).format('MMM DD, YYYY')} </div>
                        <p className='font-semibold mt-4'> Copyright of Usernames </p>
                        <p>
                            The Customer acknowledges and agrees that all usernames listed in the attached schedule (hereinafter referred to as the "Username List")
                            are the property of their respective copyright holders. Lock Leaks will assist the
                            Customer in reporting any unauthorized use or illegal postings involving these
                            usernames in accordance with the Digital Millennium Copyright Act (DMCA). The Customer
                            grants Lock Leaks the authority to act on their behalf in submitting DMCA takedown
                            notices and other necessary actions to protect their rights.
                        </p>
                        <div className='mt-2 grid grid-cols-2 max-sm:grid-cols-1 gap-4'>
                            <div className='flex gap-2 flex-col'>
                                <p className='font-semibold'> Usernames List: </p>
                                <ScrollShadow className='max-h-60'>
                                    {
                                        usernames.map((keyword, index) => <div key={index} className='flex gap-1'>
                                            <div>{index + 1}.</div>
                                            <div>
                                                <p>Username: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {keyword.username}</span></p>
                                                <p>Link: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {keyword.link}</span></p>
                                            </div>
                                        </div>)
                                    }
                                </ScrollShadow>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <p className='font-semibold'> Social Media Username: </p>
                                <p>Username: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {socialUsername?.username }</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <Button
                    radius="lg"
                    className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white px-7 text-sm"
                    onClick={handleDownloadContract}
                >
                    <span>{icons.downloadIcon}</span><span> DOWNLOAD CONTRACT</span>
                </Button>
            </div>
        </div>
    )
}
