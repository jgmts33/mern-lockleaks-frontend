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
            platform:"Cam.com+2",
            socialmedia:"Facebook+2",
            reponse:"Yes",
            goal:"Paid"
        },{
            name: "John +2 ",
            platform:"Cam.com+2",
            socialmedia:"Facebook+2",
            reponse:"No",
            goal:"No"
        },{
            name: "John +2 ",
            platform:"Cam.com+2",
            socialmedia:"Facebook+2",
            reponse:"Yes",
            goal:"Paid"
        },{
            name: "John +2 ",
            platform:"Cam.com+2",
            socialmedia:"Facebook+2",
            reponse:"No",
            goal:"No"
        }
    ]

    const handlePingManagement = () => {
        onOpenChange(!isOpen)
        onOpen();
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-10 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>PING MODELS</span>
            </div>
            <div className='flex max-w-[1232px] justify-between mt-10'>
                <span className='font-semibold text-base'>Info</span>
            </div>
            <div className='flex max-w-[1232px] justify-between mt-16'>
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
            <div className='grid grid-cols-5 max-w-[1400px] mt-5 px-10'>
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
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] max-w-[1400px] mt-10 w-full'>
                <ScrollShadow className='h-[400px]'>
                    <div className='w-full'>
                        {
                            PingModelContent.map((items, index) => {
                                return (
                                    <div className='grid grid-cols-5 py-6 font-semibold text-lg items-center px-5'>
                                        <div>
                                            <span>{items.name}</span>
                                        </div>
                                        <div>
                                            <span>{items.platform}</span>
                                        </div>
                                        <div>
                                            <span>{items.socialmedia}</span>
                                        </div>
                                        <div>
                                            <span>{items.reponse}</span>
                                        </div>
                                        <div>
                                            <span>{items.goal}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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
