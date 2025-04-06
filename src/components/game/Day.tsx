import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

import background from "../../assets/background_day.png";

function Day(props) {
    return (<div className='game'>
        <div className='background'>
            <img src={background}></img>
        </div>
        <div id='title'>
            <h2>NGÀY {props.date}</h2>
        </div>
        <div id='game_title'>
            <h2>Danh sách người chơi</h2>
        </div>
        <div id='player_list'></div>
    </div>);
}

export default Day;