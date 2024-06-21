"use client";
import {
    Button,
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
    Pagination,
    Spinner
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProxiesBots, createNewProxiesBot, deleteProxiesBot, updateProxiesBot } from '@/axios/proxies-bot';
import moment from 'moment';
import { Search } from '@/components/utils/Icons';

export default function ProxyBot() {

    const icons = {
        search: <Search />,
    }

    const router = useRouter();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [list, setList] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [loadingState, setLoadingState] = useState('');
    const [modalType, setModalType] = useState("");
    const [targetInfo, setTargetInfo] = useState({
        id: '',
        vps_source: '',
        ip_address: '',
        username: '',
        password: '',
        vps_expire_date: null,
        proxy_source: '',
        proxy_credentials: '',
        proxy_type: '',
        proxy_expire_date: null,
    })

    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const columns = [
        { name: "Vps Source", uid: "vps_source" },
        { name: "Proxy Source", uid: "proxy_source" },
        { name: "Vps Expiry", uid: "vps_expire_date" },
        { name: "Proxy Expiry", uid: "proxy_expire_date" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const getProxiesBotsInfo = async (page, search = "") => {
        setLoadingState('loading');
        const res = await getProxiesBots(page, search);
        if (res.status == 'success') {
            setList(res.data.data);
            setTotalPages(res.data.totalPages);
        }
        setLoadingState('');
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
                vps_source: '',
                ip_address: '',
                username: '',
                password: '',
                vps_expire_date: null,
                proxy_source: '',
                proxy_credentials: '',
                proxy_type: '',
                proxy_expire_date: null,
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
        const timer = setTimeout(() => {
            getProxiesBotsInfo(page, searchValue)
        }, 300);

        return () => clearTimeout(timer);

    }, [searchValue, page]);

    useEffect(() => {
        setPage(1);
    },[searchValue]);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 w-full text-white max-lg:mx-auto ">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>PROXIES / VPS  BOTS</span>
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
                        onValueChange={(value) => {
                            setSearchValue(value);
                            setPage(1);
                        }}
                    />
                </div>
                <Button
                    radius="full"
                    className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                    size='sm'
                    onClick={() => {
                        setTargetInfo({
                            vps_source: '',
                            ip_address: '',
                            username: '',
                            password: '',
                            vps_expire_date: null,
                            proxy_source: '',
                            proxy_credentials: '',
                            proxy_type: '',
                            proxy_expire_date: null,
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
                    bottomContent={
                        totalPages > 0 ? (
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(page) => {
                                        setPage(page);
                                        setSearchValue("");
                                    }}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody
                        items={list}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                    >
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
                                        modalType === 'add' ? 'Add new proxy/vps bot' : modalType === 'update' ? 'Update proxy/vps bot' : 'View proxy/vps bot credentials'
                                    }
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col w-full'>

                                    {
                                        modalType != 'view' ?
                                            <div className='flex flex-col space-y-4'>
                                                <div className='space-y-2'>
                                                    <p className='text-left pb-2'>VPS</p>
                                                    <Input
                                                        type="text"
                                                        label="VPS Source"
                                                        value={targetInfo.vps_source}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, vps_source: e.target.value }))}
                                                    />
                                                    <Input
                                                        type="text"
                                                        label="IP Address"
                                                        value={targetInfo.ip_address}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, ip_address: e.target.value }))}
                                                    />
                                                    <div className='flex gap-4 items-center'>
                                                        <Input
                                                            type="text"
                                                            label="Username"
                                                            value={targetInfo.username}
                                                            onChange={(e) => setTargetInfo(p => ({ ...p, username: e.target.value }))}
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="Password"
                                                            value={targetInfo.password}
                                                            onChange={(e) => setTargetInfo(p => ({ ...p, password: e.target.value }))}
                                                        />
                                                    </div>
                                                    <Input
                                                        type="date"
                                                        label="Expire Date"
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={moment(targetInfo.vps_expire_date).format('YYYY-MM-DD')}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, vps_expire_date: e.target.value }))}
                                                    />
                                                </div>
                                                <div className='space-y-2'>
                                                    <p className='text-left pb-2'>Proxy</p>
                                                    <Input
                                                        type="text"
                                                        label="Proxy Source"
                                                        value={targetInfo.proxy_source}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, proxy_source: e.target.value }))}
                                                    />
                                                    <Input
                                                        type="text"
                                                        label="Credentials (IP:Port:Username:Password)"
                                                        value={targetInfo.proxy_credentials}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, proxy_credentials: e.target.value }))}
                                                    />
                                                    <Input
                                                        type="text"
                                                        label="Proxy Type(HTTP/Socks4/Socks5)"
                                                        value={targetInfo.proxy_type}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, proxy_type: e.target.value }))}
                                                    />
                                                    <Input
                                                        type="date"
                                                        label="Proxy expire Date"
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={moment(targetInfo.proxy_expire_date).format('YYYY-MM-DD')}
                                                        onChange={(e) => setTargetInfo(p => ({ ...p, proxy_expire_date: e.target.value }))}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className='flex flex-col space-y-4 text-left pb-4 font-semibold '>
                                                <p className='text-lg'>VPS</p>
                                                <div className='space-y-2'>
                                                    <p>Ip Address: <span className='text-sm font-normal'>{targetInfo.ip_address}</span></p>
                                                    <p>Username: <span className='text-sm font-normal'>{targetInfo.username}</span></p>
                                                    <p>Password: <span className='text-sm font-normal'>{targetInfo.password}</span></p>
                                                </div>
                                                <div className='space-y-2'>
                                                    <p className='text-lg'>Proxies</p>
                                                    <p>Credentials: <span className='text-sm font-normal'>{targetInfo.proxy_credentials}</span></p>
                                                </div>
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
