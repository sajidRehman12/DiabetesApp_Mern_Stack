import { useState } from 'react'
import './App.css'
import VitalsForm from './features/VitalsForm'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <VitalsForm/>
    </div>
  )
}

export default App
