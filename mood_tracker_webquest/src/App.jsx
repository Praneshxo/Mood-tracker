import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Hero from './Components/Hero.jsx'
import Navbar from './Components/Navbar.jsx'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
      <Hero />
        <h1>hello</h1>
        
        </div>
    </>
  )
}

export default App
