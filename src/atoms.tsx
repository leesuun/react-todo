import { atom } from "recoil";

export interface IToDo {
  [key: string]: string[];
}

export const toDoState = atom<IToDo>({
  key: "toDo",
  default: {
    "To Do": ["A", "B", "C"],
    Doing: ["D", "E"],
    Done: ["F"],
  },
});
