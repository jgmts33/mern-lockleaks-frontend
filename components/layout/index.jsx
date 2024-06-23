'use client'
import { Poppins } from "next/font/google";
import { useCallback, useEffect, useState } from 'react';
import Header from "@/components/layout/Header";
import UserHeader from "@/components/layout(user)/Header";
import Sidebar from "@/components/layout(user)/Sidebar";
import Footer from "@/components/layout/Footer";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Link, Button,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader
} from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import { ContractLine, DownloadIcon, IdCardImageIcon, WarningModal } from "../utils/Icons";
import { getUserInfo } from "@/axios/auth";
import CookieSettigs, { COOKIE_SETTING_OPTIONS } from "../cookie-settings";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import { userInfo as info, setUserInfo } from '@/lib/auth/authSlice';

import { USER_SIDEBAR_LIST, ENDPOINT } from "@/config/config";
import { getAccessToken, getCookieValue, setTokensExpired } from "@/axios/token";
import { sendVerificationEmail } from "@/axios/auth";
import { useRouter } from "next/router";


const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {

  const icons = {
    warningmodal: <WarningModal />,
    downloadIcon: <DownloadIcon />,
    contractLineIcon: <ContractLine />,
    idCardImageIcon: <IdCardImageIcon />,
  };

  const currentPath = usePathname();
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectCookie, setSlectCookie] = useState(false);
  const [modalValue, setModalValue] = useState({
    title: "",
    content: "",
    footer: null
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [mounted, setMounted] = useState(false);

  const userInfo = useSelector(info);
  const [verifyEmailSendTimer, setVerifyEmailSendTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmClick = useCallback(async () => {

    if (!userInfo?.verified) {
      setIsProcessing(true);
      const res = await sendVerificationEmail(userInfo?.email);
      setIsProcessing(false);
      if (res.status == 'success') {
        let revertTime = 60;

        const timer = setInterval(() => {

          if (revertTime == 0) clearInterval(timer);
          revertTime--;
          setVerifyEmailSendTimer(revertTime);

        }, 1000);
      }
    }

    else if (!userInfo.subscription.payment_method) {
      window.open("/pricing");
    }

    else if (userInfo.subscription.status == 'expired') {
      window.open("/pricing");
    }

  }, [userInfo]);

  const handleAllChecked = () => {
    const expires = new Date('2030-12-30').toUTCString();
    for (let index = 0; index < COOKIE_SETTING_OPTIONS.length; index++) {
      document.cookie = `${COOKIE_SETTING_OPTIONS[index].name}=allowed; expires=${expires}; path=/`;
    }
    setSlectCookie(true);
  }

  useEffect(() => {

    if (!currentPath?.includes("admin") && !currentPath?.includes("app")) {
      setMounted(true);
      return;
    }

    if (!userInfo) return;

    if ((userInfo.roles.includes("admin") || userInfo.roles.includes("moderator")) && currentPath.includes("app")) {
      router.push("/admin/dashboard");
    }

    if (userInfo.roles.includes("user") && currentPath.includes("admin")) {
      router.push("/app/dashboard");
    }

    if (userInfo.roles.includes("admin") || userInfo.roles.includes("moderator")) {
      setMounted(true);
      return;
    }

    if (!userInfo.verified) {
      setModalValue({
        title: <div>You should verify Email before using our application!</div>,
        content: <div>If you want to use this feature, check your Inbox!</div>,
        footer: <div className="flex gap-2 w-full flex-wrap justify-center">
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] w-full min-w-max max-w-[calc(50%-1rem)] text-lg from-[#9C3FE4] to-[#C65647]`}
            size='md'
            isLoading={isProcessing}
            isDisabled={verifyEmailSendTimer}
            onPress={handleConfirmClick}
          >
            <span>Resend Email</span>
          </Button>
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] w-full min-w-max max-w-[calc(50%-1rem)] text-lg from-gray-500 to-gray-600 border`}
            size='md'
            onPress={() => {
              onClose();
              window.location.replace("/");
            }}
          >
            <span>Back to Homepage</span>
          </Button>
        </div>
      })
      onOpen();
    }

    else if (userInfo.subscription.status == 'expired') {
      setModalValue({
        title: <div>Sorry , but your plan is expired!</div>,
        content: <div>Please go to pricing page with clicking on the "Upgrade" button.</div>,
        footer: <div className="flex gap-2 w-full justify-center">
          {verifyEmailSendTimer ? <p className="text-xs text-red-500 font-bold">You can resend after {verifyEmailSendTimer}s</p> : <></>}
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] w-full min-w-max max-w-[calc(50%-1rem)] text-lg from-[#9C3FE4] to-[#C65647]`}
            size='md'
            isLoading={isProcessing}
            isDisabled={verifyEmailSendTimer}
            onPress={() => handleConfirmClick()}
          >
            {userInfo.subscription.status == 'expired' ? <span>Renew</span> : <span>Upgrade</span>}
          </Button>
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] w-full min-w-max max-w-[calc(50%-1rem)] text-lg from-gray-500 to-gray-600 border`}
            size='md'
            onPress={() => {
              onClose();
              window.location.replace("/");
            }}
          >
            <span>Back to Homepage</span>
          </Button>
        </div>
      })
      onOpen();
    }

    else if (userInfo.subscription.status != 'active') {
      setModalValue({
        title: <div>Your subscription has expired or remains unpaid!</div>,
        content: <div>Please renew it to regain access to the panel!</div>,
        footer: <div className="flex gap-2 w-full justify-center">
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] text-lg w-full min-w-max max-w-[calc(50%-1rem)] from-[#9C3FE4] to-[#C65647]`}
            size='md'
            isLoading={isProcessing}
            isDisabled={verifyEmailSendTimer}
            onPress={() => handleConfirmClick()}
          >
            {userInfo.subscription.status == 'expired' ? <span>Renew</span> : <span>Upgrade</span>}
          </Button>
          <Button
            radius="lg"
            className={`bg-gradient-to-tr h-[60px] text-lg w-full min-w-max max-w-[calc(50%-1rem)] from-[#9C3FE4] to-[#C65647]`}
            size='md'
            onPress={() => {
              onClose();
              window.location.replace("/checkout?plan=trial")
            }}
          >
            <span>Free Trial</span>
          </Button>
        </div>
      })
      onOpen();
    }

    else if (userInfo.subscription.plan_id != 1 && userInfo.contract.status == "") {
      router.push("/app/kyc-submit");
      onClose();
    }

    else if (userInfo.contract.status == "pending") {
      setModalValue({
        title: <div>Please wait until your KYC submission approved!</div>,
        content: <div>If you're not approved in 24 hrs , please check your inbox to know what's the reason.</div>,
        footer: <Button
          radius="lg"
          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647]`}
          size='md'
          onPress={() => {
            onClose();
            window.location.replace("/");
          }}
        >
          <span>Back to Homepage</span>
        </Button>
      })
      onOpen();
    }

    else if (userInfo.contract.status == "declined") {
      setModalValue({
        title: <span>KYC Verification Failed</span>,
        content: <span>{userInfo.contract.reason}</span>,
        footer: <Button
          radius="lg"
          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647]`}
          size='md'
          onPress={() => {
            onClose();
            router.push("/app/kyc-submit");
          }}
        >
          <span>Submit Again</span>
        </Button>
      })
      onOpen();
    }

    else if (userInfo.contract.status != 'approved') {
      onClose();
    }

    setMounted(true);

    const socket = io(ENDPOINT);

    socket.on(`kyc_decided_${userInfo.id}`, (contract) => {
      dispatch(setUserInfo({ ...userInfo, contract }));
      console.log("contract:", contract);
      if (contract.status == 'approved') {
        setModalValue({
          title: <div>KYC Verification Successful!</div>,
          content: <div>
            <p className="mb-5 text-lg font-semibold">Your KYC submission has been approved.</p>
            <p className='mb-5 text-medium font-semibold'>The contract has been created.</p>
            <p className='mb-5 text-medium font-semibold'>You can now access the platform and its features.</p>
            <p className='mb-5 text-xs font-normal text-[#CCCDD0]'>If you wish to download the contract (PDF), simply click on "DOWNLOAD CONTRACT." To view it within the platform, navigate to "SETTINGS" <span>{`->`}</span> "Contract Lock Leaks" in the user panel menu.</p>
          </div>,
          footer: <div className="w-full">
            <div className="flex gap-2 w-full justify-center items-center">
              <Button
                radius="lg"
                className="bg-gradient-to-tr from-purple-light to-purple-weight text-white px-7 text-sm w-full"
                onClick={() => {
                  onClose();
                  router.push("/app/settings/contract");
                }}
              >
                <span>VIEW CONTRACT</span>
              </Button>
              <Button
                radius="lg"
                className="bg-gradient-to-tr  from-gray-700 to-gray-800 text-white px-7 text-sm w-full mx-auto"
                onClick={() => onClose()}
              >
                <span>ACCESS PLATFORM</span>
              </Button>
            </div>
            <div className='flex justify-between items-center mt-6'>
              {icons.contractLineIcon}
              {icons.idCardImageIcon}
            </div>
          </div>,
          hideIcon: true
        })
        onOpen();
      }
    });

    socket.on(`verify_email_${userInfo.id}`, (value) => {
      dispatch(setUserInfo({ ...userInfo, verified: value }));
    });

    socket.on(`payment_status_${userInfo.id}`, (value) => {
      dispatch(setUserInfo({ ...userInfo, subscription: { ...userInfo.subscription, status: 'expired' } }));
    });

    socket.on(`payment_status_updated_${userInfo.id}`, (value) => {
      dispatch(setUserInfo({ ...userInfo, subscription: { ...userInfo.subscription, status: 'active' } }));
    });

    socket.on(`user-ban-${userInfo.id}`, (value) => {
      window.open("/auth/login", '_self');
      setTokensExpired();
    });

    return () => {
      socket.disconnect();
    }

  }, [userInfo, currentPath]);

  useEffect(() => {

    if (getCookieValue('necessary')) {
      setSlectCookie(true);
      if (getCookieValue('necessary') == 'un-allowed') return;
    }

    if (!currentPath?.includes("app") && !currentPath?.includes("admin") ) return;

    (async () => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          const res = await getUserInfo();
          if (res.status == 'success') {
            dispatch(setUserInfo(res.data));
          }
          else {
            window.open("/", "_self");
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();

  }, []);

  if (mounted) return (
    <div className={poppins.className + (userInfo ? " overflow-hidden !p-0" : "")}>
      <div className="flex flex-col">
        {
          userInfo ?
            <div className="flex ">
              {!currentPath.includes("/app/kyc-submit") ? <Sidebar show={showSidebar} setter={setShowSidebar} /> : <></>}
              <div className="w-full gradiant-background">
                <UserHeader setter={setShowSidebar} />
                <div className="flex flex-col flex-grow w-screen md:w-full h-[calc(100vh-65px)] overflow-y-auto relative" style={{ scrollBehavior: 'smooth' }}>
                  {userInfo.roles.includes('admin') || userInfo.roles.includes('moderator') || USER_SIDEBAR_LIST.find(item => item.path === currentPath)?.value == undefined || userInfo.subscription.features[USER_SIDEBAR_LIST.find(item => item.path === currentPath)?.value]
                    ?
                    children :
                    <div className="w-full py-10 max-sm:py-6">
                      <div className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-w-lg rounded-2xl border p-8 space-y-12 mx-auto'>
                        <div className='mx-auto flex items-center justify-center -mb-24'>{icons.warningmodal}</div>
                        <p className='font-bold text-[34px] text-center capitalize leading-9'>You cannot use this feature, you must have the Pro or Star plan!</p>
                        <p className='font-light text-[22px]'>If you want to use this feature click on the "Upgrade" button. </p>
                        <Button
                          radius="lg"
                          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647]`}
                          size='md'
                          onPress={() => window.location.replace("/pricing")}
                        >
                          <span>Upgrade</span>
                        </Button>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onOpen}
                onOpenChange={onOpenChange}
                size="xl"
                classNames={{
                  backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-100"
                }}
                hideCloseButton
              >
                <ModalContent className='bg-gradient-to-br from-gray-500 to-gray-600 justify-center opacity-[.77]  text-white text-center max-md:absolute max-md:top-32 pb-6'>
                  {() => (
                    <>
                      <ModalHeader>
                        <div className="flex justify-end w-full">
                          <Button
                            radius="md"
                            className={`bg-gradient-to-tr text-lg from-gray-500 to-gray-600 w-max`}
                            size='sm'
                            onPress={() => {
                              onClose();
                              setTokensExpired();
                              window.location.replace("/");
                            }}
                          >
                            <span>Log out</span>
                          </Button>
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        {modalValue.hideIcon ? <></> : <div className='mx-auto flex items-center justify-center -mb-24'>{icons.warningmodal}</div>}
                        <div className='font-bold text-[34px] text-center capitalize leading-9'>{modalValue.title}</div>
                        <div className='font-light text-[22px]'>{modalValue.content} </div>
                      </ModalBody>
                      <ModalFooter>
                        {modalValue.footer}
                      </ModalFooter>
                    </>
                  )}

                </ModalContent>
              </Modal>
            </div>
            :
            <div className="relative">
              <Modal
                backdrop="opaque"
                placement="center"
                hideCloseButton
                size="3xl"
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
                        {
                          isOpen ?
                            <CookieSettigs
                              onClose={() => onClose()}
                              onAccept={() => setSlectCookie(true)}
                            />
                            :
                            <></>
                        }
                      </ModalBody>
                    </>
                  )}

                </ModalContent>
              </Modal>
              {
                selectCookie == false ?
                  <div className="flex max-md:flex-col fixed text-white items-center bg-gradient-to-tr backdrop-blur bg-[#403f4244] border border-gray-500 shadow-lg rounded-lg p-3 bottom-2 gap-2 left-5 z-30 max-w-[700px] max-md:left-0">
                    <div>
                      <span className='max-md:hidden'>Your privacy By clicking "Accept All" you can store cookies on your website and disclose information in accordance with our cookie policy.</span>
                      <span className='hidden max-md:block'>Your privacy By clicking <br />"Accept All" or Customize</span>
                    </div>
                    <div className='flex space-x-5'>
                      <div>
                        <Button
                          radius="lg"
                          className="border border-white/10"
                          color="danger"
                          onPress={() => onOpen()}
                        >
                          <span>Customize</span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          radius="lg"
                          className="border border-white/10"
                          color="primary"
                          onPress={handleAllChecked}
                        >
                          <span>Accept All</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  :
                  <></>
              }

              <div className={'flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center ' + (!currentPath?.includes("/auth") && !currentPath?.includes("/login") && !currentPath?.includes("/checkout") && !currentPath?.includes("/payment")
                ? "hidden" : "")}>
                <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
              </div>
              <Header />
              <div className={"flex w-full flex-col items-center pb-10 "}>
                <NextTopLoader
                  color="#2299DD"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={true}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                  template='<div class="bar absolute" role="bar"><div class="peg"></div></div> 
                        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                  zIndex={1600}
                  showAtBottom={false}
                />
                {children}
              </div>
              <div className={!currentPath?.includes("/auth") && !currentPath?.includes("/login") && !currentPath?.includes("/checkout") && !currentPath?.includes("/payment")
                ? "" : "hidden"}>
                <Footer cookieSettingsOnOpen={() => onOpen()} />
              </div>
            </div>
        }
      </div>
    </div>
  )

  else return (<></>);
}