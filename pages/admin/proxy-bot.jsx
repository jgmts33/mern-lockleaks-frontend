"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, Input, user,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue,
    ModalHeader
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProxiesBots, createNewProxiesBot, deleteProxiesBot, updateProxiesBot } from '../../axios/proxies-bot';
import moment from 'moment';

export default function ProxyBot() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [list, setList] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [modalType, setModalType] = useState("");
    const [targetInfo, setTargetInfo] = useState({
        id: '',
        name: '',
        proxies_count: 0,
        expire_date: '',
        credentials: {
            ipAddress: '',
            username: '',
            password: ''
        }
    })

    const columns = [
        { name: "VPS NAME", uid: "name" },
        { name: "PROXIES NUMBER", uid: "proxies_count" },
        { name: "EXPIRE DATE", uid: "expire_date" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const getProxiesBotsInfo = async () => {
        const res = await getProxiesBots();
        if (res.status == 'success') {
            setList(res.data);
        }
    }

    const handleSubmit = useCallback(async () => {
        setIsActionProcessing(true);
        let res;
        if (modalType == 'update') res = await updateProxiesBot(targetInfo.id, targetInfo);
        else res = await createNewProxiesBot(targetInfo);
        if (res.status == 'success') {
            if (modalType == 'update') {
                setList(p => p.map(item => item.id == targetInfo.id ? targetInfo : item));
            }
            else setList(p => [...p, res.data]);
            setTargetInfo({
                id: '',
                name: '',
                proxies_count: 0,
                expire_date: '',
                credentials: {
                    ipAddress: '',
                    username: '',
                    password: ''
                }
            });
            onClose();
        }
        setIsActionProcessing(false);
    }, [targetInfo, modalType]);

    const handleDeleteProxiesBot = async (id) => {
        setIsActionProcessing(true);
        const res = await deleteProxiesBot(id);
        if (res.status == 'success') {
            setList(p => p.filter(item => item.id != id));
        }
        setIsActionProcessing(false);
    }

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center gap-4">
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                            size='sm'
                            onPress={() => {
                                setModalType('update');
                                setTargetInfo(item);
                                onOpen();
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base"
                            size='sm'
                            onPress={() => handleDeleteProxiesBot(item.id)}
                            isLoading={isActionProcessing}
                        >
                            Delete
                        </Button>
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                            size='sm'
                            onPress={() => {
                                setModalType('view');
                                setTargetInfo(item);
                                onOpen();
                            }}
                        >
                            View Credentials
                        </Button>
                    </div>
                );
            case "expire_date":
                return moment(cellValue).format('YYYY-MM-DD');
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        getProxiesBotsInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto ">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PROXIES / VPS  BOTS</span>
            </div>
            <div className='flex items-center justify-between mt-8'>
                <p className='text-lg'>Info</p>
                <div>
                    <Button
                        radius="full"
                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                        size='sm'
                        onClick={() => {
                            setTargetInfo({
                                name: '',
                                proxies_count: 0,
                                expire_date: '',
                                credentials: {
                                    ipAddress: '',
                                    username: '',
                                    password: ''
                                }
                            });
                            setModalType('add');
                            onOpen();
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-4 w-full p-10 max-md:p-4'>
                <Table
                    className='max-h-[520px] overflow-y-auto'
                    isHeaderSticky
                    aria-labelledby="Proxies/VPS Bots"
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody items={list}>
                        {(item, index) => (
                            <TableRow key={index}>
                                {(columnKey) => <TableCell className='py-4'>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}

                    </TableBody>

                </Table>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size={ modalType == 'view' ? 'md': '2xl'}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
            >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute'>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <p className='font-semibold text-lg'>
                                    {
                                        modalType === 'add' ? 'Add new proxy/vps bot' : modalType === 'update' ? 'Update proxy/vps bot' : 'View proxy/vps bot credentials'
                                    }
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col w-full'>

                                    {
                                        modalType != 'view' ?
                                            <div className='flex flex-col space-y-4'>
                                                <Input
                                                    type="text"
                                                    label="VPS name"
                                                    value={targetInfo.name}
                                                    onChange={(e) => setTargetInfo(p => ({ ...p, name: e.target.value }))}
                                                />
                                                <Input
                                                    type="text"
                                                    label="Proxies Count"
                                                    value={targetInfo.proxies_count}
                                                    onChange={(e) => setTargetInfo(p => ({ ...p, proxies_count: e.target.value }))}
                                                />
                                                <Input
                                                    type="text"
                                                    label="VPS IP"
                                                    value={targetInfo.credentials.ipAddress}
                                                    onChange={(e) => setTargetInfo(p => ({ ...p, credentials: { ...p.credentials, ipAddress: e.target.value } }))}
                                                />
                                                <Input
                                                    type="date"
                                                    label="Expire Date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={moment(targetInfo.expire_date).format('YYYY-MM-DD')}
                                                    onChange={(e) => setTargetInfo(p => ({ ...p, expire_date: e.target.value }))}
                                                />
                                                <div>
                                                    <p className='text-left pb-2'>Credentials</p>
                                                    <div className='flex gap-4 items-center'>
                                                        <Input
                                                            type="text"
                                                            label="Username"
                                                            value={targetInfo.credentials.username}
                                                            onChange={(e) => setTargetInfo(p => ({ ...p, credentials: { ...p.credentials, username: e.target.value } }))}
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Password"
                                                            value={targetInfo.credentials.password}
                                                            onChange={(e) => setTargetInfo(p => ({ ...p, credentials: { ...p.credentials, password: e.target.value } }))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='flex flex-col space-y-4 text-left pb-4 font-semibold '>
                                                <p>Ip Address: <span className='text-sm font-normal'>{targetInfo.credentials.ipAddress}</span></p>
                                                <p>Username: <span className='text-sm font-normal'>{targetInfo.credentials.username}</span></p>
                                                <p>Password: <span className='text-sm font-normal'>{targetInfo.credentials.password}</span></p>
                                            </div>
                                    }

                                    {modalType != 'view' ? <div className='flex my-2 mt-4 justify-end'>
                                        <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onClick={handleSubmit}
                                            isLoading={isActionProcessing}
                                        >
                                            Save
                                        </Button>
                                    </div> : <></>}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
