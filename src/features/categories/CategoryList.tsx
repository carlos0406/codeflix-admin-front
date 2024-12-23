import { Box, Button, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory, selectCategories } from './categoriesSlice';
import { Link } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
export function CategoryList() {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    is_active: category.is_active,
    created_at: new Date(category.created_at).toLocaleDateString('pt-BR'),
  }));

  const renderIsActiveCell = (rowData: GridRenderCellParams) => (
    <Typography color={rowData.value ? 'primary' : 'secondary'}>
      {rowData.value ? 'Active' : 'Inactive'}
    </Typography>
  );
  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory({ id }));
  };

  const renderActionCell = (rowData: GridRenderCellParams) => (
    <IconButton
      color="secondary"
      aria-label="delete"
      onClick={() => handleDeleteCategory(rowData.value)}
    >
      <DeleteIcon />
    </IconButton>
  );

  const renderNameCell = (rowData: GridRenderCellParams) => (
    <Link
      style={{
        textDecoration: 'none',
      }}
      to={`/categories/edit/${rowData.id}`}
    >
      <Typography color="primary">{rowData.value}</Typography>
    </Link>
  );

  const dataGridProps = {
    slots: {
      toolbar: GridToolbar,
    },
    slotProps: {
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: { debounceMs: 500 },
      },
    },
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'is_active',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      type: 'string',
      renderCell: renderActionCell,
    },
  ];
  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{
            marginBottom: '1rem',
          }}
        >
          Create category
        </Button>
      </Box>
      <Box sx={{ display: 'flex', height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnSelector
          disableColumnFilter
          disableDensitySelector
          disableRowSelectionOnClick
          {...dataGridProps}
        />
      </Box>
    </Box>
  );
}
