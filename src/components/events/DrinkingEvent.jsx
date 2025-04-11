import React, { useState, useEffect } from 'react';
import '../../styles/events.css';

function DrinkingPartyEvent({ members, updateMembers, onFinish }) {
    const [distributionComplete, setDistributionComplete] = useState(false);
    const [drinkingLog, setDrinkingLog] = useState([]);
    const [specialEffects, setSpecialEffects] = useState([]);

    useEffect(() => {
        // Randomly distribute 3 wine tokens
        const eligibleMembers = members.filter(m => m.alive);
        const updatedMembers = [...members];
        const drinkingLog = [];
        const effects = [];
        
        // We need to select 3 random members to receive wine tokens
        let selectedCount = 0;
        while (selectedCount < 3 && selectedCount < eligibleMembers.length) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            const selectedMember = eligibleMembers[randomIndex];
            
            // Find this member in our updated array
            const memberIndex = updatedMembers.findIndex(m => m.name === selectedMember.name);
            
            // Check if this member already received a token in this round
            if (!drinkingLog.some(log => log.includes(selectedMember.name))) {
                // Add wine token
                updatedMembers[memberIndex].wine = (updatedMembers[memberIndex].wine || 0) + 1;
                
                // Add to log
                drinkingLog.push(`${selectedMember.name} đã nhận được một thẻ Say Rượu!`);
                
                // Check for special effects
                // Chí Phèo reaches 3 wine tokens and joins Power Team
                if (selectedMember.role === "Chí Phèo" && updatedMembers[memberIndex].wine >= 3 && 
                    updatedMembers[memberIndex].team !== "Quyền Thế") {
                    updatedMembers[memberIndex].team = "Quyền Thế";
                    effects.push(`Chí Phèo đã say đến mức gia nhập phe Quyền Thế!`);
                }
                
                // Increment our counter
                selectedCount++;
            }
        }
        
        setDrinkingLog(drinkingLog);
        setSpecialEffects(effects);
        updateMembers(updatedMembers);
        setDistributionComplete(true);
    }, []);

    return (
        <div className="event-container drinking-event">
            <h3>Tiệc Rượu</h3>
            <p>Đêm nay là Tiệc Rượu! Một số dân làng nhận được thẻ Say Rượu.</p>
            
            <div className="drinking-log">
                <h4>Phân phối thẻ Say Rượu:</h4>
                <ul>
                    {drinkingLog.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
            
            {specialEffects.length > 0 && (
                <div className="special-effects">
                    <h4>Hiệu ứng đặc biệt:</h4>
                    <ul>
                        {specialEffects.map((effect, index) => (
                            <li key={index} className="special-effect">{effect}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className="player-status">
                <h4>Tình trạng Say Rượu:</h4>
                <div className="player-status-list">
                    {members.filter(m => m.alive).map(player => (
                        <div key={player.name} className="player-status-item">
                            <p className="player-name">{player.name}</p>
                            <p className="player-wine">Rượu: {player.wine || 0}</p>
                            {player.wine > 0 && 
                                <p className="player-drunk-status">
                                    {player.wine >= 3 && player.role === "Chí Phèo" ? 
                                        "Say khướt!" : 
                                        "Đã say"}
                                </p>
                            }
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                className="finish-button"
                onClick={onFinish}
                disabled={!distributionComplete}
            >
                Kết thúc Tiệc Rượu
            </button>
        </div>
    );
}

export default DrinkingPartyEvent;
