"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Star, YellowStar } from "@/components/utils/Icons";
import Image from 'next/image';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { Poppins } from "next/font/google";
import { ADMIN_SIDEBAR_LIST, USER_SIDEBAR_LIST, MODERATOR_SIDEBAR_LIST } from "@/config/config";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

const Sidebar = ({ show, setter }) => {

    const pathname = usePathname();

    const icons = {
        yellowstar: <YellowStar />,
        star: <Star />,
    };

    const router = useRouter();
    const [selectedSidebar, setSelectedSidebar] = useState(0);
    const userInfo = useSelector(info);
    const [sidebarList, setSidebarList] = useState([]);

    const handleSidebarClick = useCallback((path, index) => {
        setSelectedSidebar(index)
        router.push(path);
    }, [selectedSidebar]);

    const ModalOverlay = () => (
        <div
            className={`flex lg:hidden fixed top-0 right-0 bottom-0 left-0 bg-transparent backdrop-blur z-10`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    const handleSelectTitle = () => {
        setter(false)
    }

    const currentPath = usePathname();

    const handleSelectFavourite = useCallback((selectindex) => {

        let _sidebarList = sidebarList.slice();
        _sidebarList.map((item, index) => {
            if (index === selectindex) {
                _sidebarList[index].favourite = !item.favourite;
            }
        })
        _sidebarList.sort((a, b) => { return a.id - b.id })
        _sidebarList.sort((a, b) => { return b.favourite - a.favourite });
        _sidebarList.map((item, index) => {
            if (sidebarList[selectedSidebar].path == item.path) {
                handleSidebarClick(item.path, index);
            }
        });
        setSidebarList(_sidebarList);

    }, [sidebarList, selectedSidebar]);

    useEffect(() => {

        if (userInfo.roles.includes('admin')) {
            setSidebarList(ADMIN_SIDEBAR_LIST);
            setSelectedSidebar(ADMIN_SIDEBAR_LIST.findIndex(p => p.path === currentPath));
        } else if (userInfo.roles.includes('moderator')) {
            setSidebarList(MODERATOR_SIDEBAR_LIST);
            setSelectedSidebar(MODERATOR_SIDEBAR_LIST.findIndex(p => p.path === currentPath));
        } else {
            setSidebarList(USER_SIDEBAR_LIST);
            setSelectedSidebar(USER_SIDEBAR_LIST.findIndex(p => p.path === currentPath));
        }
    }, [userInfo, currentPath]);

    return (
        <>
            <div className={`flex flex-col h-screen bg-[#000001] text-white max-sm:overflow-y-auto ease-in-out max-w-80 w-full max-sm:bg-[#020615] max-lg:h-screen justify-start max-sm:px-0 z-40 max-lg:absolute duration-1000 ${show ? "max-lg:left-0" : "max-lg:left-[-100%]"}`}>
                <div className="flex w-full px-6 py-3 justify-center">
                    {
                        currentPath.includes("admin") ?
                            <Link className="text-white cursor-pointer" href="/admin/dashboard">
                                <Image src="/assets/logo.svg" width={150} height={50} alt="logo" />
                            </Link>
                            :
                            <Link className="text-white cursor-pointer" href="/app/dashboard">
                                <Image src="/assets/logo.svg" width={150} height={50} alt="logo" />
                            </Link>
                    }
                </div>
                <div className="overflow-y-auto h-[calc(100vh-56px)] px-3 pb-3">

                    <div className="flex flex-col sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] space-y-1 px-4 py-3 w-full gap-2">
                        {
                            sidebarList.map((items, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={("py-1 items-center cursor-pointer ") + (pathname.startsWith(items.path) ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-2 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-3 text-white flex justify-start"))} size='sm'
                                        onClick={() => handleSidebarClick(items.path, index)}
                                    >
                                        {
                                            items.favourite ?
                                                <div className="border border-gray-500 bg-transparent rounded-md"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectFavourite(index);
                                                    }}
                                                >
                                                    {icons.star}
                                                </div>
                                                :
                                                <div className="border border-gray-500 bg-transparent rounded-md"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectFavourite(index);
                                                    }}
                                                >
                                                    {icons.yellowstar}
                                                </div>
                                        }
                                        <div className="flex cursor-pointer gap-1 items-center" onClick={() => handleSelectTitle()}>
                                            <span>{items.icon}</span>
                                            <span className={"text-sm " + (items.title == 'AI FACE' ? 'notranslate' : '') }>{items.title}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}

export default Sidebar;
