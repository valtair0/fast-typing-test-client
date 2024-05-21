import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import ThemeProvider from "../Providers/themeProvider";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed w-full z-10 ">
      <div className="relative">
        <div className="py-4 backdrop-blur-3xl border-b-2 border-gray-600">
          <div className="flex text-black dark:text-white">
            <div className="mx-auto flex">
              <div className="mx-10 py-2 px-4">
                <Link href="/type">Home</Link>
              </div>

              <div className="mx-10 py-2 px-4">
                <Link href="#">About</Link>
              </div>
              <div className="mx-10 py-2 px-4">
                <Link href="#">Contact</Link>
              </div>

              <div className="mx-10">
                <div className="bg-blue-500/75 hover:bg-blue-500/75 dark:bg-gray-600/75 dark:hover:bg-gray-500/75 font-bold py-2 px-4 rounded-full">
                  {session ? (
                    <form
                      action={async () => {
                        "use server";

                        await signOut();
                      }}
                    >
                      <button type="submit">Log out</button>
                    </form>
                  ) : (
                    <form
                      action={async () => {
                        "use server";
                        await signIn();
                      }}
                    >
                      <button type="submit">Log in</button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 m-4">
              <ThemeProvider />
            </div>
            <div className="absolute right-14 ">{session && <p className="text-2xl">{session.user?.name}</p>}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
