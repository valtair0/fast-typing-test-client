"use client";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { TypingExamsResponseVM } from "../ViewModel/TypingExamsResponseVM";
import { TypingExamService } from "../Services/models/TypinExamServices";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import "./style.css";

export default function TypingTest({
  data,
}: {
  data: TypingExamsResponseVM[];
}) {
  const cookie = getCookie("accessToken");
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(0);
  const selectedWordRef = useRef<HTMLSpanElement | null>(null);
  const [correctWords, setCorrectWords] = useState<number[]>([]);
  const [wrongWords, setWrongWords] = useState<number[]>([]);

  const [correctWordsText, setCorrectWordsText] = useState<string[]>([]);
  const [wrongWordsText, setWrongWordsText] = useState<string[]>([]);

  const [timer, setTimer] = useState(30);
  const [timerDefault, setTimerDefault] = useState(30);
  const [isStarted, setIsStarted] = useState(false);
  const [category, setCategory] = useState<string>("Katip");
  const [language, setLanguage] = useState<string>("Turkish");
  const [datas, setDatas] = useState<string[]>(data[0].text);
  const [diffuculty, setDiffuculty] = useState<string>("Kolay");
  const [typingExamId, setTypingExamId] = useState(data[0].id);
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const fetchData = async (
    langparam: string,
    catparam: string,
    diffparam: string
  ) => {
    let data: TypingExamsResponseVM[] = await TypingExamService.getTypingExam(
      langparam,
      catparam,
      diffparam
    );
    setTypingExamId(data[0].id);

    setDatas(data[0].text);
  };

  const sendResult = async (
    correctCount: number,
    wrongCount: number,
    correctWords: string,
    wrongWords: string,
    typingExamId: string
  ) => {
    await TypingExamService.SendResults(
      correctCount,
      wrongCount,
      correctWords,
      wrongWords,
      typingExamId,
      timerDefault,
      cookie || "",
      (response) => {
        router.push("/type/result?id=" + response);
        setLoader(false);
      }
    );
  };

  useEffect(() => {
    if (timer == 1) {
      console.log("Time is up");
      sendResult(
        correctWords.length,
        wrongWords.length,
        correctWordsText.join(","),
        wrongWordsText.join(","),
        typingExamId
      );
      setLoader(true);
    }
    const interval = setInterval(() => {
      if (timer > 0 && isStarted) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, timer]);

  const checkInput = (text: string) => {
    if (!isStarted) {
      setIsStarted(true);
    }

    if (timer <= 0) {
      setInput("");
    }

    if (selectedWordRef.current) {
      if (datas[selected].startsWith(text.trim())) {
        selectedWordRef.current.style.color = "#22C55E";
      } else {
        selectedWordRef.current.style.color = "#EF4444";
      }

      if (text.trim() === "") {
        selectedWordRef.current.style.color = "#F3B308";
      }
    }
  };

  const scrollToElement = (ref: HTMLSpanElement) => {
    ref.scrollIntoView({ behavior: "smooth" });
  };

  const submitInput = () => {
    if (input.trim() === "") {
      setInput("");
      return;
    }

    if (timer <= 0) {
      return;
    }

    if (input.trim() === datas[selected]) {
      console.log("correct: " + input.trim());
      setSelected(selected + 1);
      setInput("");
      setCorrectWords([...correctWords, selected]);
      setCorrectWordsText([...correctWordsText, input.trim()]);
    } else {
      console.log("wrong: " + input.trim());

      setSelected(selected + 1);
      setInput("");
      setWrongWords([...wrongWords, selected]);
      setWrongWordsText([...wrongWordsText, input.trim()]);
    }

    if (selectedWordRef.current) {
      scrollToElement(selectedWordRef.current);
    }
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div>
      <div className={loader ? "spinner-background" : ""}>
        <h1
          className={
            loader
              ? "text-7xl dark:text-white text-black absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              : "hidden"
          }
        >
          ZAMAN DOLDU
        </h1>
        <ClipLoader
          className="center"
          cssOverride={override}
          color={"ffffff"}
          loading={loader}
          size={100}
        />
      </div>
      <section className="text-black dark:text-white">
        <div className="py-16">
          <div className="mx-auto px-6 max-w-7xl">
            <div className="inline-flex rounded-md shadow-sm px-2" role="group">
              <select
                disabled={isStarted}
                onChange={(e) => {
                  setLanguage(e.target.value);

                  fetchData(e.target.value, category, diffuculty);
                }}
                className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <option value="Turkish">Türkçe</option>
                <option value="English">İngilizce</option>
              </select>
              <select
                disabled={isStarted}
                onChange={(e) => {
                  setDiffuculty(e.target.value);
                  fetchData(language, category, e.target.value);
                }}
                className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <option value="Kolay">Kolay</option>
                <option value="Orta">Orta</option>
                <option value="Zor">Zor</option>
              </select>
            </div>

            <div
              className="inline-flex rounded-md shadow-sm px-2 inline-block"
              role="group"
            >
              <button
                type="button"
                className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Total Kelime:
                {datas.length - (correctWords.length + wrongWords.length)}
              </button>
              <select
                disabled={isStarted}
                onChange={(e) => {
                  setTimer(parseInt(e.target.value));
                  setTimerDefault(parseInt(e.target.value));
                }}
                className="float-right px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <option value={30}>Saniye</option>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
                <option value={120}>120</option>
              </select>
            </div>

            <button
              type="button"
              className="float-right px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Time: {timer}
            </button>

            <div className="mb-10 "></div>
            <div className="relative group p-4 rounded-xl border border-white bg-gray-300 dark:bg-gray-800">
              <div className="mt-6 pb-6 ">
                <div className="overflow-hidden max-h-32 text-3xl ">
                  {datas.map((item, key) => (
                    <span
                      className={`
                          inline-block
                          text-4xl
                          my-4 
                          mx-4
                          ${
                            key == selected
                              ? `text-white dark:text-[#F3B308] bg-gray-800 `
                              : null
                          }
                          ${correctWords.includes(key) ? "text-[#22C55E] " : ""}
                          ${wrongWords.includes(key) ? "text-[#EF4444]" : ""}


                            `}
                      key={key}
                      ref={key === selected ? selectedWordRef : null}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <input
              value={input}
              disabled={timer <= 0}
              onChange={(e) => {
                setInput(e.target.value);
                checkInput(e.target.value);
              }}
              type="text"
              autoFocus={true}
              onKeyUpCapture={(e) => {
                if (e.key === " ") {
                  submitInput();
                }
              }}
              className="mt-12 w-full h-16 px-6 text-3xl bg-gray-300 dark:bg-gray-700 text-black dark:text-white outline-none"
              placeholder="Start typing..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
