"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Search, Pencil, Trash, Facebook, Google, Twitter } from "@/components/utils/Icons";
import { getUserInfo, getUsernames } from '@/axios/user';
import { SUBSCRIPTION_NAMES } from '@/config/config';
import { deleteUser, updateUserInfo } from '../../../axios/user';

export default function UsersView() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [usernames, setUsernames] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        target: "",
        result: ""
    })

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { id } = router.query;

    if (!id) {
        router.push("/admin/users");
        return;
    }

    const icons = {
        search: <Search />,
        pencil: <Pencil />,
        trash: <Trash />,
        google: <Google />,
        facebook: <Facebook />,
        twitter: <Twitter />
    };

    const handleBackButton = () => {
        history.back()
    }

    const getUserDetails = async () => {

        const userRes = await getUserInfo(id);
        if (userRes.status === 'success') {
            setUserInfo(userRes.data);
            const usernamesRes = await getUsernames(id);
            if (usernamesRes.status == 'success') {
                setUsernames(usernamesRes.data);
            }
        }
        else {
            router.push("/admin/users");
        }
    }

    const handleUpdateAuthInfo = useCallback(async () => {
        setIsActionProcessing(true);

        let requestData = {
            email
        };

        if ( modalData.target == 'password' ) requestData.password = password;

        const res = await updateUserInfo(id, requestData);

        if ( res.status == 'success' ) {
            if ( modalData.target == 'email' ) {
                setUserInfo(p => ({...p, email}));
            }
            setModalData({
                target: "",
                title: "",
                result: ""
            });
            setEmail("");
            setPassword("");
            onClose();
        } else {
            setModalData(p => ({
                ...p,
                result: res.data
            }));
        }

        setIsActionProcessing(false);
    }, [email, password, modalData])

    const handleDeleteUser = async () => {
        setIsActionProcessing(true);
        const res = await deleteUser(id);

        if (res.status == 'success') {
            router.push("/admin/users");
        } else {
            console.log(res.data);
        }
        setIsActionProcessing(false);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    if (userInfo) return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">
            <div className='flex mt-5 max-lg:mx-auto w-full justify-between items-center'>
                <div>
                    <span className='font-extrabold text-lg'>USERS</span>
                </div>
                <div>
                    <Button radius='full' size="sm" className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white text-sm" onClick={() => handleBackButton()}>
                        Back
                    </Button>
                </div>
            </div>
            <div className='flex flex-col space-y-5 mt-10'>
                <div className='flex font-semibold text-base gap-4'>
                    <div className='flex'>EMAIL :</div>
                    <div className='flex'>{userInfo.email}</div>
                </div>
                <div className='flex font-semibold text-base gap-4'>
                    <div className='flex'>Full Name :</div>
                    <div className='flex'>{userInfo.name || ""}</div>
                </div>
                <div className='flex font-semibold text-base gap-4'>
                    <div className='flex'>EMCONNECTED WITH :</div>
                    <div className='flex'><span className='capitalize'>{userInfo.social ? <span className='flex gap-2 items-center'>{icons[userInfo.social]} Google </span> : ""}</span></div>
                </div>
                <div className='flex font-semibold text-base gap-4'>
                    <div className='flex'>USERNAMES :</div>
                    <div className='flex flex-col'>
                        {usernames.map(({ username, link }, index) => <div className='flex items-center gap-4' key={index} >
                            <p>Username: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent'>{username}</span></p>
                            <p>Link: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent'>{link}</span></p>
                        </div>)}
                    </div>
                </div>
                <div className='flex font-semibold text-base gap-4 items-center'>
                    <div className='flex'>CONTRACT :</div>
                    <div className='flex'>
                        <Button radius='full' size="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm">
                            Download
                        </Button>
                    </div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                    <div className='flex'>PLAN :</div>
                    <div className='flex capitalize'>{userInfo.subscription.status} </div>
                </div>
                <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                    <div className='flex'>ACTIVE PLAN :</div>
                    <div className='flex'> {SUBSCRIPTION_NAMES[userInfo.subscription.plan_id]}</div>
                </div>
            </div>
            <div className='flex flex-col max-w-[200px] space-y-8 mt-8'>
                <Button
                    radius='full'
                    size="sm"
                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                    onPress={() => {
                        setModalData({
                            title: "Update Email",
                            target: "email",
                            result: ""
                        });
                        setEmail(userInfo.email);
                        onOpen();
                    }}
                >
                    <span className='flex gap-1'>{icons.pencil} EDIT EMAIL</span>
                </Button>
                <Button
                    radius='full'
                    size="sm"
                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                    onPress={() => {
                        setModalData({
                            title: "Update Password",
                            target: "password",
                            result: ""
                        });
                        onOpen();
                    }}
                >
                    <span className='flex gap-1'>{icons.pencil} EDIT PASSWORD</span>
                </Button>
                <Button
                    radius='full'
                    size="sm"
                    className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                    onPress={handleDeleteUser}
                    isLoading={isActionProcessing}
                >
                    <span className='flex gap-1'>{icons.trash} DELETE USER</span>
                </Button>
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                size={'lg'}
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
                                    {modalData.title}
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className='text-left text-red-500'>{modalData.result}</p>
                                <div className='flex flex-col w-full'>
                                    {
                                        modalData.target == 'email' ?
                                            <Input
                                                type="text"
                                                label="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            /> :
                                            <Input
                                                type="password"
                                                label="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                    }
                                    <div className='flex my-2 mt-4 justify-end'>
                                        <Button
                                            radius="lg"
                                            className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                            onClick={handleUpdateAuthInfo}
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

        </div>
    )
    else {
        return <></>
    }
}
