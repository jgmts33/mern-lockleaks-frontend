"use client";
import Image from 'next/image';
import {
    Button, Link, Switch
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { FirstTip, SecondTip, ThirdTip } from "@/components/utils/Icons";
import { SelectSwitch, UnselectSwitch, Shine } from "@/components/utils/Icons";
import LeftChat from '@/public/assets/recovery/left-chat.svg';
import RightChat from '@/public/assets/recovery/right-chat.svg';
import RobertHand from '@/public/assets/recovery/robert-hand.svg';
import Photo from '@/public/assets/recovery/photo.svg';

export default function DeleteData() {

    const icons = {
        FirstTip: <FirstTip fill="currentColor" size={16} />,
        SecondTip: <SecondTip fill="currentColor" size={16} />,
        ThirdTip: <ThirdTip fill="currentColor" size={16} />,
        shine: <Shine fill="currentColor" size={16} />,
    };

    const DeleteDataTitle = {
        title: "Request for Personal Data Deletion",
        sub_title: "We are committed to safeguarding your privacy and personal data. Please complete the form below to request the deletion of your personal data from the LockLeaks platform. A member of our team will process the request as promptly as possible"
    }

    const CapacityMaking = [
        {
            content: "Person whose data is being requested",
        }, {
            content: "Parent / legal guardian of the person whose data is being requested"
        }, {
            content: "Authorized agent acting on behalf of the consumer"
        }
    ]

    const LegislationMaking = [
        {
            content: "GDPR"
        }, {
            content: "Other (please specify in the field below)"
        }, {
            content: ""
        }
    ]

    const SpecificRequest = [
        {
            content: "Deletion of personal data",
        }, {
            content: "Restriction or limitation of personal data processing"
        }, {
            content: "Other (please specify in the field below)"
        }
    ]

    const ConfirmDataContent = [
        {
            content: "All information provided is accurate and complete."
        }, {
            content: "I understand that my request will be processed in accordance with data protection regulations."
        }, {
            content: "I acknowledge that a member of our team will reach out to validate the request via the provided email address."
        }
    ]


    return (
        <div className="flex flex-col text-white w-full">

            {/* This section for request personal data*/}

            <div className="text-center gap-10 mt-10 max-sm:mt-5 max-xl:px-3 z-10">
                <div className='max-w-[600px] mx-auto'><p className="font-medium text-[50px] max-lg:text-3xl">{DeleteDataTitle.title}</p></div>
                <div className='max-w-[980px] mx-auto mt-5'><span className='font-normal text-base'>{DeleteDataTitle.sub_title}</span></div>
            </div>
            <div className="flex max-w-[752px] mx-auto w-full flex-col gap-4 p-10 max-md:p-10 z-10">
                <div className='flex flex-col'>
                    <p>Full name:</p>
                    <input type='text' placeholder='Type here' className="form-select bg-white text-black p-2 rounded-lg mt-5 block w-full" />
                </div>
                <div>
                    <p>Email Address used for the LockLeaks account:</p>
                    <input type='text' placeholder='Type here' className="form-select bg-white text-black p-2 rounded-lg mt-5 block w-full" />
                </div>
                <div>
                    <p>Email Address:</p>
                    <input type='text' placeholder='Type here' className="form-select bg-white text-black p-2 rounded-lg mt-5 block w-full" />
                </div>
                <div className='relative max-2xl:hidden'>
                    <Image src={RightChat} className='absolute -right-52 rotate-[-50deg] w-48 h-44' alt='right rotate chat' />
                    <Image src={LeftChat} className='absolute -right-72 -top-52 rotate-[50deg]' alt='left lotate chat' />
                </div>
            </div>
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-20 left-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />
            <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={633} height={642} className='absolute top-0 right-0 bg-[#362666] bg-opacity-5 blur-3xl max-xl:hidden' />

            {/* This section for define request data*/}

            <div className='max-lg:px-3 relative max-w-[730px] mx-auto'>
                <div className="flex z-10 backdrop-blur-sm bg-white/5 shadow-sm shadow-gray-50 rounded-[20px] w-full flex-col max-md:p-5 gap-4 p-20 text-center relative ">
                    <div>
                        <span className='font-medium text-3xl mt-3 max-lg:text-lg'>Your capacity in making this request:</span>
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                CapacityMaking.map((capacity, index) => {
                                    return (
                                        <div className='flex mt-5' key={index}>
                                            <div className="flex flex-col gap-2">
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
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder='Type here'
                                                value={capacity.content}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
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
                        <div className='relative max-xl:hidden'>
                            <Image src={RightChat} className='absolute -left-96 z-0 -top-32 w-[500px] h-[450px] rotate-[-50deg]' alt='right rotate chat' />
                        </div>
                        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={1033} height={842} className='max-md:hidden absolute top-0 left-96 bg-[#362666] bg-opacity-5 blur-3xl max-2xl:hidden' />
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                LegislationMaking.map((legislation, index) => {
                                    return (
                                        <div className='flex mt-5' key={index}>
                                            <div className="flex flex-col gap-2">
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
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder='Type here'
                                                value={legislation.content}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mt-10'>
                        <span className='font-medium text-3xl mt-3 max-md:text-lg'>Do you have a specific request related to your personal data?</span>
                        <div className="flex w-full flex-col gap-4 mt-10">
                            {
                                SpecificRequest.map((specific, index) => {
                                    return (
                                        <div className='flex mt-5' key={index}>
                                            <div className="flex flex-col gap-2">
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
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder='Type here'
                                                value={specific.content}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
                                                required
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <textarea name="" id="" cols="20" rows="5" className='mt-5 rounded-[10px] text-black bg-white max-w-[506px] w-full'></textarea>
                    </div>

                </div>
                <Image src={LeftChat} className='max-xl:hidden absolute rotate-[50deg] w-[430px] h-[240px] top-[calc(50%-10px)] -left-[calc(50%-70px)] ' alt='left rotate chat' />
            </div>
            <div className='relative flex w-[calc(100vw-20px)]'>
                <Image src={Photo} className='absolute right-80 -top-48 max-2xl:hidden' alt='photo' />
                <Image src={RightChat} className='absolute right-[510px] -top-8 max-2xl:hidden' alt='right rotate chat' />
                <Image src={RobertHand} className='absolute right-0 -mt-32 max-xl:-mt-5 max-xl:hidden' alt='robert hand' />
            </div>

            {/* This section for confirm personal data*/}

            <div className='mt-24 max-xl:mt-10 mx-auto max-md:px-3 z-10'>
                <div className="text-center">
                    <div className='mx-auto'><p className="font-medium text-[50px] max-md:text-4xl uppercase">I confirm that:</p></div>
                </div>
                <div className="flex w-full flex-col gap-4 mt-10">
                    {
                        ConfirmDataContent.map((content, index) => {
                            return (
                                <div className='flex mt-5' key={index}>
                                    <div className="flex flex-col gap-2">
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
                                    <p>{content.content}</p>
                                </div>
                            )
                        })
                    }

                    {/* This section for define submit request content*/}

                    <div className='mt-5 items-center mx-auto mb-20'>
                        <Button radius="lg" className="bg-gradient-to-tr max-xl:w-[1/2] from-[#9C3FE4] to-[#C65647] text-white shadow-lg px-10 py-6 text-lg" size='md'>
                            Submit Request
                            <span>{icons.shine}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
