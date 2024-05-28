"use client";
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  useDisclosure,
  Input,
  ModalFooter,
  ScrollShadow
} from '@nextui-org/react';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Shine } from '@/components/utils/Icons';
import { useRouter } from 'next/router';
import { Success } from '@/components/utils/Icons';
import { useSearchParams } from 'next/navigation';
import { getPaymentLinkDetails } from '@/axios/agency';
import moment from 'moment/moment';
import { updatePaymentLink } from '../axios/agency';

export default function PaymentProcessed() {

  const icons = {
    shine: <Shine fill="currentColor" size={16} />,
    success: <Success fill="currentColor" size={16} />,
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isProcessing, setIsProcessing] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [status, setStatus] = useState('');
  const [expireDate, setExpireDate] = useState(null);

  const handlePaymentProcess = useCallback(async () => {
    if (!code) return;

    const res = await updatePaymentLink(code);

    if (res.status == 'success') {
      // router.push("/app/scanner");
      onOpen();
    } else {
      console.log("Error:", res.data);
    }

  }, [code]);

  useEffect(() => {
    (async () => {
      setIsProcessing(false);
      if (!code) return;
      const res = await getPaymentLinkDetails(code);
      if (res.status == 'success') {
        if (status == 'expired' || status == 'paid') {
          alert(status);
          router.push('/');
        }
        setUsernames(res.data.usernames);
        setPrice(res.data.amount);
        setStatus(res.data.status);
        setExpireDate(res.data.expire_date);
        setUsersCount(res.data.user_counts);
        setEmail(res.data.email);
      }
      setIsProcessing(true);
    })();
  }, [code]);

  return (
    <div className="text-white w-full min-h-[calc(100vh-120px)] max-w-[1389px]  flex flex-col items-center justify-center pb-6 pt-4 px-4">
      <div className='w-full'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-4'>
            <p className='text-xl font-medium'>Usernames</p>
            <ScrollShadow className='h-[400px] p-2 flex flex-col gap-2'>
              {
                usernames?.map((keyword, index) => {
                  return (
                    <div key={index}>
                      {
                        keyword.username && keyword.link ?
                          <div className='flex items-center gap-4 bg-gradient-to-br from-gray-600/10 to-gray-800/80 shadow-sm border border-gray-700 px-8 py-4 w-full rounded-xl'>
                            <p className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>{index + 1}</p>
                            <div className='flex flex-col gap-2 flex-1'>
                              <div>USERNAME: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.username}</span></div>
                              <div>LINK: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent font-bold'>{keyword.link}</span></div>
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
          {price ? <div className='flex flex-col gap-4'>
            <p className='text-xl font-medium'>Details</p>
            {/* <p className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent text-xl font-bold'>This Payment Link will be expired at {moment(expireDate).format('MMMM Do YYYY, h:mm:ss a')}.</p> */}
            <p className='text-lg font-medium'>Amount: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent'>{price} USD</span></p>
            {
              usersCount ?
                <p className='text-lg font-medium'>Users Count: <span className='bg-gradient-to-tr from-purple-light to-purple-weight bg-clip-text text-transparent'>{usersCount}</span></p>
                :
                <></>
            }
          </div> : <></>}
        </div>

        <div className="flex bg-gradient-to-br mt-20 max-sm:mt-8 text-center mx-auto from-gray-600/10 to-gray-800/80 shadow-sm rounded-[20px] z-10 flex-col border border-gray-700 p-5">
          <p className='font-medium text-[34px] text-center'>PAYMENT</p>
          <p className='mt-3 font-normal text-base'>We utilize Paddle as our payment processing platform. Paddle ensures secure payment transactions.
            Follow the on-screen instructions to complete your purchase securely. Please note, additional VAT costs may apply based on your location.
            This charge will be billed at regular intervals until you opt to cancel the automatic renewal.
          </p>
          <div className='mx-auto mt-10 max-w-[676px] gap-3 flex max-md:flex-col items-center'>
            <Button
              radius="full"
              className="border border-gray-500 text-white shadow-lg px-6 text-base bg-gradient-to-tr from-gray-700 to-gray-800"
              size='lg'
              onClick={handlePaymentProcess}
            >
              Pay whith credit card
            </Button>
            <Button
              radius="full"
              className=" bg-gradient-to-tr mx-auto from-purple-light to-purple-weight border-gray-600 border text-white shadow-lg px-7 py-7 text-lg"
              size='lg'
              onClick={handlePaymentProcess}
            >
              Pay whith paypal
            </Button>
          </div>
        </div>
        <div className='mx-auto text-start mt-20 max-sm:mt-8 mb-8 max-md:px-3'>
          <p className='font-normal text-base'>We're utilizing Paddle for payment processing. What is Paddle? Please follow the on-screen instructions to securely complete your purchase.Please note that an additional cost, such as VAT, may be applicable based on your location. </p>
          <p className='font-normal text-base'>You will be charged this amount at regular intervals until you opt to cancel the automatic renewal.You can cancel the subscription using your account settings in the Billing section, or you can check the email you received for this purchase in your inbox. You will find instructions on how to cancel the subscription there.</p>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
        }}
        hideCloseButton
      >
        <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
          {() => (
            <>
              <ModalBody>
                <div className='mx-auto flex items-center justify-center -mb-24'>{icons.success}</div>
                <span className='font-bold text-2xl text-center capitalize leading-9'>Paid Successfully!</span>
                {/* <span className='font-bold text-2xl text-center capitalize leading-9'>Usernames added Successfully!</span> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="lg"
                  className="bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647] mx-auto"
                  size='md'
                  onPress={() => window.open("/app/dashboard", '_current')}
                >
                  Go to Dashboard
                </Button>
              </ModalFooter>
            </>
          )}

        </ModalContent>
      </Modal>
    </div >
  )
}
