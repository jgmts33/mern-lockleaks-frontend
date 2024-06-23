"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
  useDisclosure
} from '@nextui-org/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContractLine, DownloadIcon, IdCardImageIcon, UploadIcon, Success, WarningOnModal } from '@/components/utils/Icons';
import { submitKYC } from '@/axios/contract';
import IDCardExample from '@/public/assets/kyc-submit/id_card.png';
import SelfieExample from '@/public/assets/kyc-submit/selfie.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { userInfo as info } from '@/lib/auth/authSlice';

export default function ContactWarning() {
  const router = useRouter();

  const icons = {
    uploadIcon: <UploadIcon />,
    downloadIcon: <DownloadIcon />,
    contractLineIcon: <ContractLine />,
    idCardImageIcon: <IdCardImageIcon />,
    success: <Success />,
    warning: <WarningOnModal />,
  };

  const userInfo = useSelector(info);
  const [IDCardFile, setIDCardFile] = useState(null);
  const [SelfieFile, setSelfieFile] = useState(null);
  const [IDCardImgUrl, setIDCardImgUrl] = useState(null);
  const [selfieImgUrl, setSelfieImgUrl] = useState(null);
  const [warning, setWarning] = useState(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [isActionProcessing, setIsActionProcessing] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const fileIdCardUploadRef = useRef();
  const fileSelfieUploadRef = useRef();

  const handleImageUpload = (event, type) => {
    event.preventDefault();
    if (type == 'id_card') fileIdCardUploadRef.current.click();
    else fileSelfieUploadRef.current.click();
  }

  const uploadImageDisplay = async (type) => {
    try {
      if (type == 'id_card') {
        const uploadedFile = fileIdCardUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setIDCardFile(uploadedFile);
        setIDCardImgUrl(cachedURL);
      } else {
        const uploadedFile = fileSelfieUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setSelfieFile(uploadedFile);
        setSelfieImgUrl(cachedURL);
      }

    } catch (error) {
      console.error(error);
      setIDCardImgUrl(null);
      setSelfieImgUrl(null);
      setIDCardFile(null);
      setSelfieFile(null);
    }
  }

  const handleNext = useCallback(async () => {
    let _warning = {};

    if (!IDCardFile) {
      _warning.IDCard = "ID Card Image Required!"
    }

    if (!SelfieFile) {
      _warning.Selfie = "Selfie Image Required!"
    }


    if (IDCardFile && SelfieFile) {
      setStep(p => p + 1);
    }

    setWarning(_warning);

  }, [IDCardImgUrl, selfieImgUrl]);

  const handleSubmit = useCallback(async () => {
    setIsActionProcessing(true);
    let _warning = {};

    if (!name) {
      _warning.name = "Please type your Full Name"
      setWarning(_warning);
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('idcard', IDCardFile);
    formData.append('selfie', SelfieFile);

    const res = await submitKYC(formData);

    if (res.status == 'success') {
      setModalData({
        status: 'success',
        title: 'Submitted Successfully!',
        content: "Thank you for your submit. We will review your documentation in next 24 hrs.",
        btnText: 'Go to Dashboard',
        action: () => window.open("/app/dashboard", '_current')
      });
      onOpen();

    } else {

      setModalData({
        status: 'failed',
        title: 'Failed!',
        content: res.data,
        btnText: 'Try Again',
        action: () => onClose()
      });
      onOpen();
    }

    setIsActionProcessing(false);

  }, [IDCardFile, SelfieFile, name]);

  useEffect(() => {
    if ( userInfo.contract.status == 'approved') {
      router.push("/app/dashboard");
    }
  },[userInfo]);

  return (
    <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white mx-auto">
      <p className='mt-5 mb-12 font-extrabold text-lg'>Lock Leaks Platform Access Agreement</p>
      {step == 0
        ? <div className='max-md:mx-auto space-y-8 text-medium font-normal'>
          <p>Welcome to Lock Leaks! Before you gain access to our platform, we require you to complete the following agreement. By proceeding, you acknowledge and agree to the terms outlined below.</p>
          <p className='font-bold'>Identification and Data Security:</p>
          <div>
            <p className='font-bold'>1.Identification Upload and Data Handling:</p>
            <p>To ensure compliance with copyright regulations and maintain platform integrity, all users are required to upload a valid government-issued ID card or passport / drive licenese. Rest assured, we handle your information with care:</p>
          </div>
          <ul className='list-disc pl-6'>
            <li>Secure Storage: Your personal information and ID card uploads are encrypted and securely stored on our servers.</li>
            <li>Limited Access: Access to your data is restricted to verification purposes only and is not stored on our website.</li>
          </ul>
          <div className='space-y-4'>
            <div>
              <p className='font-semibold'>Government ID/Passport</p>
              <ul className='list-disc pl-6'>
                <li>Users can upload a copy of their national ID card or passport by clicking the ‘Choose File’ button below.</li>
                <li>They must also sign the terms and conditions contract. If the user does not provide the requested information,
                  LOCK LEAKS reserves the right to block access to and/or terminate their accounts.
                  The user explicitly consents to LOCK LEAKS using all their personal data in accordance
                  with the services provided under this agreement.
                </li>
              </ul>
            </div>
            <div>
              <p className='font-semibold'>Photograph/Selfie</p>
              <ul className='list-disc pl-6'>
                <li>Users can upload a copy of their national ID card or passport by clicking the ‘Choose File’ button below.</li>
                <li>The user can submit a photograph of themselves holding up a sign that reads 'I want Lock Leaks as my authorized copyright representative'.
                  Please ensure that the user's face and hands are visible in the image.
                  The user needs to send this file to Lock Leaks by clicking 'Choose File' below.
                </li>
              </ul>
            </div>
          </div>
        </div>
        :
        step == 1 ? <div className='max-md:mx-auto space-y-12 text-medium font-normal'>
          <div>
            <p className='font-bold'>2.Termination of Access:</p>
            <p>We reserve the right to terminate access under specific circumstances:</p>
          </div>
          <ul className='list-disc pl-6'>
            <li>Breach of Terms: If a user is found to be in violation of our terms of service or engaging in unlawful activities, access to the platform may be revoked.</li>
            <li>Community Integrity: Upholding community standards is paramount to us, and we take necessary measures to enforce them.</li>
          </ul>
          <div>
            <p className='font-bold'>3.Online Signature for Acceptance of Contract:</p>
            <p>By typing your full name below, you agree to the terms outlined in the Lock Leaks Platform Access Agreement and provide your electronic signature.</p>
          </div>
          <div>
            <Input
              classNames={{
                input: [
                  "bg-transparent",
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
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder='Full Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setWarning(null);
              }}
            />
            <p className='text-red-600 text-sm font-bold mt-2 ml-2'>{warning?.name}</p>
          </div>
        </div>
          :
          <div className="flex flex-col bg-[#615E768F] border border-gray-500 rounded-[16px] mt-5 w-full px-24 py-8 max-sm:px-10 max-sm:py- max-sm:mt-0 max-w-[947px] text-center justify-center shadow-xl mx-auto relative">
            <button className='absolute top-4 right-4 text-xl'>&times;</button>
            <p className='font-extrabold text-[34px] mb-3'>Accessing the Contract</p>
            <p className='mb-5 text-medium font-semibold'>The contract has been created.</p>
            <p className='mb-5 text-medium font-semibold'>The contract haYou can now access the platform and its features.s been created.</p>
            <p className='mb-5 text-xs font-normal text-[#CCCDD0]'> If you wish to download the contract (PDF), simply click on "DOWNLOAD CONTRACT." To view it within the platform, navigate to "SETTINGS" {"->"} "Contract Lock Leaks" in the user panel menu.</p>
            <div className='flex gap-12 items-center mt-10 mx-auto'>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white px-7 text-sm max-sm:w-full"
              >
                <span>{icons.downloadIcon}</span><span> DOWNLOAD CONTRACT</span>
              </Button>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white px-7 text-sm max-sm:w-full"
              >
                <span>VIEW CONTRACT</span>
              </Button>
            </div>
            <Button
              radius="sm"
              className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mt-6 w-72 max-sm:w-full mx-auto"
              size='sm'
            >
              <span>ACCESS PLATFORM</span>
            </Button>
            <div className='flex justify-between items-center mt-6'>
              {icons.contractLineIcon}
              {icons.idCardImageIcon}
            </div>
          </div>
      }
      <div className='flex max-sm:flex-col justify-between items-end mb-5 w-full'>

        {
          step == 0 ?
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 w-full mt-8'>
              <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] p-5 text-center justify-center">
                <p className='font-extrabold text-lg'>Upload ID Card</p>
                <div className='flex flex-col w-full h-[250px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                  <div className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                    {
                      IDCardImgUrl
                        ?
                        <img
                          src={IDCardImgUrl}
                          alt="ID Card"
                          className='h-full w-full object-cover rounded-2xl'
                        />
                        :
                        <div className="flex flex-col items-center justify-center pt-5">
                          {icons.uploadIcon}
                          <p>Drag & Drop to Upload File</p>
                          <p>Or</p>
                          <Button
                            radius="lg"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-2"
                            size='sm'
                            onClick={(e) => handleImageUpload(e, 'id_card')}
                          >
                            <span>Browse File</span>
                          </Button>
                        </div>
                    }
                    <input
                      type="file"
                      id="file"
                      ref={fileIdCardUploadRef}
                      accept=".png,.jpg,.jpeg"
                      onChange={() => uploadImageDisplay('id_card')}
                      hidden
                      onDrop={() => uploadImageDisplay('id_card')}
                    />
                  </div>
                </div>
                <div className='h-10 mt-7'>
                  {
                    IDCardImgUrl ? <Button
                      radius="full"
                      className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm mx-auto"
                      size="sm"
                      onClick={(e) => handleImageUpload(e, 'id_card')}
                    >
                      <span>Change Image</span>
                    </Button> :
                      warning?.IDCard ?
                        <p className='text-red-600 font-bold'>{warning?.IDCard}</p>
                        : <></>
                  }
                </div>
              </div>
              <div className="border border-gray-500 rounded-[16px]">
                <Image
                  src={IDCardExample}
                  width={400}
                  height={400}
                  className='object-cover w-full h-full rounded-2xl'
                />
              </div>
              <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] p-5 text-center justify-center">
                <p className='font-extrabold text-lg'>Upload Selfie</p>
                <div className='flex flex-col w-full h-[250px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                  <div className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                    {
                      selfieImgUrl
                        ?
                        <img
                          src={selfieImgUrl}
                          alt="Selfie Image"
                          className='h-full w-full object-cover rounded-2xl'
                        />
                        :
                        <div className="flex flex-col items-center justify-center pt-5">
                          {icons.uploadIcon}
                          <p>Drag & Drop to Upload File</p>
                          <p>Or</p>
                          <Button
                            radius="lg"
                            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-2"
                            size='sm'
                            onClick={(e) => handleImageUpload(e, 'selfie')}
                          >
                            <span>Browse File</span>
                          </Button>
                        </div>
                    }
                    <input
                      type="file"
                      id="file"
                      accept=".png,.jpg,.jpeg"
                      ref={fileSelfieUploadRef}
                      onChange={() => uploadImageDisplay('selfie')}
                      hidden
                    />
                  </div>
                </div>
                <div className='h-10 mt-7'>
                  {
                    selfieImgUrl ? <Button
                      radius="full"
                      className="bg-gradient-to-tr from-purple-light to-purple-weight text-white text-sm mx-auto"
                      size="sm"
                      onClick={(e) => handleImageUpload(e, 'selfie')}
                    >
                      <span>Change Image</span>
                    </Button>
                      : warning?.Selfie ?
                        <p className='text-red-600 font-bold'>{warning?.Selfie}</p>
                        : <></>
                  }
                </div>
              </div>
              <div className="border border-gray-500 rounded-[16px]">
                <Image
                  src={SelfieExample}
                  width={400}
                  height={400}
                  className='object-cover w-full h-full rounded-2xl'
                />
              </div>
            </div>
            :
            <></>}
      </div>
      <div className='w-full flex justify-between'>
        {step == 1 ? <Button
          radius="lg"
          className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white px-7 text-sm"
          size='sm'
          onPress={() => setStep(p => p - 1)}
        >
          <span>Back</span>
        </Button> : <div></div>}
        {step == 0 ?
          <Button
            radius="lg"
            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm"
            size='sm'
            onPress={handleNext}
          >
            <span>Next</span>
          </Button>
          :
          step == 1 ? <Button
            radius="lg"
            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm"
            size='sm'
            isLoading={isActionProcessing}
            onPress={handleSubmit}
          >
            <span>Submit</span>
          </Button> : <></>}
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
                <div className='mx-auto flex items-center justify-center -mb-24'>{modalData?.status == 'success' ? icons.success : icons.warning}</div>
                <p className='font-bold text-2xl text-center capitalize leading-9'>{modalData?.title}</p>
                <p className='text-lg text-center capitalize leading-9'>{modalData?.content}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="lg"
                  className="bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647] mx-auto"
                  size='md'
                  onPress={modalData?.action}
                >
                  <span>{modalData?.btnText}</span>
                </Button>
              </ModalFooter>
            </>
          )}

        </ModalContent>
      </Modal>
    </div>
  )
}
