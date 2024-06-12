import Link from "next/link";
import ThemeProvider from "../Providers/themeProvider";
import Image from "next/image";
import { headers } from "next/headers";

export default async function Navbar() {
  const headersList = headers();
  const cookies = headersList.get("cookie");
  let name = cookies?.split(";").find((cookie) => cookie.includes("name"));
  name = name?.split("=")[1];

  return (
    <nav className="relative text-xl bg-gray-300 dark:bg-gray-800  w-full z-10 ">
      <div className="">
        <div className="py-4 border-b-2 border-gray-600">
          <div className="flex text-black dark:text-white">
            <Image
              className="absolute px-4 py-2"
              src="/logowhite.webp"
              width={300}
              height={300}
              alt="Picture of the logo"
              priority={true}
            />
            <Image
              className="absolute dark:hidden px-4 py-2"
              src="/logoblack.webp"
              width={300}
              height={300}
              alt="Picture of the logo"
              priority={true}
            />
            <div className="mx-auto flex">
              <div className="mx-10 py-2 px-4">
                <Link href="/">Home</Link>
              </div>
              <div className="mx-10 py-2 px-4">
                <Link href="/leaderboard">Leaderboard</Link>
              </div>
              <div className="mx-10 py-2 px-4">
                <Link href="#">Contact</Link>
              </div>
              <div className="mx-10">
                <div className="bg-gray-500/75 hover:bg-gray-500/75 dark:bg-gray-600/75 dark:hover:bg-gray-500/75 font-bold py-2 px-4 rounded-full">
                  {name ? (
                    <a>{name && <p className="font-thin ">{name}</p>}</a>
                  ) : (
                    <a href="/user/login" type="submit">
                      Log in
                    </a>
                  )}
                </div>
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
