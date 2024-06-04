"use client";
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { GradientKey, Envelop, WarningModal, Success } from "@/components/utils/Icons";
import { forgotPassword } from '@/axios/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/lib/auth/authSlice';

export default function ForgotPassword() {

  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalValue, setModalValue] = useState({
    status: "",
    content: ""
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleForgotPassword = useCallback(async () => {

    if (email != "" && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
      setEmailError("Invalid Email Address");
      return;
    }

    setIsProcessing(true);
    const res = await forgotPassword(email);

    if (res.status == "success") {
      setModalValue({
        status: "success",
        content: "Password reset email sent successfully!"
      })
      onOpen();
      dispatch(setUserInfo({ ...res.data }));
    } else {
      setModalValue({
        status: "failed",
        content: res.data || "Something went wrong!"
      });
      onOpen();
      console.log("error:", res.data);
    }

    setIsProcessing(false);
  }, [email, dispatch, onOpen]);

  const icons = {
    envelop: <Envelop/>,
    gradiant_key: <GradientKey/>,
    warningmodal: <WarningModal/>,
    success: <Success/>,
  };

  const handleConfirmClick = useCallback(() => {
    onOpenChange(false);
  }, [modalValue]);

  return (
    <div className='px-10 max-sm:px-2 mx-auto flex w-full min-h-[calc(100vh-80px)]'>

      {/* This section for define forgot password content*/}

      <div className='w-full flex items-center justify-center max-sm:mt-5'>
        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
        <div className="w-[562px] flex flex-col items-center gap-10 text-white">
          <div className='text-center max-w-[354px] max-sm:mt-16'>
            <div className='rounded-full mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-3 w-12'>{icons.gradiant_key}</div>
            <p className="text-[40px] mt-5 font-medium leading-[60px]">Don't worry</p>
            <p className="text-base font-[300] opacity-80 max-sm:mt-5">Enter your email address below, and we'll send you a link to reset your password.</p>
          </div>
          <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-6 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent max-sm:mt-10'>
            <div className='relative w-full'>
              <p className='font-[300] text-white pb-2'>Provide Your Email Address</p>
              <i className='absolute bottom-3 left-6 h-4'>{icons.envelop}</i>
              <input
                type="email"
                name="email"
                placeholder='youremail@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
              />
            </div>
            <Button
              radius="lg"
              className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg w-full mt-4 max-sm:mt-16" size='lg'
              onClick={handleForgotPassword}
              isLoading={isProcessing}
            >
              <span>Send</span>
            </Button>
            <Button
              radius="lg"
              className="bg-transparent text-white shadow-lg w-full max-sm:mt-10" size='lg'
              onClick={() => router.push("/auth/login")}
            >
              <span>Cancel</span>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={handleConfirmClick}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
        }}
      >
        <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32'>
          {(onClose) => (
            <>
              <ModalBody>
                <div className='mx-auto flex items-center justify-center -mb-24'>{modalValue.status === 'success' ? icons.success : icons.warningmodal}</div>
                <span className='font-medium text-5xl text-center capitalize'>{modalValue.status}!</span>
                <span className='font-light text-xl'>{modalValue.content} </span>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="lg"
                  className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 ${modalValue.status === "success" ? 'from-[#84e584] to-[#35d35c]' : 'from-[#9C3FE4] to-[#C65647]'}`}
                  size='md'
                  onClick={() => handleConfirmClick()}
                >
                  {modalValue.status === 'success' ? <span>Confirm</span> : <span>Try Again</span>}
                </Button>
              </ModalFooter>
            </>
          )}

        </ModalContent>
      </Modal>
    </div>
  );
}
