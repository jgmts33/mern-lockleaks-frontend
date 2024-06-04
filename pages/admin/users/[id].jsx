"use client";
import Image from 'next/image';
import {
    Button, Link, ScrollShadow, Input,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Switch
} from '@nextui-org/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Search, Pencil, Trash, Facebook, Google, Twitter } from "@/components/utils/Icons";
import { getUserInfo, getUsernames } from '@/axios/user';
import { SUBSCRIPTION_NAMES } from '@/config/config';
import { deleteUser, updateUserInfo } from '../../../axios/user';
import { SelectSwitch, UnselectSwitch } from '../../../components/utils/Icons';

export default function UsersView() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [usernames, setUsernames] = useState([]);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        target: "",
        result: ""
    })

    const [targetKeyword, setTargetKeyword] = useState({
        username: '',
        link: '',
        update: false
    });

    const [isUsernameLinkValidationProcessing, setIsUsernameLinkValidationProcessing] = useState(false);
    const [urlValidation, setUrlValidation] = useState("");
    const [targetKeywordType, setTargetKeywordType] = useState('username');
    const [targetKeywordIndex, setTargetKeywordIndex] = useState(0);
    const handleSetNewUsername = useCallback(() => {

        console.log(usernames, targetKeywordIndex);
        let newUsername = targetKeyword.username.replace("@", "");
        if (newUsername) {
            const _usernames = usernames.slice(0);
            _usernames[targetKeywordIndex].username = newUsername;
            setUsernames(_usernames);
            setTargetKeywordType('link');
        }
    }, [targetKeyword, usernames, targetKeywordIndex]);

    const handleSetNewLink = useCallback(async () => {
        let newLink = targetKeyword.link.replace("@", "");
        setIsUsernameLinkValidationProcessing(true);
        if (newLink && checkLinkValidation()) {
            const _usernames = usernames.slice(0);
            const res = await checkDoubleUsername({
                username: _usernames[targetKeywordIndex].username,
                link: newLink
            });
            if (res.data.valid && !usernames.find(item => item.link === newLink && item.username == targetKeyword.username.replace("@", ""))) {
                _usernames[targetKeywordIndex].link = newLink;
                setUsernames(_usernames);
                setTargetKeyword(null);
                setTargetKeywordType('username');
            }
            else {
                setUrlValidation("Already existed.");
            }
        }
        setIsUsernameLinkValidationProcessing(false);
    }, [targetKeyword, usernames, targetKeywordIndex]);

    const checkLinkValidation = useCallback(() => {
        var url = targetKeyword?.link || "";
        var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(url)) {
            setUrlValidation("Please enter valid Link.");
            return false;
        }
        return true;
    }, [targetKeyword]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { id } = router.query;

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
            setUserDetails(userRes.data);
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

        if (modalData.target == 'password') requestData.password = password;

        const res = await updateUserInfo(id, requestData);

        if (res.status == 'success') {
            if (modalData.target == 'email') {
                setUserDetails(p => ({ ...p, email }));
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
        if ( !id ) return;
        getUserDetails();
    }, [id]);

    return (
        <>
            {userDetails ? <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">
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
                <div className='grid grid-cols-2 max-md:grid-cols-1 mt-10 gap-4'>
                    <div>
                        <p className='font-medium text-lg'>User Information</p>
                        <div className='flex flex-col gap-5 w-full bg-white/10 shadow-sm border border-gray-500 rounded-[16px] p-6 mt-4'>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>EMAIL :</div>
                                <div className='flex'>{userDetails.email}</div>
                            </div>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>Full Name :</div>
                                <div className='flex'>{userDetails.name || ""}</div>
                            </div>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>Social Media Auth :</div>
                                <div className='flex'><span className='capitalize'>{userDetails.social ? <span className='flex gap-2 items-center'>{icons[userDetails.social]} Google </span> : ""}</span></div>
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
                                <div className='flex capitalize'>{userDetails.subscription.status} </div>
                            </div>
                            <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <div className='flex'>ACTIVE PLAN :</div>
                                <div className='flex'> {SUBSCRIPTION_NAMES[userDetails.subscription.plan_id]}</div>
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
                                        setEmail(userDetails.email);
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
                        </div>
                        <Modal
                            backdrop="opaque"
                            isOpen={isOpen && modalData.title}
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
                    <div>
                        <p className='font-medium text-lg'>USERNAMES LIST <span className='font-medium text-sm'>({usernames.filter(p => (p.link != "")).length} USERNAMES)</span></p>
                        <div className='flex flex-col gap-5 w-full bg-white/10 shadow-sm border border-gray-500 rounded-[16px] p-6 mt-4'>
                            <Modal
                                backdrop="opaque"
                                isOpen={targetKeyword && isOpen && !modalData.title}
                                size='lg'
                                onOpenChange={onOpenChange}
                                classNames={{
                                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                                }}
                            >
                                <ModalContent className='bg-gradient-to-br from-gray-600/10 to-gray-800/80 justify-center opacity-[.9]  text-white text-center max-md:absolute max-md:top-32'>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader>
                                                {
                                                    targetKeywordType == 'link' ?
                                                        <p className='font-medium text-center'>{!targetKeyword.update ? "ADD" : "UPDATE"} LINK TO <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{usernames[targetKeywordIndex].username}</span></p>
                                                        : <p className='font-medium text-center'> {!targetKeyword.update ? "ADD NEW" : "UPDATE"} USERNAME</p>
                                                }
                                            </ModalHeader>
                                            <ModalBody>
                                                <div className="flex flex-col pb-10 px-10 ">
                                                    <div className="flex w-full flex-col gap-4 mt-5">
                                                        <p className='flex justify-start'>{targetKeywordType == 'link' ? "LINK:" : "USERNAME:"}</p>
                                                        <div className='flex'>
                                                            {
                                                                <div className="w-full flex">
                                                                    <div className="flex flex-col gap-2 mt-1">
                                                                        <Switch
                                                                            defaultSelected
                                                                            size="lg"
                                                                            color="default"
                                                                            thumbIcon={({ isSelected, className }) =>
                                                                                isSelected ? (
                                                                                    <SelectSwitch className={className} />
                                                                                ) : (
                                                                                    <UnselectSwitch className={className} />
                                                                                )
                                                                            }
                                                                        >
                                                                        </Switch>
                                                                    </div>
                                                                    <div className='flex flex-col w-full'>
                                                                        <input
                                                                            type="text"
                                                                            placeholder={targetKeywordType == 'username' ? 'Type here.. @username' : 'Type here.... example: https://onlyfans.com/@username'}
                                                                            value={targetKeywordType == 'link' ? targetKeyword.link : targetKeyword.username}
                                                                            onChange={(e) => {
                                                                                if (targetKeywordType == 'link') setTargetKeyword(p => ({ ...p, link: e.target.value }))
                                                                                else setTargetKeyword(p => ({ ...p, username: e.target.value }))
                                                                            }}
                                                                            className='w-full outline-none p-2 rounded-lg bg-white text-black'
                                                                            required
                                                                        />
                                                                        <p className='mt-1 text-red-700 text-left'>{urlValidation}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='bg-gradient-to-tr max-sm:flex-wrap w-full mx-auto mt-4 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center'
                                                    >
                                                        <Button
                                                            radius="full"
                                                            className="bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg"
                                                            onClick={() => {
                                                                if (targetKeywordType == 'link') handleSetNewLink();
                                                                else handleSetNewUsername();
                                                            }}
                                                            isLoading={isUsernameLinkValidationProcessing}
                                                        >
                                                            {targetKeywordType == 'link' ? <span>Save</span> : <span>Next</span>}
                                                        </Button>
                                                        <Button
                                                            radius="full"
                                                            className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"
                                                            onClick={() => {
                                                                setTargetKeyword(null);
                                                                setTargetKeywordType("username")
                                                                let _usernames = usernames.slice(0, -1);
                                                                setUsernames(_usernames);
                                                            }}
                                                        >
                                                            <span>Cancel</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </ModalBody>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                            <Button
                                radius="md"
                                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg text-base border border-white/40 w-max mt-2"
                                size='md'
                                onClick={() => {
                                    setTargetKeyword({
                                        username: '',
                                        link: ''
                                    });
                                    setUsernames(p => [...p, {
                                        username: '',
                                        link: ''
                                    }])
                                    setTargetKeywordIndex(usernames.length)
                                    onOpen();
                                }}
                            >
                                <span>Add New Username</span>
                            </Button>
                            <ScrollShadow className='h-[560px] flex flex-col gap-3 py-2'>
                                {
                                    usernames.map((keyword, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                    keyword.username && keyword.link ?
                                                        <div className='flex flex-wrap items-center gap-4 bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm border border-gray-700 px-4 py-2 w-full rounded-xl'>
                                                            <p className='max-sm:hidden bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                                                            <div className='flex flex-col gap-2 flex-1'>
                                                                <div>USERNAME: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.username}</span></div>
                                                                <div>LINK: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.link}</span></div>
                                                            </div>
                                                            <div className='flex w-max items-center gap-4'>
                                                                <Button
                                                                    radius="full"
                                                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                    size='sm'
                                                                    onClick={() => {
                                                                        setTargetKeywordIndex(index);
                                                                        setTargetKeyword({ ...usernames[index], update: true });
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </Button>
                                                                <Button
                                                                    radius="full"
                                                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                    size='sm'
                                                                    onClick={() => {
                                                                        setUsernames(p => {
                                                                            let _p = p.slice(0);
                                                                            _p.splice(index, 1);
                                                                            return _p;
                                                                        });
                                                                    }}
                                                                >
                                                                    <span>Delete</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>}
                                            </div>
                                        )
                                    })
                                }
                            </ScrollShadow>
                        </div>

                    </div>
                </div>

            </div> : <></>}
        </>
    )
}
