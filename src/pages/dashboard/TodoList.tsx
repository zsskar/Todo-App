import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Box, Typography, Tooltip, Grid, LinearProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filteredTodosSelector } from '@/store/selectors/todo-selectors';
import { todoEditState, todoState } from '@/store/atoms/todo-atom';
import { trpc } from '@/utils/trpc';
import { Todo } from '@/types/todo_types';
import TodoFilters from './TodoFilters';
import ConfirmationDialog from './ConfirmDialog';
import { toast } from 'react-toastify';

type Props = {
  todos : Todo[];
};

const TodoList = ({todos} : Props) => {
  const [open, setOpen] = useState(false);
  const filterTodos = useRecoilValue(filteredTodosSelector);
  const setTodos = useSetRecoilState(todoState);
  const deleteTodoMutation = trpc.todos.deleteTodo.useMutation();
  const setTodoEditState = useSetRecoilState(todoEditState);
  const updateTodoMutation = trpc.todos.updateTodo.useMutation();
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    setTodos(todos);
  },[setTodos, todos]);

  const handleEdit = (todo : Todo) => {
    setTodoEditState(todo);
  };

  const handleComplete = (todo : Todo) => {
    if (todo) {
      updateTodoMutation.mutate({
        id : todo.id,
        title : todo.title,
        content: todo.content,
        completed : true
      }, {
        onSuccess: (updatedTodo) => {
          setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
          );
          toast.success("Todo marked as completed.");
        },
        onError: (error) => {
          toast.error("Error updating todo.");
          // console.error('Error updating todo:', error);
        },
      });
    }
  };

  
const deleteATodo = (id: string) => {
    deleteTodoMutation.mutate({id}, {
      onSuccess: () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        toast.success("Todo deleted successfully.");
      },
      onError: (error) => {
          toast.error("Error deleting todo.");
        //  console.error('Error deleting todo:', error);
     },
  });
};

  const handleDelete = (todo: Todo) => {
    setTodo(todo);
    handleOpen();
  }

  const deleteAfterConfirmation = () => {
    if(todo) {
      deleteATodo(todo.id);
      setOpen(false);
    }
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        {deleteTodoMutation.isLoading && <LinearProgress color="secondary" sx={{  width: '100%',height: '8px' }} />}
        {updateTodoMutation.isLoading && <LinearProgress color="secondary" sx={{ width: '100%', height: '8px' }} />}
</Box>
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '10vh' }}>
        <Grid item>
          <Typography variant="h5" component="h5" style={{ textAlign: 'left' }} gutterBottom>
            Todo List
          </Typography>
        </Grid>
        <TodoFilters />
      </Grid>
      <Box
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {filterTodos.length > 0 ? (
          <List>
            {filterTodos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#3f51b5',
                    '& .MuiListItemText-primary': {
                      color: '#3f51b5',
                    },
                    '& .MuiListItemText-secondary': {
                      color: '#757de8',
                    },
                    '& .MuiIconButton-root': {
                      color: '#3f51b5',
                    },
                  },
                }}
              >
            <ListItemText primary={
             <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
             {todo.title}
            </span>
              }
                secondary={todo.content}
            />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {!todo.completed && <Tooltip title="Mark as done">
                    <IconButton disabled={updateTodoMutation.isLoading} edge="end" aria-label="Mark as done" onClick={() => handleComplete(todo)}>
                      <CheckIcon color="success" />
                    </IconButton>
                  </Tooltip>}
                  {!todo.completed && <Tooltip title="Edit">
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(todo)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>}
                  <Tooltip title="Delete">
                    <IconButton disabled={deleteTodoMutation.isLoading} edge="end" aria-label="delete" onClick={() => handleDelete(todo)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="20vh"
            marginTop={2}
            textAlign="center"
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              padding: 4,
              boxShadow: 3,
              border: '1px solid #ddd',
            }}
          >
            <Typography variant="h5" color="textPrimary" gutterBottom>
              No Todos Available
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              It looks like you have no todos yet. Start adding some to keep track of your tasks!
            </Typography>
          </Box>
        )}
      </Box>
      <ConfirmationDialog handleClose={handleClose} open={open} deleteAfterConfirmation={deleteAfterConfirmation}/>
    </>
  );
};

export default TodoList;