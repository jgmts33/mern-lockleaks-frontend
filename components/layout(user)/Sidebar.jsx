"use client";
import React, { useEffect, useState } from "react";
import { FileHost, CalendarCheck, Users, Star, Category, Proxybots, Management, PingModels, AutoContract, Bing, SMScanner, Submit, UserContent, Search, AIProfile, DataReport, DmcaBadges, AccountSetting, DownloadData, SidebarClose, Notification, Scanner, Photo, ProfileSquare, WarningCircle, TestBots, YellowStar } from "@/components/utils/Icons";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    Button, ScrollShadow
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';

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
    const [selectSidebar, setSelectSidebar] = useState(0);
    const userData = useSelector((state) => state.auth);
    const [sidebarList, setSidebarList] = useState([
        {
            id: 0,
            icon: icons.category,
            title: "DASHBOARD",
            path: "/userpanel/dashboard",
            favourite: false
        }, {
            id: 1,
            icon: icons.scanner,
            title: "SCANNER",
            path: "/userpanel/scanner",
            favourite: false
        }, {
            id: 2,
            icon: icons.warningcircle,
            title: "ADULT WEBSITES",
            path: "/userpanel/adultwebsite",
            favourite: false
        }, {
            id: 3,
            icon: icons.filehost,
            title: "FILE HOSTED",
            path: "/userpanel/filehosted",
            favourite: false
        }, {
            id: 4,
            icon: icons.search,
            title: "GOOGLE",
            path: "/userpanel/google",
            favourite: false
        }, {
            id: 5,
            icon: icons.search,
            title: "BING",
            path: "/userpanel/bing",
            favourite: false
        }, {
            id: 6,
            icon: icons.photo,
            title: "AI FACE IMAGES",
            path: "/userpanel/AIfaceimages",
            favourite: false
        }, {
            id: 7,
            icon: icons.AIProfile,
            title: "AI FACE PROFILES",
            path: "/userpanel/AIfaceprofile",
            favourite: false
        }, {
            id: 8,
            icon: icons.SMscanner,
            title: "SM SCANNER",
            path: "/userpanel/SMscanner",
            favourite: false
        }, {
            id: 9,
            icon: icons.submit,
            title: "SM SUBMIT",
            path: "/userpanel/SMsubmit",
            favourite: false
        }, {
            id: 10,
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/userpanel/recoveryuser",
            favourite: false
        }, {
            id: 11,
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/userpanel/dmcabadges",
            favourite: false
        }, {
            id: 12,
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/userpanel/datareport",
            favourite: false
        }, {
            id: 13,
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/userpanel/dataanalytics",
            favourite: false
        }, {
            id: 14,
            icon: icons.profilesquare,
            title: "PERSONAL AGENT",
            path: "/userpanel/personalagent",
            favourite: false
        }, {
            id: 15,
            icon: icons.AccountSetting,
            title: "ACCOUNT SETTINGS",
            path: "/userpanel/accountsetting",
            favourite: false
        }, {
            id: 16,
            icon: icons.DownloadData,
            title: "DOWNLOAD DATA",
            path: "/userpanel/downloaddata",
            favourite: false
        }, {
            id: 17,
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/userpanel/notification",
            favourite: false
        }
    ]);

    const [adminsidebarList, setAdminSidebarList] = useState([
        {
            icon: icons.category,
            title: "DASHBOARD",
            path: "/jdieij83dklxosoehfjf/dashboard",
            favourite: false
        }, {
            icon: icons.scanner,
            title: "SCANNER",
            path: "/jdieij83dklxosoehfjf/scanner",
            favourite: false
        }, {
            icon: icons.search,
            title: "GOOGLE & BING",
            path: "/jdieij83dklxosoehfjf/googlebing",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "AI FACE",
            path: "/jdieij83dklxosoehfjf/AIface",
            favourite: false
        }, {
            icon: icons.submit,
            title: "SOCIAL MEDIA",
            path: "/jdieij83dklxosoehfjf/socialmedia",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "PERSONAL AGENT",
            path: "/jdieij83dklxosoehfjf/personalagent",
            favourite: false
        }, {
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/jdieij83dklxosoehfjf/rusercontent",
            favourite: false
        }, {
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/jdieij83dklxosoehfjf/dmcabadges",
            favourite: false
        }, {
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/jdieij83dklxosoehfjf/analytics",
            favourite: false
        }, {
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/jdieij83dklxosoehfjf/datareport",
            favourite: false
        }, {
            icon: icons.testbots,
            title: "TEST BOTS",
            path: "/jdieij83dklxosoehfjf/testbots",
            favourite: false
        }, {
            icon: icons.users,
            title: "USERS",
            path: "/jdieij83dklxosoehfjf/users",
            favourite: false
        }, {
            icon: icons.proxybots,
            title: "PROXIES BOTS",
            path: "/jdieij83dklxosoehfjf/proxybot",
            favourite: false
        }, {
            icon: icons.management,
            title: "VPS MANAGEMENT",
            path: "/jdieij83dklxosoehfjf/vpsmanagement",
            favourite: false
        }, {
            icon: icons.management,
            title: "REPORTS MANAGEMENT",
            path: "/jdieij83dklxosoehfjf/reportmanagement",
            favourite: false
        }, {
            icon: icons.pingmodels,
            title: "PING MODELS",
            path: "/jdieij83dklxosoehfjf/pingmodels",
            favourite: false
        }, {
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/jdieij83dklxosoehfjf/notifications",
            favourite: false
        }, {
            icon: icons.autocontract,
            title: "AUTO-CONTRACT",
            path: "/jdieij83dklxosoehfjf/autocontract",
            favourite: false
        }, {
            icon: icons.bing,
            title: "BLOG",
            path: "/jdieij83dklxosoehfjf/blog",
            favourite: false
        }
    ])

    const handleSidebarClick = (path, index) => {
        setSelectSidebar(index)
        router.push(path);
    }

    const ModalOverlay = () => (
        <div
            className={`flex lg:hidden fixed top-0 right-0 bottom-0 left-0 bg-transparent backdrop-blur z-10`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    const handleSelectFavourite = (selectindex) => {
        if (userData.email == "cosmin@gmail.com" && userData.password == "admin123") {
            adminsidebarList.map((item, index) => {
                if (index === selectindex && item.favourite != true) {
                    item.favourite = !item.favourite;
                    return item
                }
                else {
                    return item
                }
            })

            adminsidebarList.sort((a, b) => { return a.id - b.id })
            adminsidebarList.sort((a, b) => { return b.favourite - a.favourite })
        }
        else {
            sidebarList.map((item, index) => {
                if (index === selectindex && item.favourite != true) {
                    item.favourite = !item.favourite;
                    return item
                }
                else {
                    return item
                }
            })

            sidebarList.sort((a, b) => { return a.id - b.id })
            sidebarList.sort((a, b) => { return b.favourite - a.favourite })
        }
    }

    return (
        <>
            <div className={`flex flex-col bg-[#000001] text-white overflow-y-auto ease-in-out max-w-72 py-3 w-full max-sm:bg-[#020615] max-lg:h-screen justify-start px-3 max-sm:px-0 z-40 max-lg:absolute duration-1000 cursor-pointer ${show ? "max-lg:left-0" : "max-lg:left-[-100%]"}`}>
                <div className="flex w-full">
                    {
                        userData.email == "cosmin@gmail.com" && userData.password == "admin123"
                            ?
                            <div className="mx-auto flex items-center justify-around w-full">
                                <div className="flex"><Link className="text-white cursor-pointer" href="/jdieij83dklxosoehfjf/dashboard"><Image src="/assets/logo.svg" width={150} height={50} alt="logo" /></Link></div>
                            </div>
                            :
                            <div className="mx-auto flex items-center justify-around w-full">
                                <div className="flex"><Link className="text-white cursor-pointer" href="/userpanel/dashboard"><Image src="/assets/logo.svg" width={150} height={50} alt="logo" /></Link></div>
                            </div>
                    }
                </div>
                {
                    userData.email == "cosmin@gmail.com" && userData.password == "admin123"
                        ?
                        <div className="flex flex-col mt-5 sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] space-y-1 px-4 py-3 w-full gap-2">
                            {
                                adminsidebarList.map((items, index) => {
                                    return (
                                        <div key={index} className={("py-1 items-center ") + (selectSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-2 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-3 text-white flex justify-start"))} size='sm' onClick={() => handleSidebarClick(items.path, index)}>
                                            {
                                                items.favourite ?
                                                    <div className="border border-gray-500 bg-transparent rounded-md" onClick={() => handleSelectFavourite(index)}>{icons.star}</div>
                                                    :
                                                    <div className="border border-gray-500 bg-transparent rounded-md" onClick={() => handleSelectFavourite(index)}>{icons.yellowstar}</div>
                                            }
                                            <span>{items.icon}</span>
                                            <span className="font-light text-xs">{items.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="flex flex-col mt-5 sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] space-y-1 px-4 py-3 w-full gap-3">
                            {
                                sidebarList.map((items, index) => {
                                    return (
                                        <div key={index} className={("py-1 items-center ") + (selectSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-2 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-3 text-white flex justify-start"))} onClick={() => handleSidebarClick(items.path, index)}>
                                            {
                                                items.favourite ?
                                                    <div className="border border-gray-500 bg-transparent rounded-md" onClick={() => handleSelectFavourite(index)}>{icons.star}</div>
                                                    :
                                                    <div className="border border-gray-500 bg-transparent rounded-md" onClick={() => handleSelectFavourite(index)}>{icons.yellowstar}</div>
                                            }
                                            <div className="flex cursor-pointer gap-1 items-center">
                                                <span>{items.icon}</span>
                                                <span className="font-light text-sm">{items.title}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
}

export default Sidebar;
