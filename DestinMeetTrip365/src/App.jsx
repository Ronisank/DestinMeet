import { RouterProvider } from 'react-router-dom'
import reactLogo from '../favicon_w3cub/Logo-DestinMeet-img.png'
import './App.css'
import { AuthProvider } from './contexts/Auth'
import AppRoutes from './Routes/Routes'

function App() {

  return (
    <>
      <img src={reactLogo} className="App-logo" alt="logo" />
      <AuthProvider>
        <RouterProvider router={AppRoutes} />
      </AuthProvider>
    </>
  );
}

export default App
