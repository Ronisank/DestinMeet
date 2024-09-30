import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/Auth';
import AppRoutes from './Routes/Routes';

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </>
  );
}

export default App
