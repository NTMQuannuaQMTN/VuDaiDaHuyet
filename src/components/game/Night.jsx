import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

import background from "../../assets/image.png";

function Night(props) {
    // Display night number as 1 instead of 0
    const displayNight = props.date + 1;
    
    setTimeout(() => {
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
            <h2>ĐÊM {displayNight}</h2>
        </div>
        <div id='game_title'>
            <h2>Giai đoạn đêm</h2>
        </div>
        <div id='night-actions' style={{ marginTop: '20px', padding: '20px' }}>
            <p>Đây là giai đoạn đêm. Hương Sư sẽ gọi từng nhân vật thức dậy theo thứ tự.</p>
            
            {/* Dummy button to end night phase */}
            <button 
                className="submit-button" 
                style={{ marginTop: '20px' }}
                onClick={props.onEnd}
            >
                Kết thúc đêm
            </button>
        </div>
    </div>);
}

export default Night;
