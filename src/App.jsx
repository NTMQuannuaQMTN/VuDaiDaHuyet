import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/HomePage'
import Instruction from './components/HowToPlay'

function App() {
  const [toggleInstruction, setToggleInstruction] = useState(false);

  return (
    <>
      {!toggleInstruction && <Home seeInstruction={() => {setToggleInstruction(true)}}></Home>}
      {toggleInstruction && <Instruction back={() => setToggleInstruction(false)}></Instruction>}
    </>
  )
}

export default App
