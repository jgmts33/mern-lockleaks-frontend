"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input,
    ModalContent,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalBody
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";
import { createNewVps, deleteVps, getVpsList, updateVps } from '../../axios/vps-list';
import axios from 'axios';

export default function VPSManagement() {

    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [list, setList] = useState([]);
    const [ipAddress, setIpAddress] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionProcessing, setIsActionProcessing] = useState(false);

    const getVpsListInfo = async () => {
        setIsProcessing(true);
        const res = await getVpsList();

        if (res.status == 'success') {
            setList(res.data.map(p => {
                checkApiRunning(p.id, p.ip_address);
                return {
                    ...p,
                    status: 'offline'
                }
            }));
        }
        setIsProcessing(false);
    }

    const handleAddNewVps = useCallback(async () => {
        setIsActionProcessing(true);
        const res = await createNewVps({ ip_address: ipAddress });

        if (res.status == 'success') {
            getVpsListInfo();
            setIpAddress('');
            setSelectedId(null);
            onClose();
        }
        setIsActionProcessing(false);
    }, [ipAddress]);

    const handleUpdateVpsInfo = useCallback(async () => {
        setIsActionProcessing(true);
        const res = await updateVps(selectedId, {
            ip_address: ipAddress
        })
        if (res.status == 'success') {
            checkApiRunning(selectedId, ipAddress);
            setList(p => p.map(item => {
                if (item.id == selectedId) return {
                    ...item,
                    ip_address: ipAddress,
                    status: 'offline'
                }
                else return item;
            }));
            setIpAddress('');
            setSelectedId(null);
            onClose();
        }
        setIsActionProcessing(false);
    }, [ipAddress, selectedId]);

    const handleDeleteVps = async (id) => {
        setIsActionProcessing(id);
        const res = await deleteVps(id);
        if (res.status == 'success') setList(p => p.filter(item => item.id != id));
        setIsActionProcessing(null);
    }

    async function checkApiRunning(id, ipAddress) {
        try {
            const response = await axios.get(`http://${ipAddress}:8000`);
            if (response.status == 200) {
                setList(p => p.map(item => {
                    if (item.id == id) {
                        return {
                            ...item,
                            status: 'online'
                        }
                    } else return item
                }))
            } else {
                setList(p => p.map(item => {
                    if (item.id == id) {
                        return {
                            ...item,
                            status: 'offline'
                        }
                    } else return item
                }));
            }
        } catch (error) {
            console.error(`Error checking API at ${ipAddress}:`, error);
        }
    }

    const checkVpsStatus = () => {
        setList(p => p.map(p => {
            checkApiRunning(p.id, p.ip_address);
            return {
                ...p,
                status: 'offline'
            }
        }));
    };

    useEffect(() => {
        getVpsListInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white w-full max-lg:mx-auto">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>VPS MANAGEMENT</span>
            </div>
            <div className='flex mt-10 gap-4'>
                <Button
                    radius='full'
                    size="sm"
                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                    onPress={() => {
                        setSelectedId(null);
                        onOpen();
                    }}
                >
                    CONNECT VPS
                </Button>
                <Button
                    radius='full'
                    size="sm"
                    className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base"
                    onPress={() => {
                        checkVpsStatus();
                    }}
                >
                    Check VPS Status
                </Button>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-10 max-sm:mt-16 w-full relative max-sm:p-4'>
                <ScrollShadow className="h-[300px] max-sm:w-full">
                    {
                        isProcessing ? <div className='w-full flex justify-center mt-6'>
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                            :
                            list.length ? list.map((item, index) => {
                                return (
                                    <div key={index} className='flex font-semibold text-lg max-sm:font-normal max-sm:text-sm gap-40 w-full py-3 justify-between '>
                                        <div>
                                            <span>{item.ip_address}</span>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div className="relative flex items-center gap-4">
                                                <p className={item.status == "online" ? "text-[#4AC34E] uppercase" : "text-[#CF3B56] uppercase"}>{item.status}</p>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => {
                                                        setSelectedId(item.id);
                                                        setIpAddress(item.ip_address);
                                                        onOpen();
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    radius="full"
                                                    className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base"
                                                    size='sm'
                                                    onPress={() => handleDeleteVps(item.id)}
                                                    isLoading={isActionProcessing == item.id}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                                :
                                <p className='text-center mt-10'>There is not any vps</p>
                    }
                </ScrollShadow>
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size={'xl'}
                onOpenChange={onOpenChange}
                placement="center"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <p className='font-semibold text-lg'>
                                    {!selectedId ? 'Add new VPS' : 'Update VPS'}
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    type="text"
                                    label="IP Address"
                                    value={ipAddress}
                                    onChange={(e) => setIpAddress(e.target.value)}
                                />
                                <div className='flex my-2 mt-4 justify-end'>
                                    <Button
                                        radius="lg"
                                        className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                        onClick={() => {
                                            if (selectedId) handleUpdateVpsInfo();
                                            else handleAddNewVps();
                                        }}
                                        isLoading={isActionProcessing}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
