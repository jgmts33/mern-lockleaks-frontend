"use client";
import {
    Button,
    ScrollShadow,
    Input,
    ModalContent,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalBody,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { checkStatus, createNewVps, deleteVps, getVpsList, updateVps } from '@/axios/vps-list';

export default function VPSManagement() {

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [list, setList] = useState([]);
    const [ipAddress, setIpAddress] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [isCheckingVpsStatus, setIsCheckingVpsStatus] = useState(false);

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
        setIsCheckingVpsStatus(true);
        const res = await checkStatus(ipAddress);
        if (res.status == 'success') {
            setList(p => p.map(item => {
                if (item.id == id) {
                    return {
                        ...item,
                        status: res.data
                    }
                } else return item
            }))
        }
        setIsCheckingVpsStatus(false);
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
                    isLoading={isCheckingVpsStatus}
                >
                    Check VPS Status
                </Button>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 p-10 rounded-[16px] mt-10 max-sm:mt-16 w-full relative max-sm:p-4'>
                <ScrollShadow className="h-[300px] max-sm:w-full">
                    {
                        isProcessing ?
                            <div class="w-full justify-center flex mt-6">
                                <Spinner />
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
