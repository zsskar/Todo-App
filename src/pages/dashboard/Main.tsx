import { Container } from "@mui/material";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useRecoilState } from "recoil";
import { todoEditState } from "@/store/atoms/todo-atom";
import { Todo } from "@/types/todo_types";


type Props = {
  todos : Todo[];
};

const Main = ({todos} : Props) => {

  const [todoForEdit, setTodoForEdit] = useRecoilState(todoEditState);
    
    return (
        <Container  style={{marginTop: '5vh'}}>
          { todoForEdit  ? <AddTodo todo={todoForEdit} onCancel={() => setTodoForEdit(null)}
        /> : <AddTodo /> }
          <TodoList todos={todos}/>
        </Container>
      );

};
export default Main;