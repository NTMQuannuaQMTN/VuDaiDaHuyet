import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';
import Day from './game/Day';
import Night from './game/Night';

function GamePlay() {
    const [members, setMembers] = useState([]);
    const [isDay, setIsDay] = useState(false);
    const [day, setDay] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    // Kiểm tra điều kiện chiến thắng
    const checkWinConditions = () => {
        if (members.length === 0) return null;
        
        // Phe Quyền Thế thắng khi loại bỏ tất cả phe Công Lý
        const congLyAlive = members.some(m => m.team === "Công Lý" && m.alive);
        if (!congLyAlive) {
            return "Quyền Thế";
        }
        
        // Phe Công Lý thắng khi loại bỏ tất cả phe Quyền Thế
        const quyenTheAlive = members.some(m => m.team === "Quyền Thế" && m.alive);
        if (!quyenTheAlive) {
            return "Công Lý";
        }
        
        // Đội Tảo thắng khi ép buộc hết và giết Bá Kiến
        const doiTao = members.find(m => m.role === "Đội Tảo" && m.alive);
        if (doiTao) {
            const baKienAlive = members.some(m => m.role === "Bá Kiến" && m.alive);
            const allNonQuyenTheForced = members.every(m => 
                (m.team !== "Quyền Thế" && m !== doiTao) ? m.forced : true
            );
            
            if (!baKienAlive && allNonQuyenTheForced) {
                return "Đội Tảo";
            }
        }
        
        // Tự Lãng thắng khi có 15 tiền
        const tuLang = members.find(m => m.role === "Tự Lãng" && m.alive);
        if (tuLang && tuLang.coins >= 15 && !tuLang.forced) {
            return "Tự Lãng";
        }
        
        // Năm Thọ thắng khi có 30 tiền
        const namTho = members.find(m => m.role === "Năm Thọ" && m.alive);
        if (namTho && namTho.coins >= 30 && !namTho.forced) {
            return "Năm Thọ";
        }
        
        return null; // Chưa có ai thắng
    };
    
    // Kiểm tra game over sau mỗi lần cập nhật members
    useEffect(() => {
        if (members.length > 0 && gameStarted) {
            const winningTeam = checkWinConditions();
            if (winningTeam) {
                setGameOver(true);
                setWinner(winningTeam);
            }
        }
    }, [members, gameStarted]);

    // Chuyển từ Character Selection sang ngày đầu tiên
    const startGame = (players) => {
        setMembers(players);
        setIsDay(true);
        setGameStarted(true);
    };

    // Chuyển từ Ngày sang Đêm
    const advanceToNight = () => {
        setIsDay(false);
        setDay(prevDay => prevDay + 1);
    };

    // Chuyển từ Đêm sang Ngày
    const advanceToDay = () => {
        setIsDay(true);
    };

    // Khởi động lại trò chơi
    const restartGame = () => {
        setMembers([]);
        setIsDay(false);
        setDay(0);
        setGameStarted(false);
        setGameOver(false);
        setWinner(null);
    };

    return (
        <div className='home'>
            {!gameStarted && (
                <Character setPlayers={startGame} />
            )}
            
            {gameStarted && isDay && (
                <Day 
                    members={members} 
                    setMembers={setMembers} 
                    day={day} 
                    advanceToNight={advanceToNight}
                />
            )}
            
            {gameStarted && !isDay && (
                <Night 
                    members={members} 
                    setMembers={setMembers} 
                    day={day} 
                    advanceToDay={advanceToDay}
                />
            )}
            
            {gameOver && (
                <div className="game-over-overlay">
                    <div className="game-over-modal">
                        <h2>Trò chơi kết thúc!</h2>
                        <h3>Phe {winner} đã chiến thắng!</h3>
                        <button onClick={restartGame}>Bắt đầu lại</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GamePlay;
