export type TypingResultResponse = {
  wpm: number;
  accuracy: number;
  correctCount: number;
  wrongCount: number;
  correctWords: string;
  wrongWords: string;
  typingExamId: string;
  userid: string;
  seconds: number;
  language: string;
  difficulty: string;
  username: string;
};
