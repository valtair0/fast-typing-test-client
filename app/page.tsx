"use client";
import "./style.css";
import { useEffect, useState } from "react";
import TypingTextProvider from "./type/TypingTextProvider";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main>
      <TypingTextProvider />
    </main>
  );
}
