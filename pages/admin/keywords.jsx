"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader
} from '@nextui-org/react';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";
import { addNewKeyword } from '@/axios/keyword';

export default function PingModels() {
    const router = useRouter();

    const icons = {
        search: <Search fill="currentColor" size={16} />,
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [targetKeywordType, setTargetKeywordType] = useState("");
    const [newBasicKeyword, setNewBasicKeyword] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newKeywords, setNewKeywords] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [basicKeywords, setBasicKeywords] = useState([
        {
            id: "1",
            keyword: "info"
        },
        {
            id: "2",
            keyword: "basic"
        },
        {
            id: "3",
            keyword: "of"
        },
        {
            id: "4",
            keyword: "from"
        },
        {
            id: "5",
            keyword: "good at"
        },
        {
            id: "6",
            keyword: "love"
        },
        {
            id: "7",
            keyword: "dislike"
        },
        {
            id: "8",
            keyword: "afraid"
        }
    ]);
    const [customKeywords, setCustomKeywords] = useState([
        {
            id: "1",
            website: "onlyfans.com",
            keywords: "of leak, only fans leak, onlyfans free"
        },
        {
            id: "2",
            website: "pornhub.com",
            keywords: "porn hub, pornhub free videos, porn"
        },
        {
            id: "3",
            website: "xvideos.com",
            keywords: "x videos, xvideo, xvideos free"
        },
        {
            id: "4",
            website: "redtube.com",
            keywords: "red tube, redtube videos, redt"
        },
        {
            id: "5",
            website: "youporn.com",
            keywords: "you porn, youporn videos, youp"
        }
    ]);

    const handleAddNewKeyword = useCallback(async () => {
        setIsAdding(true);

        if (targetKeywordType === "basic") {
            const res = await addNewKeyword({
                website: newWebsite,
                keyword: newBasicKeyword,
                keywords: newKeywords
            });

            if (res.status == 'success') {
                if (targetKeywordType === "basic") {
                    setBasicKeywords([...basicKeywords, { id: res.data.id, keyword: newBasicKeyword }]);
                } else {
                    setCustomKeywords([...customKeywords, { id: res.data.id, website: newWebsite, keywords: newKeywords }]);
                }
            }
        }

    }, [basicKeywords, customKeywords, targetKeywordType, newWebsite, newKeywords, newBasicKeyword]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white max-lg:mx-auto">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>KEYWORDS DATASET</span>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-6 w-full mt-10'>
                <div>
                    <p className='mb-2'>Basic Keywords</p>
                    <div className='flex justify-center items-center gap-2'>
                        <Input
                            isClearable
                            radius="lg"
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
                            placeholder="Search by Keyword"
                            startContent={
                                <span>{icons.search}</span>
                            }
                        />
                        <Button
                            radius="full"
                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                            size='sm'
                            onClick={() => {
                                setTargetKeywordType("basic");
                                onOpen();
                            }}
                        >
                            ADD
                        </Button>
                    </div>
                    <ScrollShadow className='mt-4 h-60 overflow-y-auto'>
                        {
                            basicKeywords.map((item) => <div className='flex items-center gap-x-3 py-2 pl-2 pr-20' key={item.id}>
                                <Input
                                    radius="lg"
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
                                    value={item.keyword}
                                    disabled
                                />
                                <Button radius="full" className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"} size='sm' onClick={() => { }}>
                                    Delete
                                </Button>
                            </div>)
                        }
                    </ScrollShadow>
                </div>
                <div>
                    <p className='mb-2'>Custom Keywords</p>
                    <div className='flex justify-center items-center gap-2'>
                        <Input
                            isClearable
                            radius="lg"
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
                            placeholder="Search by Website"
                            startContent={
                                <span>{icons.search}</span>
                            }
                        />
                        <Button
                            radius="full"
                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"} size='sm'
                            onClick={() => {
                                setTargetKeywordType("custom");
                                onOpen();
                            }}
                        >
                            ADD
                        </Button>
                    </div>
                    <ScrollShadow className='mt-4 h-60 overflow-y-auto'>
                        {
                            customKeywords.map((item) => <div className='flex items-center gap-x-3 py-2 pl-2 pr-20' key={item.id}>
                                <Input
                                    radius="lg"
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
                                    value={item.website}
                                    disabled
                                />
                                <Button
                                    radius="full"
                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                    size='sm'
                                    onClick={() => {

                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    radius="full"
                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                    size='sm'
                                    onClick={() => {

                                    }}
                                >
                                    Delete
                                </Button>
                            </div>)
                        }
                    </ScrollShadow>
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
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {targetKeywordType == 'basic' ? "New Basic Keyword" : "New Custom Keyword"}
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col'>
                                    {
                                        targetKeywordType == 'basic' ? <div className='flex w-full flex-col space-y-2'>
                                            <Input
                                                type="text"
                                                label="Keyword"
                                                value={newBasicKeyword}
                                                onChange={(e) => setNewBasicKeyword(e.target.value)}
                                            />
                                        </div>
                                            :
                                            <div className='flex w-full flex-col space-y-2'>
                                                <p className='text-left'> Website </p>
                                                <Input
                                                    type="text"
                                                    label="example.com"
                                                    value={newWebsite}
                                                    onChange={(e) => setNewWebsite(e.target.value)}
                                                />
                                                <p className='text-left'> Keywords <small>(type multiple keywords with ',' symbol)</small> </p>
                                                <Input
                                                    type="text"
                                                    label="Keyword"
                                                    value={newKeywords}
                                                    onChange={(e) => setNewKeywords(e.target.value)}
                                                />
                                            </div>
                                    }
                                    <div className='flex my-2 mt-4 justify-end'>
                                        <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onClick={handleAddNewKeyword}
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
    )
}