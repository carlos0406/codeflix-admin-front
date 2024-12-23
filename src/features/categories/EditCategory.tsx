import { Box, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Category,
  selectCategoriesById,
  updateCategory,
} from './categoriesSlice';
import { useState } from 'react';
import { CategoryForm } from './components/CategoryForm';
import { useParams } from 'react-router-dom';

export function EditCategory() {
  const id = useParams()?.id as string;
  const c = useAppSelector((state) => selectCategoriesById(state, id));
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<Category>(c);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategory({ ...category, [name]: checked });
  };
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateCategory(category));
  }
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category {id}</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={category}
          isDisabled={isDisabled}
          isLoading={isLoading}
          handleChange={handleChange}
          handleToggle={handleToggle}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
}
