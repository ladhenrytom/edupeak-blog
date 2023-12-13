"use client";

import {ArrowRightAlt, Close, Logout, Menu, Person2, Settings} from "@mui/icons-material";
import {Avatar, IconButton} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import NotificationFeed from "./NotificationsFeed";

export default function Nav() {
  const router = useRouter();
  const {data: session} = useSession();

  const [openNav, setOpenNav] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClick = () => {
    setToggleDropdown(prev => !prev);
  };

  return (
    <nav className="relative h-24">
      <div className="fixed top-0 w-full h-24 flex bg-slate-800 text-neutral-50 px-6 shadow shadow-slate-800 duration-300 z-50 dark:shadow-sm dark:shadow-neutral-400">
        {/* desktop navigation */}
        <div className="xs:hidden w-full md:flex justify-between items-center">
          {/* logo */}
          <Link href="/" className="cursor-pointer">
            <h1 className=" font-bold">EduPeak</h1>
          </Link>
          {/* login/signup */}
          {session?.user ? (
            <div className="flex items-center space-x-9">
              <NotificationFeed />

              <button className="text-sm py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-700 duration-100" onClick={() => router.push("/new")}>
                Create Post
              </button>

              <div>
                <span className={`openDropdown cursor-pointer`} onClick={handleClick}>
                  <Avatar alt="User Image" src={session?.user.image} className="w-12 h-12" />
                </span>

                {toggleDropdown && (
                  <div className={`absolute right-0 w-72 flex flex-col divide-y-2 bg-neutral-100 text-slate-800 mt-6 py-1  mr-6 shadow-xl`} onClick={() => setToggleDropdown(false)}>
                    <Link href="/profile" className="flex items-center font-semibold px-6 py-3 hover:bg-slate-800 hover:text-neutral-100 transition-all duration-300">
                      <Person2 className="mr-3" />
                      My Profile
                    </Link>

                    <Link href="/settings/profile" className="flex items-center font-semibold px-6 py-3 hover:bg-slate-800 hover:text-neutral-100 transition-all duration-300">
                      <Settings className="mr-3" />
                      Settings
                    </Link>

                    <button className="flex items-center font-semibold py-3 px-6 hover:bg-slate-800 hover:text-neutral-100 transition-all duration-300" onClick={() => signOut()}>
                      <Logout className="mr-3 " />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-9">
              <button className="flex items-center hover:text-orange-500 group transition-all duration-100" onClick={() => signIn()}>
                Log In <ArrowRightAlt fontSize="large" className="pl-1 group-hover:translate-x-1 group-hover:scale-105" />
              </button>
              <button className=" py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-700 duration-100" onClick={() => router.push("/signup")}>
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* mobile navigation */}
        <div className="md:hidden w-full bg-slate-800 flex justify-between items-center">
          {/* logo */}
          <Link href="/" className="cursor-pointer">
            <h1 className=" font-bold">EduPeak</h1>
          </Link>
          {session?.user ? (
            <div>
              <span onClick={() => setOpenNav(prev => !prev)}>
                <Avatar alt="User Image" src={session.user.image} className="w-12 h-12 ml-12" />
              </span>

              <div
                className={`absolute ${openNav ? "-translate-x-0" : "translate-x-full"} flex flex-col top-0 h-screen w-full right-0 bg-slate-800 border-t border-neutral-100 p-6 transition-all duration-300 shadow z-20`}
                onClick={() => setOpenNav(false)}
              >
                <IconButton disableRipple className="self-end mb-6 p-0 text-neutral-100" onClick={() => setOpenNav(false)}>
                  <Close />
                </IconButton>
                <Link href="/profile" className="flex items-center font-semibold mb-6">
                  <Person2 className="mr-3" />
                  My Profile
                </Link>
                <Link href="/settings/profile" className="flex items-center font-semibold mb-6">
                  <Settings className="mr-3" />
                  Settings
                </Link>
                <button className="text-lg font-semibold px-4 py-3 mb-6 rounded-md bg-orange-500 hover:bg-orange-700 duration-300 shadow shadow-black" onClick={() => router.push("/new")}>
                  Create Post
                </button>

                <button className="flex items-center font-semibold mt-auto" onClick={() => signOut()}>
                  <Logout className="mr-3" />
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* dropdown menu bar */}
              <IconButton className=" hover:bg-none text-neutral-50" onClick={() => setOpenNav(prev => !prev)}>
                {openNav ? <Close fontSize="large" /> : <Menu fontSize="large" />}
              </IconButton>
              {/* login/signup */}
              <div className={`absolute ${openNav ? "top-full opacity-100" : "-top-full opacity-0"} left-0 right-0 flex justify-between items-center bg-slate-800 p-6 duration-300 shadow shadow-black z-50`} onClick={() => setOpenNav(false)}>
                <button className="flex items-center text-orange-500 mr-9 group" onClick={() => signIn()}>
                  Log In <ArrowRightAlt fontSize="large" className="pl-1 group-hover:translate-x-1 group-hover:scale-105" />
                </button>
                <button className=" py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-700 duration-300" onClick={() => router.push("/signup")}>
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
