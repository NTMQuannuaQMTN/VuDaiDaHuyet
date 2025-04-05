import { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import background from "../../assets/image.png";

function Character(props) {
    useEffect(() => {
        setTimeout(() => {
            let title = document.getElementById("title");
            let game_title = document.getElementById("game_title");
            let form = document.getElementById("form_container");
            let buttons = document.getElementsByClassName("button");
            title.style.marginTop = '-50%';
            title.style.opacity = 0;
            setTimeout(() => {
                title.style.display = 'none';
                game_title.style.opacity = 1;
                form.style.height = "60vh";
            }, 1000);
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].style.width = 'fit-content';
            }
        }, 1000);
    }, []);

    return (<div className='game'>
        <div className='background'>
            <img src={background}></img>
        </div>
        <div id='title'>
            <h2>ĐÊM ĐẦU TIÊN</h2>
        </div>
        <div id='game_title'>
            <h2>Nhập tên người chơi</h2>
        </div>
        <div id='form_container'>
            <div id='form'>
                <h2>Phe Quyền Thế</h2>
                <div class="container">
                    <label for="player-name">Bá Kiến:</label>
                    <input type="text" id="player-name" placeholder="Nhập tên người chơi" />
                </div>
            </div>
        </div>
    </div>);
}

export default Character;