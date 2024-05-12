"use client";
import Image from 'next/image';
import {
    Button,
    Switch,
} from '@nextui-org/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { SelectSwitch, Shine, UnselectSwitch } from '@/components/utils/Icons';

export default function BUY() {

    const ButtonContent = [
        "2 (+$40)", "3 (+$80)", "4 (+$120)", "CUSTOM"
    ]

    const icons = {
        shine: <Shine fill="currentColor" size={16} />,
    };

    const [step, setStep] = useState(0);
    const [username, setUsername] = React.useState(false);

    const AddUserName = [
        {
            title: "ADD NEW USERNAME",
            description: "We will use your username to identify and report copyright infringements",
            sub_title: "username:",
            input: true,
            LeftButton: "Next",
            RightButton: "Cancel"
        },
        {
            title: "ADD NEW USERNAME",
            description: "We will utilize your profile page URL to establish your ownership of this content.",
            sub_title: "Link:",
            input: true,
            LeftButton: "Save",
            RightButton: "Cancel"
        },
        {
            title: "USERNAMES HISTORY CONTENT RECOVERY & REMOVAL REPORT",
            description: "+$200",
            sub_title: "",
            input: false,
            LeftButton: "Add",
            RightButton: "Skip"
        },
    ]

    return (
        <div className="text-white w-full min-h-[calc(100vh-112px)] max-w-[1389px]  flex flex-col items-center justify-center pb-24 pt-4">
            {
                step == 0 ?
                    <div className='flex justify-center mx-auto gap-10 max-xl:flex-col max-sm:items-center max-sm:mx-auto max-sm:px-2'>
                        <div className="flex bg-white/5 shadow-sm py-14 rounded-[20px] w-[720px] max-sm:w-full max-sm:h-auto flex-col gap-4 px-20 max-sm:px-6 max-sm:pb-6">
                            <p className='font-medium text-6xl'>ORDER</p>
                            <div className='flex flex-col'>
                                <p className='mt-10'>Tell Us Jow Many Usernames You're Using.</p>
                                <select className="form-select bg-white text-black p-3 rounded-lg mt-5 block w-full">
                                    <option>1 INCLUDED</option>
                                    <option>$5,000</option>
                                    <option>$10,000</option>
                                    <option>$25,000</option>
                                </select>
                            </div>
                            <div className='flex-col flex'>
                                <p className='font-medium text-3xl'>ADD NEW USERNAME</p>
                                {
                                    ButtonContent.map((item, index) => {
                                        return (
                                            <Button key={index} className="rounded-[10px] mt-5 max-w-[327px] max-sm:max-w-full bg-gradient-to-tr from-purple-light to-purple-weight text-white text-base" size='md'>
                                                {item}
                                                <span>{icons.shine}</span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col bg-gradient-to-tr mx-auto from-[#dd7272] to-[#7d1eeb] h-[430px] rounded-[20px] z-10 p-5 w-full text-center ">
                            <div className='mt-5'>
                                <Button radius="full" className="bg-opacity-50 mx-auto flex bg-white/50 p-2" size='md'>
                                    <span className='px-4'>popular</span>
                                </Button>
                            </div>
                            <div className='p-7 text-center flex flex-col justify-center'>
                                <p className='font-bold text-6xl mt-3'>STAR</p>
                                <p className='font-normal text-5xl mt-10'>$350</p>
                                <p className='font-bold text-3xl'>/MO</p>
                                <p className='font-normal text-base mt-5'>YOU ARE FREE TO CANCEL AT ANY TIME</p>
                                <p className='font-normal text-base'>+ PRICE FROM EXTRA USERNAMES + ADDON CAM MODELS</p>
                            </div>
                        </div>
                    </div>
                    :
                    step == 1
                        ?
                        <div className='flex flex-col gap-5'>
                            {
                                AddUserName.map((content, index) => {
                                    return (
                                        <div key={index} className="flex bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 cursor-pointer w-full max-w-[724px] flex-col border border-gray-700 py-20 px-10 ">
                                            <p className='font-medium text-[34px] text-center'>{content.title}</p>
                                            <p className={content.input == true ? 'mt-3' : "text-center"}>{content.description}</p>
                                            <div className="flex w-full flex-col gap-4 mt-10">
                                                <p className='flex justify-start'>{content.sub_title}</p>
                                                <div className='flex'>
                                                    {
                                                        <div className={content.input != true ? 'hidden' : "w-full flex"}>
                                                            <div className="flex flex-col gap-2">
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
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder='Type here'
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className='w-full outline-none p-2 pr-28 rounded-lg bg-white text-black'
                                                                required
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className='bg-gradient-to-tr max-sm:flex-wrap max-sm:w-full mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-1 border-gray-700 border rounded-[30px] max-w-[576px] gap-2 items-center container'>
                                                <Button radius="full" className={username ? "bg-gradient-to-tr mx-auto w-1/2 from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-5 text-lg" : "w-1/2 bg-transparent mx-auto px-7 py-5 text-lg"} size='lg' onClick={() => setUsername(true)}>
                                                    {content.LeftButton}
                                                </Button>
                                                <Button radius="full" className="w-1/2 bg-transparent mx-auto px-7 py-5 text-lg" size='lg'>
                                                    {content.RightButton}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className='w-full'>
                            <div className="flex bg-gradient-to-br mt-20 max-sm:mt-8 text-center mx-auto from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 flex-col border border-gray-700 px-5">
                                <p className='font-medium text-[34px] text-center'>PAYMENT</p>
                                <p className='mt-3 font-normal text-base'>We utilize Paddle as our payment processing platform. Paddle ensures secure payment transactions.
                                    Follow the on-screen instructions to complete your purchase securely. Please note, additional VAT costs may apply based on your location.
                                    This charge will be billed at regular intervals until you opt to cancel the automatic renewal.
                                </p>
                                <div className='bg-gradient-to-tr mx-auto mt-10 from-gray-600/40 to-gray-800/40 p-2 border-gray-600 border rounded-[30px] max-w-[676px] gap-3 flex max-md:flex-col items-center'>
                                    <Button radius="full" className="mx-auto bg-transparent text-white shadow-lg px-7 py-7 max-md:flex-wrap text-lg" size='lg'>
                                        Pay whith credit card
                                    </Button>
                                    <Button radius="full" className=" bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-7 text-lg" size='lg'>
                                        Pay whith paypal
                                    </Button>
                                    <Button radius="full" className=" bg-transparent mx-auto px-7 py-7 text-lg" size='lg'>
                                        Request fan support
                                    </Button>
                                </div>
                            </div>
                            <div className='mx-auto text-start mt-20 max-sm:mt-8 mb-40 max-sm:mb-8 max-md:px-3'>
                                <p className='font-normal text-base'>We're utilizing Paddle for payment processing. What is Paddle? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
                                <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
                            </div>
                        </div>
            }
            <div className='max-sm:px-6 w-full fixed bottom-0 bg-black/55 backdrop-blur-xl left-0 z-20 h-20'>
                <div className='max-w-[1389px] flex justify-between items-center bg-transparent my-4 mx-auto'>
                    <Button
                        radius="lg"
                        className={"bg-gradient-to-tr text-white w-36 " + (step > 0 ? ' from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800 cursor-not-allowed')}
                        size='lg'
                        disabled={step <= 0}
                        onPress={() => setStep(p => (p <= 0 ? p : p - 1))}
                    >
                        Back
                    </Button>
                    <Button
                        radius="lg"
                        className={"bg-gradient-to-tr text-white w-36 " + (step < 2 ? 'from-purple-light to-purple-weight' : 'from-gray-700 to-gray-800 cursor-not-allowed')}
                        size='lg'
                        disabled={step >= 2}
                        onPress={() => setStep(p => (p >= 2 ? p : p + 1))}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div >
    )
}
