import React, { useEffect, useRef, useState } from "react";

export default function TypeTest() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(0);
  const selectedWordRef = useRef<HTMLSpanElement | null>(null);
  const [correctWords, setCorrectWords] = useState<number[]>([]);
  const [wrongWords, setWrongWords] = useState<number[]>([]);
  const [timer, setTimer] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [wrongKeystrokes, setWrongKeystrokes] = useState<number>(0);
  const [category, setCategory] = useState<string>("Zor");
  const [language, setLanguage] = useState<string>("Turkish");
  const [selectedTextFromDb, setSelectedTextFromDb] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState<string>("");

  const [testwords, SetTestWords] = useState<string[]>([
    "bilgisayar",
    "klavye",
    "ekran",
    "fare",
    "yazıcı",
    "yazılım",
    "donanım",
    "internet",
    "e-posta",
    "web",
    "arama",
    "sosyal",
    "medya",
    "oyun",
    "müzik",
    "film",
    "kitap",
    "haber",
    "hava",
    "durumu",
    "trafik",
    "spor",
    "siyaset",
    "ekonomi",
    "bilim",
    "sanat",
    "kültür",
    "tarih",
    "coğrafya",
    "eğitim",
    "sağlık",
    "para",
    "alışveriş",
    "yemek",
    "içmek",
    "uyku",
    "gezi",
    "tatil",
    "ailesi",
    "arkadaş",
    "aşk",
    "mutluluk",
    "üzüntü",
    "korku",
    "öfke",
    "umut",
    "hayaller",
    "hedefler",
    "başarı",
    "başarısızlık",
    "deneyim",
    "ders",
    "gelişim",
    "değişim",
    "gelecek",
    "geçmiş",
    "şimdi",
    "yaşam",
    "ölüm",
    "anlam",
    "amaç",
    "varoluş",
    "dünya",
    "evren",
    "zaman",
    "mekân",
    "tanrı",
    "din",
    "inanç",
    "felsefe",
    "bilim",
    "sanat",
    "kültür",
    "tarih",
    "coğrafya",
    "eğitim",
    "sağlık",
    "para",
    "alışveriş",
    "yemek",
    "içmek",
    "uyku",
    "gezi",
    "tatil",
    "ailesi",
    "arkadaş",
    "aşk",
    "mutluluk",
    "üzüntü",
    "korku",
    "öfke",
    "umut",
    "hayaller",
    "hedefler",
    "başarı",
    "başarısızlık",
    "deneyim",
    "ders",
    "gelişim",
    "değişim",
    "gelecek",
    "geçmiş",
    "şimdi",
    "yaşam",
    "ölüm",
    "anlam",
    "amaç",
    "varoluş",
    "dünya",
    "evren",
    "zaman",
    "mekân",
    "tanrı",
    "din",
    "inanç",
    "felsefe",
    "bilim",
    "sanat",
    "kültür",
    "tarih",
    "coğrafya",
    "eğitim",
    "sağlık",
    "para",
    "alışveriş",
    "yemek",
    "içmek",
    "uyku",
    "gezi",
    "tatil",
  ]);

  const checkInput = (text: string) => {
    if (!isStarted) {
      setIsStarted(true);
    }

    if (timer <= 0) {
      setInput("");
    }

    if (selectedWordRef.current) {
      if (testwords[selected].startsWith(text.trim())) {
        selectedWordRef.current.style.color = "#22C55E";
      } else {
        selectedWordRef.current.style.color = "#EF4444";
      }

      if (text.trim() === "") {
        selectedWordRef.current.style.color = "#F3B308";
      }
    }
  };

  const whenTimerEnds = () => {};

  const scrollToElement = (ref: HTMLSpanElement) => {
    ref.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isStarted && timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer <= 0) {
      setIsStarted(false);
      setTimer(0);
      whenTimerEnds();
      console.log("Timer bitti");
    }

    fetch(
      `https://localhost:7058/api/TypingExam/GetTypingExams?language=${language}&category=${category}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedTextFromDb(
          data.data.map((item: { name: string }) => item.name)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(
      `https://localhost:7058/api/TypingExam/GetTypingExams?language=${language}&category=${category}${
        selectedText != "" ? `&name=${selectedText}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);

        if (data.data.length === 1) {
          const words = JSON.parse(data.data[0].text);
          SetTestWords(words);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [category, isStarted, language, selectedText, timer]);

  //submit the input
  const submitInput = () => {
    if (input.trim() === "") {
      setInput("");
      return;
    }

    if (timer <= 0) {
      return;
    }

    if (input.trim() === testwords[selected]) {
      console.log("correct");
      setSelected(selected + 1);
      setInput("");
      setCorrectWords([...correctWords, selected]);
      setCorrectKeystrokes(correctKeystrokes + input.length);
    } else {
      console.log("wrong");
      setSelected(selected + 1);
      setInput("");
      setWrongWords([...wrongWords, selected]);
      setWrongKeystrokes(wrongKeystrokes + input.length);
    }

    if (selectedWordRef.current) {
      scrollToElement(selectedWordRef.current);
    }
  };

  return (
    <div>
      <section>
        <div className="py-16">
          <div className="mx-auto px-6 max-w-7xl text-white">
            <form className="mx-auto flex mb-6">
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

                {selectedTextFromDb.map((item, key) => (
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
                  <option defaultValue={"Zor"}>Choose a category</option>
                  <option value="Kolay">Kolay</option>
                  <option value="Orta">Orta</option>
                  <option value="Zor">Zor</option>
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
            </form>
            <div className="flex justify-center items-center mb-10 ">
              <span className="text-white text-3xl  ">
                Total Words:{" "}
                {testwords.length - (correctWords.length + wrongWords.length)}
              </span>
            </div>

            <div className="relative group p-4 rounded-xl border border-white bg-[#17181D]">
              <div className="mt-6 pb-6 ">
                <div className="overflow-hidden max-h-20 text-3xl">
                  {testwords.map((item, key) => (
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
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center">
        <input
          onKeyUpCapture={(e) => {
            if (e.key === " ") {
              submitInput();
            }
          }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            checkInput(e.target.value);
          }}
          type="text"
          disabled={timer <= 0}
          className="p-4 px-18 content-center rounded-xl border border-white bg-[#17181D] text-2xl"
        />
      </div>

      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          className="block py-10 p-6 bg-[#17181D] border border-white mt-10  rounded-lg shadow  "
        >
          <div className="flex justify-center items-center ">
            <span>Timer {timer}</span>
            <span className="block mx-24">
              Doğru Cümleler:{correctWords.length}
            </span>
            <span>Yanlış Cümleler:{wrongWords.length}</span>
          </div>

          <div className="flex justify-center items-center my-10">
            <span>
              Keystorkes:
              <span>
                <span className="text-[#22C55E] mx-2">
                  Correct: {correctKeystrokes}
                </span>

                <span className="text-[#EF4444] mx-2">
                  Wrong: {wrongKeystrokes}
                </span>

                <span className="text-[#F3B308] mx-2">
                  Total: {correctKeystrokes + wrongKeystrokes}
                </span>
              </span>
            </span>
          </div>

          <div className="flex justify-center items-center mt-6">
            <span className="text-purple-300 ">
              WPM(words per minute): {correctKeystrokes / 5}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
