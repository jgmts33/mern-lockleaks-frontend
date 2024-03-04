"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar position="static" className="bg-transparent justify-center">
      <div className="flex gap-10">
        <NavbarBrand>
        <NavbarItem >
            <Link color="foreground" href="#">
              Your Logo
            </Link>
          </NavbarItem>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex gap-10" justify="center">
          <NavbarItem >
            <Link color="foreground" href="#">
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Services
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Help
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Blog
            </Link>
          </NavbarItem>
        </NavbarContent>
      </div>
      <div >
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">Signup</Link>
          </NavbarItem>
          <NavbarItem>
            <Button className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg">
              Free Analisis
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
