import { Todo } from "@/types/todo_types";
import { atom } from "recoil";

export const todoState = atom<Todo[]>({
  key: 'todoState', 
  default: [],
});

export const todoEditState = atom<Todo | null >({
  key: 'todoEditState', 
  default: null,
});

export const todoFilterState = atom({
  key: 'todoFilterState',
  default: 'all',
});
