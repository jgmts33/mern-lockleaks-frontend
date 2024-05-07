"use client";
import React, { useCallback, useEffect, useState } from "react";
import { FileHost, CalendarCheck, Users, Star, Category, Proxybots, Management, PingModels, AutoContract, Bing, SMScanner, Submit, UserContent, Search, AIProfile, DataReport, DmcaBadges, AccountSetting, DownloadData, SidebarClose, Notification, Scanner, Photo, ProfileSquare, WarningCircle, TestBots, YellowStar } from "@/components/utils/Icons";
import Image from 'next/image';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import {
    Button, ScrollShadow
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

const Sidebar = ({ show, setter }) => {

    const icons = {
        filehost: <FileHost fill="currentColor" size={16} />,
        calendarcheck: <CalendarCheck fill="currentColor" size={16} />,
        category: <Category fill="currentColor" size={16} />,
        SMscanner: <SMScanner fill="currentColor" size={16} />,
        submit: <Submit fill="currentColor" size={16} />,
        usercontent: <UserContent fill="currentColor" size={16} />,
        AIProfile: <AIProfile fill="currentColor" size={16} />,
        DataReport: <DataReport fill="currentColor" size={16} />,
        dmcabadges: <DmcaBadges fill="currentColor" size={16} />,
        AccountSetting: <AccountSetting fill="currentColor" size={16} />,
        DownloadData: <DownloadData fill="currentColor" size={16} />,
        notification: <Notification fill="currentColor" size={16} />,
        scanner: <Scanner fill="currentColor" size={16} />,
        photo: <Photo fill="currentColor" size={16} />,
        profilesquare: <ProfileSquare fill="currentColor" size={16} />,
        warningcircle: <WarningCircle fill="currentColor" size={16} />,
        search: <Search fill="currentColor" size={16} />,
        sidebarclose: <SidebarClose fill="currentColor" size={16} />,
        testbots: <TestBots fill="currentColor" size={16} />,
        users: <Users fill="currentColor" size={16} />,
        proxybots: <Proxybots fill="currentColor" size={16} />,
        management: <Management fill="currentColor" size={16} />,
        pingmodels: <PingModels fill="currentColor" size={16} />,
        autocontract: <AutoContract fill="currentColor" size={16} />,
        bing: <Bing fill="currentColor" size={16} />,
        yellowstar: <YellowStar fill="currentColor" size={16} />,
        star: <Star fill="currentColor" size={16} />,
    };

    const router = useRouter();
    const [selectedSidebar, setSelectedSidebar] = useState(0);
    const userInfo = useSelector(info);
    const [sidebarList, setSidebarList] = useState([
        {
            id: 0,
            icon: icons.category,
            title: "DASHBOARD",
            path: "/app/dashboard",
            favourite: false
        }, {
            id: 1,
            icon: icons.scanner,
            title: "SCANNER",
            path: "/app/scanner",
            favourite: false
        }, {
            id: 2,
            icon: icons.warningcircle,
            title: "ADULT WEBSITES",
            path: "/app/adult-website",
            favourite: false
        }, {
            id: 3,
            icon: icons.filehost,
            title: "FILE HOSTED",
            path: "/app/file-hosted",
            favourite: false
        }, {
            id: 4,
            icon: icons.search,
            title: "GOOGLE",
            path: "/app/google",
            favourite: false
        }, {
            id: 5,
            icon: icons.search,
            title: "BING",
            path: "/app/bing",
            favourite: false
        }, {
            id: 6,
            icon: icons.photo,
            title: "AI FACE IMAGES",
            path: "/app/ai-face-images",
            favourite: false
        }, {
            id: 7,
            icon: icons.AIProfile,
            title: "AI FACE PROFILES",
            path: "/app/ai-face-profile",
            favourite: false
        }, {
            id: 8,
            icon: icons.SMscanner,
            title: "SM SCANNER",
            path: "/app/sm-scanner",
            favourite: false
        }, {
            id: 9,
            icon: icons.submit,
            title: "SM SUBMIT",
            path: "/app/sm-submit",
            favourite: false
        }, {
            id: 10,
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/app/recovery-user",
            favourite: false
        }, {
            id: 11,
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/app/dmcabadges",
            favourite: false
        }, {
            id: 12,
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/app/report",
            favourite: false
        }, {
            id: 13,
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/app/analytics",
            favourite: false
        }, {
            id: 14,
            icon: icons.profilesquare,
            title: "PERSONAL AGENT",
            path: "/app/personal-agent",
            favourite: false
        }, {
            id: 15,
            icon: icons.AccountSetting,
            title: "ACCOUNT SETTINGS",
            path: "/app/setting",
            favourite: false
        }, {
            id: 16,
            icon: icons.DownloadData,
            title: "DOWNLOAD DATA",
            path: "/app/download",
            favourite: false
        }, {
            id: 17,
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/app/notification",
            favourite: false
        }
    ]);

    const [adminsidebarList, setAdminSidebarList] = useState([
        {
            icon: icons.category,
            title: "DASHBOARD",
            path: "/admin/dashboard",
            favourite: false
        }, {
            icon: icons.scanner,
            title: "SCANNER",
            path: "/admin/scanner",
            favourite: false
        }, {
            icon: icons.search,
            title: "GOOGLE & BING",
            path: "/admin/google-bing",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "AI FACE",
            path: "/admin/ai-face",
            favourite: false
        }, {
            icon: icons.submit,
            title: "SOCIAL MEDIA",
            path: "/admin/social-media",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "PERSONAL AGENT",
            path: "/admin/personal-agent",
            favourite: false
        }, {
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/admin/ruser-content",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/admin/dmcabadges",
            favourite: false
        }, {
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/admin/analytics",
            favourite: false
        }, {
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/admin/report",
            favourite: false
        }, {
            icon: icons.testbots,
            title: "TEST BOTS",
            path: "/admin/test-bots",
            favourite: false
        }, {
            icon: icons.users,
            title: "USERS",
            path: "/admin/users",
            favourite: false
        }, {
            icon: icons.proxybots,
            title: "PROXIES BOTS",
            path: "/admin/proxy-bot",
            favourite: false
        }, {
            icon: icons.management,
            title: "VPS MANAGEMENT",
            path: "/admin/vps-management",
            favourite: false
        }, {
            icon: icons.management,
            title: "REPORTS MANAGEMENT",
            path: "/admin/report-management",
            favourite: false
        }, {
            icon: icons.pingmodels,
            title: "PING MODELS",
            path: "/admin/ping-models",
            favourite: false
        }, {
            icon: icons.autocontract,
            title: "AUTO-CONTRACT",
            path: "/admin/auto-contract",
            favourite: false
        }, {
            icon: icons.bing,
            title: "BLOG",
            path: "/admin/blog",
            favourite: false
        }, {
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/admin/notifications",
            favourite: false
        },
    ])

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

        let _adminsidebarList = adminsidebarList.slice(), _sidebarList = sidebarList.slice();
        if (userInfo.roles.find((p) => p === 'admin')) {
            _adminsidebarList.map((item, index) => {
                if (index === selectindex) {
                    _adminsidebarList[index].favourite = !item.favourite;
                }
            })
            _adminsidebarList.sort((a, b) => { return a.id - b.id })
            _adminsidebarList.sort((a, b) => { return b.favourite - a.favourite });
            _adminsidebarList.map((item, index) => {
                if (adminsidebarList[selectedSidebar].path == item.path) {
                    handleSidebarClick(item.path, index);
                }
            });
            setAdminSidebarList(_adminsidebarList);
        }
        else {
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
        }
    }, [sidebarList, adminsidebarList, selectedSidebar]);

    useEffect(() => {
        console.log(sidebarList, selectedSidebar);
    }, [sidebarList, selectedSidebar]);

    return (
        <>
            <div className={`flex flex-col h-screen bg-[#000001] text-white max-sm:overflow-y-auto ease-in-out max-w-80 w-full max-sm:bg-[#020615] max-lg:h-screen justify-start max-sm:px-0 z-40 max-lg:absolute duration-1000 ${show ? "max-lg:left-0" : "max-lg:left-[-100%]"}`}>
                <div className="flex w-full px-3 py-3">
                    {

                        currentPath.includes("admin") ?
                            <div className="mx-auto flex items-center justify-around w-full">
                                <div className="flex"><Link className="text-white cursor-pointer" href="/admin/dashboard"><Image src="/assets/logo.svg" width={150} height={50} alt="logo" /></Link></div>
                            </div>
                            :
                            <div className="mx-auto flex items-center justify-around w-full">
                                <div className="flex"><Link className="text-white cursor-pointer" href="/app/dashboard"><Image src="/assets/logo.svg" width={150} height={50} alt="logo" /></Link></div>
                            </div>
                    }
                </div>
                <div className="overflow-y-auto h-[calc(100vh-56px)] px-3 pb-3">
                    {

                        currentPath.includes("admin") ?
                            <div className="flex flex-col sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] space-y-1 px-4 py-3 w-full gap-2">
                                {
                                    adminsidebarList.map((items, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={("py-1 items-center cursor-pointer ") + (selectedSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-2 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-3 text-white flex justify-start"))} size='sm'
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
                                                    <span className="text-xs">{items.title}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="flex flex-col sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] space-y-1 px-4 py-3 w-full gap-3">
                                {
                                    sidebarList.map((items, index) => {
                                        return (
                                            <div key={index} className="flex items-center cursor-pointer gap-2" onClick={() => handleSidebarClick(items.path, index)}>
                                                {
                                                    items.favourite ?
                                                        <div
                                                            className="border border-gray-500 bg-transparent rounded-md"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSelectFavourite(index)
                                                            }}
                                                        >
                                                            {icons.star}
                                                        </div>
                                                        :
                                                        <div
                                                            className="border border-gray-500 bg-transparent rounded-md"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleSelectFavourite(index)
                                                            }}
                                                        >
                                                            {icons.yellowstar}
                                                        </div>
                                                }
                                                <div className={"py-1 items-center w-full " + (selectedSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-2 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-3 text-white flex justify-start"))} onClick={() => handleSelectTitle()}>
                                                    <div className="flex cursor-pointer gap-1 items-center">
                                                        <span>{items.icon}</span>
                                                        <span className="text-sm">{items.title}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}

export default Sidebar;
