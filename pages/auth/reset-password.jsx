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
import KeyIcon from "@/public/assets/Key.svg";
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/axios/auth';
import { useRouter } from 'next/router';
import { Error, Success, WarningModal } from '@/components/utils/Icons';

export default function ResetPassword() {

  const icons = {
    error: <Error/>,
    success: <Success/>,
    warningmodal: <WarningModal/>,
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStength, setPasswordStength] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalValue, setModalValue] = useState({
    status: "",
    content: ""
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const passwordStrengthCheck = (password) => {
    const passwordLength = password.length;
    // Checking lower alphabet in string 
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let specialChar = false;
    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

    for (let i = 0; i < passwordLength; i++) {
      if (password[i] >= "a" && password[i] <= "z") {
        hasLower = true;
      }
      if (password[i] >= "A" && password[i] <= "Z") {
        hasUpper = true;
      }
      if (password[i] >= "0" && password[i] <= "9") {
        hasDigit = true;
      }
      if (!normalChars.includes(password[i])) {
        specialChar = true;
      }
    }

    // Strength of password 
    let strength = "Weak";
    if (hasLower && hasUpper && hasDigit && specialChar && passwordLength >= 16) {
      strength = "Strong";
    } else if ((hasLower || hasUpper) && specialChar && passwordLength >= 6) {
      strength = "Medium";
    }

    setPasswordStength(strength);
  }

  const validationForm = useCallback(() => {
    let errors = {};

    if (!password) {
      errors.password = "Password is required";
    }
    else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    else if (confirmPassword != password) {
      errors.password = "Passwords Not Matched!"
    }
    console.log(confirmPassword, password)
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [password, confirmPassword]);

  const handleResetPassword = useCallback(async () => {

    if (!validationForm()) return;

    const token = searchParams.get('token'); searchParams;

    setIsProcessing(true);
    const res = await resetPassword(token, password);


    if (res.status == "success") {
      setModalValue({
        status: "success",
        content: res.data
      })
      onOpen();
    } else {
      setModalValue({
        status: "failed",
        content: res.data || "Something went wrong!"
      });
      onOpen();
      console.log("error:", res.data);
    }

    setIsProcessing(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password.length) passwordStrengthCheck(password);
    else setPasswordStength("");
  }, [password]);

  const handleConfirmClick = useCallback(() => {
    if (modalValue.status === "success") {
      router.push("/auth/login");
    } else {
      onOpenChange(false);
    }
  }, [modalValue]);

  return (
    <div className='px-10 max-sm:px-2 flex min-h-[calc(100vh-80px)] w-full'>

      {/* This section for define reset password page content*/}

      <div className='w-full flex items-center justify-center'>
        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 left-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
        <Image src="assets/bg-shape-purple-circle.svg" alt='shape-purple' width={333} height={342} className='max-md:hidden absolute top-44 right-44 bg-[#532a88] bg-opacity-50 blur-3xl' />
        <div className="w-[562px] max-sm:w-full flex flex-col items-center gap-10 text-white z-30">
          <div className='text-center max-w-[354px] mb-4 max-sm:mx-auto max-sm:mb-0 max-sm:mt-0'>
            <p className="text-[40px] font-medium leading-[60px]">Reset Password</p>
            <p className="text-base font-[300] ">Enter your new password and confirm it below to reset your account password.</p>
          </div>
          <div className='flex flex-col gap-6 h-fit w-full px-12 max-sm:px-2 py-5 bg-[#846DA3] bg-opacity-0 rounded-[40px] border-[#846DA3] border-transparent '>
            <div className='relative w-full max-sm:mx-auto'>
              <p className='font-[300] text-white pb-2'>Enter new Password</p>
              <Image src={KeyIcon} alt="Key Icon" className='absolute bottom-3 left-6 h-4' />
              <div>
                <input
                  type="password"
                  name="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full outline-none p-2 pl-16 pr-28 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                />
              </div>
              <div className='absolute flex gap-2 items-center bottom-3 right-4'>
                {
                  passwordStength ? <div className='flex gap-1 items-center'>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength == "Weak" ? 'bg-red-500' : 'bg-[#6CB76F]')}></div>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength != "Weak" ? 'bg-[#6CB76F]' : 'bg-[#CCCDD0]')}></div>
                    <div className={'w-[11px] h-[2px] rounded-md ' + (passwordStength == "Strong" ? 'bg-[#6CB76F]' : 'bg-[#CCCDD0]')}></div>
                  </div> : <></>
                }
                <p className={'text-sm ' + (passwordStength == "Weak" ? '!text-red-500' : passwordStength == "Strong" ? "!text-green-500" : "")}>{passwordStength}</p>
              </div>
            </div>
            {
              errors.password ?
                <div className='text-white  font-light flex bg-[#3f2828] rounded-lg p-1 text-sm'>{icons.error}&nbsp;{errors.password}</div>
                :
                false
            }
            <div className='relative w-full'>
              <p className='font-[300] text-white pb-2'>Confirm Password</p>
              <Image src={KeyIcon} alt="Key Icon" className='absolute bottom-3 left-6 h-4' />
              <div>
                <input
                  type="password"
                  name="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full outline-none p-2 pl-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600'
                />
              </div>
            </div>
            <Button
              radius="lg"
              className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg w-full mt-4 "
              size='lg'
              onClick={handleResetPassword}
              isLoading={isProcessing}
            >
              <span>Confirm</span>
            </Button>
            <Button
              radius="lg"
              className="bg-transparent text-white shadow-lg w-full "
              size='lg'
              onClick={(e) => {
                e.preventDefault();
                router.push('/auth/login');
              }}
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
