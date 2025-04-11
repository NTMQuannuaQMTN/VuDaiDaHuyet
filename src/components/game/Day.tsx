import React, { useEffect, useState, useRef } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"
import "../../styles/day.css" // Cần tạo file CSS này

import { Player } from "../../types/roles";

import background from "../../assets/background_day.png";
import Card from '../player/Card';
import ChaoHanh from "../../assets/shop/ChaoHanh.png";
import HoiHuong from "../../assets/shop/GanhOanTroVe.png";
import GiaiAch from "../../assets/shop/GiaiAch.png";
import MinhOan from "../../assets/shop/MinhOan.png";
import Ruou from "../../assets/shop/RuouDe.png";

function Day(props) {
    const { members, setMembers, day, advanceToNight } = props;
    const [event, setEvent] = useState('');
    const [showEvent, setShowEvent] = useState(false);
    const [tab, setTab] = useState(1);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [voteResults, setVoteResults] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardTarget, setCardTarget] = useState(null);
    const dayRef = useRef(null);
    const [CPWine, setCPWine] = useState(0);

    // Các thẻ hành động trong game
    const actionCards = [
        { id: 'minh-oan', name: 'Minh Oan', price: 10, description: 'Giúp bạn tránh bị xử tử nếu bị bỏ phiếu nhiều nhất.', image: MinhOan },
        { id: 'ruou-de', name: 'Rượu Đế', price: 3, description: 'Đặt một thẻ Say Rượu lên một người khác.', image: Ruou },
        { id: 'chao-hanh', name: 'Cháo Hành', price: 2, description: 'Loại bỏ một thẻ Say Rượu từ bất kỳ người chơi nào.', image: ChaoHanh },
        { id: 'giai-ach', name: 'Giải Ách', price: 15, description: 'Hóa giải ép buộc của Đội Tảo.', image: GiaiAch },
        { id: 'hoi-huong', name: 'Hồi Hương', price: 10, description: 'Gọi về một người đã rời bỏ làng do uất ức vào đêm trước tiếp tục tham gia trò chơi.', image: HoiHuong }
    ];

    useEffect(() => {
        // Xác định sự kiện ngày dựa vào số ngày
        determineEvent();

        let dayActions = dayRef.current;

        dayActions.style.opacity = 0;

        // Animation hiệu ứng khi component mount
        setTimeout(() => {
            let title = document.getElementById("title");
            let game_title = document.getElementById("game_title");
            title.style.marginTop = '-50%';
            title.style.opacity = 0;
            setTimeout(() => {
                title.style.display = 'none';
                game_title.style.opacity = 1;
                setShowEvent(true);
                setTimeout(() => {
                    setShowEvent(false);
                    dayActions.style.opacity = 1;
                }, 2000);
            }, 1000);
        }, 1000);
    }, [day]);

    // Xác định sự kiện ngày dựa vào số ngày
    const determineEvent = () => {
        const eventCycle = day % 3;

        if (eventCycle === 0) {
            setEvent('Chợ Phiên');
        } else if (eventCycle === 1) {
            setEvent('Thu Hoạch');
            distributeCoins();
        } else if (eventCycle === 2) {
            setEvent('Tiệc Rượu');
            distributeWine();
        }
    };

    // Phân phát tiền trong ngày Thu Hoạch
    const distributeCoins = () => {
        const updatedMembers = [...members];

        updatedMembers.forEach((member, index) => {
            if (!member.alive) return;

            if (member.team === "Quyền Thế") {
                member.addCoins(1); // Phe Quyền Thế nhận 1 đồng
            } else {
                member.addCoins(2); // Các phe khác nhận 2 đồng
            }
        });

        setMembers(updatedMembers);
    };

    // Phân phát thẻ Say Rượu trong ngày Tiệc Rượu
    const distributeWine = () => {
        const updatedMembers = [...members];
        const eligibleMembers = updatedMembers.filter(m => m.alive);

        // Chọn ngẫu nhiên 3 người để phát thẻ Say Rượu
        for (let i = 0; i < 3; i++) {
            if (eligibleMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
                const selectedMember = eligibleMembers[randomIndex];

                // Tìm thành viên này trong danh sách gốc
                const memberIndex = updatedMembers.findIndex(m => m.name === selectedMember.name);
                if (memberIndex >= 0) {
                    updatedMembers[memberIndex].increaseWine(1);
                }

                // Kiểm tra nếu là Chí Phèo và đã có đủ thẻ Rượu
                if (selectedMember.role === "Chí Phèo" && selectedMember.wine >= 3) {
                    updatedMembers[memberIndex].changeTeam("Quyền Thế");
                }

                // Loại người này ra khỏi danh sách hợp lệ để không bị chọn lại
                eligibleMembers.splice(randomIndex, 1);
            }
        }

        setMembers(updatedMembers);
    };

    // Xử lý việc mua thẻ Hành Động
    const handleBuyCard = (card) => {
        const playerIndex = members.findIndex(m => m.name === selectedPlayer.name);

        if (playerIndex >= 0) {
            const player = members[playerIndex];

            if (player.coins >= card.price) {
                // Trừ tiền và thêm thẻ vào inventory
                const updatedMembers = [...members];
                updatedMembers[playerIndex].removeCoins(card.price);
                updatedMembers[playerIndex].addItem(card.name);
                setMembers(updatedMembers);
                console.log(members);
            } else {
                alert(`${player.name} không đủ tiền để mua thẻ ${card.name}`);
            }
        }
    };

    // Xử lý việc sử dụng thẻ Hành Động
    const handleUseCard = () => {
        if (!selectedCard || !cardTarget || selectedPlayer.items[selectedCard] <= 0) return;

        const playerIndex = members.findIndex(m => m.id === selectedPlayer.id);
        const targetIndex = members.findIndex(m => m.id === cardTarget.id);

        if (playerIndex >= 0 && targetIndex >= 0) {
            const updatedMembers = [...members];
            const player = updatedMembers[playerIndex];
            const target = updatedMembers[targetIndex];

            // Xử lý từng loại thẻ Hành Động
            switch (selectedCard) {
                case "Rượu Đế":
                    target.increaseWine(1);
                    if (target.role === "Chí Phèo") {
                        setCPWine(CPWine + 1);
                    }

                    // Kiểm tra nếu là Chí Phèo và đã có đủ thẻ Rượu
                    if (target.role === "Chí Phèo" && CPWine >= 3) {
                        target.changeTeam("Quyền Thế");
                    }
                    break;

                case "Cháo Hành":
                    if (target.wine > 0) {
                        target.increaseWine(-1);
                    }
                    break;

                // Xử lý các loại thẻ khác tương tự

                default:
                    break;
            }

            // Xóa thẻ đã sử dụng
            player.items[selectedCard]--;
            setMembers(updatedMembers);

            // Reset selection
            setSelectedCard(null);
            setCardTarget(null);

            alert(`${player.name} đã sử dụng thẻ ${selectedCard} lên ${target.name}`);
            console.log(members)
        }
    };

    // Xử lý việc vote
    const handleVote = (voter, target) => {
        setVoteResults({
            ...voteResults,
            [voter.name]: target.name
        });
    };

    // Tính kết quả vote
    const countVotes = () => {
        const voteCounts = {};

        // Đếm số phiếu cho mỗi người chơi
        Object.values(voteResults).forEach(targetName => {
            if (!voteCounts[targetName]) {
                voteCounts[targetName] = 0;
            }
            voteCounts[targetName]++;
        });

        // Tìm người có số phiếu cao nhất
        let maxVotes = 0;
        let mostVotedPlayer = null;

        Object.entries(voteCounts).forEach(([playerName, voteCount]) => {
            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                mostVotedPlayer = playerName;
            }
        });

        return { mostVotedPlayer, maxVotes };
    };

    // Xử lý việc xét xử
    const handleExecution = () => {
        const { mostVotedPlayer, maxVotes } = countVotes();

        if (mostVotedPlayer && maxVotes > 0) {
            const playerIndex = members.findIndex(m => m.name === mostVotedPlayer);

            if (playerIndex >= 0) {
                // Kiểm tra xem người này có thẻ Minh Oan không
                const player = members[playerIndex];
                const hasMinhOan = player.items.includes("Minh Oan");

                if (hasMinhOan) {
                    // Sử dụng thẻ Minh Oan
                    const updatedMembers = [...members];
                    updatedMembers[playerIndex].removeItem("Minh Oan");
                    setMembers(updatedMembers);

                    alert(`${player.name} đã sử dụng thẻ Minh Oan và không bị xử tử!`);
                } else {
                    // Xử tử người chơi
                    const updatedMembers = [...members];
                    updatedMembers[playerIndex].kill();
                    setMembers(updatedMembers);

                    alert(`${player.name} đã bị dân làng xử tử!`);
                }
            }
        }

        // Reset vote results
        setVoteResults({});
    };

    // Kiểm tra điều kiện chiến thắng
    const checkWinConditions = () => {
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
                m.team !== "Quyền Thế" && m !== doiTao ? m.forced : true
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

    // Render giao diện chợ phiên
    const renderMarket = () => {
        return (
            <div className="market-container">
                <h2>Chợ Phiên</h2>

                <div className="player-selection">
                    <h3>Chọn người mua thẻ:</h3>
                    <div className={`player-cont ${selectedPlayer && 'player-selected'}`}>
                        <div className="player-list">
                            {members.filter(m => m.alive).map(player => (
                                <div
                                    key={player.id}
                                    className={`player-option ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                                    onClick={() => { selectedPlayer?.id === player.id ? setSelectedPlayer(null) : setSelectedPlayer(player) }}
                                >
                                    {player.name} ({player.coins} đồng)
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {selectedPlayer && (
                    <div className="cards-list">
                        <h3>Các thẻ Hành Động:</h3>
                        <div className='cards-cont'>
                            {actionCards.map((card, index) => (
                                <div key={index} className="card-item">
                                    <div className="card-info">
                                        <img src={card.image}></img>
                                        <div className='card-namewprice'>
                                            <h4>{card.name}</h4>
                                            <p>Giá: {card.price} đồng</p>
                                        </div>
                                    </div>
                                    <p>{card.description}</p>
                                    <button
                                        onClick={() => handleBuyCard(card)}
                                        disabled={selectedPlayer.coins < card.price}
                                        className="buy-button"
                                    >
                                        Mua
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render giao diện sử dụng thẻ Hành Động
    const renderUseCard = () => {
        const liveMembers = members.filter(m => m.alive);

        return (
            <div className="use-card-container">
                <h2>Sử dụng thẻ Hành Động</h2>

                <div className="player-selection">
                    <h3>Chọn người sử dụng thẻ:</h3>
                    <div className={`player-cont ${selectedPlayer && 'player-selected'}`}>
                        <div className="player-list">
                            {liveMembers.map(player => (
                                <div
                                    key={player.id}
                                    className={`player-option ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                                    onClick={() => { selectedPlayer?.id === player.id ? setSelectedPlayer(null) : setSelectedPlayer(player); console.log(selectedPlayer.items); setSelectedCard(null); setCardTarget(null); }}
                                >
                                    {player.name} ({player.role})
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {selectedPlayer && (
                    <div className="player-cards">
                        <h3>Thẻ của {selectedPlayer.name}:</h3>
                        <div className='cards-cont' style={{
                            height: selectedCard ? '6vh' : 'calc(12vh + 5px)',
                        }}>
                            <div className="cards-list">
                                {actionCards.map((card) => (
                                    <div
                                        key={card.name}
                                        className={`card-option ${selectedCard === card.name ? 'selected' : ''}`}
                                        onClick={() => { selectedCard === card.name ? setSelectedCard(null) : setSelectedCard(card.name) }}
                                    >
                                        <img src={card.image}></img>
                                        <h3>
                                            {card.name}: {selectedPlayer.items[card.name]}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {selectedCard && (
                    <div className="target-selection">
                        <h3 style={{
                            margin: 0,
                        }}>Chọn mục tiêu:</h3>
                        <div style={{
                            height: window.innerHeight < 800 ? '6vh' : '12vh',
                            overflowY: 'scroll',
                            marginBottom: 10,
                        }}>
                            <div className="player-list">
                                {liveMembers
                                    .map(player => (
                                        <div
                                            key={player.id}
                                            className={`player-option ${cardTarget?.id === player.id ? 'selected' : ''}`}
                                            onClick={() => {cardTarget?.id === player.id ? setCardTarget(null) : setCardTarget(player)}}
                                        >
                                            <h3>{player.name} ({player.role})</h3>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <button
                            onClick={handleUseCard}
                            disabled={!cardTarget}
                            className="use-card-button"
                        >
                            Sử dụng thẻ
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Render giao diện vote
    const renderVoting = () => {
        if (day < 4) return null; // Chỉ vote từ ngày 4 trở đi

        const liveMembers = members.filter(m => m.alive);

        return (
            <div className="voting-container">
                <h2>Xét xử</h2>

                <div className="voter-selection">
                    <h3>Người bỏ phiếu:</h3>
                    <div className="player-list">
                        {liveMembers.map(player => (
                            <div
                                key={player.id}
                                className={`player-option ${selectedPlayer?.name === player.name ? 'selected' : ''}`}
                                onClick={() => { setSelectedPlayer(player); setCardTarget(null); }}
                            >
                                {player.name} ({player.role})
                                {voteResults[player.name] && <span> - Đã vote cho {voteResults[player.name]}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {selectedPlayer && !voteResults[selectedPlayer.name] && (
                    <div className="target-selection">
                        <h3>{selectedPlayer.name} vote cho:</h3>
                        <div className="player-list">
                            {liveMembers
                                .filter(p => p.name !== selectedPlayer.name) // Không thể vote chính mình
                                .map(player => (
                                    <div
                                        key={player.id}
                                        className={`player-option ${cardTarget?.name === player.name ? 'selected' : ''}`}
                                        onClick={() => setCardTarget(player)}
                                    >
                                        {player.name} ({player.role})
                                    </div>
                                ))
                            }
                        </div>

                        <button
                            onClick={() => handleVote(selectedPlayer, cardTarget)}
                            disabled={!cardTarget}
                            className="vote-button"
                        >
                            Vote
                        </button>
                    </div>
                )}

                {Object.keys(voteResults).length > 0 && (
                    <div className="vote-results">
                        <h3>Kết quả vote:</h3>
                        <ul>
                            {Object.entries(voteResults).map(([voter, target]) => (
                                <li key={voter}>{voter} vote cho {target}</li>
                            ))}
                        </ul>

                        <button
                            onClick={handleExecution}
                            className="execute-button"
                        >
                            Tiến hành xét xử
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="game">
            <div className="background">
                <img src={background} alt="Day background" />
            </div>

            <div id="title">
                <h2>NGÀY {day}</h2>
            </div>

            <div id="game_title" style={{ opacity: 0 }}>
                <h2>Sự kiện: {event}</h2>
            </div>

            {showEvent && (
                <div className="event-notification">
                    <h3>Hôm nay là ngày {event}!</h3>
                    {event === 'Thu Hoạch' && <p>Mọi người nhận được tiền từ vụ mùa.</p>}
                    {event === 'Tiệc Rượu' && <p>Ba người ngẫu nhiên nhận được thẻ Say Rượu.</p>}
                    {event === 'Chợ Phiên' && <p>Mọi người có thể mua thẻ Hành Động.</p>}
                </div>
            )}

            <div className="day-actions" ref={dayRef}>
                {/* Hiển thị các tab tùy chọn */}
                <div className="action-tabs">
                    <button className={`tab-button ${tab == 1 && 'active'}`} onClick={() => setTab(1)}>Chợ Phiên</button>
                    <button className={`tab-button ${tab == 2 && 'active'}`} onClick={() => setTab(2)}>Sử dụng thẻ</button>
                    {day >= 4 && <button className={`tab-button ${tab == 3 && 'active'}`} onClick={() => setTab(3)}>Xét xử</button>}
                </div>

                {/* Hiển thị nội dung tương ứng với tab */}
                {tab == 1 && renderMarket()}
                {tab == 2 && renderUseCard()}
                {tab == 3 && renderVoting()}

                {/* Nút tiến đến đêm */}
                <button
                    className="next-phase-button"
                    onClick={advanceToNight}
                >
                    Tiến đến đêm
                </button>
            </div>

            {/* Kiểm tra điều kiện chiến thắng */}
            {checkWinConditions() && (
                <div className="win-announcement">
                    <h2>Phe {checkWinConditions()} chiến thắng!</h2>
                    <button>Kết thúc trò chơi</button>
                </div>
            )}
        </div>
    );
}

export default Day;
