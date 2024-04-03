"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoContract() {
    const router = useRouter();

    const contracttips = [
        "Registration and Payment:Registered Members must provide accurate and complete information during the registration process. By registering on the site, Members agree to pay the registration fee set by us.",
        "Rights and Obligations:a. We guarantee Members access to our services according to the terms and conditions set forth on the website.b. Members are responsible for safeguarding the confidentiality of their login information and agree not to disclose this information to third parties.c. We have the right to monitor and moderate user-generated content, as well as to take action in case of violations of our terms and conditions.",
        "Consent for DMCA Copyright Access:a. Hereby, Members grant LockLeaks the right to access and use the content provided by them on our website for copyright reporting purposes, in accordance with applicable laws.b. Members retain their copyright over their content and grant LockLeaks a non-exclusive right to use, reproduce, and display this content within our website.",
        "General Provisions:a. This Contract represents the entire agreement between the parties concerning its subject matter and supersedes any prior or contemporaneous understandings.b. Any modification to this Contract must be made in writing and signed by both parties.c. This Contract is governed by the laws of [Your Jurisdiction], and any dispute relating to it shall be subject to the exclusive jurisdiction of the courts in that jurisdiction."
    ]

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>AUTO-CONTRACT</span>
            </div>
            <div className='mt-5'>
                <span className='font-semibold text-base'>DMCA COPYRIGHT INFRINGEMENT NOTICE CONTRACT</span>
            </div>
            <div>
                <span>This contract ("Contract") is entered into between LockLeaks (referred to herein as "We" or "Administrator") and the user ("Member(s)") registering on our website. By completing the registration process, Members agree to abide by and be governed by the terms and conditions of this Contract.</span>
            </div>
            <div className='px-5 mt-3'>
                <ul className="list-decimal">
                    {
                        contracttips.map((items, index) => {
                            return (
                                <li key={index}>{items}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='flex mt-3'>
                <span>By signing this electronic Contract or by completing the registration process on our website, Members confirm that they have read, understood, and agree to be bound by the terms and conditions of this Contract.</span>
            </div>
            <div className='flex flex-col mt-5 space-y-5 max-w-[310px]'>
                <div className='space-y-1'>
                    <h4>Email:</h4>
                    <Input
                        type="text"
                        size='md'
                        placeholder='Type here'
                    />
                </div>
                <div className='space-y-1'>
                    <h4>Username(s):</h4>
                    <Input
                        type="text"
                        size='md'
                        placeholder='Type here'
                    />
                </div>
                <div className='space-y-1'>
                    <h4>Signature: </h4>
                    <Input
                        type="text"
                        size='md'
                        placeholder='Type here'
                    />
                </div>
                <div className='space-y-1'>
                    <h4>Date:</h4>
                    <Input
                        type="text"
                        size='md'
                        placeholder='Type here'
                    />
                </div>
                <div className='flex justify-end'>
                <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm px-8">
                    SAVE
                </Button>
                </div>
            </div>
            <div className='mt-2'>
                <span>Please make sure to adapt and customize it according to the specific needs and requirements of your website. Additionally, ensure it complies with local laws and regulations, and consult with a legal professional for any clarification or additional assistance.</span>
            </div>
        </div>
    )
}
