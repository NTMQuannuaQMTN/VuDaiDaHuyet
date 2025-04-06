import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';
import MainGame from './game/MainGame';

function GamePlay(props) {
    const [members, setMembers] = useState([]);
    const [gameStart, setGameStart] = useState(false);

    return (<div className='home'>
        {gameStart ? <MainGame></MainGame> : <Character setPlayers={(arr) => {setMembers(arr); setGameStart(true);}}></Character>}
    </div>);
}

export default GamePlay;