"use client";
import Image from 'next/image';
import {
    Button, Modal, ModalBody, ModalContent, ModalFooter, Switch,
    useDisclosure
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { FirstTip, SecondTip, ThirdTip } from "@/components/utils/Icons";
import { SelectSwitch, UnselectSwitch, Success, WarningOnModal, Shine } from "@/components/utils/Icons";
import LeftChat from '@/public/assets/recovery/left-chat.svg';
import RightChat from '@/public/assets/recovery/right-chat.svg';
import Photo from '@/public/assets/recovery/photo.svg';
import { handleDeleteSubmition } from '@/axios/user';

export default function DeleteData() {

    const icons = {
        FirstTip: <FirstTip />,
        SecondTip: <SecondTip />,
        ThirdTip: <ThirdTip />,
        shine: <Shine />,
        success: <Success />,
        warning: <WarningOnModal />,
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [capacityContent, setCapacityContent] = useState("");
    const [legislationContent, setLegislationContent] = useState("");
    const [specificContent, setSpecificContent] = useState("");
    const [requestContent, setRequestContent] = useState([false, false, false]);
    const [warning, setWarning] = useState({});
    const [modalData, setModalData] = useState()

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const DeleteDataTitle = {
        title: "Request for Personal Data Deletion",
        sub_title: "We are committed to safeguarding your privacy and personal data. Please complete the form below to request the deletion of your personal data from the Lock Leaks platform. A member of our team will process the request as promptly as possible"
    }

    const CapacityMaking = [
        "Person whose data is being requested",
        "Parent / legal guardian of the person whose data is being requested",
        "Authorized agent acting on behalf of the consumer"
    ]

    const LegislationMaking = [
        "GDPR"
    ]

    const SpecificRequest = [
        "Deletion of personal data",
        "Restriction or limitation of personal data processing"
    ]

    const ConfirmDataContent = [
        "All information provided is accurate and complete.",
        "I understand that my request will be processed in accordance with data protection regulations.",
        "I acknowledge that a member of our team will reach out to validate the request via the provided email address."
    ]

    const isCheckValidation = useCallback(() => {
        let _warning = {};
        if (!name) {
            _warning.name = "Full Name is required"
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            _warning.email = "Email is invalid"
        }
        if (!capacityContent) {
            _warning.capacity = "Capacity Content is required"
        }
        if (!legislationContent) {
            _warning.legislation = "Legislation Content is required"
        }
        if (!specificContent) {
            _warning.specific = "Specific Content is required"
        }
        if (requestContent.filter(p => p == true).length != requestContent.length) {
            _warning.confirm = "Confirm options are required to sign"

        }

        setWarning(_warning);

        return _warning;

    }, [name, email, capacityContent, legislationContent, specificContent, requestContent, warning]);

    const handleSubmit = useCallback(async () => {
        console.log([name, email, capacityContent, legislationContent, specificContent, requestContent, warning])
        const _warning = isCheckValidation();
        if (!Object.entries(_warning).length) {
            const res = await handleDeleteSubmition({ name, email, capacityContent, legislationContent, specificContent });

            if (res.status == 'success') {
                setModalData({
                    status: 'success',
                    title: 'Submitted Successfully!',
                    btnText: 'Confirm',
                    action: () => onClose()
                });

                setName("");
                setEmail("");
                setCapacityContent("");
                setLegislationContent("");
                setSpecificContent("");
                setRequestContent([false, false, false]);
                setWarning({});

                onOpen();
            } else {
                setModalData({
                    status: 'failed',
                    title: 'Faild to submit Data',
                    btnText: 'Try again!',
                    action: () => onClose()
                });
                onOpen();
            }
        }
    }, [name, email, capacityContent, legislationContent, specificContent, requestContent, warning])

    return (
        <div className="flex flex-col text-white w-full">

            {/* This section for request personal data*/}

            <div className="text-center gap-10 mt-10 max-sm:mt-5 max-xl:px-3 z-0">
                <div className='max-w-[600px] mx-auto'><p className="font-medium text-[50px] max-lg:text-3xl">{DeleteDataTitle.title}</p></div>
                <div className='max-w-[980px] mx-auto mt-5'><span className='font-normal text-base'>{DeleteDataTitle.sub_title}</span></div>
            </div>
            <div className="flex max-w-[752px] mx-auto w-full flex-col gap-4 p-10 max-md:p-10 z-10 relative">
                <div className='flex flex-col'>
                    <p>Full name:</p>
                    <input
                        type='text'
                        placeholder='Type here'
                        className="form-select bg-white text-black p-2 rounded-lg mt-5 block w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className='text-xs text-red-700 mt-2'>{warning.name}</p>
                </div>
                <div>
                    <p>Email Address used for the Lock Leaks account:</p>
                    <input
                        type='text'
                        placeholder='Type here'
                        className="form-select bg-white text-black p-2 rounded-lg mt-5 block w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className='text-xs text-red-700 mt-2'>{warning.email}</p>
                </div>
                <div className='relative max-2xl:hidden'>
                    <Image src={RightChat} className='absolute -right-52 rotate-[-50deg] w-48 h-44 z-0' alt='right rotate chat' />
                    <Image src={LeftChat} className='absolute -right-72 -top-52 rotate-[50deg] z-0' alt='left lotate chat' />
                </div>
            </div>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-20 left-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />

            {/* This section for define request data*/}

            <div className='max-lg:px-3 relative max-w-[730px] mx-auto '>
                <div className="flex backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] w-full flex-col max-md:p-5 gap-4 p-20 text-center relative z-10">
                    <div>
                        <span className='font-medium text-3xl mt-3 max-lg:text-lg'>Your capacity in making this request:</span>
                        <p className='text-xs text-red-700 mt-2'>{warning.capacity}</p>
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                CapacityMaking.map((capacity, index) => {
                                    return (
                                        <div className='flex mt-5 items-center' key={index}>
                                            <div className="flex flex-col gap-2">
                                                <Switch
                                                    size="lg"
                                                    color="default"
                                                    isSelected={capacity == capacityContent}
                                                    thumbIcon={({ isSelected, className }) => {
                                                        return isSelected ? (
                                                            <SelectSwitch className={className} />
                                                        ) : (
                                                            <UnselectSwitch className={className} />
                                                        )
                                                    }}
                                                    onValueChange={(value) => {
                                                        if (value) setCapacityContent(capacity);
                                                        else setCapacityContent("");
                                                    }}
                                                >
                                                </Switch>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder='Type here'
                                                value={capacity}
                                                disabled
                                                className='w-full outline-none p-2 rounded-lg bg-white text-black relative z-10'
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mt-10'>
                        <span className='font-medium text-3xl mt-3 max-md:text-lg'>Under which legislation are you making this request?</span>
                        <p className='text-xs text-red-700 mt-2'>{warning.legislation}</p>
                        <div className='relative max-xl:hidden'>
                            <Image src={RightChat} className='absolute -left-96 -top-32 w-[500px] h-[450px] rotate-[-50deg] z-0' alt='right rotate chat' />
                        </div>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={1033} height={842} className='max-md:hidden absolute z-0 top-0 left-96 bg-[#362666] bg-opacity-5 blur-3xl max-2xl:hidden' />
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                LegislationMaking.map((legislation, index) => {
                                    return (
                                        <div className='flex mt-5 items-center' key={index}>
                                            <div className="flex flex-col gap-2">
                                                <Switch
                                                    size="lg"
                                                    color="default"
                                                    isSelected={legislation == legislationContent}
                                                    thumbIcon={({ isSelected, className }) => {
                                                        return isSelected ? (
                                                            <SelectSwitch className={className} />
                                                        ) : (
                                                            <UnselectSwitch className={className} />
                                                        )
                                                    }}
                                                    onValueChange={(value) => {
                                                        if (value) setLegislationContent(legislation);
                                                        else setLegislationContent("");
                                                    }}
                                                >
                                                </Switch>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder='Type here'
                                                value={legislation}
                                                disabled
                                                className='w-full outline-none p-2 rounded-lg bg-white text-black z-10'
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }
                            <div className='flex mt-5 items-center'>
                                <div className="flex flex-col gap-2">
                                    <Switch
                                        size="lg"
                                        color="default"
                                        isSelected={!LegislationMaking.find(p => p == legislationContent)}
                                        thumbIcon={({ isSelected, className }) => {
                                            return isSelected ? (
                                                <SelectSwitch className={className} />
                                            ) : (
                                                <UnselectSwitch className={className} />
                                            )
                                        }}
                                        onValueChange={(value) => {
                                            setLegislationContent("");
                                        }}
                                    >
                                    </Switch>
                                </div>
                                <input
                                    type="text"
                                    placeholder='Other (please specify in the field below)'
                                    value={!LegislationMaking.find(p => p == legislationContent) ? legislationContent : ""}
                                    onChange={(e) => setLegislationContent(e.target.value)}
                                    className='w-full outline-none p-2 rounded-lg bg-white text-black z-10'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <span className='font-medium text-3xl mt-3 max-md:text-lg'>Do you have a specific request related to your personal data?</span>
                        <p className='text-xs text-red-700 mt-2'>{warning.specific}</p>
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                SpecificRequest.map((specific, index) => {
                                    return (
                                        <div className='flex mt-5 items-center' key={index}>
                                            <div className="flex flex-col gap-2">
                                                <Switch
                                                    size="lg"
                                                    color="default"
                                                    isSelected={specific == specificContent}
                                                    thumbIcon={({ isSelected, className }) => {
                                                        return isSelected ? (
                                                            <SelectSwitch className={className} />
                                                        ) : (
                                                            <UnselectSwitch className={className} />
                                                        )
                                                    }}
                                                    onValueChange={(value) => {
                                                        if (value) setSpecificContent(specific);
                                                        else setSpecificContent("");
                                                    }}
                                                >
                                                </Switch>
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder='Type here'
                                                value={specific}
                                                disabled
                                                className='w-full outline-none p-2 rounded-lg bg-white text-black'
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }

                            <div className='flex mt-5 items-start'>
                                <div className="flex flex-col gap-2 mt-2">
                                    <Switch
                                        size="lg"
                                        color="default"
                                        isSelected={!SpecificRequest.find(p => p == specificContent)}
                                        thumbIcon={({ isSelected, className }) => {
                                            return isSelected ? (
                                                <SelectSwitch className={className} />
                                            ) : (
                                                <UnselectSwitch className={className} />
                                            )
                                        }}
                                        onValueChange={(value) => {
                                            setSpecificContent("")
                                        }}
                                    >
                                    </Switch>
                                </div>
                                <textarea
                                    cols="20"
                                    rows="5"
                                    className='rounded-[10px] text-black bg-white max-w-[506px] w-full p-4'
                                    placeholder='Other (please specify in the field below)'
                                    value={!SpecificRequest.find(p => p == specificContent) ? specificContent : ""}
                                    onChange={(e) => {
                                        setSpecificContent(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <Image src={LeftChat} className='max-xl:hidden absolute rotate-[50deg] w-[430px] h-[240px] top-[calc(50%-10px)] -left-[calc(50%-70px)] ' alt='left rotate chat' />
            </div>
            <div className='relative flex w-[calc(100vw-20px)]'>
                <Image src={Photo} className='absolute right-80 -top-48 max-2xl:hidden' alt='photo' />
                <Image src={RightChat} className='absolute right-[510px] -top-8 max-2xl:hidden' alt='right rotate chat' />
            </div>

            {/* This section for confirm personal data*/}

            <div className='mt-24 max-xl:mt-10 mx-auto max-md:px-3 z-0'>
                <div className="text-center">
                    <div className='mx-auto'><p className="font-medium text-[50px] max-md:text-4xl uppercase">I confirm that:</p></div>
                    <p className='text-xs text-red-700 mt-2'>{warning.confirm ? "You must confirm all things before submition" : ""}</p>
                </div>
                <div className="flex w-full flex-col gap-4 mt-10">
                    {
                        ConfirmDataContent.map((content, index) => {
                            return (
                                <div className='flex mt-5 items-center' key={index}>
                                    <div className="flex flex-col gap-2">
                                        <Switch
                                            size="lg"
                                            color="default"
                                            isSelected={requestContent[index]}
                                            thumbIcon={({ isSelected, className }) => {
                                                return isSelected ? (
                                                    <SelectSwitch className={className} />
                                                ) : (
                                                    <UnselectSwitch className={className} />
                                                )
                                            }}
                                            onValueChange={(value) => {
                                                setRequestContent(p => {
                                                    let _p = p.slice();
                                                    _p[index] = value;
                                                    return _p;
                                                })
                                            }}
                                        >
                                        </Switch>
                                    </div>
                                    <p>{content}</p>
                                </div>
                            )
                        })
                    }

                    {/* This section for define submit request content*/}

                    <div className='mt-5 items-center mx-auto mb-20'>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-tr max-xl:w-[1/2] from-[#9C3FE4] to-[#C65647] text-white shadow-lg px-10 py-6 text-lg"
                            size='md'
                            onClick={handleSubmit}
                        >
                            <span>Submit Request</span>
                            <span>{icons.shine}</span>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
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
                                <div className='mx-auto flex items-center justify-center -mb-24'>{modalData?.status == 'success' ? icons.success : icons.warning}</div>
                                <p className='font-bold text-2xl text-center capitalize leading-9'>{modalData?.title}</p>
                                {/* <span className='font-bold text-2xl text-center capitalize leading-9'>Usernames added Successfully!</span> */}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    radius="lg"
                                    className="bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647] mx-auto"
                                    size='md'
                                    onPress={modalData?.action}
                                >
                                    <span>{modalData?.btnText}</span>
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </div>
    )
}
