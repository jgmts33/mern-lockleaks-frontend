"use client";
import {
    Button, 
    ScrollShadow, 
    useDisclosure, 
    Modal, 
    ModalContent, 
    ModalBody, 
    Input,
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    ModalHeader,
    Switch,
    Tabs,
    Tab,
} from '@nextui-org/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewPingModel, deletePingModel, getPingModels, updatePingModel } from '@/axios/ping-models';
import _ from 'lodash';
import { Search } from '@/components/utils/Icons';

export default function ProxyBot() {

    const router = useRouter();

    const icons = {
        search: <Search />,
    }

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(-1);
    const [searchValue, setSearchValue] = useState(""); 
    const [modalType, setModalType] = useState("");
    const [targetInfo, setTargetInfo] = useState({
        id: '',
        model_name: [],
        platform: [],
        social_media: [],
        response: false,
        goal: false
    })

    let tabs = [
        {
            id: "model_name",
            label: "Model Name"
        },
        {
            id: "platform",
            label: "Platform"
        },
        {
            id: "social_media",
            label: "Social Media"
        }
    ];

    const listRef = useRef(null);

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
            setSearchValue("");
        }
    }

    const handleSubmit = useCallback(async () => {
        setIsActionProcessing(targetInfo.id);
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
                model_name: [],
                platform: [],
                social_media: [],
                response: false,
                goal: false
            });
            onClose();
            setSearchValue("");
        }
        setIsActionProcessing(-1);
    }, [targetInfo, modalType]);

    const handleUpdate = async (data) => {
        const res = await updatePingModel(data.id, data);
        if (res.status == 'success') {
            setList(p => p.map(item => item.id == data.id ? data : item));
            setSearchValue("");
        };
    }

    const handleDeletPingModel = async (id) => {
        setIsActionProcessing(id);
        const res = await deletePingModel(id);
        if (res.status == 'success') {
            setList(p => p.filter(item => item.id != id));
            setSearchValue("");
        }
        setIsActionProcessing(-1);
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
                            isLoading={item.id == isActionProcessing}
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
                return <div className='flex items-center w-max gap-4'>
                    <p>{cellValue[0]}</p>
                    {cellValue.length > 1 ? <div className='bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg rounded-full px-2'>+{cellValue.length - 1} More</div> : <></>}
                </div>;
        }
    }, []);

    useEffect(() => {
        listRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [targetInfo]);

    useEffect(() => {
        getPingModelsInfo();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            let _list = list.filter(p => {
                if (p.model_name.find((item) => item.includes(searchValue)) || p.platform.find((item) => item.includes(searchValue)) || p.social_media.find((item) => item.includes(searchValue))) return true;
                else return false;
            });
            setFilteredList(_list);
        }, 300);

        return () => clearTimeout(timer);

    }, [searchValue, list]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto ">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PING MODELS</span>
            </div>
            <p className='text-lg mt-8'>Info</p>
            <div className='flex items-center justify-between mt-4 gap-3'>
                <div className='max-w-[500px] w-full'>
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
                                "group-data-[focus=true]:bg-default-200/50",
                                "dark:group-data-[focus=true]:bg-default/60",
                                "!cursor-text",
                            ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                            icons.search
                        }
                        value={searchValue}
                        onValueChange={(value) => setSearchValue(value)}
                    />
                </div>
                <Button
                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                    onClick={() => {
                        setTargetInfo({
                            id: '',
                            model_name: [],
                            platform: [],
                            social_media: [],
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

                    <TableBody items={filteredList}>
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
                size='lg'
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
                                        modalType === 'add' ? 'Add new Ping Model' : modalType === 'update' ? 'Update Ping Model' : 'View Ping Model Details'
                                    }
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col w-full'>
                                    <Tabs aria-label="Dynamic tabs" items={tabs}>
                                        {(item) => (
                                            <Tab key={item.id} title={item.label}>
                                                <div className='flex flex-col space-y-4'>
                                                    <div className='justify-start flex'>
                                                        <Button
                                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                                            onClick={() => {
                                                                let _targetInfo = _.clone(targetInfo);
                                                                _targetInfo[item.id].push('');
                                                                setTargetInfo(_targetInfo);



                                                            }}
                                                        >
                                                            Add New
                                                        </Button>
                                                    </div>
                                                    <ScrollShadow className='max-h-[240px] space-y-2 px-2'>
                                                        {
                                                            targetInfo[item.id].map((eachData, index) => <div key={index} className='flex gap-2 items-center'>
                                                                <p className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                                                                <Input
                                                                    type="text"
                                                                    size='sm'
                                                                    label={item.label}
                                                                    value={eachData}
                                                                    onChange={(e) => {
                                                                        let _targetInfo = _.clone(targetInfo);
                                                                        _targetInfo[item.id][index] = e.target.value;
                                                                        setTargetInfo(_targetInfo);
                                                                    }}
                                                                />
                                                                <Button
                                                                    className="bg-gradient-to-tr from-gray-700 to-gray-800 border border-gray-500 text-white shadow-lg text-base"
                                                                    onPress={() => {
                                                                        let _targetInfo = _.clone(targetInfo);
                                                                        _targetInfo[item.id] = _targetInfo[item.id].filter((p, i) => i != index);
                                                                        setTargetInfo(_targetInfo);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </div>)
                                                        }
                                                        <div ref={listRef} />
                                                    </ScrollShadow>
                                                    <div className='flex justify-end'>
                                                        <Button
                                                            radius="lg"
                                                            className={"border mt-4 border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                                            onClick={handleSubmit}
                                                            isLoading={targetInfo.id == isActionProcessing}
                                                        >
                                                            Save
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Tab>
                                        )}
                                    </Tabs>


                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}
