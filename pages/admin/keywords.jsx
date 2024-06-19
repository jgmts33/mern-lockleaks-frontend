"use client";
import {
    Button, ScrollShadow, Input, useDisclosure, Modal, ModalContent, ModalBody, ModalHeader,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";
import { addNewKeyword, deleteBasicKeyword, deleteCustomKeyword, editCustomKeyword, getBasicKeywords, getCustomKeywords } from '@/axios/keyword';

export default function PingModels() {
    const router = useRouter();

    const icons = {
        search: <Search />,
    };

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [targetKeywordType, setTargetKeywordType] = useState("");
    const [newBasicKeyword, setNewBasicKeyword] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newKeywords, setNewKeywords] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [basicKeywords, setBasicKeywords] = useState([]);
    const [customKeywords, setCustomKeywords] = useState([]);
    const [filteredBasicKeywords, setFilteredBasicKeywords] = useState([]);
    const [filteredCustomKeywords, setFilteredCustomKeywords] = useState([]);
    const [selectedCustomKeywordId, setSelectedCustomKeywordId] = useState();
    const [basicKeywordsSearchInput, setBasicKeywordsSearchInput] = useState("");
    const [customKeywordsSearchInput, setcustomKeywordsSearchInput] = useState("");
    const [urlValidation, setUrlValidation] = useState("");

    const [isLoading, setIsLoading] = useState({
        basic: false,
        custom: false
    })

    const getBasicKeywordsData = async () => {
        setIsLoading(p => ({ ...p, basic: true }))
        const res = await getBasicKeywords();
        console.log("res.data:", res.data);
        if (res.status == 'success') setBasicKeywords(res.data);
        setIsLoading(p => ({ ...p, basic: false }))
    }

    const getCustomKeywordsData = async () => {
        setIsLoading(p => ({ ...p, custom: true }))
        const res = await getCustomKeywords();

        if (res.status == 'success') setCustomKeywords(res.data);
        setIsLoading(p => ({ ...p, custom: false }))
    }

    const handleAddNewKeyword = useCallback(async () => {
        setUrlValidation("");
        if (targetKeywordType == 'custom' && !checkLinkValidation()) return;
        setIsAdding(true);
        if (selectedCustomKeywordId) {
            const res = await editCustomKeyword(selectedCustomKeywordId, {
                website: newWebsite,
                keywords: newKeywords
            });

            if (res.status == 'success') {
                let _customKeywords = customKeywords.slice(0);
                _customKeywords.map((item) => {
                    if (item.id == selectedCustomKeywordId) {
                        item.website = newWebsite;
                        item.keywords = newKeywords;
                    }
                });
                setCustomKeywords(_customKeywords);
            }
        }
        else {
            const res = await addNewKeyword({
                website: newWebsite,
                keyword: newBasicKeyword,
                keywords: newKeywords
            });

            if (res.status == 'success') {
                if (targetKeywordType == "basic") {
                    setBasicKeywords(p => [...p, { id: res.data.id, keyword: newBasicKeyword }]);
                } else {
                    setCustomKeywords(p => [...p, { id: res.data.id, website: newWebsite, keywords: newKeywords }]);
                }
            }
        }

        setNewWebsite("");
        setNewKeywords("");
        setNewBasicKeyword("");
        setSelectedCustomKeywordId(null);
        setIsAdding(false);
        onClose();

    }, [targetKeywordType, newWebsite, newKeywords, newBasicKeyword, selectedCustomKeywordId, customKeywords]);

    const handleDeleteKeyword = async (id, type) => {
        setSelectedCustomKeywordId(id);
        setIsDeleting(true);
        if (type == 'basic') {
            const res = await deleteBasicKeyword(id);
            if (res.status == 'success') {
                setBasicKeywords(p => p.filter(kw => kw.id != id));
            }
        } else {
            const res = await deleteCustomKeyword(id);
            if (res.status == 'success') {
                setCustomKeywords(p => p.filter(kw => kw.id != id));
            }
        }
        setIsDeleting(false);
    }

    const checkLinkValidation = useCallback(() => {
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(newWebsite)) {
            setUrlValidation("Please enter valid Webiste link.");
            return false;
        }
        return true;
    }, [newWebsite]);

    useEffect(() => {
        getBasicKeywordsData();
        getCustomKeywordsData();
    }, []);

    useEffect(() => {
        setFilteredBasicKeywords(basicKeywords.filter((item) => item.keyword.toLowerCase().includes(basicKeywordsSearchInput.toLowerCase())));
        setFilteredCustomKeywords(customKeywords.filter((item) => item.website.toLowerCase().includes(customKeywordsSearchInput.toLowerCase())));
    }, [basicKeywords, customKeywords, basicKeywordsSearchInput, customKeywordsSearchInput]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">
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
                            value={basicKeywordsSearchInput}
                            onChange={(e) => setBasicKeywordsSearchInput(e.target.value)}
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
                            isLoading.basic ?
                                <div class="w-full justify-center flex">
                                    <Spinner />
                                </div> :
                                filteredBasicKeywords.length ?
                                    filteredBasicKeywords.map((item) => <div className='flex items-center gap-x-3 py-2 pl-2 pr-20' key={item.id}>
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
                                        <Button
                                            radius="full"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                            size='sm'
                                            onClick={() => handleDeleteKeyword(item.id, "basic")}
                                            isLoading={selectedCustomKeywordId == item.id && isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </div>)
                                    :
                                    <p>Not any Basic keywords yet</p>
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
                            value={customKeywordsSearchInput}
                            onChange={(e) => setcustomKeywordsSearchInput(e.target.value)}
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
                            isLoading.custom ?
                            <div class="w-full justify-center flex">
                                <Spinner />
                            </div> :
                            filteredCustomKeywords.length ? filteredCustomKeywords.map((item) => <div className='flex items-center gap-x-3 py-2 pl-2 pr-20' key={item.id}>
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
                                        setTargetKeywordType('custom')
                                        setNewWebsite(item.website);
                                        setNewKeywords(item.keywords);
                                        setSelectedCustomKeywordId(item.id);
                                        onOpen();
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    radius="full"
                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                    size='sm'
                                    onClick={() => handleDeleteKeyword(item.id, "custom")}
                                    isLoading={selectedCustomKeywordId == item.id && isDeleting}
                                >
                                    Delete
                                </Button>
                            </div>)
                            :
                            <p>Not any Basic keywords yet</p>
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
                                                <p className='text-red-700 text-left'>{urlValidation}</p>
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
                                            isLoading={isAdding}
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
