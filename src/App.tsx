import './App.css';
import { Box, ThemeProvider } from '@mui/system';
import { Header } from './components';
import { Layout } from './components';
import { darkTheme } from './config/theme';
import { Routes, Route } from 'react-router-dom';
import {
  CategoryList,
  CreateCategory,
  EditCategory,
} from './features/categories';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="main"
        sx={{
          height: '100vh',
          backgroundColor: 'background.default',
          color: 'white',
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="categories/create" element={<CreateCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
