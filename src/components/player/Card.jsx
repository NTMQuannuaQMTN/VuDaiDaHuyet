import React, { useEffect, useState } from 'react'
import "../../styles/card.css"

import getPlayerImage from '../../assets/playerImages';
import PlayerMenu from './PlayerMenu';

function Card(props) {
    const cardImage = getPlayerImage(props.player.role);

    return (<div className='card' onClick={props.seeMenu}>
        <div className='background-card'>
            <img src={cardImage} alt={props.player.role} />
        </div>
        <div className='player-info'>
            <div className='stat'></div>
            <h3>{props.player.name}</h3>
            <p>{props.player.role}</p>
        </div>
    </div>);
}

export default Card;