import React, { useState, useEffect } from 'react';
import '../../styles/events.css';

function HarvestEvent({ members, updateMembers, onFinish }) {
    const [distributionComplete, setDistributionComplete] = useState(false);
    const [distributionLog, setDistributionLog] = useState([]);

    useEffect(() => {
        // Distribute coins based on team
        const updatedMembers = members.map(member => {
            if (!member.alive) return member;
            
            let coinsToAdd = 0;
            
            if (member.team === "Quyền Thế") {
                coinsToAdd = 1;
                setDistributionLog(prev => [...prev, `${member.name} (Quyền Thế) nhận được 1 xu`]);
            } else if (member.team === "Công Lý" || member.team === "Lang Thang" || member.team === "Đội Tảo") {
                coinsToAdd = 2;
                setDistributionLog(prev => [...prev, `${member.name} (${member.team}) nhận được 2 xu`]);
            }
            
            return {
                ...member,
                coins: member.coins + coinsToAdd
            };
        });
        
        updateMembers(updatedMembers);
        setDistributionComplete(true);
    }, []);

    return (
        <div className="event-container harvest-event">
            <h3>Ngày Thu Hoạch</h3>
            <p>Hôm nay là ngày Thu Hoạch! Dân làng nhận được thu nhập.</p>
            
            <div className="harvest-log">
                <h4>Phân phối thu nhập:</h4>
                <ul>
                    {distributionLog.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
            
            <div className="player-wealth">
                <h4>Tài sản hiện tại:</h4>
                <div className="player-wealth-list">
                    {members.filter(m => m.alive).map(player => (
                        <div key={player.name} className="player-wealth-item">
                            <p className="player-name">{player.name}</p>
                            <p className="player-team">Phe: {player.team}</p>
                            <p className="player-coins">Xu: {player.coins}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                className="finish-button"
                onClick={onFinish}
                disabled={!distributionComplete}
            >
                Kết thúc Thu Hoạch
            </button>
        </div>
    );
}

export default HarvestEvent;
