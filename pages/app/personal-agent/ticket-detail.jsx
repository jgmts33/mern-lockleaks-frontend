"use client";
import {
    Button, ScrollShadow, Input,
    Spinner,
} from '@nextui-org/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cancel, Shape, PaperClip, PaperPlane, Search, SortDown, SortUp } from "@/components/utils/Icons";
import { getCurrentTicketStatus, getMessagesByTicket, getTicketsByUser, sendMessage, updateTickStatus } from '@/axios/ticket';
import moment from 'moment/moment';
import { userInfo as info } from '@/lib/auth/authSlice';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { io } from 'socket.io-client';
import { ENDPOINT } from '@/config/config';
import { SendMessage } from '@/components/utils/Icons';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function TicketDetail() {

    const userInfo = useSelector(info);

    const messagesListRef = useRef(null);

    const [list, setList] = useState([]);
    const [filterdList, setFilteredList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [targetTicket, setTargetTicket] = React.useState(null);
    const [isTicketProcessing, setIsTicketProcessing] = useState(false);

    const [isMessagesProcessing, setIsMessagesProcessing] = useState(false);
    const [messages, setMessages] = useState([]);
    const [attachedImagesPreviewUrls, setAttachedImagesPreviewUrls] = useState([]);
    const [message, setMessage] = useState({
        content: '',
        attached_images: []
    });
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    const [selectedTicketStatus, setSelectedTicketStatus] = useState('');
    const [sortDateDSC, setSortDateDSC] = useState(true);
    const [limit, setLimit] = useState(0);
    const router = useRouter();

    const icons = {
        cancel: <Cancel />,
        shape: <Shape />,
        paperclip: <PaperClip />,
        paperplane: <PaperPlane />,
        search: <Search />,
        sortDown: <SortDown />,
        sortUp: <SortUp />,
        sendMessage: <SendMessage fill="currentColor" size={32} />,
    };

    const handleGoSettings = () => {
        router.push("/app/personal-agent/property");
    }

    const getTicketsInfo = async () => {
        setIsTicketProcessing(true);
        const res = await getTicketsByUser();

        if (res.status == 'success') {
            setList(res.data);
        }
        setIsTicketProcessing(false);
    }

    const getMessagesByTicketInfo = useCallback(async () => {
        if (!targetTicket) return;
        setIsMessagesProcessing(true);
        const res = await getMessagesByTicket(targetTicket.id)

        if (res.status == 'success') {
            console.log("res.data:", res.data)
            setMessages(res.data);
        }
        setIsMessagesProcessing(false);
    }, [targetTicket]);

    const handleImageUpload = async (files) => {
        if (!files.length) return;
        let _attachedImagesPreviewUrls = [];
        for (let file of files) {
            const newPreviewUrl = URL.createObjectURL(file);
            _attachedImagesPreviewUrls.push(newPreviewUrl);
        }
        setAttachedImagesPreviewUrls(_attachedImagesPreviewUrls);
        setMessage(p => ({ ...p, attached_images: files }));
    }

    const handleSendMessage = useCallback(async () => {
        setIsSendingMessage(true);
        const formData = new FormData();
        if (message.attached_images) {
            Array.from(message.attached_images).forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }
        formData.append('content', message.content);
        formData.append('sender_id', userInfo.id);
        formData.append('attached_image_length', message.attached_images.length);
        formData.append('ticket_id', targetTicket.id);

        setMessage({
            content: '',
            attached_images: []
        });

        setAttachedImagesPreviewUrls([]);

        await sendMessage(formData);

        setIsSendingMessage(false);
    }, [message, userInfo, targetTicket]);

    const handleKeyDown = useCallback((evt) => {
        if (evt.keyCode == 13 && !evt.shiftKey) {
            handleSendMessage()
            return;
        }
    }, [message, userInfo, targetTicket]);

    const getCurrentTicketStatusInfo = useCallback(async () => {
        const res = await getCurrentTicketStatus();

        if (res.status == 'success') {
            setLimit(userInfo.subscription.features.personal_agent - res.data.count);
        }
    }, [userInfo])

    useEffect(() => {
        if (selectedTicketStatus == '') setFilteredList(list);

        let _list = list.filter(p => {
            if (p.status == selectedTicketStatus) return p;
            else if (p.status == '' && selectedTicketStatus == 'open') return p;
        });


        if (searchValue) {
            _list = _list.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()));
        }

        if (sortDateDSC) {
            setFilteredList(_list.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))));
        }
        else {
            setFilteredList(_list.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))));
        }


    }, [searchValue, selectedTicketStatus, list, sortDateDSC]);

    useEffect(() => {
        messagesListRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [filterdList.slice(0)]);

    useEffect(() => {
        if (!userInfo) return;
        getMessagesByTicketInfo();

        const socket = io(ENDPOINT);

        socket.on(`update_ticket_status`, async ({ id, status }) => {
            setList(prevState => {
                let _items = prevState.map((item) => {
                    if (item.id == Number(id)) {
                        setTargetTicket(p => ({ ...p, status }));
                        setSelectedTicketStatus(status);
                        return { ...item, status: status }
                    } else return item;
                });
                return _items;
            });
        })

        if (targetTicket) {

            socket.on(`new_message_${targetTicket.id}`, async (value) => {
                if (value.sender_id != userInfo.id) {
                    setSelectedTicketStatus('open');
                }
                setMessages(p => ([...p, value]));
            });
        }

        socket.on(`ticket_closed_${userInfo.id}`, (value) => {
            if (targetTicket?.id == Number(value)) {
                setTargetTicket(p => ({ ...p, status: 'closed' }));
                setSelectedTicketStatus('closed');
            }
            setList(p => p.filter((item) => item.id != value));
        });

        socket.on(`ticket_deleted_${userInfo.id}`, (value) => {
            setList(p => p.filter((item) => item.id != value));
            if (targetTicket?.id == Number(value)) setTargetTicket(null);
        });

        return () => {
            socket.disconnect();
        }

    }, [targetTicket, userInfo]);

    useEffect(() => {
        getTicketsInfo();
        getCurrentTicketStatusInfo();
    }, []);

    return (
        <div className="flex flex-col bg-gradient-to-tr px-5 py-5 text-white w-full h-[calc(100vh-60px)]">
            <div className='flex flex-col space-y-5 pb-3 max-md:mx-auto max-md:text-center'>
                <span className='font-extrabold text-lg'>PERSONAL AGENT</span>
                <span className='font-semibold text-[18px]'>Your Inquiries</span>
            </div>
            <div className='flex gap-5 max-sm:flex-col flex-1'>
                <div className={"flex flex-col max-w-[450px] h-full max-sm:w-full max-sm:w-max-full w-full bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5 max-md:mx-auto " + (targetTicket ? "max-sm:hidden" : "")}>
                    <div className='flex flex-col justify-between mt-5 items-center'>
                        <div className='flex justify-between w-full items-center gap-4'>
                            <Input
                                isClearable
                                radius="lg"
                                classNames={{
                                    label: "text-black/50 dark:text-white/90",
                                    input: [
                                        "bg-transparent notranslate",
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
                            <Button
                                radius="sm"
                                className="bg-gradient-to-tr bg-transparent text-white text-lg"
                                size='sm'
                                isIconOnly
                                onPress={() => setSortDateDSC(p => !p)}
                            >
                                {sortDateDSC ? icons.sortDown : icons.sortUp}
                            </Button>
                        </div>
                        <div className='flex justify-between mt-5 w-full'>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-600 text-white text-base " + (selectedTicketStatus == 'open' ? 'from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800')}
                                size='sm'
                                onClick={() => {
                                    setSearchValue('');
                                    setTargetTicket(null);
                                    setSelectedTicketStatus('open');
                                }
                                }
                            >
                                <span>IN PROGRESS</span>
                            </Button>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-600 text-white text-base " + (selectedTicketStatus == 'solved' ? 'from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800')}
                                size='sm'
                                onClick={() => {
                                    setSearchValue('');
                                    setTargetTicket(null);
                                    setSelectedTicketStatus('solved');
                                }
                                }
                            >
                                <span>SOLVED</span>
                            </Button>
                            <Button
                                radius="full"
                                className={"bg-gradient-to-tr border border-gray-600 text-white text-base " + (selectedTicketStatus == 'closed' ? 'from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800')}
                                size='sm'
                                onClick={() => {
                                    setSearchValue('');
                                    setTargetTicket(null);
                                    setSelectedTicketStatus('closed');
                                }
                                }
                            >
                                <span>CLOSED</span>
                            </Button>
                        </div>
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr border border-gray-600 text-white text-base from-purple-light to-purple-weight mt-4"
                            size='sm'
                            isDisabled={!limit}
                            onClick={() => {
                                if ( !limit ) return;
                                router.push("/app/personal-agent/create-ticket");
                            }}
                        >
                            <span>Create New Ticket (Left: <span className='notranslate'>{limit}</span>)</span>
                        </Button>
                    </div>
                    <div className='flex flex-col pt-3 w-full flex-1'>
                        <ScrollShadow className='h-[calc(100vh-420px)] space-y-2'>
                            {
                                !isTicketProcessing ?
                                    filterdList.length ?
                                        filterdList.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={("cursor-pointer p-3 rounded-lg ") + (targetTicket?.id == item.id ? 'flex flex-col border-3 border-gray-700 bg-gradient-to-tr from-purple-light to-purple-weight' : "flex flex-col border-3 border-gray-700")}
                                                    onClick={() => setTargetTicket(item)}
                                                >
                                                    <span className='font-normal text-sm'>#{item.id} / {moment(item.createdAt).format('MMMM DD, YYYY')}</span>
                                                    <span className='font-semibold text-[18px] inline-block truncate'>{item.name}</span>
                                                </div>
                                            )
                                        })
                                        : <p className='text-center mt-4'>No Tickets</p>

                                    :
                                    <div class="w-full justify-center flex">
                                        <Spinner />
                                    </div>
                            }
                        </ScrollShadow>
                    </div>
                </div>
                {targetTicket ?
                    <div className='flex flex-col w-full justify-between flex-1'>
                        <div className="flex flex-col w-full bg-white/15 border border-gray-500 rounded-[20px] px-10 py-5">
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col space-y-4'>
                                    <span className='font-normal text-sm'>#{targetTicket.id} / {moment(targetTicket.createdAt).format('MMMM DD, YYYY')}</span>
                                    <span className='font-semibold text-base mt-2'>{targetTicket.name}</span>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    {targetTicket.status != 'closed' ? <Button
                                        radius="full"
                                        className={"bg-gradient-to-tr border border-gray-600 text-white text-base " + (targetTicket.status != 'solved' ? 'from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800')}
                                        size='sm'
                                        onClick={async () => {
                                            if (targetTicket.status != 'solved') {
                                                await updateTickStatus(targetTicket.id, 'solved');
                                                setTargetTicket(p => ({
                                                    ...p,
                                                    status: 'solved'
                                                }));
                                                setSelectedTicketStatus('solved')
                                            }
                                        }}
                                    >
                                        {targetTicket.status == 'solved' ? <span>SOLVED</span> : <span>Set as Solved</span>}
                                    </Button> : <></>}
                                    <Button
                                        isIconOnly
                                        radius="sm"
                                        className="bg-gradient-to-tr bg-transparent text-white text-lg hidden max-sm:block"
                                        size='sm'
                                        onClick={() => setTargetTicket(null)}
                                    >
                                        {icons.cancel}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col flex-1 relative'>
                            <ScrollShadow className={'space-y-2 p-2 ' + (targetTicket.status == 'solved' || targetTicket.status == 'closed' ? 'h-[calc(100vh-300px)]' : 'h-[calc(100vh-400px)]')}>
                                {/* {
                                    isMessagesProcessing ?
                                        <div className='w-full flex justify-center mt-10 items-center'>
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        : */}
                                {messages.map((eachMessage, index) => {
                                    console.log(eachMessage);
                                    return <div key={index} className={'w-full flex flex-col ' + (eachMessage.sender_id == userInfo?.id ? 'items-end' : '')}>
                                        <div className='max-sm:max-w-full max-w-[600px] w-max p-2 space-y-2'>
                                            <p className={eachMessage.sender_id == userInfo?.id ? 'text-right px-2' : ' px-2'}>{eachMessage.sender_id == userInfo?.id ? <span>You:</span> : <span>Support:</span>}</p>
                                            <div className={eachMessage.sender_id == userInfo?.id ? 'flex justify-end' : 'flex '}>
                                                <div className={'w-full bg-white/15 border border-gray-500 rounded-[20px] p-5 min-w-48'}>
                                                    <pre className={poppins.className + ' text-wrap'}>{eachMessage.content}</pre>
                                                    <div className='flex flex-col gap-2 w-full'>
                                                        {
                                                            eachMessage.attached_images?.map((fileName, index) => <Image key={index} src={`https://server.lockleaks.com/images?filename=${fileName}`} alt='Attached' width={450} height={260} className='max-w-full h-auto' />)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={eachMessage.sender_id != userInfo?.id ? 'text-right px-2' : 'px-2'}>{moment(targetTicket.createdAt).format('MMMM DD, YYYY')}</p>
                                        </div>

                                    </div>
                                })}
                                {/* } */}
                                <div ref={messagesListRef} />
                            </ScrollShadow>
                        </div>
                        {(targetTicket.status != 'solved' && targetTicket.status != 'closed') ? <div className='flex gap-5 items-center relative' >
                            <label
                                className='flex items-center cursor-pointer relative'
                            >
                                {icons.paperclip}
                                <input
                                    type="file"
                                    className="hidden notranslate"
                                    onChange={(e) => handleImageUpload(e.target.files)}
                                    accept=".png,.jpg,.jpeg"
                                    maxLength={10}
                                    multiple
                                />
                            </label>
                            {attachedImagesPreviewUrls.length ?
                                <div
                                    className='absolute w-max top-2 left-0 px-2 text-center bg-gradient-to-tr border rounded-full from-purple-light to-purple-weight '
                                    onClick={() => {
                                        setAttachedImagesPreviewUrls([]);
                                        setMessage(p => ({ ...p, attached_images: [] }));
                                    }}
                                >
                                    {attachedImagesPreviewUrls.length}
                                </div>
                                : <></>}
                            {attachedImagesPreviewUrls.length ?
                                <div
                                    className='absolute w-max text-center bg-gradient-to-tr border rounded-full from-purple-light to-purple-weight cursor-pointer'
                                    style={{ left: `${attachedImagesPreviewUrls.length * 5 + 175}px`, top: `${-(attachedImagesPreviewUrls.length * 5 + 90)}px`, zIndex: attachedImagesPreviewUrls.length + 1 }}
                                    onClick={() => {
                                        setAttachedImagesPreviewUrls([]);
                                        setMessage(p => ({ ...p, attached_images: [] }));
                                    }}
                                >
                                    {icons.cancel}
                                </div>
                                : <></>}
                            <div className='flex justify-between gap-2 w-full bg-white/10 rounded-[16px] p-2 items-center relative'>

                                {
                                    attachedImagesPreviewUrls.map((src, index) => {
                                        return <Image
                                            key={index}
                                            src={src}
                                            width="150"
                                            height="80"
                                            className="absolute object-cover w-[150px] h-[80px] opacity-80 rounded-xl border border-gray-900 notranslate"
                                            style={{ zIndex: index, left: `${index * 5}px`, bottom: `${110 + index * 5}px` }}
                                        />
                                    })
                                }
                                <div className='w-full'>
                                    <textarea
                                        className='bg-transparent w-full rounded-lg h-20 outline-none p-3 notranslate'
                                        placeholder='Type Here'
                                        value={message.content}
                                        disabled={isSendingMessage}
                                        onChange={(e) => setMessage(p => ({ ...p, content: e.target.value }))}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                    />
                                </div>
                                <Button
                                    isIconOnly
                                    className='flex items-center'
                                    onPress={handleSendMessage}
                                    isLoading={isSendingMessage}
                                >
                                    {icons.paperplane}
                                </Button>
                            </div>
                        </div> : <></>}
                    </div>
                    :
                    <div className='flex flex-col w-full justify-center items-center flex-1'>
                        <div className='w-8 h-8'>{icons.sendMessage}</div>
                        <p className='mt-3'>Select a ticket to see then inquriy history</p>
                    </div>
                }
            </div>
        </div>
    )
}
