import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

import background from "../../assets/image.png";
import Day from './Day';
import Night from './Night';

function MainGame(props) {
    const [isDay, setIsDay] = useState(true);
    const [day, setDay] = useState(1);
    const [gameUpdate, setGameUpdate] = useState(props.players);

    return (<div>
        {isDay ? <Day date={day} members={props.players}></Day> : <Night date={day} members={props.players}></Night>}
    </div>);
}

export default MainGame;