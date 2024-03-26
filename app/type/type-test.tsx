import React, { useEffect, useState } from "react";

export default function TypeTest() {
  const [input, setInput] = useState("");

  const [selected, setSelected] = useState(0);

  const [correctWords, setCorrectWords] = useState<number[]>([]);
  const [wrongWords, setWrongWords] = useState<number[]>([]);
  const [timer, setTimer] = useState(10);
  const [isStart, setIsStart] = useState(false);

  //create an function that check the input and select the word and log the result
  const checkInput = (text: string) => {
    setIsStart(true);

    if (words.kelimeler[selected].startsWith(text.trim())) {
      setWrongWords(wrongWords.filter((item) => item !== selected));
    } else {
      if (!wrongWords.includes(selected)) {
        setWrongWords([...wrongWords, selected]);
      }
      setCorrectWords(correctWords.filter((item) => item !== selected));
    }
  };

  useEffect(() => {
    if (isStart) {
      if (timer > 0) {
        setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
      }else{
        console.log(correctWords);
        console.log(wrongWords);

        console.log(correctWords.length/10);
        
        
        
      }
    }
  }, [isStart, timer]);

  //submit the input
  const submitInput = () => {
    if (input.trim() === "") {
      setInput("");
      return;
    }

    if (timer <= 0) {
      return;
    }

    if (input.trim() === words.kelimeler[selected]) {
      setCorrectWords([...correctWords, selected]);
    }

    setSelected(selected + 1);
    setInput("");
  };

  const [words, setWords] = useState({
    kelimeler: [
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
    ],
  });

  return (
    <div>
      <div className=" ">
        {words.kelimeler.map((item, key) => (
          <span
            className={key == selected ? `text-yellow-500 mx-4` : "mx-4"}
            key={key}
          >
            <span
              className={correctWords.includes(key) ? "text-green-500" : ""}
            >
              <span className={wrongWords.includes(key) ? "text-red-500" : ""}>
                {item}
              </span>
            </span>
          </span>
        ))}
      </div>

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
        className="border-2  border-black text-black"
      />

      <span>Timer {timer}</span>
    </div>
  );
}
