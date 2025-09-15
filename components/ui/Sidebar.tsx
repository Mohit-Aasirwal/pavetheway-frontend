"use client";
import React from "react";
import { GoHome } from "react-icons/go";
import { IoInformationCircleOutline } from "react-icons/io5";
import { LuContact } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-16 h-screen fixed top-0 left-0 bg-gray-200 p-4 flex flex-col justify-between">
      <div className="flex flex-col spy items-center justify-center">
        <Image src="/logo.png" alt="Pave the Way" width={1000} height={1000} className="w-20 h-full" />
        <ul className="flex flex-col gap-10 mt-4">
          <li className="flex items-center justify-center">
            <GoHome
              size={20}
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
          </li>
          <li className="flex items-center justify-center">
            <IoInformationCircleOutline
              size={20}
              onClick={() => router.push("/about")}
              className="cursor-pointer"
            />
          </li>
          <li className="flex items-center justify-center">
            <LuContact
              size={20}
              onClick={() => router.push("/contact")}
              className="cursor-pointer"
            />
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center mt-4">
        <CgProfile
          size={20}
          onClick={() => router.push("/profile")}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
