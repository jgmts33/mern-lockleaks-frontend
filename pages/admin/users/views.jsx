"use client";
import {
    Button,
    ScrollShadow,
    Input,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Switch
} from '@nextui-org/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Search, Pencil, Trash, Facebook, Google, Twitter, FacebookAlt, RedditAlt, InstagramAlt, TiktokAlt, Add } from "@/components/utils/Icons";
import { getUserInfo, getUsernames, deleteUser, updateUserInfo, updatePaymentStatus, updateUserToModerator, downloadCopyrightHolder, uploadCopyrightHolder, updateUserEmailVerify } from '@/axios/user';
import { SUBSCRIPTION_NAMES } from '@/config/config';
import { SelectSwitch, UnselectSwitch } from '@/components/utils/Icons';
import { useSearchParams } from 'next/navigation';
import { checkDoubleUsername, createUsernames, deleteUsername, updateUsername } from '@/axios/usernames';
import moment from 'moment/moment';
import { getSocialUsername } from '@/axios/social-usernames';
import { updateSocialUsername } from '@/axios/social-usernames';

export default function UsersView() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const user_id = searchParams.get('id');

    const PLANS = [
        { id: 1, name: 'trial' },
        { id: 2, name: 'starter' },
        { id: 3, name: 'pro' },
        { id: 4, name: 'star' }
    ]

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [usernames, setUsernames] = useState([]);
    const [planDetails, setPlanDetails] = useState({
        status: "",
        plan_id: 1,
        period: 1,
        payment_method: ""
    })
    const [socialUsername, setSocialUsername] = useState(null);
    const [socialUsernameText, setSocialUsernameText] = useState(null);
    const [isActionProcessing, setIsActionProcessing] = useState(false);
    const [isUsernameDeleteProcessing, setIsUsernameDeleteProcessing] = useState(-1);
    const [modalData, setModalData] = useState({
        title: "",
        target: "",
        result: ""
    })

    const [targetKeyword, setTargetKeyword] = useState({
        id: '',
        username: '',
        link: '',
        update: false
    });

    const copyrightHolderRef = useRef(null);
    const [reUploaded, setReUploaded] = useState(false);

    const [isUsernameLinkValidationProcessing, setIsUsernameLinkValidationProcessing] = useState(false);
    const [urlValidation, setUrlValidation] = useState("");
    const [targetKeywordType, setTargetKeywordType] = useState('username');
    const [targetKeywordIndex, setTargetKeywordIndex] = useState(0);
    const handleSetNewUsername = useCallback(() => {

        let newUsername = targetKeyword.username.replace("@", "");
        if (newUsername) {
            const _usernames = usernames.slice(0);
            _usernames[targetKeywordIndex].username = newUsername;
            setUsernames(_usernames);
            setTargetKeywordType('link');
        }
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

    const handleSetNewLink = useCallback(async () => {
        let newLink = targetKeyword.link.replace("@", "");
        setIsUsernameLinkValidationProcessing(true);
        if (newLink && checkLinkValidation()) {
            const _usernames = usernames.slice(0);
            const res = await checkDoubleUsername({
                username: _usernames[targetKeywordIndex].username,
                link: newLink
            });
            if (res.data.valid && !usernames.filter((item, index) => index != targetKeywordIndex).find(item => item.link === newLink && item.username == targetKeyword.username.replace("@", ""))) {
                let usernameResult;
                if (targetKeyword.update) {
                    usernameResult = await updateUsername(targetKeyword.id, { username: targetKeyword.username, link: targetKeyword.link });
                    _usernames[targetKeywordIndex].id = usernameResult.data.id;
                } else {
                    usernameResult = await createUsernames({ usernames: [{ username: targetKeyword.username, link: targetKeyword.link }] }, user_id);
                    _usernames[targetKeywordIndex].id = usernameResult.data[0].id;
                }
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
    }, [targetKeyword.link, targetKeyword.username, targetKeyword.update, targetKeyword.id, checkLinkValidation, usernames, targetKeywordIndex, user_id]);

    const handleDeleteUsername = async (id) => {
        setIsUsernameDeleteProcessing(id);
        const res = await deleteUsername(id);

        if (res.status == 'success') {
            setUsernames(p => p.filter(item => item.id != id));
        }
        setIsUsernameDeleteProcessing(-1);
    }

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const icons = {
        search: <Search />,
        pencil: <Pencil />,
        trash: <Trash />,
        google: <Google />,
        facebook: <Facebook />,
        twitter: <Twitter />,
        tiktokAlt: <TiktokAlt />,
        instagramAlt: <InstagramAlt />,
        facebookAlt: <FacebookAlt />,
        redditAlt: <RedditAlt />,
        add: <Add />
    };

    const handleBackButton = () => {
        history.back()
    }

    const getUserDetails = useCallback(async () => {

        const userRes = await getUserInfo(user_id);
        if (userRes.status === 'success') {
            setUserDetails(userRes.data);
            const usernamesRes = await getUsernames(user_id);
            if (usernamesRes.status == 'success') {
                setUsernames(usernamesRes.data);
            }
            const socialUsernameRes = await getSocialUsername(user_id);
            if (socialUsernameRes.status == 'success') {
                setSocialUsername(socialUsernameRes.data);
            }
            setEmail(userRes.data?.email);
        }
        else {
            router.push("/admin/users");
        }
    }, [router, user_id])

    const handleUpdateAuthInfo = useCallback(async () => {
        setIsActionProcessing('auth');

        if (modalData.target == 'social-username') {
            const res = await updateSocialUsername(socialUsername?.id, { username: socialUsernameText });

            if (res.status == 'success') {
                setModalData({
                    target: "",
                    title: "",
                    result: ""
                });
                setSocialUsername(res.data);
                onClose();
            }
            setIsActionProcessing(false);
            return;
        }

        let requestData = {
            email
        };

        if (modalData.target == 'password') requestData.password = password;

        const res = await updateUserInfo(user_id, requestData);

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
    }, [modalData.target, email, password, user_id, socialUsername?.id, socialUsernameText, onClose])

    const handleSetToModerator = useCallback(async (value) => {
        const res = await updateUserToModerator(userDetails?.id, value);

        if (res.status == 'success') {
            if (value) setUserDetails(p => ({ ...p, roles: ['moderator'] }));
            else setUserDetails(p => ({ ...p, roles: ['user'] }));
        }
    }, [userDetails]);

    const handleUserEmailVerify = useCallback(async (value) => {
        const res = await updateUserEmailVerify(userDetails?.id, value);

        if (res.status == 'success') {
            setUserDetails(p => ({ ...p, verified: value }));
        }
    }, [userDetails]);

    const handleDeleteUser = useCallback(async () => {
        setIsActionProcessing('delete');
        const res = await deleteUser(user_id);

        if (res.status == 'success') {
            router.push("/admin/users");
        } else {
            console.log(res.data);
        }
        setIsActionProcessing(false);
    }, [user_id]);

    const handleAddPlanMannually = useCallback(async () => {
        setIsActionProcessing('plan');
        const res = await updatePaymentStatus({
            plan: PLANS.find(p => p.id == planDetails.plan_id).name,
            payment_method: planDetails.payment_method,
            period: planDetails.period
        }, user_id);

        if (res.status == 'success') {
            setUserDetails(p => ({
                ...p,
                subscription: {
                    expire_date: planDetails.plan_id == 1 ? new Date().setDate(new Date().getDate() + 3) : new Date().setMonth(new Date().getMonth() + planDetails.period),
                    payment_method: planDetails.payment_method,
                    plan_id: planDetails.plan_id,
                    status: "active"
                }
            }));
            setPlanDetails({
                status: "",
                plan_id: 1,
                period: 1,
                payment_method: ""
            });
            onClose();
        }

        setIsActionProcessing(false);
    }, [planDetails, user_id]);

    const uploadCopyrightHolderFile = useCallback(async () => {
        copyrightHolderRef.current?.click();
    }, [copyrightHolderRef]);

    const handleUploadCopyrightHolder = useCallback(async () => {
        const uploadedFile = copyrightHolderRef.current.files[0];
        if (!uploadedFile) return;
        setIsActionProcessing('copyright_holder');

        const formData = new FormData();
        formData.append('file', uploadedFile);

        const res = await uploadCopyrightHolder(user_id, formData);

        if (res.status == 'success') {
            setReUploaded(true);

            setTimeout(() => {
                setReUploaded(false);
            }, 1000);
        }

        setIsActionProcessing(false);

    }, [user_id, copyrightHolderRef]);

    const handleDownload = async (id) => {
        setIsActionProcessing('copyright_holder');
        const res = await downloadCopyrightHolder(id);
        setIsActionProcessing(false);
        if (res.status == 'success') {
            const decodedData = atob(res.data);
            const byteCharacters = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                byteCharacters[i] = decodedData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteCharacters.buffer);
            const arrayBuffer = byteArray.buffer;
            const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);

            // Create a temporary anchor element and simulate a click to download the file
            const link = document.createElement('a');
            link.href = url;
            link.download = `Copyright Holder ${id}.pdf`; // Customize the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL to free up memory
            setTimeout(() => URL.revokeObjectURL(url), 100);
        }
    }

    useEffect(() => {
        if (!user_id) return;
        getUserDetails();
    }, [getUserDetails, user_id]);

    return (
        <>
            {userDetails ? <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white max-lg:mx-auto">
                <div className='max-lg:mx-auto'>
                    <div className='flex gap-16 items-center'>
                        <div><span className='font-extrabold text-lg'>USERS</span></div>
                    </div>
                    <div className='flex justify-end mt-5'>
                        <Button
                            radius="lg"
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-500 text-white shadow-lg text-base" size='md'
                            onClick={() => handleBackButton()}
                        >
                            Back
                        </Button>
                    </div>
                </div>
                <div className='grid grid-cols-2 max-md:grid-cols-1 mt-5 gap-4'>
                    <div>
                        <p className='font-medium text-lg'>User Information</p>
                        <div className='flex flex-col gap-5 w-full bg-white/10 shadow-sm border border-gray-500 rounded-[16px] p-6 mt-4'>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>USER ID :</div>
                                <div className='flex'>{userDetails.id}</div>
                            </div>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>EMAIL :</div>
                                <div className='flex'>{userDetails.email}</div>
                            </div>
                            <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <p>Email verified</p>
                                <Switch
                                    isSelected={!!userDetails.verified}
                                    onValueChange={(value) => {
                                        handleUserEmailVerify(value);
                                    }}
                                >
                                    {!!userDetails.verified ? <span>Yes</span> : <span>No</span>}
                                </Switch>
                            </div>
                            <div className='flex font-semibold text-base gap-4'>
                                <div className='flex'>IP Address :</div>
                                <div className='flex'>{userDetails.ip}</div>
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
                                {userDetails.contract.status == 'approved' ? <div className='flex gap-6'>
                                    <Button
                                        radius='full'
                                        className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                                        size="sm"
                                        onPress={() => router.push(`/admin/users/contract?id=${user_id}`)}
                                    >
                                        View Contract
                                    </Button>
                                </div> : <></>}
                            </div>
                            <div className='flex font-semibold text-base gap-4 items-center'>
                                <div className='flex'>COPYRIGHT HOLDER :</div>
                                {userDetails.copyright_holder ? <div className='flex gap-6'>
                                    <Button
                                        radius='full'
                                        className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                                        size="sm"
                                        onPress={() => handleDownload(userDetails?.id)}
                                        isLoading={isActionProcessing == 'copyright_holder'}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        radius="full"
                                        className="bg-gradient-to-tr from-purple-light to-purple-weight border border-gray-500 text-white shadow-lg text-base"
                                        size='sm'
                                        isLoading={isActionProcessing == 'copyright_holder'}
                                        onPress={uploadCopyrightHolderFile}
                                    >
                                        {reUploaded ? 'Uploaded' : 'Re-Upload'}
                                    </Button>
                                    <input
                                        type="file"
                                        id="file"
                                        accept=".pdf"
                                        ref={copyrightHolderRef}
                                        onChange={handleUploadCopyrightHolder}
                                        hidden
                                    />
                                </div> : <></>}
                            </div>
                            {userDetails.subscription.plan_id ? <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <div className='flex'>PLAN :</div>
                                <div className='flex capitalize'>{userDetails.subscription.status} </div>
                            </div> : <></>}
                            {userDetails.subscription.plan_id ? <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <div className='flex'>{userDetails.subscription.status == 'expired' ? 'LAST PLAN' : 'ACTIVE PLAN'} :</div>
                                <div className='flex'> {SUBSCRIPTION_NAMES[userDetails.subscription.plan_id]}</div>
                            </div> : <></>}
                            {userDetails.subscription.status == 'active' ? <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <div className='flex'> Expire Date :</div>
                                <div className='flex'> {moment(userDetails.subscription.expire_date).format("MMM DD, YYYY")}</div>
                            </div> : <></>}
                            <div className='flex font-semibold text-base max-w-[600px] gap-4'>
                                <p>Moderator</p>
                                <Switch
                                    isSelected={!!userDetails.roles.find(p => p == 'moderator')}
                                    onValueChange={(value) => {
                                        handleSetToModerator(value);
                                    }}
                                >
                                    {!!userDetails.roles.find(p => p == 'moderator') ? <span>Yes</span> : <span>No</span>}
                                </Switch>
                            </div>
                            <div className='flex flex-wrap gap-4'>
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
                                    isLoading={isActionProcessing == 'delete'}
                                >
                                    <span className='flex gap-1'>{icons.trash} DELETE USER</span>
                                </Button>
                                {!userDetails.subscription.plan_id ?
                                    <Button
                                        radius='full'
                                        size="sm"
                                        className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm"
                                        onPress={() => {
                                            setModalData({
                                                title: "Add Plan",
                                                target: "plan",
                                                result: ""
                                            });
                                            setPlanDetails({
                                                plan_id: 1,
                                                expire_date: new Date(),
                                                payment_method: '',
                                                status: ''
                                            })
                                            onOpen();
                                        }}
                                        isLoading={isActionProcessing == 'plan'}
                                    >
                                        <span className='flex gap-1 items-center'>{icons.add} ADD PLAN</span>
                                    </Button>
                                    :
                                    <></>}
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
                                                {modalData?.target == 'plan' ?
                                                    <div className='space-y-2'>

                                                        <div className='flex gap-2 items-center'>
                                                            <p>PLANS: </p>
                                                            {PLANS.map((item, index) => <div key={index}>
                                                                <Button
                                                                    radius="lg"
                                                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base capitalize bg-gradient-to-tr " + (planDetails.plan_id == item.id ? 'from-purple-light to-purple-weight' : 'from-gray-500 to-gray-600')}
                                                                    onPress={() => setPlanDetails({
                                                                        plan_id: item.id,
                                                                        period: 1,
                                                                        payment_method: 'Mannul',
                                                                        status: 'active'
                                                                    })}
                                                                >
                                                                    {item.name}
                                                                </Button>
                                                            </div>)}

                                                        </div>
                                                        {
                                                            planDetails.plan_id != 1 ? <div className='flex gap-2 items-center'>
                                                                <p>PERIOD: </p>
                                                                <div className='flex gap-2 items-center'>
                                                                    <Button
                                                                        radius="lg"
                                                                        className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr " + (planDetails.period == 1 ? 'from-purple-light to-purple-weight' : 'from-gray-500 to-gray-600')}
                                                                        onPress={() => setPlanDetails(p => ({
                                                                            ...p,
                                                                            period: 1,
                                                                            payment_method: 'mannul',
                                                                            status: 'active'
                                                                        }))}
                                                                    >
                                                                        1 Month
                                                                    </Button>
                                                                    <Button
                                                                        radius="lg"
                                                                        className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr " + (planDetails.period == 3 ? 'from-purple-light to-purple-weight' : 'from-gray-500 to-gray-600')}
                                                                        onPress={() => setPlanDetails(p => ({
                                                                            ...p,
                                                                            period: 3,
                                                                            payment_method: 'mannul',
                                                                            status: 'active'
                                                                        }))}
                                                                    >
                                                                        3 Months
                                                                    </Button>
                                                                </div>
                                                            </div> : <></>
                                                        }
                                                    </div>
                                                    :
                                                    <div>
                                                        {
                                                            modalData.target == 'email' ?
                                                                <Input
                                                                    type="text"
                                                                    label="Email"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                />
                                                                :
                                                                modalData.target == 'password' ?
                                                                    <Input
                                                                        type="password"
                                                                        label="Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                    />
                                                                    :
                                                                    <Input
                                                                        type="text"
                                                                        label="Social Username"
                                                                        value={socialUsernameText}
                                                                        onChange={(e) => setSocialUsernameText(e.target.value)}
                                                                    />
                                                        }
                                                    </div>}
                                                <div className='flex my-2 mt-4 justify-end'>
                                                    <Button
                                                        radius="lg"
                                                        className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-purple-light to-purple-weight"}
                                                        onClick={() => {
                                                            if (modalData.target == 'plan') handleAddPlanMannually();
                                                            else handleUpdateAuthInfo();
                                                        }}
                                                        isLoading={isActionProcessing == 'auth' || isActionProcessing == 'plan'}
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
                        <p className='font-medium text-lg'>Usernames List <span className='font-medium text-sm'>({usernames.filter(p => (p.link != "")).length} usernames)</span></p>
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
                                                                let _usernames = targetKeyword.update ? usernames.slice(0) : usernames.slice(0, -1);
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
                                    setModalData({
                                        target: "",
                                        title: "",
                                        result: ""
                                    });
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
                            <ScrollShadow className='h-[calc(100vh-540px)] flex flex-col gap-3 py-2'>
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
                                                                        setModalData({
                                                                            target: "",
                                                                            title: "",
                                                                            result: ""
                                                                        });
                                                                        setTargetKeywordIndex(index);
                                                                        setTargetKeyword({ ...usernames[index], update: true });
                                                                        onOpen();
                                                                    }}
                                                                >
                                                                    <span>Edit</span>
                                                                </Button>
                                                                <Button
                                                                    radius="full"
                                                                    className={"border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"}
                                                                    size='sm'
                                                                    isLoading={isUsernameDeleteProcessing == keyword.id}
                                                                    onClick={() => handleDeleteUsername(keyword.id)}
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
                            <div className='flex flex-col'>
                                <p className='font-semibold'> Social Media Username: </p>
                                <div className='flex gap-4 my-4'>
                                    <span>{icons.tiktokAlt}</span>
                                    <span>{icons.facebookAlt}</span>
                                    <span>{icons.redditAlt}</span>
                                    <span>{icons.instagramAlt}</span>
                                </div>
                                <p>Username: <span className='bg-gradient-to-r from-[#9C3FE4] to-[#C65647] bg-clip-text text-transparent notranslate'> {socialUsername?.username}</span></p>
                                <Button
                                    radius="md"
                                    className="bg-gradient-to-br from-purple-light to-purple-weight text-white shadow-lg text-base w-max mt-3"
                                    size='sm'
                                    onClick={() => {
                                        setModalData({
                                            title: "Update Social Media Username",
                                            target: "social-username",
                                            result: ""
                                        });
                                        setSocialUsernameText(socialUsername?.username);
                                        onOpen();
                                    }}
                                >
                                    <span>Change Username</span>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div> : <></>}
        </>
    )
}
