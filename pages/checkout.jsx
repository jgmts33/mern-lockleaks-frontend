"use client";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Switch,
    useDisclosure,
    Input,
    ModalFooter
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SelectSwitch, Shine, UnselectSwitch, Success, FacebookAlt, RedditAlt, InstagramAlt, TiktokAlt } from '@/components/utils/Icons';
import { createUsernames } from '@/axios/usernames';
import { userInfo as info } from '@/lib/auth/authSlice';
import { updatePaymentStatus } from '@/axios/user';
import { generateNewFanPaymentLink } from '@/axios/agency';

import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { getAccessToken } from '@/axios/token';
import { checkDoubleUsername } from '@/axios/usernames';
import { createNewSocialUsername } from '@/axios/social-usernames';
import { ENDPOINT } from '@/config/config';
import { io } from 'socket.io-client';

const subscriptionDetails = {
    trial: {
        name: 'Free',
        usernames: 1,
        prices: {
            monthly: 0,
            quarterly: 0
        }
    },
    starter: {
        name: 'STARTER',
        usernames: 1,
        prices: {
            monthly: 150,
            quarterly: 405
        }
    },
    pro: {
        name: 'PRO',
        usernames: 3,
        prices: {
            monthly: 200,
            quarterly: 510
        }
    },
    star: {
        name: 'STAR',
        usernames: 5,
        prices: {
            monthly: 350,
            quarterly: 840
        }
    }
}

