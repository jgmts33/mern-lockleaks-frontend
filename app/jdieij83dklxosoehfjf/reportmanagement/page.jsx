"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";

export default function ReportManagement() {
    const router = useRouter();

    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const ReportsContent = [
        {
            domain: "CAM.COM ",
            links: 30
        }, {
            domain: "CAM.COM ",
            links: 30
        }, {
            domain: "CAM.COM ",
            links: 30
        }
    ]

    const handleShowMoreDetails = () => {
        router.push("/jdieij83dklxosoehfjf/users/usersview")
    }

    const handleReportManagement = () => {
        onOpenChange(!isOpen)
        onOpen();
    }

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='mt-5 max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>REPORTS MANAGEMENT</span>
            </div>
            <div className='flex max-w-[1232px] justify-between mt-10 max-sm:mt-5'>
                <span className='font-semibold text-base'>Info</span>
            </div>
            <div className='flex max-w-[1032px] justify-between mt-16 max-sm:mt-5'>
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
                <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm' onClick={() => handleReportManagement()}>
                    ADD
                </Button>
            </div>
            <div className='grid grid-cols-4 w-full max-w-[1200px] mt-5 px-10 max-sm:hidden'>
                <div>
                    <span>WEBSITE</span>
                </div>
                <div>
                    <span>METHOD</span>
                </div>
                <div className='pl-10'>
                    <span>LINKS</span>
                </div>
                <div className='pl-20'>
                    <span>SUCCESS</span>
                </div>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-5 rounded-[16px] max-w-[1300px] mt-10 w-full'>
                <ScrollShadow className='h-[400px]'>
                    <ScrollShadow className='max-sm:w-[600px]'>
                        <div className='grid grid-cols-4 w-full max-w-[1200px] mt-5 px-10 sm:hidden max-sm:max-w-full max-sm:px-0'>
                            <div>
                                <span>WEBSITE</span>
                            </div>
                            <div>
                                <span>METHOD</span>
                            </div>
                            <div className='pl-10 max-sm:pl-0'>
                                <span>LINKS</span>
                            </div>
                            <div className='pl-20 max-sm:pl-0'>
                                <span>SUCCESS</span>
                            </div>
                        </div>
                        <div className='w-full'>
                            {
                                ReportsContent.map((items, index) => {
                                    return (
                                        <div key={index} className='grid grid-cols-4 py-6 font-semibold text-lg items-center max-sm:font-normal max-sm:text-sm'>
                                            <div>
                                                <span>{items.domain}</span>
                                            </div>
                                            <div>
                                                <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                                    View
                                                </Button>
                                            </div>
                                            <div>
                                                <span>{items.links}</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                                    Yes
                                                </Button>
                                                <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"} size='sm'>
                                                    No
                                                </Button>
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
                                    <div className='flex mt-5 w-full'>
                                        <Input type="text" label="Type Here" />
                                    </div>
                                    <div className='flex mt-5 justify-end'>
                                        <Button radius="lg" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'>
                                            save
                                        </Button>
                                    </div>
                                    <div className='flex mt-5 w-full justify-around'>
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
