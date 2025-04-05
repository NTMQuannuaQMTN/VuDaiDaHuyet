import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';

function GamePlay(props) {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            
        }, 1000);
    }, []);

    return (<div className='home'>
        <Character></Character>
    </div>);
}

export default GamePlay;