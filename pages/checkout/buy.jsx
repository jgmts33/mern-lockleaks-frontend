"use client";
import Image from 'next/image';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Switch,
    useDisclosure,
    Input
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { SelectSwitch, Shine, UnselectSwitch } from '@/components/utils/Icons';
import { scan } from '@/axios/bot';

export default function BUY() {

    const ButtonContent = [
        "2 (+$40)", "3 (+$80)", "4 (+$120)", "CUSTOM"
    ]

    const icons = {
        shine: <Shine fill="currentColor" size={16} />,
    };

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [step, setStep] = useState(0);
    const [usernameCount, setUsernameCount] = useState(1);
    const [customUsernameCount, setCustomUsernameCount] = useState(5);
    const [targetKeyword, setTargetKeyword] = useState({
        username: '',
        link: '',
        update: false
    });
    const [targetKeywordType, setTargetKeywordType] = useState('username');
    const [urlValidation, setUrlValidation] = useState("");
    const [targetKeywordIndex, setTargetKeywordIndex] = useState(0);
    const [keywords, setKeywords] = useState([
        {
            username: '',
            link: ''
        }
    ]);

    const handleSetUsernameCount = useCallback(() => {
        setUsernameCount(customUsernameCount);
        onClose();
    }, [customUsernameCount]);

    const handleSetNewUsername = useCallback(() => {
        console.log(keywords, targetKeywordIndex);
        if (targetKeyword.username) {
            const _keywords = keywords.slice(0);
            _keywords[targetKeywordIndex].username = targetKeyword.username;
            setKeywords(_keywords);
            setTargetKeywordType('link');
        }
    }, [targetKeyword, keywords, targetKeywordIndex]);

    const handleSetNewLink = useCallback(() => {
        setUrlValidation("");
        if (targetKeyword.link && checkLinkValidation()) {
            const _keywords = keywords.slice(0);
            _keywords[targetKeywordIndex].link = targetKeyword.link;
            setKeywords(_keywords);
            setTargetKeyword(null);
            setTargetKeywordType('username');
        }
    }, [targetKeyword, keywords, targetKeywordIndex, usernameCount]);

    const checkLinkValidation = useCallback(() => {
        var url = targetKeyword?.link || "";
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(url)) {
            setUrlValidation("Please enter valid Link.");
            return false;
        }
        return true;
    }, [targetKeyword]);

    const handlePaymentProcess = useCallback(async () => {
        // TODO: payment integration usernameCount, totalPrice

        const promises = [];

        keywords.map((keyword) => {
            promises.push(
                scan({
                    link: keyword.link,
                    username: keyword.username
                })
            )
        });

        Promise.all(promises).then(res => {
            console.log(res);
        })

    }, [keywords, usernameCount]);

    useEffect(() => {
        setKeywords(p => ([...p.splice(0, usernameCount)]))
    }, [usernameCount]);

    return (
        <div className="text-white w-full min-h-[calc(100vh-112px)] max-w-[1389px]  flex flex-col items-center justify-center pb-24 pt-4 px-4">
            {
                step == 0 ?
                    <div className='flex justify-center mx-auto gap-10 max-xl:flex-col max-sm:items-center max-sm:mx-auto max-sm:px-2'>
                        <div className="flex bg-white/5 shadow-sm py-14 rounded-[20px] w-[720px] max-sm:w-full max-sm:h-auto flex-col gap-4 px-20 max-sm:px-6 max-sm:pb-6">
                            <p className='font-medium text-6xl'>ORDER</p>
                            <div className='flex flex-col'>
                                <p className='mt-10'>Tell Us Jow Many Usernames You're Using.</p>
                                <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                                    <option>1 INCLUDED</option>
                                    {/* <option>$5,000</option>
                                    <option>$10,000</option>
                                    <option>$25,000</option> */}
                                </select>
                            </div>
                            <div className='flex-col flex'>
                                <p className='font-medium text-3xl'>ADD NEW USERNAME</p>
                                {
                                    ButtonContent.map((item, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                className={"rounded-[10px] mt-5 max-w-[327px] max-sm:max-w-full bg-gradient-to-tr text-white text-base " + (index + 2 == usernameCount || (index == 3 && usernameCount >= 5) ? "from-purple-light to-purple-weight" : "from-gray-500 to-gray-600")}
                                                size='md'
                                                onPress={() => {
                                                    if (item == "CUSTOM") {
                                                        onOpen();
                                                    } else {
                                                        setUsernameCount(index + 2);
                                                    }
                                                }}
                                            >
                                                {item}
                                                {index == 3 && usernameCount >= 5 ? <span> {usernameCount} (+${usernameCount * 15}) </span> : <></>}
                                                <span>{icons.shine}</span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col bg-gradient-to-tr mx-auto from-[#dd7272] to-[#7d1eeb] h-[430px] rounded-[20px] z-10 p-5 w-full text-center ">
                            <div className='mt-5'>
                                <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                    <span className='px-4'>popular</span>
                                </Button>
                            </div>
                            <div className='p-7 text-center flex flex-col justify-center'>
                                <p className='font-bold text-6xl mt-3'>STAR</p>
                                <p className='font-normal text-5xl mt-10'>$350</p>
                                <p className='font-bold text-3xl'>/MO</p>
                                <p className='font-normal text-base mt-5'>YOU ARE FREE TO CANCEL AT ANY TIME</p>
                                <p className='font-normal text-base'>+ PRICE FROM EXTRA USERNAMES + ADDON CAM MODELS</p>
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
                                                        Save
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
                            <p className='font-medium text-[34px] text-center -mb-4'>USERNAMES LIST</p>
                            <p className='font-medium text-center'>({keywords.filter(p => (p.link != "")).length} USERNAMES)</p>

                            {targetKeyword != null ? <div className="flex bg-gradien t-to-br from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 cursor-pointer flex-col border border-gray-700 py-20 px-10 ">
                                {
                                    targetKeywordType == 'link' ?
                                        <p className='font-medium text-[34px] text-center'>{!targetKeyword.update ? "ADD" : "UPDATE"} LINK TO <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keywords[targetKeywordIndex].username}</span></p>
                                        : <p className='font-medium text-[34px] text-center'> {!targetKeyword.update ? "ADD NEW" : "UPDATE"} USERNAME</p>
                                }
                                <p className='mt-3'>
                                    {targetKeywordType == 'link' ? "We will utilize your profile page URL to establish your ownership of this content" : "We will use your username to identify and report copyright infringements"}
                                </p>
                                <div className="flex w-full flex-col gap-4 mt-5">
                                    <p className='flex justify-start'>{targetKeywordType == 'link' ? "LINK:" : "USERNAME:"}</p>
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
                                                        className='w-full outline-none p-2 rounded-lg bg-white text-black'
                                                        required
                                                    />
                                                    <p className='mt-1 text-red-700'>{urlValidation}</p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div
                                    className='bg-gradient-to-tr max-sm:flex-wrap max-sm:w-full mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center container'
                                >
                                    <Button
                                        radius="full"
                                        className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" /* "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" */
                                        size='lg'
                                        onClick={() => {
                                            if (targetKeywordType == 'link') handleSetNewLink();
                                            else handleSetNewUsername();
                                        }}
                                    >
                                        {targetKeywordType == 'link' ? "Save" : "Next"}
                                    </Button>
                                    <Button
                                        radius="full"
                                        className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" size='lg'
                                        onClick={() => {
                                            setTargetKeyword(null);
                                            setTargetKeywordType("username")
                                            let _keywords = keywords.slice(0, -1);
                                            setKeywords(_keywords);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                                :
                                usernameCount > keywords.length ? <Button
                                    radius="full"
                                    className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" /* "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" */
                                    size='lg'
                                    onClick={() => {
                                        setTargetKeyword({
                                            username: '',
                                            link: ''
                                        });
                                        setKeywords(p => [...p, {
                                            username: '',
                                            link: ''
                                        }])
                                        setTargetKeywordIndex(keywords.length)
                                    }}
                                >
                                    Add New
                                </Button> : <></>
                            }

                            {
                                keywords.map((keyword, index) => {
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
                                                                    setTargetKeyword({ ...keywords[index], update: true });
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                radius="full"
                                                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                size='sm'
                                                                onClick={() => {
                                                                    setKeywords(p => {
                                                                        let _p = p.slice(0);
                                                                        _p.splice(index, 1);
                                                                        return _p;
                                                                    });
                                                                }}
                                                            >
                                                                Delete
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
                            <div className="flex bg-gradient-to-br mt-20 max-sm:mt-8 text-center mx-auto from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 flex-col border border-gray-700 px-5">
                                <p className='font-medium text-[34px] text-center'>PAYMENT</p>
                                <p className='mt-3 font-normal text-base'>We utilize Paddle as our payment processing platform. Paddle ensures secure payment transactions.
                                    Follow the on-screen instructions to complete your purchase securely. Please note, additional VAT costs may apply based on your location.
                                    This charge will be billed at regular intervals until you opt to cancel the automatic renewal.
                                </p>
                                <div className='bg-gradient-to-tr mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-2 border-gray-600 border rounded-[30px] max-w-[676px] gap-3 flex max-md:flex-col items-center'>
                                    <Button
                                        radius="full"
                                        className="mx-auto bg-transparent text-white shadow-lg px-7 py-7 max-md:flex-wrap text-lg"
                                        size='lg'
                                        onClick={handlePaymentProcess}
                                    >
                                        Pay whith credit card
                                    </Button>
                                    <Button
                                        radius="full"
                                        className=" bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-7 text-lg"
                                        size='lg'
                                        onClick={handlePaymentProcess}
                                    >
                                        Pay whith paypal
                                    </Button>
                                    <Button
                                        radius="full"
                                        className=" bg-transparent mx-auto px-7 py-7 text-lg"
                                        size='lg'
                                        onClick={handlePaymentProcess}
                                    >
                                        Request fan support
                                    </Button>
                                </div>
                            </div>
                            <div className='mx-auto text-start mt-20 max-sm:mt-8 mb-40 max-sm:mb-8 max-md:px-3'>
                                <p className='font-normal text-base'>We're utilizing Paddle for payment processing. What is Paddle? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
                                <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
                            </div>
                        </div>
            }
            <div className='max-sm:px-6 w-full fixed bottom-0 bg-black/55 backdrop-blur-xl left-0 z-20 h-20'>
                <div className='max-w-[1389px] flex justify-between items-center bg-transparent my-4 mx-auto'>
                    {step > 0 ? <Button
                        radius="lg"
                        className="bg-gradient-to-tr text-white w-36  from-purple-light to-purple-weight"
                        size='lg'
                        onPress={() => setStep(p => p - 1)}
                    >
                        Back
                    </Button> : <div></div>}
                    {step < 2 ? <Button
                        radius="lg"
                        className={"bg-gradient-to-tr text-white w-36  " + (step == 1 && !keywords.length ? " from-gray-700 to-gray-800 cursor-not-allowed" : "from-purple-light to-purple-weight")}
                        size='lg'
                        disabled={step == 1 && !keywords.length}
                        onPress={() => {
                            if (step == 1 && !keywords.length) return;
                            setStep(p => p + 1)
                        }}
                    >
                        Next
                    </Button> : <div></div>}
                </div>
            </div>
        </div >
    )
}
