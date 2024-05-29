"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowDown } from "@/components/utils/Icons";
import { Poppins } from "next/font/google";
import { getAccessToken, getCookieValue } from "../../axios/token";
import { getUserInfo } from "../../axios/auth";
import { Crisp } from "crisp-sdk-web";
import { GoogleTranslate } from "../translater";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function Header() {

  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefLangCookie, setPrefLangCookie] = useState('');

  const menuItems = [
    {
      content: "Services",
      path: "/services"
    }, {
      content: "Scan&Takedown",
      path: "/scantakedown"
    }, {
      content: "AI",
      path: "/ai"
    }, {
      content: "Copyright",
      path: "/copyright"
    }, {
      content: "Cam DMCA Protection",
      path: "/camdmca"
    }, {
      content: "Creator DMCA Protection",
      path: "/creatordmca"
    }, {
      content: "Catfishing",
      path: "/catfishing"
    }, {
      content: "Username Recovery",
      path: "/recovery"
    }, {
      content: "Monthly Analytics PDF",
      path: "/monthlypdf"
    },
    {
      content: "DMCA Badges",
      path: "/dmcabadges"
    },
  ];

  const ToggleMenuItems = [
    {
      content: "Pricing",
      path: "/pricing"
    }, {
      content: "Services",
      path: "/services"
    }, {
      content: "Blog",
      path: "/blog"
    }, {
      content: "Dmca Badges",
      path: "/dmcabadges"
    }, {
      content: "Help",
      path: "/help"
    }, {
      content: "Delete Data",
      path: "/deletedata"
    },
  ]

  const getPrefLangCookie = async () => {
    try {
      // Step 1: Fetch user's IP address
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();

      // Step 2: Determine location based on IP
      const geoResponse = await fetch(`https://ipinfo.io/widget/demo/${ip}`);
      const geoData = await geoResponse.json();
      const countryCode = geoData.data.country;

      // Step 3: Set cookie based on location
      let lang;
      switch (countryCode) {
        case 'US':
          lang = 'en';
          break;
        case 'IT':
          lang = 'it';
          break;
        case 'RO':
          lang = 'ro';
          break;
        case 'ES':
          lang = 'es';
          break;
        case 'RU':
          lang = 'ru';
          break;
        // Add more cases as needed
        default:
          lang = 'en'; // Default to English if unknown
      }

      setPrefLangCookie(getCookieValue("googtrans") ? getCookieValue("googtrans") : `/auto/${lang}`);

    } catch (error) {
      console.error('Error getting preferred language:', error);
      return 'en'; // Fallback to English if there's an error
    }
  };

  const icons = {
    arrowDown: <ArrowDown fill="currentColor" size={16} />,
  };

  const handleMenuItemClick = (url) => {
    router.push(url);
  };

  useEffect(() => {
    (async () => {
      try {
        await getPrefLangCookie();
        const accessToken = await getAccessToken();
        if (accessToken) {
          const res = await getUserInfo();
          if (res.status == 'success') {
            setUserInfo(res.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
      setMounted(true);
    })();
    Crisp.configure('a07a14d8-8bd7-420c-b60e-e0f48ff8b31a');
  }, []);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent sm:p-1 z-20"
      maxWidth="full"
    >
      <NavbarContent className="md:hidden text-white" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarContent className="lg:hidden mx-auto flex" justify="center">
        <NavbarBrand className="w-full">
          <Link href="/">
            <Image src="/assets/logo.svg" width={190} height={50} alt="logo" className="justify-starter" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="max-lg:hidden" justify="start">
        <NavbarBrand>
          <Link href="/">
            <Image src="/assets/logo.svg" width={190} height={50} alt="logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-12 max-xl:gap-5" justify="center">
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/pricing" title="pricing">
            PRICING
          </Link>
        </NavbarItem>
        <NavbarItem className="max-md:hidden cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <Link color="foreground">SERVICES<span className="animate-bounce w-6 h-6 text-white">{icons.arrowDown}</span></Link>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="bg-[#191f33] rounded-sm px-6" >
              <DropdownSection title="" showDivider></DropdownSection>
              {
                menuItems.map((menus, index) => {
                  return (
                    <DropdownItem key={index} className="text-white" onClick={() => handleMenuItemClick(menus.path)}><span className={poppins.className}>{menus.content}</span></DropdownItem>
                  )
                })
              }
              <DropdownSection title="" showDivider></DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/help">
            HELP
          </Link>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/blog">
            BLOG
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="max-md:hidden" justify="end">
        {
          mounted ? userInfo ?
            <>
              {
                userInfo.roles.find(p => p == 'admin') ?
                  <NavbarItem>
                    <Link href="/admin/dashboard" className="text-white">Dashboard</Link>
                  </NavbarItem>
                  :
                  <NavbarItem>
                    <Link href="/app/dashboard" className="text-white">Dashboard</Link>
                  </NavbarItem>
              }
              <NavbarItem className="text-white flex max-sm:hidden">
                {prefLangCookie ? <GoogleTranslate prefLangCookie={prefLangCookie} /> : <></>}
              </NavbarItem>
            </>
            :
            <>
              <NavbarItem>
                <Link href="/auth/login" className="text-white">Login</Link>
              </NavbarItem>
              <div className="h-1/2 min-h-[1em] w-px border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent"></div>
              <NavbarItem>
                <Link href="/auth/register" className="text-white">Register</Link>
              </NavbarItem>
              <NavbarItem className="max-lg:hidden">
                <Link href="/freeanalyse">
                  <Button radius="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg" size='lg'>Free Trial</Button>
                </Link>
              </NavbarItem>
              <NavbarItem className="text-white flex max-sm:hidden">
                {prefLangCookie ? <GoogleTranslate prefLangCookie={prefLangCookie} renderValueType="country-code" /> : <></>}
              </NavbarItem>
            </> : <></>
        }
      </NavbarContent>

      <NavbarContent className="max-md:block hidden"></NavbarContent>
      <NavbarMenu>
        {ToggleMenuItems.map((menu, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full text-white mt-3"
              href={menu.path}
              size="lg"
            >
              {menu.content}
            </Link>
          </NavbarMenuItem>
        ))}
        <hr className="w-56 bg-gray-400 mt-5"></hr>
        {
          mounted ? userInfo ?
            <>
              {
                userInfo.roles.find(p => p == 'admin') ?
                  <NavbarItem className="mt-5">
                    <Link href="/admin/dashboard" className="text-white">Dashboard</Link>
                  </NavbarItem>
                  :
                  <NavbarItem>
                    <Link href="/app/dashboard" className="text-white">Dashboard</Link>
                  </NavbarItem>
              }
              <NavbarItem className="text-white flex max-sm:hidden">
                {prefLangCookie ? <GoogleTranslate prefLangCookie={prefLangCookie} renderValueType="country-code" /> : <></>}
              </NavbarItem>
            </> : <>
              <NavbarItem className="mt-5">
                <Link href="/auth/login" className="text-white">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/auth/register" className="text-white mt-5">Register</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/freeanalyse" className="mt-5">
                  <Button radius="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg" size='md'>Free Analisis</Button>
                </Link>
              </NavbarItem>
              <NavbarItem className="text-white flex max-sm:hidden">
                {prefLangCookie ? <GoogleTranslate prefLangCookie={prefLangCookie} renderValueType="country-code" /> : <></>}
              </NavbarItem>
            </> : <></>
        }
      </NavbarMenu>
    </Navbar >
  );
}
