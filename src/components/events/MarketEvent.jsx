import React, { useState } from 'react';
import '../../styles/events.css';

function MarketEvent({ members, updateMembers, onFinish }) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [purchaseMessage, setPurchaseMessage] = useState('');

    // Available action cards with their prices
    const actionCards = [
        { id: 'minh-oan', name: 'Minh Oan', price: 10, description: 'Nếu bạn bị vote cao nhất trong buổi bình minh, một lần duy nhất bạn được miễn bị xử tử.' },
        { id: 'ruou-de', name: 'Rượu Đế', price: 3, description: 'Đặt một thẻ Say Rượu lên một người khác.' },
        { id: 'chao-hanh', name: 'Cháo Hành', price: 2, description: 'Loại bỏ một thẻ Say Rượu từ bất kỳ người chơi nào.' },
        { id: 'giai-ach', name: 'Giải Ách', price: 15, description: 'Hóa giải ép buộc của Đội Tảo.' },
        { id: 'hoi-huong', name: 'Hồi Hương', price: 10, description: 'Khi dùng có thể gọi về một người đã rời bỏ làng do uất ức vào đêm trước tiếp tục tham gia trò chơi.' }
    ];

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
        setSelectedCard(null);
        setPurchaseMessage('');
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
    };

    const purchaseCard = () => {
        if (!selectedPlayer || !selectedCard) return;

        // Check if player has enough coins
        if (selectedPlayer.coins < selectedCard.price) {
            setPurchaseMessage(`${selectedPlayer.name} không đủ xu để mua thẻ ${selectedCard.name}!`);
            return;
        }

        // Update player's coins and items
        const updatedMembers = members.map(member => {
            if (member.name === selectedPlayer.name) {
                return {
                    ...member,
                    coins: member.coins - selectedCard.price,
                    items: [...member.items, selectedCard.id]
                };
            }
            return member;
        });

        updateMembers(updatedMembers);
        setPurchaseMessage(`${selectedPlayer.name} đã mua thẻ ${selectedCard.name} thành công!`);
    };

    return (
        <div className="event-container market-event">
            <h3>Chợ Phiên</h3>
            <p>Hôm nay là ngày Chợ Phiên! Mọi người có thể mua thẻ hành động.</p>

            <div className="market-layout">
                <div className="player-selection">
                    <h4>Chọn người mua:</h4>
                    <div className="player-list">
                        {members.filter(m => m.alive).map(player => (
                            <div 
                                key={player.name}
                                className={`player-item ${selectedPlayer?.name === player.name ? 'selected' : ''}`}
                                onClick={() => handlePlayerSelect(player)}
                            >
                                <p>{player.name}</p>
                                <p className="player-coins">Xu: {player.coins}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-selection">
                    <h4>Các thẻ có bán:</h4>
                    <div className="card-list">
                        {actionCards.map(card => (
                            <div 
                                key={card.id}
                                className={`card-item ${selectedCard?.id === card.id ? 'selected' : ''}`}
                                onClick={() => handleCardSelect(card)}
                            >
                                <h5>{card.name}</h5>
                                <p className="card-price">Giá: {card.price} xu</p>
                                <p className="card-description">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="purchase-controls">
                {purchaseMessage && <p className="purchase-message">{purchaseMessage}</p>}
                
                <button 
                    className="purchase-button"
                    disabled={!selectedPlayer || !selectedCard}
                    onClick={purchaseCard}
                >
                    Mua thẻ
                </button>
                
                <button className="finish-button" onClick={onFinish}>
                    Kết thúc Chợ Phiên
                </button>
            </div>
        </div>
    );
}

export default MarketEvent;
