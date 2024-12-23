import {
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { Box, Grid } from '@mui/system';
import { Link } from 'react-router-dom';
import { Category } from '../categoriesSlice';

type FormProps = {
  category: Category;
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm({
  category,
  isDisabled,
  isLoading,
  onSubmit,
  handleChange,
  handleToggle,
}: FormProps) {
  return (
    <Box p={2}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                onChange={handleChange}
                value={category?.name}
                disabled={isDisabled}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="description"
                label="Description"
                onChange={handleChange}
                value={category?.description}
                disabled={isDisabled}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControlLabel
              control={
                <Switch
                  name="is_active"
                  color="secondary"
                  onChange={handleToggle}
                  checked={category?.is_active}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Is Active"
            />
          </Grid>
          <Grid size={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                {isLoading ? 'Loading...' : 'Save'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
