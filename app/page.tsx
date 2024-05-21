"use client";
import { headers } from "next/headers";
import Navbar from "./navbar/navbar";
import "./style.css";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main className="dark:bg-[#000]">


      <section className="wrapper">
        <div className="heroLight dark:heroDark "></div>
        <div className="content">
          <h1 className="h1--scalingSize" data-text="Test Your Keyboard Speed">
            Test Your Keyboard Speed
          </h1>
        </div>
      </section>

    </main>
  );
}
