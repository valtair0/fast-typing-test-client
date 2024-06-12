"use client";
import React, { useEffect, useState } from "react";
import { TypingResultResponse } from "../type/result/TypingResultResponse";
import { TypingExamService } from "../Services/models/TypinExamServices";

export default function Leaderboard() {
  const [info, setInfo] = useState<TypingResultResponse[]>();

  useEffect(() => {
    TypingExamService.GetLeaderBoard((res) => {
      setInfo(res);
    });
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto p-9">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sıra
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                WPM
              </th>
              <th scope="col" className="px-6 py-3">
                Difficulty
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
            </tr>
          </thead>
          <tbody className="text-3xl">
            {info?.map((item, key) => {
              return (
                <tr
                  key={key}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{key + 1}</td>
                  <td className="px-6 py-4">{item.username}</td>
                  <td className="px-6 py-4">{item.wpm}</td>
                  <td className="px-6 py-4">{item.difficulty}</td>
                  <td className="px-6 py-4">{item.language}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
