"use client";
import {
    Button,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Switch,
    Pagination,
    Spinner
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "@/components/utils/Icons";
import { getUsersListInfo, updateUserVisible } from '@/axios/user';
import { SUBSCRIPTION_NAMES } from '@/config/config';

export default function Users() {

    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const [loadingState, setLoadingState] = useState("");
    const [page, setPage] = useState(1);
    const [totalResult , setTotalResult] = useState(0);
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [inActiveUserCount, setInActiveUserCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [list, setList] = useState([]);
    const icons = {
        search: <Search />,
    };

    const getUsersList = async (page, search = "") => {
        setLoadingState('loading');
        const res = await getUsersListInfo(page, search);

        if (res.status == 'success') {
            setList(res.data.data);
            setTotalPages(res.data.totalPage);
            setTotalResult(res.data.totalCount);
            setActiveUserCount(res.data.activeCount)
            setInActiveUserCount(res.data.inActiveCount)
        }
        setLoadingState("");
    }

    const handleUpdateUserVisible = async (id, ban) => {
        const res = await updateUserVisible(id, ban);

        if (res.status == 'success') {
            setList(p => p.map((item) => item.id == id ? ({ ...item, ban: ban }) : item));
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getUsersList(page, searchValue);
        }, 300);

        return () => clearTimeout(timer);

    }, [searchValue, page]);

    useEffect(() => {
        setPage(1);
    },[searchValue]);

    const columns = [
        { name: "Email", uid: "email" },
        { name: "Full Name", uid: "name" },
        { name: "Plan", uid: "plan" },
        { name: "Ban", uid: "ban" },
        { name: "View", uid: "view" },
    ];


    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "view":
                return (
                    <div className="relative flex items-center gap-4">
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                            size='sm'
                            onPress={() => {
                                router.push(`/admin/users/views?id=${item.id}`)
                            }}
                        >
                            View
                        </Button>
                    </div>
                );
            case "ban":
                return <Switch isSelected={cellValue} onValueChange={(value) => {
                    handleUpdateUserVisible(item.id, value);
                }}>
                    {cellValue ? <span>Yes</span> : <span>No</span>}
                </Switch>
            case "plan":
                return <p>{!item.subscription.plan_id ? '' : <span>{SUBSCRIPTION_NAMES[item.subscription.plan_id]} ({item.subscription.status})</span>}</p>
            default:
                return <div className='flex items-center w-max gap-4'>
                    <p>{cellValue}</p>
                </div>;
        }
    };

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto w-full">
            <div className='max-lg:mx-auto max-sm:mt-0'>
                <span className='font-extrabold text-lg'>USERS</span>
            </div>
            <div className='flex justify-between mt-10 max-sm:mt-5 max-md:gap-5 max-sm:flex-col max-sm:mx-auto'>
                <span className='font-semibold text-base'>TOTAL ACTIVE PLANS: {totalResult}</span>
                <span className='font-semibold text-base'>TOTAL USERS: {activeUserCount}</span>
                <span className='font-semibold text-base'>TOTAL INACTIVE PLANS: {inActiveUserCount}</span>
            </div>
            <div className='max-w-[500px] w-full mt-4'>
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
            <div className='flex flex-col bg-white/10 shadow-sm border border-gray-500 rounded-[16px] mt-4 w-full p-10 max-md:p-4'>
                <Table
                    className='max-h-[calc(100vh-352px)] overflow-y-auto'
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
                                    onChange={(page) => setPage(page)}
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
        </div>
    )
}
