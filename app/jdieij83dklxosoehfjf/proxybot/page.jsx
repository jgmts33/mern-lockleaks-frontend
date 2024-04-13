"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, Input, user
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tuple } from 'yup';

export default function ProxyBot() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const proxybotContent = [
        {
            vpsname: "VPS1",
            proxynumber: 2,
            expiredate: "02.08.2024",
        }
    ]

    const handleAddProxy = () => {
        onOpenChange(!isOpen)
        onOpen();
    }

    const handleCredential = () => {
        onOpenChange(!isOpen)
        onOpen();
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 max-sm:pt-16 space-y-10 container text-white max-lg:mx-auto max-sm:space-y-5">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PROXIES / VPS  BOTS</span>
            </div>
            <div className='flex items-center justify-between max-w-[1100px]'>
                <div><span className=''>INFO</span></div>
                <div>
                    <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm' onClick={() => handleAddProxy()}>
                        Add
                    </Button>
                </div>
            </div>
            <div className='flex max-w-[650px] justify-between px-5 max-sm:px-0 max-sm:hidden'>
                <span className='font-semibold text-base'>VPS NAME</span>
                <span className='font-semibold text-base'>PROXIES NUMBER</span>
                <span className='font-semibold text-base'>EXPIRE DATE</span>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1300px] mt-10 w-full'>
                <ScrollShadow className='h-[350px]'>
                    <ScrollShadow className='max-sm:w-[800px]'>
                        {
                            proxybotContent.map((items, index) => {
                                return (
                                    <div key={index} className='flex max-sm:flex-col justify-between text-white'>
                                        <div className='flex justify-between w-full'>
                                            <div className='flex flex-col'>
                                                <div className='sm:hidden'>
                                                    <span className='font-semibold text-base'>VPS NAME</span>
                                                </div>
                                                <div className='mt-5'>
                                                    <span>{items.vpsname}</span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='sm:hidden'>
                                                    <span className='font-semibold text-base'>PROXIES NUMBER</span>
                                                </div>
                                                <div className='mt-5'>
                                                    <span>{items.proxynumber}</span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='sm:hidden'>
                                                    <span className='font-semibold text-base'>EXPIRE DATE</span>
                                                </div>
                                                <div className='mt-5'>
                                                    <span>{items.expiredate}</span>
                                                </div>
                                            </div>
                                            <div className='flex space-x-10'>
                                                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                                    Update
                                                </Button>
                                                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                                    Delete
                                                </Button>
                                                <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base" size='sm' onClick={() => handleCredential()}>
                                                    View Credentials
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </ScrollShadow>
                </ScrollShadow>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size='2xl'
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div></div>
                            </ModalBody>
                            <ModalFooter>
                                <div className='flex flex-col'>
                                    <div className='flex'>
                                        <span className='font-semibold text-base'>ADD NEW VPS INFO</span>
                                    </div>
                                    <div className='flex space-x-8 mt-10'>
                                        <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                            VPS name
                                        </Button>
                                        <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                            Proxies
                                        </Button>
                                        <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                            VPS IP
                                        </Button>
                                        <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800t border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                            Expire date
                                        </Button>
                                        <Button radius="full" className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base" size='sm'>
                                            credentials
                                        </Button>
                                    </div>
                                    <div className='flex mt-5 w-1/2'>
                                        <Input type="text" label="Type Here" />
                                    </div>
                                    <div className='mt-5 flex items-start'>
                                        <Button radius="full" className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg px-5 text-base" size='sm'>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
