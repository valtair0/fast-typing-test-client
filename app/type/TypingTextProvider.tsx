import { TypingExamService } from "../Services/models/TypinExamServices";
import { TypingExamsResponseVM } from "../ViewModel/TypingExamsResponseVM";
import TypingTest from "./TypingTest";

export default async function TypingTextProvider() {
  let data: TypingExamsResponseVM[] = await TypingExamService.getTypingExam(
    "Turkish",
    "Katip",
    "Kolay"
  );

  return (
    <div>
      <TypingTest data={data} />
    </div>
  );
}
