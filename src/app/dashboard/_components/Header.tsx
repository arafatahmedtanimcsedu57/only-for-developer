"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="bg-slate-100 text-slate-800 p-4 flex flex-wrap justify-between items-center">
      <div className="flex gap-2 items-center font-semibold">
        <Image src={"/logo.png"} alt="logo" width={40} height={100} />
        <div>Only for Developer</div>
      </div>
      <Button onClick={handleLogout}>
        <LogOutIcon />
      </Button>
    </header>
  );
}

export default Header;
