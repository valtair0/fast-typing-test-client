"use client";
import React, { useEffect, useRef, useState } from "react";
import { TypingExamsResponseVM } from "../ViewModel/TypingExamsResponseVM";
import { TypingExamService } from "../Services/models/TypinExamServices";

export default function TypingTest({
  data,
}: {
  data: TypingExamsResponseVM[];
}) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(0);
  const selectedWordRef = useRef<HTMLSpanElement | null>(null);
  const [correctWords, setCorrectWords] = useState<number[]>([]);
  const [wrongWords, setWrongWords] = useState<number[]>([]);
  const [timer, setTimer] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [category, setCategory] = useState<string>("Zor");
  const [language, setLanguage] = useState<string>("Turkish");
  const [selectedText, setSelectedText] = useState<string>("");
  const [datas, setDatas] = useState<string[]>(data[0].text);
  const [words, SetWords] = useState<string[]>([]);
  const [diffuculty, setDiffuculty] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (language === "" || category === ""  || diffuculty === "") {
        
      }else{
      let datza: TypingExamsResponseVM[] = await TypingExamService.getTypingExam(language,category,diffuculty,undefined);
      console.log(datza);

      }

      
    };

    fetchData();

  }, [diffuculty, language, category, selectedText]);

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
      console.log("correct");
      setSelected(selected + 1);
      setInput("");
      setCorrectWords([...correctWords, selected]);
    } else {
      console.log("wrong");
      setSelected(selected + 1);
      setInput("");
      setWrongWords([...wrongWords, selected]);
    }

    if (selectedWordRef.current) {
      scrollToElement(selectedWordRef.current);
    }
  };

  return (
    <div>
      <section className="dark:bg-[#000] h-[100vh]">
        <div className="py-16">
          <div className="mx-auto px-6 max-w-7xl text-white">
            <form className="mx-auto flex mb-6 mt-12">
              <label
                htmlFor="selectedText"
                className="mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a text
              </label>
              <select
                id="selectedText"
                onChange={(e) => {
                  setSelectedText(e.target.value);
                }}
                className="border border-gray-300 bg-[#17181D] text-white text-sm rounded-lg block p-2.5  "
              >
                <option defaultValue={""}>Choose a text</option>

                {datas.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="mx-auto flex">
                <label
                  htmlFor="categories"
                  className="mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an category
                </label>
                <select
                  id="categories"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="border border-gray-300 bg-[#17181D] text-white text-sm rounded-lg block p-2.5  "
                >
                  <option defaultValue={"Katip"}>Choose a category</option>
                  <option value="Katip">Katip</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <label
                htmlFor="languages"
                className="mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an language
              </label>
              <select
                id="languages"
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                className="border border-gray-300 bg-[#17181D] text-white text-sm rounded-lg block p-2.5  "
              >
                <option defaultValue={"Turkish"}>Choose a language</option>
                <option value="Turkish">Turkish</option>
                <option value="English">English</option>
              </select>

              <label
                htmlFor="languages"
                className="mb-2 mt-2 ml-10 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an diffuculty
              </label>
              <select
                id="languages"
                onChange={(e) => {
                  setDiffuculty(e.target.value);
                }}
                className="border border-gray-300 bg-[#17181D] text-white text-sm rounded-lg block p-2.5  "
              >
                <option defaultValue={"Kolay"}>Choose a diffuculty</option>
                <option value="Kolay">Kolay</option>
                <option value="Orta">Orta</option>
                <option value="Zor">Zor</option>
              </select>
            </form>

            <div className="flex justify-center items-center mb-10 ">
              <span className="text-white text-3xl mt-12">
                Total Words:
                {datas.length - (correctWords.length + wrongWords.length)}
              </span>
            </div>
            <div className="relative group p-4 rounded-xl border border-white bg-[#17181D]">
              <div className="mt-6 pb-6 ">
                <div className="overflow-hidden max-h-20 text-3xl">
                  {datas.map((item, key) => (
                    <span
                      className={`
                          inline-block
                          my-1 
                          mx-4
                          ${
                            key == selected
                              ? `text-[#F3B308] bg-gray-800 `
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
              className="mt-12 w-full h-16 px-6 text-3xl bg-[#17181D] text-white outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
