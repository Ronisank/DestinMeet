import { useState } from 'react'
import reactLogo from '../favicon_w3cub/Logo-DestinMeet-img.png'
import './App.css'
import ListTours from './pages/ListTours/ListTours'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <img src={reactLogo} className="App-logo" alt="logo" />
     {/* <Login /> */}
     {/* <Register /> */}
     <ListTours />
    </>
  )
}

export default App
