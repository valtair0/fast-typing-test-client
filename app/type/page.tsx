import { TypingExamService } from "../Services/models/TypinExamServices";
import { TypingExamsResponseVM } from "../ViewModel/TypingExamsResponseVM";
import TypingTest from "./TypingTest";



export default async function page() {
  let data: TypingExamsResponseVM[] = await TypingExamService.getTypingExam("Turkish", "Katip","Zor",undefined);

  

  return (
    <div>
      <TypingTest data={data} />
    </div>
  );
}
