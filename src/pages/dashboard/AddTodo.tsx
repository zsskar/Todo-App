import React, { FC, FormEvent, useEffect, useState } from 'react';
import { TextField, Box, Typography, Button, Grid, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { getSession } from 'next-auth/react';
import { trpc } from '@/utils/trpc';
import { todoState } from '@/store/atoms/todo-atom';
import { useSetRecoilState } from 'recoil';
import { Todo } from '@/types/todo_types';
import { toast } from 'react-toastify';

interface TodoFormProps {
  todo?: Todo; // For editing
  onCancel?: () => void; // Callback for canceling the edit
}

const AddTodo: FC<TodoFormProps> = ({ todo, onCancel }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [content, setContent] = useState(todo?.content || '');
  const [error, setError] = useState<{ title?: boolean; content?: boolean }>({});
  const [session, setSession] = useState<any>(null);
  const setTodos = useSetRecoilState(todoState);
  const createTodoMutation = trpc.todos.createTodo.useMutation();
  const updateTodoMutation = trpc.todos.updateTodo.useMutation();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);
  

  useEffect(() => {
    // Update local state when todoForEdit changes
    if (todo && todo.content) {
      setTitle(todo.title);
      setContent(todo.content);
    }
    else{
      setTitle('');
      setContent('');
    }
  }, [todo]);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setError((prev) => ({ ...prev, title: true }));
      hasError = true;
    }

    if (!content.trim()) {
      setError((prev) => ({ ...prev, content: true }));
      hasError = true;
    }

    if (!hasError) {
      if (todo) {
        updateTodoMutation.mutate({
          id: todo.id,
          title,
          content,
        }, {
          onSuccess: (updatedTodo) => {
            setTodos((prevTodos) =>
              prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
            );
            toast.success("Todo updated successfully.");
            setTitle('');
            setContent('');
            if (onCancel) onCancel();
          },
          onError: (error) => {
            toast.error("Error updating todo.");
            // console.error('Error updating todo:', error);
          },
        });
      } else {
        createTodoMutation.mutate({
          title,
          content,
          userId: session?.user.id || '',
        }, {
          onSuccess: (newTodo) => {
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            toast.success("Todo created successfully.")
            setTitle('');
            setContent('');
          },
          onError: (error) => {
            toast.error("Error creating todo.");
            // console.error('Error creating todo:', error);
          },
        });
      }
    }
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        {updateTodoMutation.isLoading && <LinearProgress color="secondary" sx={{ width: '100%',height: '8px' }} />}
        {createTodoMutation.isLoading && <LinearProgress color="secondary" sx={{ width: '100%',height: '8px' }} />}
</Box>

     
      <Typography variant="h5" component="h1" style={{ textAlign: 'center' }} gutterBottom>
        {todo ? 'Edit Todo' : 'Add Todo'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          width: '100%',
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          error={!!error.title}
          helperText={error.title ? 'Title is required.' : ''}
          sx={{ flex: 1 }}
        />
        <TextField
          variant="outlined"
          placeholder="Enter the content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
          error={!!error.content}
          helperText={error.content ? 'Content is required.' : ''}
          sx={{ flex: 2 }}
        />
      </Box>
      <Grid container alignItems="center" justifyContent="center"> {/* Centering content */}
      <Grid item>
        <Button disabled={updateTodoMutation.isLoading || createTodoMutation.isLoading}
          color={todo ? 'success' : 'primary'}
          type="submit"
          sx={{ padding: '12px', marginRight: '12px' }} // Add margin to separate buttons
        >
          {todo ? (
            <>
              Update &nbsp;<EditIcon />
            </>
          ) : (
            <>
              Add &nbsp;<AddIcon />
            </>
          )}
        </Button>

        {todo && (
          <Button
            color="secondary"
            onClick={onCancel}
            sx={{ padding: '12px' }}
          >
            Cancel &nbsp;<CancelIcon />
          </Button>
        )}
      </Grid>
    </Grid>
    </Box>
  );
};
export default AddTodo;
