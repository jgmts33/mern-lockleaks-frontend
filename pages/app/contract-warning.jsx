"use client";
import {
  Button, 
  Input,
  Progress
} from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContractLine, DownloadIcon, IdCardImageIcon, UploadIcon } from '@/components/utils/Icons';

export default function ContactWarning() {
  const router = useRouter();

  const icons = {
    uploadIcon: <UploadIcon/>,
    downloadIcon: <DownloadIcon/>,
    contractLineIcon: <ContractLine/>,
    idCardImageIcon: <IdCardImageIcon/>
  };

  const [IDCardImgUrl, setIDCardImgUrl] = useState(null);
  const [step, setStep] = useState(0);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const uploadImageDisplay = async () => {
    try {
      const uploadedFile = fileUploadRef.current.files[0];
      const cachedURL = URL.createObjectURL(uploadedFile);
      console.log("cachedURL:", cachedURL);
      setIDCardImgUrl(cachedURL);
    } catch (error) {
      console.error(error);
      setIDCardImgUrl(null);
    }
  }

  return (
    <div className="flex flex-col bg-gradient-to-tr px-5 container text-white">
      <p className='mt-5 mb-12 font-extrabold text-lg'>LockLeaks Platform Access Agreement</p>
      {step == 0
        ? <div className='max-md:mx-auto space-y-12 text-medium font-normal'>
          <p>Welcome to LockLeaks! Before you gain access to our platform, we require you to complete the following agreement. By proceeding, you acknowledge and agree to the terms outlined below</p>
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
            <p>By typing your full name below, you agree to the terms outlined in the LockLeaks Platform Access Agreement and provide your electronic signature:</p>
          </div>
          <Input
            radius="lg"
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
            placeholder='Type Here'
          />
        </div>
          :
          <div className="flex flex-col bg-[#615E768F] border border-gray-500 rounded-[16px] mt-5 w-full px-24 py-8 max-sm:px-10 max-sm:py- max-sm:mt-0 max-w-[947px] text-center justify-center shadow-xl mx-auto relative">
            <button className='absolute top-4 right-4 text-xl'>&times;</button>
            <p className='font-extrabold text-[34px] mb-3'>Accessing the Contract</p>
            <p className='mb-5 text-medium font-semibold'>The contract has been created.</p>
            <p className='mb-5 text-medium font-semibold'>The contract haYou can now access the platform and its features.s been created.</p>
            <p className='mb-5 text-xs font-normal text-[#CCCDD0]'> If you wish to download the contract (PDF), simply click on "DOWNLOAD CONTRACT." To view it within the platform, navigate to "SETTINGS" {"->"} "Contract LockLeaks" in the user panel menu.</p>
            <div className='flex gap-12 items-center mt-10 mx-auto'>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-gray-700 to-gray-800 text-white px-7 text-sm max-sm:w-full"
              >
                <span>{icons.downloadIcon} DOWNLOAD CONTRACT</span>
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
      <div className='flex max-sm:flex-col justify-between items-end mt-8 mb-5 w-full'>
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
            <div className="flex flex-col bg-white/15 border border-gray-500 rounded-[16px] mt-5 w-full p-10 max-sm:mt-0 max-w-[362px] text-center justify-center">
              <p className='font-extrabold text-lg'>Upload ID Card</p>
              <div className='flex flex-col w-full h-[177px] bg-white/10 border border-gray-500 rounded-[16px] mt-5'>
                <form id="form" encType='multipart/form-data' className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer">
                  {
                    IDCardImgUrl
                      ?
                      <img
                        src={IDCardImgUrl}
                        alt="ID Card"
                        className='h-full w-full rounded-md object-cover '
                        onClick={handleImageUpload}
                      />
                      :
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {icons.uploadIcon}
                        <p>Drag & Drop to Upload File</p>
                        <p>Or</p>
                        <Button
                          radius="lg"
                          className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-2"
                          size='sm'
                          onClick={handleImageUpload}
                        >
                          <span>Browse File</span>
                        </Button>
                      </div>
                  }
                  <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden
                  />
                </form>

              </div>
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mx-auto mt-10"
                size='sm'
              >
                <span>Upload ID</span>
              </Button>
              <Progress
                size="md"
                aria-label="Loading..."
                className="max-w-2xl"
                color='secondary'
                value={25}
                showValueLabel={true}
              />
            </div>
            :
            <></>}

        {step < 2 ? <Button
          radius="lg"
          className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm mt-10"
          size='sm'
          onPress={() => setStep(p => p + 1)}
        >
          <span>Next</span>
        </Button> : <></>}
      </div>

    </div>
  )
}
