"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";

export default function PingModels() {
    const router = useRouter();

    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const PingModelContent = [
        {
            name: "John +2 ",
            platform: "Cam.com+2",
            socialmedia: "Facebook+2",
        }, {
            name: "John +2 ",
            platform: "Cam.com+2",
            socialmedia: "Facebook+2",
        }, {
            name: "John +2 ",
            platform: "Cam.com+2",
            socialmedia: "Facebook+2",
        }, {
            name: "John +2 ",
            platform: "Cam.com+2",
            socialmedia: "Facebook+2",
        }
    ]

    const handlePingManagement = () => {
        onOpenChange(!isOpen)
        onOpen();
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PING MODELS</span>
            </div>
            <div className='flex max-w-[1232px] justify-between mt-5'>
                <span className='font-semibold text-base'>Info</span>
            </div>
            <div className='flex max-w-[1170px] justify-between mt-10'>
                <Input
                    isClearable
                    radius="lg"
                    className='w-56'
                    classNames={{
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focused=true]:bg-default-200/50",
                            "dark:group-data-[focused=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Search by Email"
                    startContent={
                        <span>{icons.search}</span>
                    }
                />
                <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={() => handlePingManagement()}>
                    ADD
                </Button>
            </div>
            <ScrollShadow className='max-sm:w-[500px]'>
                <div className='max-w-[1400px] grid grid-cols-5 mt-5 px-10 w-full max-sm:hidden'>
                    <div>
                        <span>MODEL NAME</span>
                    </div>
                    <div>
                        <span>PLATFORM</span>
                    </div>
                    <div>
                        <span>SOCIAL MEDIA</span>
                    </div>
                    <div>
                        <span>RESPONSE</span>
                    </div>
                    <div>
                        <span>GOAL</span>
                    </div>
                </div>
            </ScrollShadow>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 max-sm:px-2 rounded-[16px] max-w-[1400px] mt-10 w-full max-sm:py-5'>
                <ScrollShadow className='h-[400px]'>
                    <ScrollShadow className='max-sm:w-[1300px]'>
                        <div className='w-full grid grid-cols-5 mt-5 sm:hidden'>
                            <div>
                                <span>MODEL NAME</span>
                            </div>
                            <div>
                                <span>PLATFORM</span>
                            </div>
                            <div>
                                <span>SOCIAL MEDIA</span>
                            </div>
                            <div>
                                <span>RESPONSE</span>
                            </div>
                            <div>
                                <span>GOAL</span>
                            </div>
                        </div>
                        <div className='w-full'>
                            {
                                PingModelContent.map((items, index) => {
                                    return (
                                        <div key={index} className='grid grid-cols-5 py-6 font-semibold text-base items-center px-5'>
                                            <div className='flex gap-5 items-center'>
                                                <div>
                                                    <span>{items.name}</span>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={() => handlePingManagement()}>
                                                        VIEW DATA
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex gap-5 items-center'>
                                                <div>
                                                    <span>{items.platform}</span>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={() => handlePingManagement()}>
                                                        VIEW DATA
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex gap-5 items-center'>
                                                <div>
                                                    <span>{items.socialmedia}</span>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={() => handlePingManagement()}>
                                                        VIEW DATA
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-gray-700 to-gray-800"} size='sm'>
                                                        No
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                                        Yes
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-gray-700 to-gray-800"} size='sm'>
                                                        No
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button radius="full" className={"border border-gray-500 text-white shadow-lg text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                                        Yes
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                            <ModalHeader></ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col'>
                                    <div className='flex mt-5 w-full px-3'>
                                        <Input type="text" label="Type Here" />
                                    </div>
                                    <div className='flex mt-5 justify-end'>
                                        <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                            save
                                        </Button>
                                    </div>
                                    <div className='flex mt-5 w-full justify-between px-5'>
                                        <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='md'>
                                            Website
                                        </Button>
                                        <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='md'>
                                            Method
                                        </Button>
                                        <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='md'>
                                            Links
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
