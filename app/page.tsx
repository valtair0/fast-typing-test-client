"use client";
import { headers } from "next/headers";
import Navbar from "./navbar/navbar";
import "./style.css";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    
  }, []);

  return (
    <main>
      <Navbar />

      <section className="wrapper">
        <div className="hero"></div>
        <div className="content">
          <h1 className="h1--scalingSize" data-text="An awesome title">
            An awesome title
          </h1>
          <input type="checkbox" id="switch" />
        </div>
      </section>
    </main>
  );
}