export default function Checkout() {

    const userInfo = useSelector(info);
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');
    const period = searchParams.get('period');
    const ButtonContent = [
        "1 (+$15)", "2 (+$30)", "3 (+$45)", "CUSTOM"
    ]

    const icons = {
        shine: <Shine />,
        success: <Success />,
        tiktokAlt: <TiktokAlt />,
        instagramAlt: <InstagramAlt />,
        facebookAlt: <FacebookAlt />,
        redditAlt: <RedditAlt />,
    };

    const router = useRouter();

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [step, setStep] = useState(0);
    const [extraUsernameCount, setExtraUsernameCount] = useState(0);
    const [customUsernameCount, setCustomUsernameCount] = useState(4);
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
    const [socialUsername, setSocialUsername] = useState("");
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [isUsernameLinkValidationProcessing, setIsUsernameLinkValidationProcessing] = useState(false);
    const [fanPaymentLink, setFanPaymentLink] = useState('');
    const [fanPaymentCode, setFanPaymentCode] = useState('');

    const handleSetUsernameCount = useCallback(() => {
        setExtraUsernameCount(customUsernameCount);
        onClose();
    }, [customUsernameCount, onClose]);

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

    const handleCreateFanPaymentLink = useCallback(async () => {

        setIsActionProcessing('fan');
        const res = await generateNewFanPaymentLink({
            usernames,
            amount: usernames.length * 15,
            period: period == 'monthly' ? 1 : 3
        });

        if (res.status == 'success') {
            setFanPaymentCode(res.data.code);
            setFanPaymentLink(`${window.location.host}/payment?code=${res.data.code}&type=fans`)
            navigator.clipboard.writeText(`${window.location.host}/payment?code=${res.data.code}&type=fans`);
        }
        setIsActionProcessing(false);
    }, [usernames]);


    const handlePaymentProcess = useCallback(async (payment_method) => {
        // TODO: payment integration extraUsernameCount, totalPrice
        setIsActionProcessing(payment_method);
        const socialUsernameRes = await createNewSocialUsername({ username: socialUsername });

        const createUsernamesRes = await createUsernames({ usernames });

        if (createUsernamesRes.status == 'success' && socialUsernameRes.status == 'success') {
            const res = await updatePaymentStatus({
                plan: plan,
                payment_method,
                period: period == 'monthly' ? 1 : 3
            });

            if (res.status == 'success') {
                onOpen();
            } else {
                console.log("Error:", res.data);
            }
        }
        setIsActionProcessing(false);
    }, [socialUsername, usernames, plan, onOpen, period]);

    const handlesubmitUsernamesForFreeTrial = useCallback(async () => {

        const createUsernamesRes = await createUsernames({ usernames });

        if (createUsernamesRes.status == 'success') {
            const res = await updatePaymentStatus({
                plan: 'trial'
            });

            if (res.status == 'success') {
                onOpen();
            } else {
                console.log("Error:", res.data);
            }
        }

    }, [onOpen, usernames]);

    useEffect(() => {
        if (!plan) return;
        setUsernames(p => ([...p.splice(0, (subscriptionDetails[plan]?.usernames || 0) + extraUsernameCount)]))
    }, [extraUsernameCount, plan]);

    useEffect(() => {
        console.log("usernames:", usernames);
        setUrlValidation("");
    }, [usernames]);

    useEffect(() => {
        setUrlValidation("");
        (async () => {
            const accessToken = await getAccessToken();

            if (!accessToken) {
                router.push('/auth/login');
            }

        })();

        if (plan == 'trial') {
            setStep(1);
            setExtraUsernameCount(0);
        }

    }, [plan, router]);

    useEffect(() => {

        const socket = io(ENDPOINT);

        socket.on(`payment_link_status_${fanPaymentCode}`, (value) => {
            if ( value == 'paid' ) {
                onOpen();
            }
        });

    },[fanPaymentCode]);

    return (
        <div className="text-white w-full min-h-[calc(100vh-120px)] max-w-[1389px]  flex flex-col items-center justify-center pb-24 pt-4 px-4">
            {
                step == 0 ?
                    <div className='flex justify-center mx-auto gap-10 max-xl:flex-col max-sm:items-center max-sm:mx-auto max-sm:px-2'>
                        <div className="flex bg-white/5 shadow-sm py-14 rounded-[20px] w-[720px] max-sm:w-full max-sm:h-auto flex-col gap-4 px-20 max-sm:px-6 max-sm:pb-6">
                            <p className='font-medium text-6xl'>ORDER</p>
                            <div className='flex flex-col'>
                                <p className='mt-10'>Tell Us Jow Many Usernames You're Using.</p>
                                <div className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                                    {subscriptionDetails[plan]?.usernames} INCLUDED
                                </div>
                            </div>
                            <div className='flex-col flex'>
                                <p className='font-medium text-3xl'>ADD NEW USERNAME</p>
                                {
                                    ButtonContent.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                className={"rounded-[10px] mt-5 max-w-[327px] max-sm:max-w-full bg-gradient-to-tr text-white text-base " + (index + 1 == extraUsernameCount || (index == 3 && extraUsernameCount >= 4) ? "from-purple-light to-purple-weight" : "from-gray-500 to-gray-600")}
                                                size='md'
                                                onPress={() => {
                                                    if (item == "CUSTOM") {
                                                        onOpen();
                                                    } else {
                                                        setExtraUsernameCount(index + 1);
                                                    }
                                                }}
                                            >
                                                <spa>{item}</spa>
                                                {index == 3 && extraUsernameCount >= 4 ? <span> {extraUsernameCount} (+${extraUsernameCount * 15}) </span> : <></>}
                                                <span>{icons.shine}</span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col bg-gradient-to-tr mx-auto from-[#dd7272] to-[#7d1eeb] h-[430px] rounded-[20px] z-10 p-5 w-full text-center ">
                            {plan == 'star' ? <div className='mt-5'>
                                <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                    <span className='px-4'>popular</span>
                                </Button>
                            </div> : <></>}
                            <div className='p-7 text-center flex flex-col justify-center'>
                                <p className='font-bold text-6xl mt-3'>{subscriptionDetails[plan]?.name}</p>
                                <p className='font-normal text-5xl mt-10'>${subscriptionDetails[plan]?.prices[period]}</p>
                                <p className='font-bold text-3xl'>{period == 'quarterly' ? <span>3</span> : ''}/MO</p>
                                <p className='font-normal text-base mt-5'>YOU ARE FREE TO CANCEL AT ANY TIME</p>
                                <p className='font-normal text-base'>+ PRICE FROM EXTRA USERNAMES + ADDON CAM MODELS</p>
                            </div>
                        </div>

                        <Modal
                            backdrop="opaque"
                            isOpen={step == 0 && isOpen}
                            size='lg'
                            onOpenChange={onOpenChange}
                            classNames={{
                                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                            }}
                        >
                            <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.9]  text-white text-center max-md:absolute max-md:top-32'>
                                {(onClose) => (
                                    <>
                                        <ModalHeader>
                                            Write how many usernames you want
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col'>
                                                <div className='flex w-full flex-col space-y-2'>
                                                    <p className='text-left text-sm -mt-5'>PRICE: 1 USERNAME +$15</p>
                                                    <Input
                                                        type="number"
                                                        label="Username"
                                                        value={customUsernameCount}
                                                        min={5}
                                                        max={100}
                                                        onChange={(e) => setCustomUsernameCount(Number(e.target.value))}
                                                    />
                                                    <p className='text-left font-bold'>{`${customUsernameCount} USERNAMES +$` + customUsernameCount * 15}</p>
                                                </div>
                                                <div className='flex my-2 justify-end'>
                                                    <Button
                                                        radius="lg"
                                                        className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                                        onClick={handleSetUsernameCount}
                                                        isLoading={false}
                                                    >
                                                        <span>Save</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    :

                    step == 1
                        ?
                        <div className='flex flex-col gap-5 w-full max-w-[724px] mx-auto'>
                            <span className='font-medium text-[34spanx] text-center -mb-4'>USERNAMES LIST</span>
                            <span className='font-medium text-center'>(<span className='notranslate pr-2'>{usernames.filter(p => (p.link != "")).length}</span> USERNAMES)</span>

                            {targetKeyword != null ? <div className="flex bg-gradien t-to-br from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 cursor-pointer flex-col border border-gray-700 py-20 px-10 ">
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
                                extraUsernameCount + subscriptionDetails[plan]?.usernames > usernames.length ? <Button
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
                                </Button> : <></>
                            }

                            {
                                usernames.map((keyword, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                keyword.username && keyword.link ?
                                                    <div className='flex items-center gap-4 bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm border border-gray-700 px-8 py-4 w-full rounded-xl'>
                                                        <p className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                                                        <div className='flex flex-col gap-2 flex-1'>
                                                            <div>USERNAME: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.username}</span></div>
                                                            <div>LINK: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.link}</span></div>
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
                        step == 2
                            ?
                            <div className='flex flex-col gap-5 w-full max-w-[724px] mx-auto'>
                                <span className='font-medium text-[34spanx] text-center -mb-4'>Social Media Username:</span>
                                <div className='flex gap-4 my-4 mx-auto'>
                                    <span>{icons.tiktokAlt}</span>
                                    <span>{icons.facebookAlt}</span>
                                    <span>{icons.redditAlt}</span>
                                    <span>{icons.instagramAlt}</span>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <input
                                        type="text"
                                        placeholder='Type here.. @username'
                                        value={socialUsername}
                                        onChange={(e) => {
                                            setSocialUsername(e.target.value);
                                        }}
                                        className='w-full outline-none p-2 rounded-lg bg-white text-black notranslate'
                                        required
                                    />
                                </div>
                            </div>
                            :
                            <div className='w-full'>
                                <div className="flex bg-gradient-to-br mt-20 max-sm:mt-8 text-center mx-auto from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 flex-col border border-gray-700 p-5">
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
                                <div className='mx-auto text-start mt-20 max-sm:mt-8 mb-40 max-sm:mb-8 max-md:px-3'>
                                    <p className='font-normal text-base'>We're utilizing Stripe for payment processing. What is Stripe? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
                                    <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
                                </div>
                            </div>
            }
            <div className='max-sm:px-6 w-full fixed bottom-0 bg-black/55 backdrop-blur-xl left-0 z-20 h-20 px-4'>
                {plan != 'trial' ? <div className='max-w-[1389px] flex justify-between items-center bg-transparent my-4 mx-auto'>
                    {step > 0 ? <Button
                        radius="lg"
                        className="bg-gradient-to-tr text-white w-36  from-purple-light to-purple-weight"
                        size='lg'
                        onPress={() => {
                            console.log(step);
                            if (step == 3 && plan != 'star') setStep(p => p - 2);
                            else setStep(p => p - 1);
                        }}
                    >
                        <span>Back</span>
                    </Button> : <div></div>}
                    {step < 3 ? <Button
                        radius="lg"
                        className={"bg-gradient-to-tr text-white w-36  " + ((step == 1 && (!usernames.length || !usernames[0]?.link) || (step == 2 && !socialUsername)) ? " from-gray-700 to-gray-800 cursor-not-allowed" : "from-purple-light to-purple-weight")}
                        size='lg'
                        isDisabled={(step == 1 && (!usernames.length || !usernames[0]?.link)) || (step == 2 && !socialUsername)}
                        onPress={() => {
                            if ((step == 1 && (!usernames.length || !usernames[0]?.link) || (step == 2 && !socialUsername))) return;
                            if (step == 1 && plan != 'star') setStep(p => p + 2);
                            else setStep(p => p + 1);
                        }}
                    >
                        <span>Next</span>
                    </Button> : <div></div>}
                </div> : <div className='max-w-[1389px] flex justify-end items-center bg-transparent my-4 mx-auto'>
                    <Button
                        radius="lg"
                        className={"bg-gradient-to-tr text-white w-36  " + (!usernames.length || !usernames[0]?.link ? " from-gray-700 to-gray-800 cursor-not-allowed" : "from-purple-light to-purple-weight")}
                        isDisabled={!usernames.length || !usernames[0]?.link}
                        size='lg'
                        onPress={handlesubmitUsernamesForFreeTrial}
                    >
                        <span>Submit</span>
                    </Button>
                </div>}
            </div>
            <Modal
                backdrop="opaque"
                isOpen={(step != 0 && isOpen) || (plan == 'trial' && isOpen)}
                onClose={onOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
                hideCloseButton
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {() => (
                        <>
                            <ModalBody>
                                <div className='mx-auto flex items-center justify-center -mb-24'>{icons.success}</div>
                                {
                                    plan != 'trial' ? <span className='font-bold text-2xl text-center capitalize leading-9'>Paid Successfully!</span>
                                        : <span className='font-bold text-2xl text-center capitalize leading-9'>Usernames added Successfully!</span>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    radius="lg"
                                    className="bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647] mx-auto"
                                    size='md'
                                    onPress={() => window.open("/app/dashboard", '_current')}
                                >
                                    <span>Go to Dashboard</span>
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </div >
    )
}
