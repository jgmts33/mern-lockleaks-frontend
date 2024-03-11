import React from "react";
import { Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { ChevronDown } from "@/src/utils/Icons";
import { usePathname } from 'next/navigation';

export default function Header() {
  const currentPath = usePathname();
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };

  return (
    <div className='flex items-center justify-between w-full max-w-[1500px] text-large font-semibold text-[17px] py-8 px-10 relative z-30'>
      <div className="flex items-center gap-20">
        <Link href="/" className="text-white text-xl font-semibold">Your Logo</Link>
        <div className="flex items-center gap-12 uppercase opacity-80 max-xl:hidden">
          <Link href="/pricing" className="text-white font-light" >Pricing</Link>
          <div className="text-white font-light flex items-center gap-2 hover:cursor-pointer">
            <Link href="/services">Services</Link>
            <span> {icons.chevron} </span>
            <div className="hidden"></div>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                
              >
                Open Menu
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link href="/help" className="text-white font-light" >Help</Link>
          <Link href="/blog" className="text-white font-light" >Blog</Link>
        </div>
      </div>
      <div className="flex items-center gap-10 relative max-sm:hidden">
        <Link href="/auth/login" className="text-white font-light opacity-80" >Log In</Link>
        <div className="h-full min-h-[1em] w-px border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent "></div>
        <Link href="/auth/register" className="text-white font-light opacity-80" >Sign Up</Link>
        <Button radius="sm" className="bg-gradient-to-tr from-[#9C3FE4] to-[#C65647] text-white shadow-lg" size='lg'>
          Free Analisis
        </Button>
      </div>
    </div >
  );
}
