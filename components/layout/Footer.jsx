import React, { useCallback, useState } from 'react'
import { FaceBook, LinkedIn, TwitterV2, TikTok, Instagram, Redit, Success } from '@/components/utils/Icons';
import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react';
import { createNewSubscribeUser } from '@/axios/news';
import { Crisp } from 'crisp-sdk-web';

export default function Footer({ cookieSettingsOnOpen }) {

  const icons = {
    twitter: <TwitterV2 fill="currentColor" />,
    linkedin: <LinkedIn fill="currentColor" />,
    facebook: <FaceBook fill="currentColor" />,
    tiktok: <TikTok fill="currentColor" />,
    instagram: <Instagram fill="currentColor" />,
    redit: <Redit fill="currentColor" />,
    success: <Success fill="currentColor" />,
  };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubscribe = useCallback(async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setWarning("Email is invalid");
      return;
    }
    setIsProcessing(true);
    const res = await createNewSubscribeUser({
      email
    });

    if (res.status == 'success') {
      onOpen();
      setEmail('');
    } else {
      setWarning(res.data);
    }
    setIsProcessing(false);
  }, [email]);

  return (
    <div className='w-full bg-black px-10 relative z-10'>
      <div className='max-w-[1512px] mx-auto relative z-10'>
        <div className='flex items-start justify-between text-large font-semibold text-[17px] py-16 max-lg:flex-col gap-10'>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Services</p>
            <Link href={"/scantakedown"} className='!no-underline !text-white'>Scan & Takedown</Link>
            <Link href={"/ai"} className='!no-underline !text-white'>Artificial Intelligence</Link>
            <Link href={"/copyright"} className='!no-underline !text-white'>Copyright</Link>
            <Link href={"/camdmca"} className='!no-underline !text-white'>Cam DMCA Content Protection</Link>
            <Link href={"/creatordmca"} className='!no-underline !text-white'>Creator DMCA Content Protection</Link>
            <Link href={"/catfishing"} className='!no-underline !text-white'>Catifishing & Impersonation</Link>
            <Link href={"/recovery"} className='!no-underline !text-white'>Username History Recovery Removal</Link>
            <Link href={"/free-trial"} className='!no-underline !text-white'>Monthly Analytics & PDF Reports</Link>
            <Link href={"/dmcabadges"} className='z-10 !no-underline !text-white'>DMCA Badges</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Company</p>
            <Link href={"/blog"} className='!no-underline !text-white'>Blog</Link>
            <Link href={"/about-us"} className='!no-underline !text-white'>About Us</Link>
            <Link href={"/privacy-policy"} className='!no-underline !text-white'>Privacy Policy</Link>
            <Link href={"/terms-of-service"} className='!no-underline !text-white'>Terms of Service</Link>
            <Link href={"/cookie-policy"} className='!no-underline !text-white'>Cookie Policy</Link>
            <p className='cursor-pointer' onClick={() => cookieSettingsOnOpen()}>Cookie Settings</p>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <p className='font-semibold text-xl pb-4'>Support</p>
            <Link href={"/help"} className='!no-underline !text-white'>Help & Support</Link>
            <p className='cursor-pointer'
              onClick={() => {
                Crisp.chat.open();
              }}
            >Contact Us</p>

            <Link href={"/deletedata"} className='!no-underline !text-white'>Delete Data</Link>
          </div>
          <div className='flex flex-col text-white font-light gap-2'>
            <div className='flex justify-start'>
              <p className='font-semibold text-xl pb-4'>Join Our Newsletter</p>
            </div>
            <div className='relative w-full justify-starter items-center'>
              <input
                type="email"
                name="email"
                placeholder='example@gmail.com'
                className='outline-none p-4 w-full pr-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 min-w-[500px] max-sm:min-w-full'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setWarning("");
                }}
                required
              />
              <Button
                className="absolute bottom-0 right-1 h-4 bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] shadow-lg rounded-full px-7 py-6 text-lg top-2"
                onPress={handleSubscribe}
                isLoading={isProcessing}
              >
                <span>SEND</span>
              </Button>
            </div>
            <p className='text-sm font-normal text-red-600 mt-1 pl-6'>{warning}</p>
            <div className='mt-6 text-sm italic space-y-2 px-6'>
              <p className='notranslate'>©2024 Lock Leaks</p>
              <p className='notranslate'>AD BOOST S.R.L.</p>
              <p className='notranslate'>Romania, Bacau, Strada Letea 32, Bloc A, Ap. 116, 600343</p>
              <p className='notranslate'>Register Code (CUI): 48091747</p>
              <p className='notranslate'>VAT: RO48091747</p>
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-0 max-md:flex-col max-md:items-center max-md:gap-5'>
          <Link href="/">
            <Image src="/assets/logo.svg" width={250} height={200} alt="logo" className='-mt-5' />
          </Link>
          <p className='font-light text-xs text-center pb-8 text-white max-md:pb-0'>Copyright © 2024 Lock Leaks.</p>
          <div className='flex gap-7 justify-end mt-0 mb-10'>
            <Link href={"https://tiktok.com/lockleaks"} className='!no-underline !text-white'>{icons.tiktok}</Link>
            <Link href={"https://www.instagram.com/lockleaks"} className='!no-underline !text-white'>{icons.instagram}</Link>
            <Link href={"https://www.twitter.com/@lockleaks"} className='!no-underline !text-white'>{icons.twitter}</Link>
            <Link href={"https://linkedin.com/@lockleaks"} className='!no-underline !text-white'>{icons.linkedin}</Link>
            <Link href={"https://www.facebook.com/lockleaks"} className='!no-underline !text-white'>{icons.facebook}</Link>
            <Link href={"https://www.reddit.com/r/lockLeaks"} className='!no-underline !text-white'>{icons.redit}</Link>
          </div>
        </div>
      </div>
      <div className='w-full h-56 bg-[#362666] blur-3xl absolute bottom-0 left-0 bg-opacity-35 rounded-t-3xl'>
      </div>

      <Modal
        backdrop="opaque"
        placement="center"
        hideCloseButton
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/80 backdrop-opacity-100"
        }}
      >
        <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77] text-white text-center'>
          {(onClose) => (
            <>
              <ModalBody>
                <div className='mx-auto flex items-center justify-center -mb-24'>{icons.success}</div>
                <span className='font-bold text-2xl text-center leading-9'>Successfully your email record, you will receive news from Lock Leaks from now.</span>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="lg"
                  className="bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647] mx-auto"
                  size='md'
                  onPress={() => onClose()}
                >
                  <span>Confirm</span>
                </Button>
              </ModalFooter>
            </>
          )}

        </ModalContent>
      </Modal>

    </div>
  )
}
