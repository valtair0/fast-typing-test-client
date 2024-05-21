import { TypingExamsResponseVM } from "@/app/ViewModel/TypingExamsResponseVM";
import { FetchService } from "../Fetch/FetchService";

export class TypingExamService {
  static async getTypingExam(
    Language: string,
    Category: string,
    difficulty?: string,
    Name?: string,

    SuccessCallback?: (response: TypingExamsResponseVM) => void,
    ErrorCallback?: (error: any) => void
  ) {
    return await FetchService.get<TypingExamsResponseVM[]>({
      controller: "TypingExam/GetTypingExams",
      queryString: `Language=${Language}&Category=${Category}${
        Name ? `&Name=${Name}` : ""
      }${difficulty ? `&Difficulty=${difficulty}` : ""}`,
    }).then((response: any) => {
      return response.data;
    });
  }

  static async createTypingExam(
    Language: string,
    Category: string,
    Name: string,
    Text: string,
    SuccessCallback?: (response: any) => void,
    ErrorCallback?: (error: any) => void
  ) {
    FetchService.post(
      {
        controller: "TypingExam/Create",
      },

      {
        Language: Language,
        Category: Category,
        Name: Name,
        Text: Text,
      }
    )
      .then((response) => {
        if (SuccessCallback) {
          SuccessCallback(response);
        }
      })
      .catch((error) => {
        if (ErrorCallback) {
          ErrorCallback(error);
        }
      });
  }
}
