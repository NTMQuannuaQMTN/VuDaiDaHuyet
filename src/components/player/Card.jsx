import React, { useState } from 'react'
import "../../styles/card.css"
import { Player } from '../../types/roles';

import chiPheo from '../../assets/player/Chí Phèo.png';
import baKien from '../../assets/player/Bá Kiến.png';
import lyCuong from '../../assets/player/Lý Cường.png';
import baBa from '../../assets/player/Bà Ba.png';
import laoHac from '../../assets/player/Lão Hạc.png';
import thiNo from '../../assets/player/Thị Nở.png';
import ongGiao from '../../assets/player/Ông Giáo.png';
import baCoThiNo from '../../assets/player/Bà Cô của Thị Nở.png';
import binhChuc from '../../assets/player/Binh Chức.png';
import danThuong from '../../assets/player/Dân thường.png';
import doiTao from '../../assets/player/Đội Tảo.png';
import tuLang from '../../assets/player/Tự Lãng.png';
import namTho from '../../assets/player/Năm Thọ.png';

function Card(props) {
    const [showDetails, setShowDetails] = useState(false);
    const { player } = props;

    const roleIMG = {
        "Chí Phèo": chiPheo,
        "Bá Kiến": baKien,
        "Lý Cường": lyCuong,
        "Bà Ba": baBa,
        "Lão Hạc": laoHac,
        "Thị Nở": thiNo,
        "Ông Giáo": ongGiao,
        "Bà Cô của Thị Nở": baCoThiNo,
        "Binh Chức": binhChuc,
        "Dân thường": danThuong,
        "Đội Tảo": doiTao,
        "Tự Lãng": tuLang,
        "Năm Thọ": namTho
    };
    
    const getCardImage = (role) => {
        return roleIMG[role];
    };

    // Hiển thị thông tin chi tiết khi click vào thẻ
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={`card ${!player.alive ? 'dead' : ''}`} onClick={toggleDetails}>
            <div className='background-card'>
                <img src={getCardImage()} alt={player.role} />
                <div className="card-overlay">
                    <h3>{player.name}</h3>
                    <p className="role">{player.role}</p>
                </div>
            </div>
            
            {/* Hiển thị thông tin chi tiết khi click vào thẻ */}
            {showDetails && (
                <div className="card-details">
                    <div className="detail-item">
                        <span className="label">Trạng thái:</span>
                        <span className="value">{player.alive ? 'Còn sống' : 'Đã chết'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Phe:</span>
                        <span className="value">{player.team}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Xu:</span>
                        <span className="value">{player.coins}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Uất ức:</span>
                        <span className="value">{player.frustration}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Rượu:</span>
                        <span className="value">{player.wine}</span>
                    </div>
                    {player.items.length > 0 && (
                        <div className="detail-item">
                            <span className="label">Thẻ:</span>
                            <span className="value">{player.items.join(', ')}</span>
                        </div>
                    )}
                    {player.shutup && (
                        <div className="detail-item status">
                            <span className="status-tag">Câm</span>
                        </div>
                    )}
                    {player.drunk && (
                        <div className="detail-item status">
                            <span className="status-tag">Say</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Card;
