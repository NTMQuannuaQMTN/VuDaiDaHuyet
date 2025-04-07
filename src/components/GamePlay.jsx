import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';
import Day from './game/Day';

function GamePlay(props) {
    const [members, setMembers] = useState([]);
    const [isDay, setIsDay] = useState(false);
    const [day, setDay] = useState(0);

    return (<div className='home'>
        {day == 0 && (
            !isDay ? <Character setPlayers={(arr) => { setMembers(arr); setIsDay(true); }}></Character> : <Day date={day} members={members}></Day>
        )}
    </div>);
}

export default GamePlay;