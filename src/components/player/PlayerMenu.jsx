import React, { useEffect, useState } from 'react'
import "../../styles/menu.css"
import CardMenu from './CardMenu';

// Này là Menu người chơi, hiển thị stat cùng shop và trade

import getPlayerImage from '../../assets/playerImages';

import background from "../../assets/background_day.png";
import ChaoHanh from "../../assets/shop/ChaoHanh.png";
import HoiHuong from "../../assets/shop/GanhOanTroVe.png";
import GiaiAch from "../../assets/shop/GiaiAch.png";
import MinhOan from "../../assets/shop/MinhOan.png";
import Ruou from "../../assets/shop/RuouDe.png";

function PlayerMenu(props) {
    const [price, setPrice] = useState({
        "Rượu Đế": 3,
        "Cháo Hành": 2,
        "Giải Ách": 15,
        "Hồi Hương": 10,
        "Minh Oan": 10,
    });

    const [itemOwned, setItemOwned] = useState(props.player.items);

    useEffect(() => {
        setItemOwned(props.player.items);
    }, [props.player.items])

    const buy = (item) => {
        if (price[item] <= props.player.coins) {
            props.player.removeCoins(price[item]);
            props.player.addItem(item);
            console.log(props.player);
            // Update list player chính từ đống này
        } else {
            alert("Không đủ tiền mua " + item);
        }
    }

    return (<div className='menu'>
        <div className='background'>
            <img src={background} alt="Background" />
        </div>
        <div className='info'>
            <CardMenu player={props.player}></CardMenu>
        </div>
        <div className='shop_cont'>
            <div className='shop'>
                <div className='item' onClick={() => buy("Rượu Đế")}>
                    <img src={Ruou} />
                    <h3>Rượu Đế</h3>
                    <h4>3 đồng</h4>
                    <p>Đặt một thẻ Say Rượu lên người khác.</p>
                    <h4 className="count">Đang sở hữu: {itemOwned["Rượu Đế"]}</h4>
                    <div className='use'>
                        <a>Sử dụng</a>
                    </div>
                </div>
                <div className='item' onClick={() => buy("Cháo Hành")}>
                    <img src={ChaoHanh} />
                    <h3>Cháo Hành</h3>
                    <h4>2 đồng</h4>
                    <p>Loại bỏ thẻ Say Rượu của chính mình.</p>
                    <h4 className="count">Đang sở hữu: {itemOwned["Cháo Hành"]}</h4>
                    <div className='use'>
                        <a>Sử dụng</a>
                    </div>
                </div>
                <div className='item' onClick={() => buy("Giải Ách")}>
                    <img src={GiaiAch} />
                    <h3>Giải Ách</h3>
                    <h4>15 đồng</h4>
                    <p>Hóa giải ép buộc của Đội Tảo.</p>
                    <h4 className="count">Đang sở hữu: {itemOwned["Giải Ách"]}</h4>
                    <div className='use'>
                        <a>Sử dụng</a>
                    </div>
                </div>
                <div className='item' onClick={() => buy("Hồi Hương")}>
                    <img src={HoiHuong} />
                    <h3>Hồi Hương</h3>
                    <h4>10 đồng</h4>
                    <p>Gọi một người rời bỏ làng do uất ức quay về trò chơi.</p>
                    <h4 className="count">Đang sở hữu: {itemOwned["Hồi Hương"]}</h4>
                    <div className='use'>
                        <a>Sử dụng</a>
                    </div>
                </div>
                <div className='item' onClick={() => buy("Minh Oan")}>
                    <img src={MinhOan} />
                    <h3>Minh Oan</h3>
                    <h4>10 đồng</h4>
                    <p>Giúp tránh khỏi bị xử tử nếu có.</p>
                    <h4 className="count">Đang sở hữu: {itemOwned["Minh Oan"]}</h4>
                    <div className='use'>
                        <a>Sử dụng</a>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PlayerMenu;