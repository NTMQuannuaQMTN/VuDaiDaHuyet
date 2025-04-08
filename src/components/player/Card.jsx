import React, { useEffect, useState } from 'react'
import "../../styles/card.css"

import getPlayerImage from '../../assets/playerImages';

function Card(props) {
    const cardImage = getPlayerImage(props.player.role);

    return (<div className='card'>
        <div className='background-card'>
            <img src={cardImage} alt={props.player.role} />
        </div>
        <div className='player-info'>

        </div>
        <div className='player-info'>
            <h3>{props.player.name}</h3>
        </div>
        <div className='player-info'>
            <p>{props.player.role}</p>
        </div>
    </div>);
}

export default Card;