import { useState } from 'react'
import reactLogo from '../favicon_w3cub/Logo-DestinMeet-img.png'
import './App.css'
import Login from './pages/SignIn/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <img src={reactLogo} className="App-logo" alt="logo" />
     <Login />
    </>
  )
}

export default App
