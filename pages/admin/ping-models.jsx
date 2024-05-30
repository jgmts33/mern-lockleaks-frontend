"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, Input, user,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue,
    ModalHeader,
    Switch
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { createNewPingModel, deletePingModel, getPingModels, updatePingModel } from '../../axios/ping-models';

export default function ProxyBot() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [list, setList] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [modalType, setModalType] = useState("");
    const [targetInfo, setTargetInfo] = useState({
        id: '',
        model_name: '',
        platform: '',
        social_media: '',
        response: false,
        goal: false
    })

    const columns = [
        { name: "Model Name", uid: "model_name" },
        { name: "Platform", uid: "platform" },
        { name: "Social Media", uid: "social_media" },
        { name: "Response", uid: "response" },
        { name: "Goal", uid: "goal" },
        { name: "Actions", uid: "actions" },
    ];

    const getPingModelsInfo = async () => {
        const res = await getPingModels();
        if (res.status == 'success') {
            setList(res.data);
        }
    }

    const handleSubmit = useCallback(async () => {
        setIsActionProcessing(true);
        let res;
        if (modalType == 'update') res = await updatePingModel(targetInfo.id, targetInfo);
        else res = await createNewPingModel(targetInfo);
        if (res.status == 'success') {
            if (modalType == 'update') {
                setList(p => p.map(item => item.id == targetInfo.id ? targetInfo : item));
            }
            else setList(p => [...p, res.data]);
            setTargetInfo({
                id: '',
                model_name: '',
                platform: '',
                social_media: '',
                response: false,
                goal: false
            });
            onClose();
        }
        setIsActionProcessing(false);
    }, [targetInfo, modalType]);

    const handleUpdate = async (data) => {
        const res = await updatePingModel(data.id, data);
        if (res.status == 'success') {
            setList(p => p.map(item => item.id == data.id ? data : item));
        };
    }

    const handleDeletPingModel = async (id) => {
        setIsActionProcessing(true);
        const res = await deletePingModel(id);
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
                            onPress={() => handleDeletPingModel(item.id)}
                            isLoading={isActionProcessing}
                        >
                            Delete
                        </Button>
                    </div>
                );
            case "response":
                return <Switch isSelected={cellValue} onValueChange={(value) => {
                    handleUpdate({ ...item, response: value });
                }}>
                    {cellValue ? <span>Yes</span> : <span>No</span>}
                </Switch>
            case "goal":
                return <Switch isSelected={cellValue} onValueChange={(value) => {
                    handleUpdate({ ...item, goal: value });
                }}>
                    {cellValue ? <span>Yes</span> : <span>No</span>}
                </Switch>
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        getPingModelsInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto ">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PING MODELS</span>
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
                                id: '',
                                model_name: '',
                                platform: '',
                                social_media: '',
                                response: false,
                                goal: false
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
                size={modalType == 'view' ? 'md' : '2xl'}
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
                                    {
                                        modalType === 'add' ? 'Add new ping Model' : modalType === 'update' ? 'Update ping Model' : 'View ping Model Details'
                                    }
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-col space-y-4'>
                                        <Input
                                            type="text"
                                            label="Model Name"
                                            value={targetInfo.model_name}
                                            onChange={(e) => setTargetInfo(p => ({ ...p, model_name: e.target.value }))}
                                        />
                                        <Input
                                            type="text"
                                            label="Platform"
                                            value={targetInfo.platform}
                                            onChange={(e) => setTargetInfo(p => ({ ...p, platform: e.target.value }))}
                                        />
                                        <Input
                                            type="text"
                                            label="Social Media"
                                            value={targetInfo.social_media}
                                            onChange={(e) => setTargetInfo(p => ({ ...p, social_media: e.target.value }))}
                                        />
                                    </div>

                                    <div className='flex my-2 mt-4 justify-end'>
                                        <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onClick={handleSubmit}
                                            isLoading={isActionProcessing}
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
        </div >
    )
}
