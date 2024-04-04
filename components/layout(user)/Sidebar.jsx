"use client";
import React, { useEffect, useState } from "react";
import { FileHost, CalendarCheck, Users, Category, Proxybots, Management, PingModels, AutoContract, Bing, SMScanner, Submit, UserContent, Search, AIProfile, DataReport, DmcaBadges, AccountSetting, DownloadData, SidebarClose, Notification, Scanner, Photo, ProfileSquare, WarningCircle, TestBots } from "@/components/utils/Icons";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    Button, ScrollShadow
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = ({ show, setter }) => {
    const router = useRouter();
    const [selectSidebar, setSelectSidebar] = useState(0);
    const userData = useSelector((state) => state.auth)

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
    };

    const UserSidebarButtons = [
        {
            icon: icons.category,
            title: "DASHBOARD",
            path: "/userpanel/dashboard"
        }, {
            icon: icons.scanner,
            title: "SCANNER",
            path: "/userpanel/scanner"
        }, {
            icon: icons.warningcircle,
            title: "ADULT WEBSITES",
            path: "/userpanel/adultwebsite"
        }, {
            icon: icons.filehost,
            title: "FILE HOSTED",
            path: "/userpanel/filehosted"
        }, {
            icon: icons.search,
            title: "GOOGLE",
            path: "/userpanel/google"
        }, {
            icon: icons.search,
            title: "BING",
            path: "/userpanel/bing"
        }, {
            icon: icons.photo,
            title: "AI FACE IMAGES",
            path: "/userpanel/AIfaceimages"
        }, {
            icon: icons.AIProfile,
            title: "AI FACE PROFILES",
            path: "/userpanel/AIfaceprofile"
        }, {
            icon: icons.SMscanner,
            title: "SM SCANNER",
            path: "/userpanel/SMscanner"
        }, {
            icon: icons.submit,
            title: "SM SUBMIT",
            path: "/userpanel/SMsubmit"
        }, {
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/userpanel/recoveryuser"
        }, {
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/userpanel/dmcabadges"
        }, {
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/userpanel/datareport"
        }, {
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/userpanel/dataanalytics"
        }, {
            icon: icons.profilesquare,
            title: "PERSONAL AGENT",
            path: "/userpanel/personalagent"
        }, {
            icon: icons.AccountSetting,
            title: "ACCOUNT SETTINGS",
            path: "/userpanel/accountsetting"
        }, {
            icon: icons.DownloadData,
            title: "DOWNLOAD DATA",
            path: "/userpanel/downloaddata"
        }, {
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/userpanel/notification"
        }
    ]

    const AdminSidebarButtons = [
        {
            icon: icons.category,
            title: "DASHBOARD",
            path: "/jdieij83dklxosoehfjf/dashboard"
        }, {
            icon: icons.scanner,
            title: "SCANNER",
            path: "/jdieij83dklxosoehfjf/scanner"
        }, {
            icon: icons.search,
            title: "GOOGLE & BING",
            path: "/jdieij83dklxosoehfjf/googlebing"
        }, {
            icon: icons.AIProfile,
            title: "AI FACE",
            path: "/jdieij83dklxosoehfjf/AIface"
        }, {
            icon: icons.submit,
            title: "SOCIAL MEDIA",
            path: "/jdieij83dklxosoehfjf/socialmedia"
        }, {
            icon: icons.AIProfile,
            title: "PERSONAL AGENT",
            path: "/jdieij83dklxosoehfjf/personalagent"
        }, {
            icon: icons.usercontent,
            title: "R&R OF USER CONTENT",
            path: "/jdieij83dklxosoehfjf/rusercontent"
        }, {
            icon: icons.AIProfile,
            title: "DMCA BADGES",
            path: "/jdieij83dklxosoehfjf/dmcabadges"
        }, {
            icon: icons.calendarcheck,
            title: "DATA ANALYTICS",
            path: "/jdieij83dklxosoehfjf/analytics"
        }, {
            icon: icons.DataReport,
            title: "DATA REPORT",
            path: "/jdieij83dklxosoehfjf/datareport"
        }, {
            icon: icons.testbots,
            title: "TEST BOTS",
            path: "/jdieij83dklxosoehfjf/recoveryuser"
        }, {
            icon: icons.users,
            title: "USERS",
            path: "/jdieij83dklxosoehfjf/users"
        }, {
            icon: icons.proxybots,
            title: "PROXIES BOTS",
            path: "/jdieij83dklxosoehfjf/proxybot"
        }, {
            icon: icons.management,
            title: "VPS MANAGEMENT",
            path: "/jdieij83dklxosoehfjf/vpsmanagement"
        }, {
            icon: icons.management,
            title: "REPORTS MANAGEMENT",
            path: "/jdieij83dklxosoehfjf/profitmanagement"
        }, {
            icon: icons.pingmodels,
            title: "PING MODELS",
            path: "/jdieij83dklxosoehfjf/accountsetting"
        }, {
            icon: icons.notification,
            title: "NOTIFICATION",
            path: "/jdieij83dklxosoehfjf/notifications"
        }, {
            icon: icons.autocontract,
            title: "AUTO-CONTRACT",
            path: "/jdieij83dklxosoehfjf/autocontract"
        }, {
            icon: icons.bing,
            title: "BLOG",
            path: "/jdieij83dklxosoehfjf/notification"
        }
    ]

    const handleSidebarClick = (path, index, title, icon) => {
        setter(false)
        setSelectSidebar(index);
        router.push(path);
    }

    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/80 z-10`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
        <div className={`flex flex-col bg-[#000001] text-white max-sm:min-w-1/4 overflow-y-auto ease-in-out min-h-screen max-w-72 w-full max-sm:bg-[#020615]/80 max-lg:rounded-3xl max-sm:rounded-md justify-start px-3 py-10 z-40 max-lg:absolute duration-1000 ${show ? "max-lg:left-0" : "max-lg:left-[-100%]"}`}>
            <div className="flex w-full">
                <div className="mx-auto flex items-center justify-around w-full">
                    <div className="flex"><Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={150} height={50} alt="logo" /></Link></div>
                </div>
            </div>
            {
                userData.email == "cosmin@gmail.com" && userData.password == "admin123"
                    ?
                    <div className="flex flex-col mt-5 sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] px-2 max-sm:py-0 py-5 max-sm:px-0 w-full space-y-2">
                        {
                            AdminSidebarButtons.map((items, index) => {
                                return (
                                    <Button key={index} className={selectSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 gap-2 rounded-[20px] justify-start") : ("bg-transparent gap-5 text-white flex justify-start")} size='sm' onClick={() => handleSidebarClick(items.path, index)}>
                                        <span>{items.icon}</span>
                                        <span className="font-light text-xs">{items.title}</span>
                                    </Button>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col mt-5 sm:bg-[url('/assets/background/sidebar.png')] backdrop-blur-sm bg-cover bg-no-repeat rounded-[20px] px-2 max-sm:py-0 py-5 max-lg:gap-3 w-full gap-2">
                        {
                            UserSidebarButtons.map((items, index) => {
                                return (
                                    <Button key={index} className={selectSidebar == index ? ("bg-gradient-to-tr from-purple-light to-purple-weight flex px-5 gap-5 rounded-[20px] justify-start") : ("bg-transparent gap-5 text-white flex justify-start")} size='sm' onClick={() => handleSidebarClick(items.path, index, items.title, items.icon)}>
                                        <span>{items.icon}</span>
                                        <span className="font-light text-xs">{items.title}</span>
                                    </Button>
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
