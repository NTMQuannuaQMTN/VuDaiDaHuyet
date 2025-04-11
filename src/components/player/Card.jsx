import React, { useState } from 'react'
import "../../styles/card.css"
import { Player } from '../../types/roles';

function Card(props) {
    const [showDetails, setShowDetails] = useState(false);
    const { player } = props;

    // Đường dẫn tới hình ảnh vai trò
    const getCardImage = () => {
        try {
            // Nếu đã có hình ảnh cụ thể cho vai trò
            return require(`../../assets/player/${player.role}.png`);
        } catch (error) {
            // Nếu không có, sử dụng hình ảnh mặc định
            return require(`../../assets/player/default.png`);
        }
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
