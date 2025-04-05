import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/HomePage'
import Instruction from './components/HowToPlay'
import GamePlay from './components/GamePlay'

function App() {
  const [toggleInstruction, setToggleInstruction] = useState(false);
  const [toggleGame, setToggleGame] = useState(false);

  return (
    <>
      {!toggleInstruction && !toggleGame && <Home seeInstruction={() => {setToggleInstruction(true)}} playGame={() => {setToggleGame(true)}}></Home>}
      {toggleInstruction && <Instruction back={() => setToggleInstruction(false)}></Instruction>}
      {toggleGame && <GamePlay></GamePlay>}
    </>
  )
}

export default App
