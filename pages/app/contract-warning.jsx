"use client";
import {
  Button,
  Input,
  Progress
} from '@nextui-org/react';
import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContractLine, DownloadIcon, IdCardImageIcon, UploadIcon } from '@/components/utils/Icons';
import { submitKYC } from '../../axios/user';

export default function ContactWarning() {
  const router = useRouter();

  const icons = {
    uploadIcon: <UploadIcon />,
    downloadIcon: <DownloadIcon />,
    contractLineIcon: <ContractLine />,
    idCardImageIcon: <IdCardImageIcon />
  };

  const [IDCardFile, setIDCardFile] = useState(null);
  const [SelfieFile, setSelfieFile] = useState(null);
  const [IDCardImgUrl, setIDCardImgUrl] = useState(null);
  const [selfieImgUrl, setSelfieImgUrl] = useState(null);
  const [warning, setWarning] = useState(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);

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
    let _warning = {};

    if (!name) {
      _warning.name = "Please type your Full Name"

      setWarning(_warning);

      return;
    }

    const formData = new FormData();
    formData.append('idcard', IDCardFile);
    formData.append('selfie', SelfieFile);
    formData.append('name', name);

    // const res = await submitKYC(formData);

    if (res.status == 'success') {

    } else {
      console.log(res.data);
    }

  }, [IDCardFile, SelfieFile, name]);

  return (
    <div className="flex flex-col bg-gradient-to-tr px-5 py-5 container text-white mx-auto">
      <p className='mt-5 mb-12 font-extrabold text-lg'>Lock Leaks Platform Access Agreement</p>
      {step == 0
        ? <div className='max-md:mx-auto space-y-12 text-medium font-normal'>
          <p>Welcome to Lock Leaks! Before you gain access to our platform, we require you to complete the following agreement. By proceeding, you acknowledge and agree to the terms outlined below</p>
          <p className='font-bold'>Identification and Data Security:</p>
          <div>
            <p className='font-bold'>1.Identification Upload and Data Handling:</p>
            <p>To ensure compliance with copyright regulations and maintain platform integrity, all users are required to upload a valid government-issued ID card or passport / drive licenese. Rest assured, we handle your information with care:</p>
          </div>
          <ul className='list-disc pl-6'>
            <li>Secure Storage: Your personal information and ID card uploads are encrypted and securely stored on our servers.</li>
            <li>Limited Access: Access to your data is restricted to verification purposes only and is not stored on our website.</li>
          </ul>
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
            <p>By typing your full name below, you agree to the terms outlined in the Lock Leaks Platform Access Agreement and provide your electronic signature:</p>
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

        {step == 1 ? <Button
          radius="lg"
          className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white px-7 text-sm mt-10"
          size='sm'
          onPress={() => setStep(p => p - 1)}
        >
          <span>Back</span>
        </Button> : <></>}

        {
          step == 0 ?
            <div className='flex gap-8 w-full mt-8'>
              <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-10 max-sm:mt-0 max-w-[362px] text-center justify-center">
                <p className='font-extrabold text-lg'>Upload ID Card</p>
                <div className='flex flex-col w-full h-[250px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                  <form id="form" encType='multipart/form-data' className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
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
                      onChange={() => uploadImageDisplay('id_card')}
                      hidden
                    />
                  </form>
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
              <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-10 max-sm:mt-0 max-w-[362px] text-center justify-center">
                <p className='font-extrabold text-lg'>Upload Selfie</p>
                <div className='flex flex-col w-full h-[250px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                  <form id="form" encType='multipart/form-data' className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
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
                      ref={fileSelfieUploadRef}
                      onChange={() => uploadImageDisplay('selfie')}
                      hidden
                    />
                  </form>
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
            </div>
            :
            <></>}

        {step == 0 ?
          <Button
            radius="lg"
            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mt-10"
            size='sm'
            onPress={handleNext}
          >
            <span>Next</span>
          </Button>
          :
          step == 1 ? <Button
            radius="lg"
            className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mt-10"
            size='sm'
            onPress={handleSubmit}
          // onPress={() => setStep(p => p + 1)}
          >
            <span>Submit</span>
          </Button> : <></>}
      </div>

    </div>
  )
}
