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
    "pricing",
    "servicees",
    "help",
    "blog",
    "blog/format",
    "scantakedown",
    "AI",
    "copyright",
    "checkout",
    "camdmca",
    "creatordmca",
    "catfishing",
    "recovery",
    "monthlypdf",
    "dmcabadges",
    "deletedata"
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
          <Link color="foreground" href="/pricing">
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
              <DropdownItem key="service" className="text-white" onClick={() => handleMenuItemClick('/servicees')}>Services</DropdownItem>
              <DropdownItem key="blog format" className="text-white" onClick={() => handleMenuItemClick('/blog/format')}>Blog Format</DropdownItem>
              <DropdownItem key="scantakedown" className="text-white" onClick={() => handleMenuItemClick('/scantakedown')}>Scan&TakeDown</DropdownItem>
              <DropdownItem key="AI" className="text-white"  onClick={() => handleMenuItemClick('/AI')}>AI</DropdownItem>
              <DropdownItem key="copyright" className="text-white" onClick={() => handleMenuItemClick('/copyright')}>CopyRight</DropdownItem>
              <DropdownItem key="checkout" className="text-white" onClick={() => handleMenuItemClick('/checkout')}>Checkout</DropdownItem>
              <DropdownItem key="dmcaprotection" className="text-white" onClick={() => handleMenuItemClick('/camdmca')}>COM DMCA Protection</DropdownItem>
              <DropdownItem key="creatordmca" className="text-white" onClick={() => handleMenuItemClick('/creatordmca')}>Creator DMCA Protection</DropdownItem>
              <DropdownItem key="catfishing" className="text-white" onClick={() => handleMenuItemClick('/catfishing')}>Catfishing</DropdownItem>
              <DropdownItem key="usernamerecovery" className="text-white" onClick={() => handleMenuItemClick('/recovery')}>Username Recovery</DropdownItem>
              <DropdownItem key="monthlypdf" className="text-white" onClick={() => handleMenuItemClick('/monthlypdf')}>Monthly Analytics PDF</DropdownItem>
              <DropdownItem key="dmcabadges" className="text-white" onClick={() => handleMenuItemClick('/dmcabadges')}>Dmca Badges</DropdownItem>
              <DropdownItem key="deletedata" className="text-white" onClick={() => handleMenuItemClick('/deletedata')}>Delete Data</DropdownItem>
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
        <NavbarItem>
          <Link href="/auth/login" className="text-white">Login</Link>
        </NavbarItem>
        <div className="h-1/2 min-h-[1em] w-px border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent"></div>
        <NavbarItem>
          <Link href="/auth/register" className="text-white">Register</Link>
        </NavbarItem>
        <NavbarItem className="max-lg:hidden">
          <Link href="/freeanalyse">
            <Button radius="sm" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg" size='lg'>Free Analisis</Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={"/"+item}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
