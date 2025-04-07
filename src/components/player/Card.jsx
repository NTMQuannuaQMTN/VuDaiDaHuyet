import React, { useEffect, useState } from 'react'
import "../../styles/card.css"
import { Player } from '../../types/roles';

// import card from "../../assets/player/Anh Hàng Xóm.png";

function Card(props) {
    const card = require(`../../assets/player/${props.player.role}.png`);

    return (<div className='card'>
        <div className='background-card'>
            <img src={card}></img>
        </div>
    </div>);
}

export default Card;