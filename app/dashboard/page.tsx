"use client";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [input, setinput] = useState("");

  const [outputText, setOutputText] = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const words = input.split(" ");

    console.log("words", words);
  };

  return (
    <div>
      Dashboard
      <form>
        <input
          className=" my-5 mx-5"
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
