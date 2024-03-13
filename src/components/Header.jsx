import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button,} from "@nextui-org/react";
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Pricing",
    "Services",
    "Help",
    "Blog",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent sm:p-1"
      maxWidth="xl"
    >
      <NavbarContent className="md:hidden text-white" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="">
        <NavbarBrand>
          <Link href="/">
            <p className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={250} height={150} alt="logo" /></p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="text-white text-xl font-semibold"><Image src="/assets/logo.svg" width={250} height={50} alt="logo" /></p>
          </Link>
        </NavbarBrand>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} className="max-md:hidden">
            <Link color="foreground" href={item[0].toLowerCase() + item.slice(1)}>
              {item}
            </Link>
          </NavbarItem>
        ))}
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
