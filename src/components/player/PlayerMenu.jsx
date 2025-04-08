import React, { useEffect, useState } from 'react'
import "../../styles/home.css"

import getPlayerImage from '../../assets/playerImages';

function PlayerMenu(props) {
    const cardImage = getPlayerImage(props.player.role);

    return (<div className='menu'>
        <div style={{
            width: 100,
            height: 100,
            backgroundColor: 'black',
        }} onClick={() => {props.back();}}>
            <h3>aga</h3>
        </div>
    </div>);
}

export default PlayerMenu;