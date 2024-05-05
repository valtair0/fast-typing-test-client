import Link from "next/link";
import React, { useEffect } from "react";
import ThemeProvider from "../Providers/themeProvider";

export default function Navbar() {
   

  return (
    <nav className="fixed w-full z-10 ">
      <div className="relative">
        <div className="py-4 backdrop-blur-3xl border-b-2 border-gray-600">
          <div className="flex text-black dark:text-white">
            <div className="mx-auto flex">
              <div className="mx-10">
                <Link href="#">Home</Link>
              </div>

              <div className="mx-10">
                <Link href="#">About</Link>
              </div>
              <div className="mx-10">
                <Link href="#">Contact</Link>
              </div>

              <div className="mx-10">
                <Link href="#">Log in</Link>
              </div>

              <div className="mx-10">
                <Link
                  className="bg-blue-500/75 hover:bg-blue-500/75 dark:bg-gray-600/75 dark:hover:bg-gray-500/75 font-bold py-2 px-4 rounded-full"
                  href="#"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 m-4">
             <ThemeProvider />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
