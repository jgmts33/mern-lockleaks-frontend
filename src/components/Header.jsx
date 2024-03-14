import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Image from 'next/image';
import { ArrowDown } from "@/src/utils/Icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Pricing",
    "Services",
    "Help",
    "Blog",
  ];

  const icons = {
    arrowDown: <ArrowDown fill="currentColor" size={16} />,
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
          <Link color="foreground" href="pricing">
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
              <DropdownItem key="service"><Link href="/servicees" className="text-white" color="default">Services</Link></DropdownItem>
              <DropdownItem key="blog format"><Link href="/blog/format" className="text-white" color="default">Blog Fromat</Link></DropdownItem>
              <DropdownItem key="scantakedown"><Link href="/scantakedown" className="text-white" color="default">Scan&TakeDown</Link></DropdownItem>
              <DropdownItem key="AI"><Link href="/AI" className="text-white" color="default">Artificial Intelligence</Link></DropdownItem>
              <DropdownItem key="copyright"><Link href="/copyright" className="text-white" color="default">CopyRight</Link></DropdownItem>
              <DropdownItem key="checkout"><Link href="/checkout" className="text-white" color="default">Checkout</Link></DropdownItem>
              <DropdownItem key="dmcaprotection"><Link href="/camdmca" className="text-white" color="default">COM DMCA Protection</Link></DropdownItem>
              <DropdownItem key="creatordmca"><Link href="/creatordmca" className="text-white" color="default">Creator DMCA Protection</Link></DropdownItem>
              <DropdownItem key="catfishing"><Link href="/catfishing" className="text-white" color="default">Catfishing</Link></DropdownItem>
              <DropdownItem key="usernamerecovery"><Link href="/recovery" className="text-white" color="default">Username Recovery</Link></DropdownItem>
              <DropdownItem key="monthlypdf"><Link href="/monthlypdf" className="text-white" color="default">Monthly Analytics PDF</Link></DropdownItem>
              <DropdownItem key="dmcabadges"><Link href="/dmcabadges" className="text-white" color="default">Dmca Badges</Link></DropdownItem>
              <DropdownSection title="" showDivider></DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="help">
            HELP
          </Link>
        </NavbarItem>
        <NavbarItem className="max-md:hidden">
          <Link color="foreground" href="blog">
            BLOG
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
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
              href="#"
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
