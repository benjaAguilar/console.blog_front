import { atom } from "nanostores";

interface feedback {
  success: boolean;
  message: string;
}

export const hasMessage: boolean = atom(false);

export const feedbackMessage: feedback = atom({
  success: false,
  message: "",
});
