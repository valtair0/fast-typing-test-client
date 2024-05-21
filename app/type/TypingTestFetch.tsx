import React, { useState } from "react";

export default function TypingTestFetch() {
  const [category, setCategory] = useState<string>("Zor");
  const [language, setLanguage] = useState<string>("Turkish");
  const [name, setName] = useState<string>("");

  return <div>TypingTestFetch</div>;
}
