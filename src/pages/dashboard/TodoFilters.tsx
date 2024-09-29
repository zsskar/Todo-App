import React from 'react';
import { useRecoilState } from 'recoil';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { todoFilterState } from '@/store/atoms/todo-atom';

const TodoFilters = () => {
  const [filter, setFilter] = useRecoilState(todoFilterState);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 200 }}> {/* Set minWidth or width here */}
      <InputLabel id="todo-filter-label">Show</InputLabel>
      <Select
        labelId="todo-filter-label"
        id="todo-filter"
        value={filter}
        onChange={handleChange}
        label="Show"
        style={{ width: 200 }} // Set width here if you want a specific value
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="active">Active</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TodoFilters;
