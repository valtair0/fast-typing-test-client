"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TypingResultResponse } from "./TypingResultResponse";
import { TypingExamService } from "@/app/Services/models/TypinExamServices";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Typetest() {
  const searchParams = useSearchParams();

  const search = searchParams.get("id");

  const [info, setInfo] = useState<TypingResultResponse>();

  useEffect(() => {
    if (search) {
      TypingExamService.getResultById(search, (res) => {
        setInfo(res);
      });
    }
  }, [search]);

  const options = {
    maintainAspectRatio: false,
  };

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Yanlış Kelime",
        data: [0, 5, 8, 0, 9, 0, 0, 4, 2, 0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div className="absolute mt-4">
        <div className="text-white text-3xl ml-20">wpm</div>
        <div className="text-[#4BC0C0] text-4xl ml-20">{info?.wpm}</div>
        <div className="my-4"></div>
        <div className="text-white text-3xl ml-20">accuary</div>
        <div className="text-[#4BC0C0] text-4xl ml-20">{info?.accuracy}%</div>
      </div>
      <div className="max-w-7xl flex flex-col items-center justify-center  mx-auto mt-16">
        <Line height="200px" width="200px" options={options} data={data} />
      </div>
      <div className="flex justify-center mt-8">
        <div className="text-white text-3xl mx-32">
          Dil
          <div className="text-[#4BC0C0] text-4xl">{info?.language}</div>
        </div>

        <div className="text-white  text-3xl mx-32">
          Zorluk
          <div className="text-[#4BC0C0]  text-4xl">{info?.difficulty}</div>
        </div>

        <div className="text-white  text-3xl mx-32">
          Doğru/Yanlış
          <div className="text-[#4BC0C0]  text-4xl">
            <span className="text-green-500">{info?.correctCount}</span>/
            <span className="text-red-500">{info?.wrongCount}</span>
          </div>
        </div>

        <div className="text-white  text-3xl mx-32">
          Saniye
          <div className="text-[#4BC0C0]  text-4xl">{info?.seconds}</div>
        </div>
      </div>
    </div>
  );
}
