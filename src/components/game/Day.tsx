import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

import background from "../../assets/background_day.png";
import Card from '../player/Card';

function Day(props) {
    setTimeout(() => {
        console.log(props.members);
        let title = document.getElementById("title");
        let game_title = document.getElementById("game_title");
        title.style.marginTop = '-50%';
        title.style.opacity = 0;
        setTimeout(() => {
            title.style.display = 'none';
            game_title.style.opacity = 1;
        }, 1000);
    }, 1000);

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
        <div id='player_cont'>
            <div id='player_list'>
                {props.members.map(item => {
                    console.log(item);
                    return <Card player={item}></Card>
                })}
            </div>
        </div>
    </div>);
}

export default Day;