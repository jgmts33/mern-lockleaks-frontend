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
  Modal
} from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import { useDispatch, useSelector } from "react-redux";

import { userInfo as info, setUserInfo } from '@/lib/auth/authSlice';
import { setScanProgress } from "../../lib/bot/botSlice";
import { scanProgress as scanProgressInfo, scanResult as scanRusultInfo, lastScanResult as lastScanResultInfo, setScanResult, setLastScanResult } from "../../lib/bot/botSlice";

import { useRouter } from "next/router";
import { WarningModal } from "../utils/Icons";
import { getAccessToken, getCookieValue, setTokensExpired } from "@/axios/token";
import { getUserInfo } from "@/axios/auth";
import CookieSettigs, { COOKIE_SETTING_OPTIONS } from "../cookie-settings";
import { io } from "socket.io-client";
import { ENDPOINT } from "../../config/config";
import { getUserId } from "../../axios/token";
import { getScrapedDataList } from "../../axios/download";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {

  const icons = {
    warningmodal: <WarningModal fill="currentColor" size={16} />,
  };

  const currentPath = usePathname();

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectCookie, setSlectCookie] = useState(false);
  const [modalValue, setModalValue] = useState({
    title: "",
    content: ""
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const userInfo = useSelector(info);
  const scanProgress = useSelector(scanProgressInfo);
  const dispatch = useDispatch();

  const handleConfirmClick = useCallback(() => {

    if (!userInfo?.verified) {
      window.location.assign(`mailto:${userInfo.email}`);
    }

    else if (!userInfo.subscription) {
      router.push("/pricing");
    }

  }, [userInfo]);

  const handleAllChecked = () => {
    const expires = new Date('2030-12-30').toUTCString();
    for (let index = 0; index < COOKIE_SETTING_OPTIONS.length; index++) {
      document.cookie = `${COOKIE_SETTING_OPTIONS[index].name}=allowed; expires=${expires}; path=/`;
    }
    setSlectCookie(true);
  }

  const getScrapedDataListInfo = async () => {
    const res = await getScrapedDataList();

    if (res.status == 'success') {
      if (res.data?.length >= 2) {
        dispatch(setLastScanResult(res.data[1]));
      }
      if (res.data?.length >= 1) {
        dispatch(setScanResult(res.data[0]));
      }
      dispatch(setScanProgress(0));
    } else {
      console.log(res.data);
    }
  }

  useEffect(() => {

    if (!userInfo) return;

    if (!userInfo.verified) {
      setModalValue({
        title: "You should verify Email before using our application",
        content: 'If you want to use this feature, check your Inbox!'
      })
      onOpen();
    }

    else if (!userInfo.subscription) {
      setModalValue({
        title: "You cannot use this feature, you must have the Pro or Star plan.",
        content: 'If you want to use this feature click on the "Upgrade" button.'
      })
      onOpen();
    }

    else {
      onClose();
    }

    getScrapedDataListInfo();

    if (currentPath.includes("login") && getCookieValue('necessary') == 'allowed') {

      if (userInfo.roles?.includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/app/dashboard");
      }

    }

    const userId = getUserId();

    const socket = io(ENDPOINT);

    socket.on(`welcome`, (value) => {
      console.log(value);
    })

    socket.on(`${userId}:scrape`, (value) => {
      dispatch(setScanProgress(value));
    })

    return () => {
      socket.disconnect();
    }

  }, [userInfo]);

  useEffect(() => {
    if (scanProgress == 100) getScrapedDataListInfo();
}, [scanProgress]);

  useEffect(() => {
    if (getCookieValue('necessary') === 'un-allowed') return;
    if (!currentPath.includes("app") && !currentPath.includes("admin") && !currentPath.includes("auth/login")) return;
    console.log("here");
    (async () => {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          const res = await getUserInfo();
          if (res.status == 'success') {
            dispatch(setUserInfo(res.data));
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();

  }, [currentPath]);

  useEffect(() => {
    if (getCookieValue('necessary')) {
      setSlectCookie(true);
    }
    setMounted(true);

  }, []);

  if (mounted) return (
    <div className={poppins.className + (userInfo ? " overflow-hidden !p-0" : "")}>
      <div className="flex flex-col">
        {
          userInfo ?
            <div className="flex ">
              <Sidebar show={showSidebar} setter={setShowSidebar} />
              <div className="w-full gradiant-background">
                <UserHeader setter={setShowSidebar} />
                <div className="flex flex-col flex-grow w-screen md:w-full h-[calc(100vh-65px)] overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                  {children}
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
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <div className='mx-auto flex items-center justify-center -mb-24'>{icons.warningmodal}</div>
                        <span className='font-bold text-[34px] text-center capitalize leading-9'>{modalValue.title}!</span>
                        <span className='font-light text-[22px]'>{modalValue.content} </span>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          radius="lg"
                          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-[#9C3FE4] to-[#C65647]`}
                          size='md'
                          onPress={() => handleConfirmClick()}
                        >
                          {!userInfo?.verified ? "Verify Email" : "Upgrade"}
                        </Button>
                        <Button
                          radius="lg"
                          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-gray-500 to-gray-600`}
                          size='md'
                          onPress={() => {
                            dispatch(setUserInfo(null));
                            setTokensExpired();
                            router.push("/");
                          }}
                        >
                          Back to HomePage
                        </Button>
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
                        {isOpen ? <CookieSettigs onClose={() => onClose()} /> : <></>}
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
                          Customize
                        </Button>
                      </div>
                      <div>
                        <Button
                          radius="lg"
                          className="border border-white/10"
                          color="primary"
                          onPress={handleAllChecked}
                        >
                          Accept All
                        </Button>
                      </div>
                    </div>
                  </div>
                  :
                  <></>
              }
              {
                !currentPath?.includes("/auth") && !currentPath?.includes("/login") && !currentPath?.includes("/checkout")
                  ?
                  <Header />
                  :
                  <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center'>
                    <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
                  </div>
              }
              <div className="flex w-full flex-col items-center">
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
              {
                !currentPath?.includes("/auth") && !currentPath?.includes("/login") && !currentPath?.includes("/checkout")
                  ?
                  <Footer cookieSettingsOnOpen={() => onOpen()} />
                  :
                  false
              }
            </div>
        }
      </div>
    </div>
  )

  else return (<></>);
}