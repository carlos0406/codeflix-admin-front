import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  description: null | string;
}

const category: Category = {
  id: '1',
  name: 'Category 1',
  is_active: true,
  created_at: '2021-01-01T00:00:00.000000Z',
  description: 'Category 1 description',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [
    category,
    { ...category, id: '2', name: 'Banana' },
    { ...category, id: '3', name: 'Category 3' },
    { ...category, id: '4', name: 'Category 4', is_active: false },
  ],

  reducers: {
    createCategory(state, action: { payload: Category }) {
      state.push({
        ...action.payload,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      });
    },
    updateCategory(state, action: { payload: Category }) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      const updatedCategory = {
        id: action.payload.id,
        name: action.payload.name,
        is_active: action.payload.is_active,
        created_at: action.payload.created_at,
        description: action.payload.description,
      };
      state[index] = updatedCategory;
    },
    deleteCategory(state, action: { payload: { id: string } }) {
      return state.filter((category) => category.id !== action.payload.id);
    },
  },
});
//seletores
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoriesById = (state: RootState, id: string) =>
  state.categories.find((category) => category.id === id) ?? ({} as Category);

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
