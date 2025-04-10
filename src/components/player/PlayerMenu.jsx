import React, { useEffect, useState } from 'react'
import "../../styles/menu.css"
import CardMenu from './CardMenu';

// Này là Menu người chơi, hiển thị stat cùng shop và trade

import getPlayerImage from '../../assets/playerImages';

import background from "../../assets/background_day.png";

function PlayerMenu(props) {
    return (<div className='menu'>
        <div className='background'>
            <img src={background} alt="Background" />
        </div>
        <div className='info'>
            <CardMenu player={props.player}></CardMenu>
        </div>
    </div>);
}

export default PlayerMenu;