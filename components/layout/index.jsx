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
import { useRouter } from "next/router";
import { WarningModal } from "../utils/Icons";
import { getAccessToken, getCookieValue, setTokensExpired } from "@/axios/token";
import { getUserInfo } from "@/axios/auth";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {

  const icons = {
    warningmodal: <WarningModal fill="currentColor" size={16} />,
  };

  const currentPath = usePathname();

  const [showSidebar, setShowSidebar] = useState(false);
  const [modalValue, setModalValue] = useState({
    title: "",
    content: ""
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const router = useRouter();
  const userInfo = useSelector(info);
  const dispatch = useDispatch();

  const handleConfirmClick = useCallback(() => {

    if (!userInfo?.verified) {
      window.location.assign(`mailto:${userInfo.email}`);
    }

    else if (!userInfo.subscription) {
      router.push("/pricing");
    }

  }, [userInfo]);

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

    if (currentPath.includes("login") && getCookieValue('necessary') == 'allowed') {

      if (userInfo.roles?.includes("admin")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/app/dashboard");
      }

    }

  }, [userInfo]);

  useEffect(() => {
    if ( getCookieValue('necessary') === 'un-allowed' ) return;
    if (!currentPath.includes("app") && !currentPath.includes("admin") && !currentPath.includes("login") ) return;
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

  }, []);

  useEffect(() => {
    console.log("userInfo:", userInfo);
  }, [userInfo]);

  return (
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
                          onClick={() => handleConfirmClick()}
                        >
                          {!userInfo?.verified ? "Verify Email" : "Upgrade"}
                        </Button>
                        <Button
                          radius="lg"
                          className={`bg-gradient-to-tr mt-4 h-[60px] w-full text-lg mb-5 from-gray-500 to-gray-600`}
                          size='md'
                          onClick={() => {
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
              {
                !currentPath?.includes("/auth") && !currentPath?.includes("/login")
                  ?
                  <Header />
                  :
                  <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10 max-lg:justify-center max-lg:items-center'>
                    <Link href="/" className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={190} height={50} alt="logo" /></Link>
                  </div>
              }
              <div className="flex w-full">
                <div className="mx-auto max-sm:w-full">
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
              </div>
              {
                !currentPath?.includes("/auth") && !currentPath?.includes("/login")
                  ?
                  <Footer />
                  :
                  false
              }
            </div>
        }
      </div>
    </div>
  );
}