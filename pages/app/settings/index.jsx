"use client";
import {
    Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Spinner,
    useDisclosure
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo as info, setUserInfo } from '@/lib/auth/authSlice';
import { Facebook, Google, Twitter, Error, FacebookAlt, RedditAlt, InstagramAlt, TiktokAlt } from '@/components/utils/Icons';
import { getAccessToken } from '@/axios/token';
import { resetPassword } from '@/axios/auth';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import { downloadCopyrightHolder, getUsernames } from '@/axios/user';
import { getSocialUsername } from '@/axios/social-usernames';
import Info from "@/public/assets/info.svg"
import Image from 'next/image';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { downloadContract } from '@/components/utils/contract-to-pdf';
import { updateSocialUsername } from '../../../axios/social-usernames';

export default function AccountSetting() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const PLANS = [
        { id: 1, name: 'trial', label: 'Free Trial' },
        { id: 2, name: 'starter', label: 'Starter' },
        { id: 3, name: 'pro', label: 'Pro' },
        { id: 4, name: 'star', label: 'Star' }
    ]

    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector(info);
    const [isPasswordResetProcessing, setIsPasswordResetProcessing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isChangePasswordSuccessed, setIsChangePasswordSuccessed] = useState(false);
    const [isDownloadProcessing, setIsDownloadProcessing] = useState('');
    const [isUpdatingProcessing, setIsUpdatingProcessing] = useState(false);
    const [usernames, setUsernames] = useState([]);
    const [socialUsername, setSocialUsername] = useState(null);
    const [socialUsernameText, setSocialUsernameText] = useState("");

    const icons = {
        google: <Google />,
        twitter: <Twitter />,
        facebook: <Facebook />,
        error: <Error />,
        tiktokAlt: <TiktokAlt />,
        instagramAlt: <InstagramAlt />,
        facebookAlt: <FacebookAlt />,
        redditAlt: <RedditAlt />,
    };

    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleSetNewPassword = useCallback(async () => {

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        setIsPasswordResetProcessing(true);
        const accessToken = await getAccessToken();

        const res = await resetPassword(accessToken, newPassword);

        if (res.status == 'success') {
            setIsChangePasswordSuccessed(true);
            setIsPasswordResetProcessing(false);

            setTimeout(() => {
                setIsChangePasswordSuccessed(false);
                setNewPassword("");
            }, 2000);
        }
    }, [newPassword]);

    const handleContractDownload = useCallback(() => {
        downloadContract(userInfo, usernames);
    }, [userInfo, usernames]);

    const handleCopyrightHolderDownload = async () => {

        setIsDownloadProcessing('copyright_holder');
        const res = await downloadCopyrightHolder(userInfo.id);
        setIsDownloadProcessing('');
        if (res.status == 'success') {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);

            // Create a temporary anchor element and simulate a click to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Copyright Holder.pdf'; // Customize the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL to free up memory
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
    }

    const getUsernamesInfo = useCallback(async () => {
        setIsProcessing(true);
        const usernamesRes = await getUsernames(userInfo.id);
        if (usernamesRes.status == 'success') {
            setUsernames(usernamesRes.data);
        }
        else {
            router.push("/app/settings");
        }
        setIsProcessing(false);
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

    const handleUpdateSocialUsername = useCallback(async () => {

        setIsUpdatingProcessing(true);
        const res = await updateSocialUsername(userInfo?.id, { username: socialUsernameText });

        if (res.status == 'success') {
            setSocialUsername(res.data);
            onClose();
        }
        setIsUpdatingProcessing(false);
    }, [userInfo, socialUsernameText]);

    useEffect(() => {
        getUsernamesInfo();
        getSocialUsernameInfo();

        const socket = io(ENDPOINT);

        socket.on(`copyright_holder_uploaded_${userInfo.id}`, (copyright_holder_name) => {
            dispatch(setUserInfo({ ...userInfo, copyright_holder: copyright_holder_name }));
        });

        return () => {
            socket.disconnect();
        }
    }, [userInfo]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 text-white max-lg:mx-auto pb-5">

            {/* This section for define Account Settings header*/}

            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>ACCOUNT SETTINGS</span>
            </div>
            <div className='grid grid-cols-4 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-3'>

                {/* This section for define Personal Details*/}

                <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Personal Details</span>
                    </div>
                    <div className='flex flex-col px-5 mt-4 gap-5'>
                        <p>USER ID: {userInfo?.id}</p>
                        {!userInfo?.social ? <div className='space-y-5'>
                            <p>Change Password</p>
                            <div className='flex flex-col w-full'>
                                <label className='font-normal text-xs text-white/65'>Enter new password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setError("");
                                    }}
                                    className='w-full outline-none p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 z-30 notranslate'
                                    translate='no'
                                    required
                                />
                                {
                                    error ? <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-xs mt-2'>{icons.error}&nbsp;{error}</div> : <div className='w-full h-8'></div>
                                }
                            </div>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full"
                                size='sm'
                                isLoading={isPasswordResetProcessing}
                                onPress={handleSetNewPassword}
                            >
                                {isChangePasswordSuccessed ? <span>Changed successfully!</span> : <span>Save</span>}
                            </Button>
                        </div> : <Button
                            radius="lg"
                            className="bg-gradient-to-tr bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full"
                            size='sm'
                        >
                            <span>Connected with</span>
                            <span>{userInfo?.social ? icons[userInfo?.social] : ""}</span>
                        </Button>}
                    </div>
                </div>

                {/* This section for define Subscription info*/}
                {
                    userInfo?.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-gradient-to-br bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Subscription info</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5'>
                                <div className='mt-4   '>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base py-5 w-full"
                                        size='sm'
                                    >
                                        <span>Actve until {moment(userInfo?.subscription.expire_date).format("DD.MM.YYYY")}</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                        size='sm'
                                    >
                                        <span>Plan : <span className='capitalize bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{PLANS.find(p => p.id == userInfo?.subscription.plan_id)?.label}</span></span>
                                    </Button>
                                </div>
                                {userInfo?.subscription.payment_method ? <div>
                                    <Button
                                        radius="lg"
                                        className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                        size='sm'
                                    >
                                        <span>Payment Method: <span className='capitalize bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent'>{userInfo?.subscription.payment_method}</span></span>
                                    </Button>
                                </div> : <></>}
                            </div>
                        </div>
                }

                {/* This section for define Contract Lockleaks*/}
                {
                    userInfo?.roles.find(p => p === 'admin')
                        ?
                        false
                        :
                        <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                            <div className='mx-auto'>
                                <span className='font-semibold text-base'>Contract Lock Leaks</span>
                            </div>
                            <div className='px-5 '>
                                <Button
                                    radius="lg"
                                    className="bg-gradient-to-br from-purple-light to-purple-weight text-white shadow-lg text-base p-5 w-full mt-4"
                                    size='sm'
                                    onPress={() => router.push("/app/settings/contract")}
                                >
                                    <span>View</span>
                                </Button>
                            </div>

                            <div className='mx-auto mt-8'>
                                <span className='font-semibold text-base'>Copyright Holder</span>
                            </div>
                            <div className='flex flex-col px-5 gap-5 mt-4  '>
                                {
                                    userInfo?.subscription.plan_id == 3 || userInfo?.subscription.plan_id == 4 ? <Button
                                        radius="lg"
                                        className={"bg-gradient-to-br text-white shadow-lg text-base p-5 w-full " + (userInfo.copyright_holder ? 'from-purple-light to-purple-weight' : 'from-gray-800 to-gray-900 cursor-not-allowed')}
                                        size='sm'
                                        isDisabled={!userInfo.copyright_holder}
                                        isLoading={isDownloadProcessing == 'copyright_holder'}
                                        onPress={handleCopyrightHolderDownload}
                                    >
                                        {userInfo.copyright_holder ?
                                            <span>Download</span>
                                            :
                                            <span>Pending</span>
                                        }
                                    </Button> : <Button
                                        radius="lg"
                                        className={"bg-gradient-to-br text-white shadow-lg text-base p-5 w-full " + (userInfo.copyright_holder ? 'from-purple-light to-purple-weight' : 'from-gray-800 to-gray-900 cursor-not-allowed')}
                                        size='sm'
                                        onPress={() => window.open("/pricing", '_blank')}
                                    >
                                        Available for Star/Pro Plan
                                    </Button>
                                }
                            </div>
                        </div>
                }

                {/* This section for define Tutorials*/}

                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] mt-5 w-full max-sm:mt-0'>
                    <div className='mx-auto'>
                        <span className='font-semibold text-base'>Tutorials</span>
                    </div>
                    <div className='flex flex-col px-5 gap-5'>
                        <div className='mt-4   '>
                            <Button
                                radius="lg"
                                className="bg-gradient-to-br bg-white/10 border border-gray-500 text-white shadow-lg text-base p-5 w-full"
                                size='sm'
                                onPress={() => window.open("/help", '_blank')}
                            >
                                <span>View</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] w-full p-5'>
                    <p className='font-semibold'> Usernames List: </p>
                    <ScrollShadow className='h-60 mt-4'>
                        {
                            isProcessing ?
                                <Spinner size='md' />
                                : usernames.map((keyword, index) => <div key={index} className='flex gap-1'>
                                    <div>{index + 1}.</div>
                                    <div>
                                        <p>Username: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {keyword.username}</span></p>
                                        <p>Link: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {keyword.link}</span></p>
                                    </div>
                                </div>)
                        }
                    </ScrollShadow>
                    <Button
                        radius="md"
                        className="bg-gradient-to-br from-purple-light to-purple-weight text-white shadow-lg text-base w-max mt-3"
                        size='sm'
                    >
                        <span>Add More</span>
                    </Button>
                </div>
                <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] w-full p-5'>
                    <p className='font-semibold'> Social Media Username: </p>
                    <div className='flex gap-4 my-4'>
                        <span>{icons.tiktokAlt}</span>
                        <span>{icons.facebookAlt}</span>
                        <span>{icons.redditAlt}</span>
                        <span>{icons.instagramAlt}</span>
                    </div>
                    <p>Username: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {socialUsername?.username}</span></p>
                    <Button
                        radius="md"
                        className={"bg-gradient-to-br text-white shadow-lg text-base w-max mt-3 " + (new Date(socialUsername?.updatedAt).setMinutes(new Date(socialUsername?.updatedAt).getMinutes() + 1) > new Date() ? 'from-gray-800 to-gray-900 cursor-not-allowed' : 'from-purple-light to-purple-weight')}
                        disabled={new Date(socialUsername?.updatedAt).setMinutes(new Date(socialUsername?.updatedAt).getMinutes() + 1) > new Date()}
                        size='sm'
                        onClick={() => {
                            if (new Date(socialUsername?.updatedAt).setMinutes(new Date(socialUsername?.updatedAt).getMinutes() + 1) > new Date()) return;
                            setSocialUsernameText(socialUsername?.username);
                            onOpen();
                        }}
                    >
                        <span>Change Username</span>
                    </Button>
                    <div className='flex gap-2 items-start mt-6'>
                        <Image src={Info} width={15} height={15} alt=''></Image>
                        <p>The policy allows for modifications to the service agreement after a period of 30 days, contingent upon the renewal of the subscription.</p>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size='lg'
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                Update Social Username
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col'>
                                    <Input
                                        type="text"
                                        label="Decline Message"
                                        value={socialUsernameText}
                                        onChange={(e) => setSocialUsernameText(e.target.value)}
                                    />
                                    <div className='flex my-2 mt-4 justify-end'>
                                        <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onPress={handleUpdateSocialUsername}
                                            isLoading={isUpdatingProcessing}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
