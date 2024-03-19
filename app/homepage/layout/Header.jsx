"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowDown } from "@/src/utils/Icons";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      content:"Services",
      path:"/homepage/servicees"
    }, {
      content:"Blog Format",
      path:"/homepage/blog/format"
    }, {
      content:"Scan&Takedown",
      path:"/homepage/scantakedown"
    }, {
      content:"AI",
      path:"/homepage/AI"
    }, {
      content:"Copyright",
      path:"/homepage/copyright"
    }, {
      content:"Chechout",
      path:"/homepage/checkout"
    }, {
      content:"COM DMCA Protection",
      path:"/homepage/camdmca"
    }, {
      content:"Creator DMCA Protection",
      path:"/homepage/creatordmca"
    }, {
      content:"Catfishing",
      path:"/homepage/catfishing"
    }, {
      content:"Username Recovery",
      path:"/homepage/recovery"
    }, {
      content:"Monthly Analytics PDF",
      path:"/homepage/monthlypdf"
    },
    {
      content:"Monthly Analytics PDF",
      path:"/homepage/monthlypdf"
    },
    {
      content:"Dmca Badges",
      path:"/homepage/dmcabadges"
    },
    {
      content:"Delete Data",
      path:"/homepage/deletedata"
    },
  ];

  const icons = {
    arrowDown: <ArrowDown fill="currentColor" size={16} />,
  };

  const handleMenuItemClick = (url) => {
    router.push(url);
  };

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent sm:p-1"
      maxWidth="2xl"
    >
      <NavbarContent className="md:hidden text-white" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image src="/assets/logo.svg" width={190} height={50} alt="logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image src="/assets/logo.svg" width={190} height={50} alt="logo" />
          </Link>
        </NavbarBrand>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/homepage/pricing">
            PRICING
          </Link>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Dropdown>
            <DropdownTrigger>
              <Link color="foreground">SERVICES<span className="animate-bounce w-6 h-6 text-white">{icons.arrowDown}</span></Link>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className="bg-[#191f33] rounded-sm px-6">
              <DropdownSection title="" showDivider></DropdownSection>
              {
                menuItems.map((menus,index)=>{
                  return(
                    <DropdownItem key={index} className="text-white" onClick={() => handleMenuItemClick(menus.path)}>{menus.content}</DropdownItem>
                  )
                })
              }
              <DropdownSection title="" showDivider></DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/homepage/help">
            HELP
          </Link>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="/homepage/blog">
            BLOG
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="max-md:hidden" justify="end">
        <NavbarItem>
          <Link href="/auth/login" className="text-white">Login</Link>
        </NavbarItem>
        <div className="h-1/2 min-h-[1em] w-px border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent"></div>
        <NavbarItem>
          <Link href="/auth/register" className="text-white">Register</Link>
        </NavbarItem>
        <NavbarItem className="max-lg:hidden">
          <Link href="/freeanalyse">
            <Button radius="sm" className="bg-gradient-to-tr from-purple-light to-purple-weight text-white shadow-lg" size='lg'>Free Analisis</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((menu, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={menu.path}
              size="lg"
            >
              {menu.content}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
