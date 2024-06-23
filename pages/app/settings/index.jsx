"use client";
import {
    Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Spinner,
    Switch,
    useDisclosure
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo as info, setUserInfo } from '@/lib/auth/authSlice';
import { Facebook, Google, Twitter, Error, FacebookAlt, RedditAlt, InstagramAlt, TiktokAlt, UnselectSwitch, SelectSwitch } from '@/components/utils/Icons';
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
import { checkDoubleUsername, createUsernames } from '@/axios/usernames';
import { generateNewFanPaymentLink } from '@/axios/agency';

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
    const [purchasedUsernames, setPurchasedUsernames] = useState([]);
    const [socialUsername, setSocialUsername] = useState(null);
    const [socialUsernameText, setSocialUsernameText] = useState("");
    const [modalType, setModalType] = useState('');

    const [targetKeyword, setTargetKeyword] = useState({
        username: '',
        link: '',
        update: false
    });
    const [targetKeywordType, setTargetKeywordType] = useState('username');
    const [targetKeywordIndex, setTargetKeywordIndex] = useState(0);
    const [urlValidation, setUrlValidation] = useState("");
    const [usernames, setUsernames] = useState([
        {
            username: '',
            link: ''
        }
    ]);
    const [isUsernameLinkValidationProcessing, setIsUsernameLinkValidationProcessing] = useState(false);
    const [step, setStep] = useState(1);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [fanPaymentLink, setFanPaymentLink] = useState('');
    const [fanPaymentCode, setFanPaymentCode] = useState('');

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
        downloadContract(userInfo, usernames, socialUsername.username);
    }, [userInfo, usernames, socialUsername]);

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
            setPurchasedUsernames(usernamesRes.data);
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

    const handleSetNewUsername = useCallback(() => {
        console.log(usernames, targetKeywordIndex);
        let newUsername = targetKeyword.username.replace("@", "");
        if (newUsername) {
            const _usernames = usernames.slice(0);
            _usernames[targetKeywordIndex].username = newUsername;
            setUsernames(_usernames);
            setTargetKeywordType('link');
        }
    }, [targetKeyword, usernames, targetKeywordIndex]);

    const checkLinkValidation = useCallback(() => {
        var url = targetKeyword?.link || "";
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(url)) {
            setUrlValidation("Please enter valid Link.");
            return false;
        }
        return true;
    }, [targetKeyword]);

    const handleSetNewLink = useCallback(async () => {
        let newLink = targetKeyword.link.replace("@", "");
        setIsUsernameLinkValidationProcessing(true);
        if (newLink && checkLinkValidation()) {
            const _usernames = usernames.slice(0);
            const res = await checkDoubleUsername({
                username: _usernames[targetKeywordIndex].username,
                link: newLink
            });
            if (res.data.valid && !usernames.filter((item, index) => index != targetKeywordIndex).find(item => item.link === newLink && item.username == targetKeyword.username.replace("@", ""))) {
                _usernames[targetKeywordIndex].link = newLink;
                setUsernames(_usernames);
                setTargetKeyword(null);
                setTargetKeywordType('username');
            }
            else {
                setUrlValidation("Already existed.");
            }
        }
        setIsUsernameLinkValidationProcessing(false);
    }, [targetKeyword?.link, targetKeyword?.username, checkLinkValidation, usernames, targetKeywordIndex]);

    const handlePaymentProcess = useCallback(async (payment_method) => {
        // TODO: payment integration extraUsernameCount, totalPrice
        setIsActionProcessing(payment_method);

        const createUsernamesRes = await createUsernames({ usernames });

        if (createUsernamesRes.status == 'success') {
            onClose();
            setUsernames([]);
            setStep(1);
            getUsernamesInfo();
            // const res = await updatePaymentStatus({
            //     plan: plan,
            //     payment_method,
            //     period: null
            // });

            // if (res.status == 'success') {
            //     onOpen();
            // } else {
            //     console.log("Error:", res.data);
            // }
        }
        setIsActionProcessing(false);
    }, [socialUsername, usernames, onOpen]);

    const handleCreateFanPaymentLink = useCallback(async () => {

        setIsActionProcessing('fan');
        const res = await generateNewFanPaymentLink({
            usernames,
            amount: usernames.length * 15,
            period: null
        });

        if (res.status == 'success') {
            setFanPaymentCode(res.data.code);
            setFanPaymentLink(`${window.location.host}/payment?code=${res.data.code}&type=fans`)
            navigator.clipboard.writeText(`${window.location.host}/payment?code=${res.data.code}&type=fans`);
        }
        setIsActionProcessing(false);
    }, [usernames]);

    useEffect(() => {
        getUsernamesInfo();
        getSocialUsernameInfo();

        const socket = io(ENDPOINT);

        socket.on(`copyright_holder_uploaded_${userInfo.id}`, (copyright_holder_name) => {
            dispatch(setUserInfo({ ...userInfo, copyright_holder: copyright_holder_name }));
        });

        socket.on(`payment_link_status_${fanPaymentCode}`, (value) => {
            if ( value == 'paid' ) {
                onClose();
            }
        });

        return () => {
            socket.disconnect();
        }
    }, [userInfo, fanPaymentCode]);

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

                {userInfo?.subscription.plan_id != 1 ? <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] w-full p-5'>
                    <p className='font-semibold'> Usernames List: </p>
                    <ScrollShadow className='h-60 mt-4'>
                        {
                            isProcessing ?
                                <Spinner size='md' />
                                : purchasedUsernames.map((keyword, index) => <div key={index} className='flex gap-1'>
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
                        onClick={() => {
                            setModalType('scanner');
                            onOpen();
                        }}
                    >
                        <span>Add More</span>
                    </Button>
                </div> : <></>}
                {userInfo?.subscription.plan_id == 4 ? <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 py-5 rounded-[16px] w-full p-5'>
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
                        isDisabled={new Date(socialUsername?.updatedAt).setMinutes(new Date(socialUsername?.updatedAt).getMinutes() + 1) > new Date()}
                        size='sm'
                        onClick={() => {
                            if (new Date(socialUsername?.updatedAt).setMinutes(new Date(socialUsername?.updatedAt).getMinutes() + 1) > new Date()) return;
                            setSocialUsernameText(socialUsername?.username);
                            setModalType('social');
                            onOpen();
                        }}
                    >
                        <span>Change Username</span>
                    </Button>
                    <div className='flex gap-2 items-start mt-6'>
                        <Image src={Info} width={15} height={15} alt=''></Image>
                        <p>The policy allows for modifications to the service agreement after a period of 30 days, contingent upon the renewal of the subscription.</p>
                    </div>
                </div> : <></>}
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size={modalType == 'scanner' ? '3xl' : 'lg'}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {modalType == 'scanner' ? <span>Add New Usernames</span> : <span>Update Social Username</span>}
                            </ModalHeader>
                            <ModalBody>
                                {modalType == 'scanner' ? <div>
                                    {
                                        step == 1 ? <div className='flex flex-col gap-5 w-full max-w-[724px] mx-auto text-left'>
                                            <span className='font-medium text-[34spanx] text-center -mb-4'>USERNAMES LIST</span>
                                            <span className='font-medium text-center'>(<span className='notranslate pr-2'>{usernames.filter(p => (p.link != "")).length}</span> USERNAMES)</span>

                                            {targetKeyword != null ? <div className="flex bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm rounded-[20px] z-10 cursor-pointer flex-col border border-gray-700 py-6 px-10 ">
                                                {
                                                    targetKeywordType == 'link' ?
                                                        <span className='font-medium text-[34px] text-center'>{!targetKeyword.update ? <span>ADD</span> : <span>UPDATE</span>} LINK TO <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{usernames[targetKeywordIndex]?.username || ""}</span></span>
                                                        :
                                                        !targetKeyword.update ? <span>ADD NEW USERNAME</span> : <span>UPDATE USERNAME</span>
                                                }
                                                <div className='mt-3'>
                                                    {targetKeywordType == 'link' ? <span>We will utilize your profile page URL to establish your ownership of this content</span> : <span>We will use your username to identify and report copyright infringements</span>}
                                                </div>
                                                <div className="flex w-full flex-col gap-4 mt-5">
                                                    <div className='flex justify-start'>{targetKeywordType == 'link' ? <span> LINK:</span> : <span>USERNAME</span>}</div>
                                                    <div className='flex'>
                                                        {
                                                            <div className="w-full flex">
                                                                <div className="flex flex-col gap-2 mt-1">
                                                                    <Switch
                                                                        defaultSelected
                                                                        size="lg"
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
                                                                <div className='flex flex-col w-full'>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={targetKeywordType == 'username' ? 'Type here.. @username' : 'Type here.... example: https://onlyfans.com/@username'}
                                                                        value={targetKeywordType == 'link' ? targetKeyword.link : targetKeyword.username}
                                                                        onChange={(e) => {
                                                                            if (targetKeywordType == 'link') setTargetKeyword(p => ({ ...p, link: e.target.value }))
                                                                            else setTargetKeyword(p => ({ ...p, username: e.target.value }))
                                                                        }}
                                                                        className='w-full outline-none p-2 rounded-lg bg-white text-black notranslate'
                                                                        required
                                                                    />
                                                                    <span className='mt-1 text-red-700'>{urlValidation}</span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className='bg-gradient-to-tr max-sm:flex-wrap w-full mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center'
                                                >
                                                    <Button
                                                        radius="full"
                                                        className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"
                                                        isLoading={isUsernameLinkValidationProcessing}
                                                        onClick={() => {
                                                            if (targetKeywordType == 'link') handleSetNewLink();
                                                            else handleSetNewUsername();
                                                        }}
                                                    >
                                                        {targetKeywordType == 'link' ? <span>Save</span> : <span>Next</span>}
                                                    </Button>
                                                    <Button
                                                        radius="full"
                                                        className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"
                                                        onClick={() => {
                                                            setTargetKeyword(null);
                                                            setTargetKeywordType("username")
                                                            let _usernames = targetKeyword.update ? usernames.slice(0) : usernames.slice(0, -1);
                                                            setUsernames(_usernames);
                                                        }}
                                                    >
                                                        <span>Cancel</span>
                                                    </Button>
                                                </div>
                                            </div>
                                                :
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" /* "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" */
                                                    size='lg'
                                                    onClick={() => {
                                                        setTargetKeyword({
                                                            username: '',
                                                            link: ''
                                                        });
                                                        setUsernames(p => [...p, {
                                                            username: '',
                                                            link: ''
                                                        }])
                                                        setTargetKeywordIndex(usernames.length)
                                                    }}
                                                >
                                                    <span>Add New</span>
                                                </Button>
                                            }

                                            {
                                                usernames.map((keyword, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                keyword.username && keyword.link ?
                                                                    <div className='flex items-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 shadow-sm border border-gray-700 px-8 py-4 w-full rounded-xl'>
                                                                        <p className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                                                                        <div className='flex flex-col gap-2 flex-1'>
                                                                            <div>USERNAME: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold notranslate'>{keyword.username}</span></div>
                                                                            <div>LINK: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold notranslate'>{keyword.link}</span></div>
                                                                        </div>
                                                                        <div className='flex w-max items-center gap-4'>
                                                                            <Button
                                                                                radius="full"
                                                                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                                size='sm'
                                                                                onClick={() => {
                                                                                    setTargetKeywordIndex(index);
                                                                                    setTargetKeyword({ ...usernames[index], update: true });
                                                                                }}
                                                                            >
                                                                                <span>Edit</span>
                                                                            </Button>
                                                                            <Button
                                                                                radius="full"
                                                                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                                size='sm'
                                                                                onClick={() => {
                                                                                    setUsernames(p => {
                                                                                        let _p = p.slice(0);
                                                                                        _p.splice(index, 1);
                                                                                        return _p;
                                                                                    });
                                                                                }}
                                                                            >
                                                                                <span>Delete</span>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <></>}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                            :
                                            <div className='w-full'>
                                                <div className="flex bg-gradient-to-br mt-8 text-center mx-auto from-gray-900 to-gray-800 shadow-sm rounded-[20px] z-10 flex-col border border-gray-700 p-5">
                                                    <p className='font-medium text-[34px] text-center'>PAYMENT</p>
                                                    <p className='mt-3 font-normal text-base'>We utilize Stripe as our payment processing platform. Stripe ensures secure payment transactions.
                                                        Follow the on-screen instructions to complete your purchase securely. Please note, additional VAT costs may apply based on your location.
                                                        This charge will be billed at regular intervals until you opt to cancel the automatic renewal.
                                                    </p>
                                                    <div className='mx-auto mt-10 max-w-[676px] gap-3 flex max-md:flex-col items-center'>
                                                        <Button
                                                            radius="full"
                                                            className="border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"
                                                            size='lg'
                                                            onClick={() => handlePaymentProcess('Credit Card')}
                                                            isLoading={isActionProcessing == 'Credit Card'}
                                                        >
                                                            <span>Pay whith credit card</span>
                                                        </Button>
                                                        <Button
                                                            radius="full"
                                                            className=" bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-7 text-lg"
                                                            size='lg'
                                                            isLoading={isActionProcessing == 'Paypal'}
                                                            onClick={() => handlePaymentProcess('Paypal')}
                                                        >
                                                            <span>Pay whith paypal</span>
                                                        </Button>
                                                        <Button
                                                            radius="full"
                                                            className="border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"
                                                            size='lg'
                                                            onClick={handleCreateFanPaymentLink}
                                                            isLoading={isActionProcessing == 'fan'}
                                                        >
                                                            <span>Request fan support</span>
                                                        </Button>
                                                    </div>
                                                    {fanPaymentLink ? <p className='text-sm mt-4 text-green-500 font-bold'> The Fans Payment Link was copied to your clipboard. </p> : <></>}
                                                </div>
                                                <div className='mx-auto text-start my-8 max-md:px-3'>
                                                    <p className='font-normal text-base'>We're utilizing Stripe for payment processing. What is Stripe? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
                                                    <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
                                                </div>
                                            </div>
                                    }
                                    <div className='flex my-2 mt-4 justify-between w-full'>
                                        {step == 2 ? <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onPress={() => setStep(1)}
                                        >
                                            Back
                                        </Button> : <div></div>}
                                        {step == 1 ? <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr " + (!(usernames.length && usernames[0].link != '') ? 'from-gray-500 to-gray-600' : 'from-purple-light to-purple-weight')}
                                            isDisabled={!(usernames.length && usernames[0].link != '')}
                                            onPress={() => {
                                                if ((usernames.length && usernames[0].link != '')) setStep(2)
                                            }}
                                        >
                                            Next
                                        </Button> : <div></div>}
                                    </div>
                                </div>
                                    :
                                    <div className='flex flex-col'>
                                        <Input
                                            type="text"
                                            label="Social Username"
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
                                    </div>}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
