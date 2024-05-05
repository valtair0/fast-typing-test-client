import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

export default function ThemeProvider() {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    setTheme(getCookie("theme"));
  }, []);

  const changeTheme = async (themeSelector: string) => {
    setTheme(themeSelector);
    setCookie("theme", themeSelector);
    //change html elements classlist
    if (themeSelector === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          changeTheme("dark");
        }}
        className=" mx-auto dark:hidden"
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            clipPath="url(#a)"
            stroke="#000000"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          >
            <path
              d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
              strokeLinecap="round"
            />

            <path
              d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              fill="#000000"
              fillOpacity=".16"
            />

            <path d="M12 19v4M12 1v4" strokeLinecap="round" />
          </g>

          <defs>
            <clipPath id="a">
              <path fill="#ffffff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <button
        onClick={() => {
          changeTheme("light");
        }}
        className="mx-auto hidden dark:block"
        
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 48 48"
          id="b"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <path d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z" />
        </svg>
      </button>
    </div>
  );
}
