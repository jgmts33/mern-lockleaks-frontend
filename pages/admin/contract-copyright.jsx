"use client";
import {
    Button,
    ScrollShadow,
    Input,
    Progress,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getContractUsersListInfo, getCopyrightHolderUsersListInfo, handleKYCSubmission } from '@/axios/contract';
import { Search } from "@/components/utils/Icons";
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { downloadCopyrightHolder, uploadCopyrightHolder } from '../../axios/user';

export default function AutoContract() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const router = useRouter();

    const copyrightHolderRef = useRef(null);

    const [selectedId, setSelectedId] = useState(-1)
    const [message, setMessage] = useState("");
    const [isActionProcessing, setIsActionProcessing] = useState({
        contract: -1,
        copyright_holder: -1
    });

    const [filterStatus, setFilterStatus] = useState({
        contract: "pending",
        copyright_holder: "pending"
    });
    const [searchValue, setSearchValue] = useState({
        contract: "",
        copyright_holder: ""
    });
    const [loadingState, setLoadingState] = useState({
        contract: false,
        copyright_holder: false
    });
    const [page, setPage] = useState({
        contract: 1,
        copyright_holder: 1
    });
    const [totalPages, setTotalPages] = useState({
        contract: 0,
        copyright_holder: 0
    });

    const [list, setList] = useState({
        contract: [],
        copyright_holder: []
    });

    const icons = {
        search: <Search />,
    };


    const getContractUsersList = async (page, search = "", type) => {
        setLoadingState(p => ({ ...p, contract: true }));
        const res = await getContractUsersListInfo(page, search, type);

        if (res.status == 'success') {
            setList(p => ({ ...p, contract: res.data.data }));
            setTotalPages(p => ({ ...p, contract: res.data.totalPages }));
        }
        setLoadingState(p => ({ ...p, contract: false }));
    }

    const getCopyrightHolderUsersList = async (page, search = "", type) => {
        setLoadingState(p => ({ ...p, copyright_holder: true }));
        const res = await getCopyrightHolderUsersListInfo(page, search, type);

        if (res.status == 'success') {
            setList(p => ({ ...p, copyright_holder: res.data.data }));
            setTotalPages(p => ({ ...p, copyright_holder: res.data.totalPages }));
        }
        setLoadingState(p => ({ ...p, copyright_holder: false }));
    }

    const uploadCopyrightHolderFile = useCallback(async () => {
        copyrightHolderRef.current?.click();
    }, [copyrightHolderRef]);

    const handleUploadCopyrightHolder = useCallback(async () => {
        const uploadedFile = copyrightHolderRef.current.files[0];
        if (!uploadedFile) return;
        setIsActionProcessing(p => ({ ...p, copyright_holder: selectedId }));

        const formData = new FormData();
        formData.append('file', uploadedFile);

        const res = await uploadCopyrightHolder(selectedId, formData);

        if (res.status == 'success') {
            let copyrightHolderList = list.copyright_holder.filter(p => p.id != selectedId);

            setList(p => ({
                ...p,
                copyright_holder: copyrightHolderList
            }));
        }

        setIsActionProcessing(p => ({ ...p, copyright_holder: -1 }));

    }, [selectedId, copyrightHolderRef, list]);

    const handleDownload = async (id) => {
        setIsActionProcessing(p => ({ ...p, copyright_holder: id }));
        const res = await downloadCopyrightHolder(id);
        setIsActionProcessing(p => ({ ...p, copyright_holder: -1 }));
        if (res.status == 'success') {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);

            // Create a temporary anchor element and simulate a click to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = `Copyright Holder ${id}.pdf`; // Customize the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL to free up memory
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getContractUsersList(page.contract, searchValue.contract, filterStatus.contract);
        }, 300);

        return () => clearTimeout(timer);

    }, [searchValue.contract, page.contract, filterStatus.contract]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getCopyrightHolderUsersList(page.copyright_holder, searchValue.copyright_holder, filterStatus.copyright_holder);
        }, 300);

        return () => clearTimeout(timer);

    }, [searchValue.copyright_holder, page.copyright_holder, filterStatus.copyright_holder]);

    const handleContract = useCallback(async (decision, id) => {

        setIsActionProcessing(p => ({ ...p, contract: id }));

        let requestData = {
            decision
        };
        if (decision == 'decline') {
            requestData.message = message
        }

        const res = await handleKYCSubmission(id, requestData);

        if (res.status == 'success') {

            let contractList = list.contract.filter(p => p.id != id);

            getCopyrightHolderUsersList(page.copyright_holder, searchValue.copyright_holder, filterStatus.copyright_holder);

            setList(p => ({
                ...p,
                contract: contractList
            }));

        }

        setIsActionProcessing(p => ({ ...p, contract: -1 }));
        onClose();

    }, [message, list, page, searchValue, filterStatus]);

    useEffect(() => {

        const socket = io(ENDPOINT);

        socket.on(`new_kyc_submitted`, (user) => {
            setList(p => ({
                ...p,
                contract: [...p.contract, user]
            }))
        });

        return () => {
            socket.disconnect();
        }

    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='mt-0 max-lg:mx-auto'>
                <span className='font-extrabold text-lg'>Contract & Copyright Holder</span>
            </div>
            <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5 max-sm:gap-16 mt-10'>
                <div>
                    <div className='max-lg:mx-auto mb-5'>
                        <span className='font-semibold text-base'>Contract Upload</span>
                    </div>
                    <div className="flex flex-col gap-6 w-full h-full bg-white/15 border border-gray-500 rounded-[20px] max-md:mx-auto p-8 max-sm:p-4">

                        <div className='flex gap-6'>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-700 text-white shadow-lg text-sm " + (filterStatus.contract == 'pending' ? "from-purple-light to-purple-weight" : "from-gray-600/40 to-gray-800/40")}
                                size='sm'
                                onClick={() => setFilterStatus(p => ({ ...p, contract: "pending" }))}
                            >
                                <span>Pending</span>
                            </Button>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-700 text-white shadow-lg text-sm " + (filterStatus.contract == 'approved' ? "from-purple-light to-purple-weight" : "from-gray-600/40 to-gray-800/40")}
                                onClick={() => setFilterStatus(p => ({ ...p, contract: "approved" }))}
                                size='sm'
                            >
                                <span>Approved</span>
                            </Button>
                        </div>
                        <Input
                            isClearable
                            radius="lg"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
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
                            placeholder="Type to search by Email..."
                            startContent={
                                icons.search
                            }
                            value={searchValue.contract}
                            onValueChange={(value) => setSearchValue(p => ({ ...p, contract: value }))}
                        />
                        <ScrollShadow className='h-[calc(100vh-480px)] divide-y-2 mt-4 flex flex-col px-2'>
                            {
                                loadingState.contract ?
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                                    : list.contract.length ? list.contract.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='flex items-start gap-2 my-4 w-full' >
                                                    <div className='px-2 mt-2 min-w-7 h-6 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center max-sm:hidden'>{index + 1}</div>
                                                    <div className='flex gap-4 justify-between w-full max-sm:flex-wrap items-center'>
                                                        <div>
                                                            <p className='text-lg'>{item.name} </p>
                                                            <p>{item.email}</p>
                                                        </div>
                                                        {
                                                            item.contract?.status == 'pending' ?
                                                                <div className='flex gap-4 items-center'>
                                                                    <Button
                                                                        radius="full"
                                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                                        size='sm'
                                                                        isLoading={isActionProcessing.contract == item.id}
                                                                        onPress={() => {
                                                                            setSelectedId(item.id);
                                                                            handleContract('approve', item.id);
                                                                        }}
                                                                    >
                                                                        Approve
                                                                    </Button>
                                                                    <Button
                                                                        radius="full"
                                                                        className="bg-gradient-to-tr from-gray-600 to-gray-700 border border-gray-500 text-white shadow-lg text-base"
                                                                        size='sm'
                                                                        onClick={() => {
                                                                            setSelectedId(item.id);
                                                                            onOpen();
                                                                        }}
                                                                    >
                                                                        Decline
                                                                    </Button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <Button
                                                                        radius="full"
                                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                                        size='sm'
                                                                        isLoading={isActionProcessing.contract == item.id}
                                                                        onPress={() => router.push(`/admin/users/contract?id=${item.id}`)}
                                                                    >
                                                                        View Contract
                                                                    </Button>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <hr className='w-full' />
                                            </div >
                                        )
                                    }) :
                                        <p className='text-center'>There is not any data yet. </p>
                            }
                        </ScrollShadow>
                    </div>
                </div>

                <div>
                    <div className='max-lg:mx-auto mb-5'>
                        <span className='font-semibold text-base'>Copyright Holder Upload</span>
                    </div>
                    <div className="flex flex-col gap-6 w-full h-full bg-white/15 border border-gray-500 rounded-[20px] max-md:mx-auto p-10 max-sm:p-5">

                        <div className='flex gap-6'>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-700 text-white shadow-lg text-sm " + (filterStatus.copyright_holder == 'pending' ? "from-purple-light to-purple-weight" : "from-gray-600/40 to-gray-800/40")}
                                size='sm'
                                onClick={() => setFilterStatus(p => ({ ...p, copyright_holder: "pending" }))}
                            >
                                <span>Pending</span>
                            </Button>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-700 text-white shadow-lg text-sm " + (filterStatus.copyright_holder == 'sent' ? "from-purple-light to-purple-weight" : "from-gray-600/40 to-gray-800/40")}
                                onClick={() => setFilterStatus(p => ({ ...p, copyright_holder: "sent" }))}
                                size='sm'
                            >
                                <span>Uploaded</span>
                            </Button>
                        </div>
                        <Input
                            isClearable
                            radius="lg"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
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
                            placeholder="Type to search by Email..."
                            startContent={
                                icons.search
                            }
                            value={searchValue.copyright_holder}
                            onValueChange={(value) => setSearchValue(p => ({ ...p, copyright_holder: value }))}
                        />
                        <ScrollShadow className='h-[calc(100vh-480px)] divide-y-2 mt-4 px-2'>
                            {
                                loadingState.copyright_holder ?
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                                    : list.copyright_holder.length ? list.copyright_holder.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='flex items-start gap-2 my-4' >
                                                    <div className='px-2 min-w-7 h-6 bg-gradient-to-tr from-purple-light to-purple-weight rounded-full flex items-center justify-center max-sm:hidden'>{index + 1}</div>
                                                    <div className='flex gap-4 justify-between w-full max-sm:flex-wrap'>
                                                        <div>
                                                            <p className='text-lg'>{item.name} </p>
                                                            <p>{item.email}</p>
                                                        </div>
                                                        {
                                                            item.copyright_holder == '' ?
                                                                <div className='flex gap-4 items-center'>
                                                                    <Button
                                                                        radius="full"
                                                                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                                        size='sm'
                                                                        isLoading={isActionProcessing.copyright_holder == item.id}
                                                                        onPress={() => {
                                                                            uploadCopyrightHolderFile();
                                                                            setSelectedId(item.id);
                                                                        }}
                                                                    >
                                                                        Upload
                                                                    </Button>

                                                                </div>
                                                                :
                                                                <Button
                                                                    radius="full"
                                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                                    size='sm'
                                                                    isLoading={isActionProcessing.copyright_holder == item.id}
                                                                    onPress={() => handleDownload(item.id)}
                                                                >
                                                                    Download
                                                                </Button>
                                                        }
                                                    </div>
                                                </div>
                                                <hr className='w-full' />
                                            </div >
                                        )
                                    }) :
                                        <p className='text-center'>There is not any data yet. </p>
                            }
                            <input
                                type="file"
                                id="file"
                                accept=".pdf"
                                ref={copyrightHolderRef}
                                onChange={handleUploadCopyrightHolder}
                                hidden
                            />
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
                                    The Reason Why decline
                                </ModalHeader>
                                <ModalBody>
                                    <div className='flex flex-col'>
                                        <Input
                                            type="text"
                                            label="Decline Message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <div className='flex my-2 mt-4 justify-end'>
                                            <Button
                                                radius="lg"
                                                className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                                onPress={() => handleContract('decline', selectedId)}
                                                isLoading={isActionProcessing.copyright_holder != -1}
                                            >
                                                Confirm
                                            </Button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </div>
        </div>
    )
}
