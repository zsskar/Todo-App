import { selector } from "recoil";
import { todoState, todoFilterState } from "../atoms/todo-atom";

export const filteredTodosSelector = selector({
    key: 'filteredTodosSelector',
    get: ({ get }) => {
      const todos = get(todoState);  // Get the original list of todos
      const filter = get(todoFilterState); // Get the current filter criteria
      
      // Return filtered todos based on the filter state
      switch (filter) {
        case 'completed':
          return todos.filter(todo => todo.completed);
        case 'active':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    },
  });
  