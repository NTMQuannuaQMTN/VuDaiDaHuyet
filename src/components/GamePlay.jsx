import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';

function GamePlay(props) {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            let title = document.getElementById("title");
            let menu = document.getElementById("menu");
            let buttons = document.getElementsByClassName("button");
            title.style.marginTop = 0;
            menu.style.opacity = 1;
            menu.style.width = '80%';
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].style.width = 'fit-content';
            }
        }, 1000);
    }, []);

    return (<div className='home'>
        <Character></Character>
    </div>);
}

export default GamePlay;