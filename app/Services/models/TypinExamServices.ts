import { TypingExamsResponseVM } from "@/app/ViewModel/TypingExamsResponseVM";
import { FetchService } from "../Fetch/FetchService";
import { headers } from "next/headers";

export class TypingExamService {
  static async getTypingExam(
    Language: string,
    Category: string,
    difficulty?: string,

    SuccessCallback?: (response: TypingExamsResponseVM) => void,
    ErrorCallback?: (error: any) => void
  ) {
    return await FetchService.get<TypingExamsResponseVM[]>({
      controller: "TypingExam/GetTypingExams",
      queryString: `Language=${Language}&Category=${Category}${
        difficulty ? `&Difficulty=${difficulty}` : ""
      }`,
    }).then((response: any) => {
      return response.data;
    });
  }

  static async getResultById(
    id: string,
    SuccessCallback?: (response: any) => void,
    ErrorCallback?: (error: any) => void
  ) {
    FetchService.get({
      controller: "TypingExam/GetResult",
      queryString: `id=${id}`,
    })
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

  static async SendResults(
    correctCount: number,
    wrongCount: number,
    correctWords: string,
    wrongWords: string,
    typingExamId: string,
    timer: number,
    accessToken: string,
    SuccessCallback?: (response: any) => void,
    ErrorCallback?: (error: any) => void
  ) {
    FetchService.post(
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        controller: "TypingExam/SendResults",
      },

      {
        CorrectCount: correctCount,
        WrongCount: wrongCount,
        CorrectWords: correctWords,
        WrongWords: wrongWords,
        TypingExamId: typingExamId,
        Seconds: timer,
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

  static async GetLeaderBoard(
    SuccessCallback?: (response: any) => void,
    ErrorCallback?: (error: any) => void
  ) {
    return await FetchService.get({
      controller: "TypingExam/GetLeaderBoard",
    })
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
