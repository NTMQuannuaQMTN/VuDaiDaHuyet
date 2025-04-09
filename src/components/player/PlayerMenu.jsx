import React, { useEffect, useState } from 'react'
import "../../styles/menu.css"
import Card from './Card';

import getPlayerImage from '../../assets/playerImages';

import background from "../../assets/background_day.png";

function PlayerMenu(props) {
    return (<div className='menu'>
        <div className='background'>
            <img src={background} alt="Background" />
        </div>
        <div className='info'>
            <Card player={props.player}></Card>
        </div>
    </div>);
}

export default PlayerMenu;