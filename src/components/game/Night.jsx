import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"
import "../../styles/night.css" // Cần tạo file CSS này

import { Player } from "../../types/roles";
import background from "../../assets/image.png";
import Card from '../player/Card';

function Night(props) {
    const { members, setMembers, day, advanceToDay } = props;
    const [currentPhase, setCurrentPhase] = useState('start');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [powerActions, setPowerActions] = useState({});
    const [notifications, setNotifications] = useState([]);
    
    // Danh sách các giai đoạn trong đêm theo thứ tự
    const phases = [
        'start',               // Bắt đầu đêm
        'powerQuyen',          // Phe Quyền Thế thức dậy
        'baKien',              // Bá Kiến sử dụng khả năng
        'lyCuong',             // Lý Cường sử dụng khả năng
        'baBa',                // Bà Ba sử dụng khả năng
        'laoHac',              // Lão Hạc sử dụng khả năng
        'thiNo',               // Thị Nở sử dụng khả năng
        'baCo',                // Bà Cô sử dụng khả năng
        'ongGiao',             // Ông Giáo sử dụng khả năng
        'binhChuc',            // Binh Chức thức dậy
        'danThuong',           // Dân thường thức dậy
        'chiPheo',             // Chí Phèo sử dụng khả năng
        'doiTao',              // Đội Tảo sử dụng khả năng
        'namTho',              // Năm Thọ sử dụng khả năng
        'tuLang',              // Tự Lãng sử dụng khả năng
        'summary',             // Tổng kết đêm
        'choBlack',            // Chợ đen cho phe Quyền Thế
        'end'                  // Kết thúc đêm
    ];

    // Function để chuyển sang giai đoạn tiếp theo
    const nextPhase = () => {
        const currentIndex = phases.indexOf(currentPhase);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < phases.length) {
            setCurrentPhase(phases[nextIndex]);
        } else {
            // Kết thúc đêm, sang ngày
            advanceToDay();
        }
    };

    // Function để xử lý khi Hương Sư chọn người chơi
    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
    };

    // Function để áp dụng khả năng của nhân vật
    const applyPower = (action) => {
        // Clone members để cập nhật
        let updatedMembers = [...members];
        let newNotifications = [...notifications];
        
        // Tìm index của người chơi được chọn
        const selectedIndex = updatedMembers.findIndex(m => m.name === selectedPlayer.name);
        
        // Xử lý từng loại hành động
        switch(currentPhase) {
            case 'powerQuyen':
                // Phe Quyền Thế đàn áp
                if (selectedIndex >= 0) {
                    updatedMembers[selectedIndex].increaseFrustration(1);
                    newNotifications.push(`${selectedPlayer.name} bị phe Quyền Thế đàn áp`);
                }
                break;
                
            case 'baKien':
                // Bá Kiến đàn áp thêm
                if (selectedIndex >= 0) {
                    updatedMembers[selectedIndex].increaseFrustration(1);
                    newNotifications.push(`${selectedPlayer.name} bị Bá Kiến đàn áp thêm`);
                }
                break;
                
            case 'lyCuong':
                // Lý Cường tống tiền
                if (selectedIndex >= 0 && updatedMembers[selectedIndex].coins > 0) {
                    updatedMembers[selectedIndex].removeCoins(1);
                    
                    // Tìm các thành viên phe Quyền Thế để chia tiền
                    const quyenTheMembers = updatedMembers.filter(m => m.team === "Quyền Thế" && m.alive);
                    if (quyenTheMembers.length > 0) {
                        // Ưu tiên cho Lý Cường trước
                        const lyCuong = quyenTheMembers.find(m => m.role === "Lý Cường");
                        if (lyCuong) {
                            lyCuong.addCoins(1);
                        } else {
                            // Chọn ngẫu nhiên một thành viên Quyền Thế để nhận tiền
                            const randomIndex = Math.floor(Math.random() * quyenTheMembers.length);
                            quyenTheMembers[randomIndex].addCoins(1);
                        }
                    }
                    
                    newNotifications.push(`${selectedPlayer.name} bị Lý Cường tống tiền 1 đồng`);
                }
                break;
                
            case 'baBa':
                // Bà Ba kiểm tra
                const isChiPheo = selectedPlayer.role === "Chí Phèo";
                setPowerActions({...powerActions, baBa: {checked: selectedPlayer.name, isChiPheo}});
                break;
                
            case 'laoHac':
                // Lão Hạc bảo vệ
                if (selectedIndex >= 0) {
                    // Lưu người được bảo vệ để sau này xử lý
                    setPowerActions({...powerActions, laoHac: {protected: selectedPlayer.name}});
                    newNotifications.push(`${selectedPlayer.name} được Lão Hạc bảo vệ`);
                }
                break;
                
            case 'thiNo':
                // Thị Nở giúp đỡ
                if (selectedIndex >= 0 && updatedMembers[selectedIndex].frustration > 0) {
                    updatedMembers[selectedIndex].increaseFrustration(-1);
                    newNotifications.push(`${selectedPlayer.name} được Thị Nở giúp đỡ, giảm 1 điểm uất ức`);
                    
                    // Kiểm tra nếu là Chí Phèo và đã chọn 2 đêm liên tiếp
                    if (selectedPlayer.role === "Chí Phèo") {
                        const lastNight = powerActions.thiNo?.helped;
                        if (lastNight === selectedPlayer.name) {
                            // Chí Phèo chuyển sang phe Công Lý
                            updatedMembers[selectedIndex].changeTeam("Công Lý");
                            newNotifications.push(`Chí Phèo đã chuyển sang phe Công Lý!`);
                        }
                    }
                }
                
                // Lưu người được giúp đỡ
                setPowerActions({...powerActions, thiNo: {helped: selectedPlayer.name}});
                break;
                
            case 'baCo':
                // Bà Cô kiểm tra phe
                const isQuyenThe = selectedPlayer.team === "Quyền Thế";
                setPowerActions({...powerActions, baCo: {checked: selectedPlayer.name, isQuyenThe}});
                break;
                
            case 'ongGiao':
                // Ông Giáo so sánh hai người
                if (!powerActions.ongGiao) {
                    // Lưu người thứ nhất
                    setPowerActions({...powerActions, ongGiao: {first: selectedPlayer.name}});
                } else {
                    // Lấy người thứ nhất
                    const firstPlayer = members.find(m => m.name === powerActions.ongGiao.first);
                    // So sánh phe
                    const sameSide = firstPlayer.team === selectedPlayer.team;
                    setPowerActions({
                        ...powerActions, 
                        ongGiao: {
                            ...powerActions.ongGiao,
                            second: selectedPlayer.name,
                            sameSide
                        }
                    });
                }
                break;
                
            case 'chiPheo':
                // Xử lý khả năng của Chí Phèo dựa vào phe hiện tại
                const chiPheo = members.find(m => m.role === "Chí Phèo");
                if (chiPheo) {
                    if (chiPheo.team === "Công Lý") {
                        // Kiểm tra giết người phe Quyền Thế
                        const targetIsQuyenThe = selectedPlayer.team === "Quyền Thế";
                        if (targetIsQuyenThe) {
                            // Giết thành công
                            updatedMembers[selectedIndex].kill();
                            newNotifications.push(`${selectedPlayer.name} bị Chí Phèo giết chết`);
                            setPowerActions({
                                ...powerActions,
                                chiPheo: {success: true, killed: selectedPlayer.name}
                            });
                        } else {
                            // Giết sai, mất khả năng
                            setPowerActions({
                                ...powerActions,
                                chiPheo: {success: false, attempted: selectedPlayer.name}
                            });
                        }
                    } else if (chiPheo.team === "Quyền Thế") {
                        // Giết người bất kỳ
                        updatedMembers[selectedIndex].kill();
                        newNotifications.push(`${selectedPlayer.name} bị Chí Phèo giết chết`);
                        setPowerActions({
                            ...powerActions,
                            chiPheo: {killed: selectedPlayer.name}
                        });
                    }
                }
                break;
                
            case 'doiTao':
                // Xử lý khả năng của Đội Tảo
                if (!powerActions.doiTao?.usedKill) {
                    if (action === "kill") {
                        // Sử dụng khả năng thanh trừng một lần duy nhất
                        updatedMembers[selectedIndex].kill();
                        newNotifications.push(`${selectedPlayer.name} bị Đội Tảo thanh trừng`);
                        setPowerActions({
                            ...powerActions,
                            doiTao: {...(powerActions.doiTao || {}), usedKill: true}
                        });
                    } else {
                        // Ép buộc
                        if (selectedPlayer.team !== "Quyền Thế") {
                            // Có thể ép buộc
                            setPowerActions({
                                ...powerActions,
                                doiTao: {
                                    ...(powerActions.doiTao || {}),
                                    forced: [...(powerActions.doiTao?.forced || []), selectedPlayer.name]
                                }
                            });
                            newNotifications.push(`${selectedPlayer.name} bị Đội Tảo ép buộc`);
                        }
                    }
                }
                break;
                
            case 'namTho':
                // Năm Thọ cướp tiền
                if (selectedIndex >= 0) {
                    if (selectedPlayer.role === "Bá Kiến") {
                        // Cướp nhầm nhà Bá Kiến
                        const namThoIndex = updatedMembers.findIndex(m => m.role === "Năm Thọ");
                        if (namThoIndex >= 0) {
                            updatedMembers[namThoIndex].kill();
                            updatedMembers[selectedIndex].removeCoins(updatedMembers[selectedIndex].coins); // Mất hết tiền
                            newNotifications.push(`Năm Thọ cướp nhầm nhà Bá Kiến và bị trục xuất khỏi làng`);
                        }
                    } else {
                        // Cướp 3 đồng
                        const coinsToSteal = Math.min(updatedMembers[selectedIndex].coins, 3);
                        updatedMembers[selectedIndex].removeCoins(coinsToSteal);
                        
                        // Tìm Năm Thọ để cộng tiền
                        const namThoIndex = updatedMembers.findIndex(m => m.role === "Năm Thọ");
                        if (namThoIndex >= 0) {
                            updatedMembers[namThoIndex].addCoins(coinsToSteal);
                        }
                        
                        newNotifications.push(`${selectedPlayer.name} bị Năm Thọ cướp ${coinsToSteal} đồng`);
                    }
                }
                break;
                
            case 'tuLang':
                // Tự Lãng bán rượu
                if (selectedIndex >= 0) {
                    if (updatedMembers[selectedIndex].coins > 0) {
                        updatedMembers[selectedIndex].removeCoins(1);
                        // Tìm Tự Lãng để cộng tiền
                        const tuLangIndex = updatedMembers.findIndex(m => m.role === "Tự Lãng");
                        if (tuLangIndex >= 0) {
                            updatedMembers[tuLangIndex].addCoins(1);
                        }
                        
                        // Tăng điểm rượu cho người chơi
                        updatedMembers[selectedIndex].increaseWine(1);
                        
                        newNotifications.push(`${selectedPlayer.name} mua rượu của Tự Lãng và trả 1 đồng`);
                    } else {
                        newNotifications.push(`${selectedPlayer.name} không có tiền để mua rượu`);
                    }
                }
                break;
                
            default:
                break;
        }
        
        // Cập nhật danh sách người chơi và thông báo
        setMembers(updatedMembers);
        setNotifications(newNotifications);
        setSelectedPlayer(null);
        
        // Chuyển sang giai đoạn tiếp theo
        nextPhase();
    };

    // Render UI cho từng giai đoạn
    const renderPhaseContent = () => {
        switch(currentPhase) {
            case 'start':
                return (
                    <div className="night-phase">
                        <h2>Đêm bắt đầu</h2>
                        <p>Hương Sư hãy yêu cầu mọi người nhắm mắt.</p>
                        <button onClick={nextPhase}>Tiếp theo</button>
                    </div>
                );
                
            case 'powerQuyen':
                // Hiển thị danh sách phe Quyền Thế và danh sách người chơi để chọn đàn áp
                const quyenTheMembers = members.filter(m => m.team === "Quyền Thế" && m.alive);
                return (
                    <div className="night-phase">
                        <h2>Phe Quyền Thế thức dậy</h2>
                        <div className="team-members">
                            <h3>Thành viên phe Quyền Thế:</h3>
                            <ul>
                                {quyenTheMembers.map(member => (
                                    <li key={member.name}>{member.name} ({member.role})</li>
                                ))}
                            </ul>
                        </div>
                        <div className="player-selection">
                            <h3>Chọn người để đàn áp:</h3>
                            <div className="player-list">
                                {members.filter(m => m.alive && m.team !== "Quyền Thế").map(player => (
                                    <div 
                                        key={player.name} 
                                        className={`player-option ${selectedPlayer?.name === player.name ? 'selected' : ''}`}
                                        onClick={() => handlePlayerSelect(player)}
                                    >
                                        {player.name} ({player.role})
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => applyPower('oppress')} disabled={!selectedPlayer}>Đàn áp</button>
                    </div>
                );
                
            case 'baKien':
                // Kiểm tra nếu có Bá Kiến trong trò chơi
                const baKien = members.find(m => m.role === "Bá Kiến" && m.alive);
                if (!baKien) {
                    // Nếu không có hoặc đã chết, chuyển sang giai đoạn tiếp theo
                    setTimeout(nextPhase, 0);
                    return <div className="night-phase"><p>Bá Kiến không có trong trò chơi hoặc đã chết.</p></div>;
                }
                
                return (
                    <div className="night-phase">
                        <h2>Bá Kiến thức dậy</h2>
                        <p>Bá Kiến có thể chọn thêm một người để đàn áp:</p>
                        <div className="player-list">
                            {members.filter(m => m.alive && m.team !== "Quyền Thế").map(player => (
                                <div 
                                    key={player.name} 
                                    className={`player-option ${selectedPlayer?.name === player.name ? 'selected' : ''}`}
                                    onClick={() => handlePlayerSelect(player)}
                                >
                                    {player.name} ({player.role})
                                </div>
                            ))}
                        </div>
                        <button onClick={() => applyPower('oppress')} disabled={!selectedPlayer}>Đàn áp thêm</button>
                    </div>
                );
                
            // Tiếp tục với các giai đoạn khác tương tự...
            // Tôi sẽ triển khai thêm một số giai đoạn chính làm ví dụ
                
            case 'lyCuong':
                // Kiểm tra nếu có Lý Cường trong trò chơi
                const lyCuong = members.find(m => m.role === "Lý Cường" && m.alive);
                if (!lyCuong) {
                    setTimeout(nextPhase, 0);
                    return <div className="night-phase"><p>Lý Cường không có trong trò chơi hoặc đã chết.</p></div>;
                }
                
                return (
                    <div className="night-phase">
                        <h2>Lý Cường thức dậy</h2>
                        <p>Lý Cường có thể chọn một người để tống tiền:</p>
                        <div className="player-list">
                            {members.filter(m => m.alive && m.team !== "Quyền Thế").map(player => (
                                <div 
                                    key={player.name} 
                                    className={`player-option ${selectedPlayer?.name === player.name ? 'selected' : ''}`}
                                    onClick={() => handlePlayerSelect(player)}
                                >
                                    {player.name} ({player.role}) - {player.coins} đồng
                                </div>
                            ))}
                        </div>
                        <button onClick={() => applyPower('extort')} disabled={!selectedPlayer}>Tống tiền</button>
                    </div>
                );
                
            // Hiển thị tương tự cho các vai trò khác
                
            case 'summary':
                return (
                    <div className="night-phase">
                        <h2>Tổng kết đêm</h2>
                        <div className="notifications">
                            <h3>Những sự kiện trong đêm:</h3>
                            <ul>
                                {notifications.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={nextPhase}>Kết thúc đêm</button>
                    </div>
                );
                
            case 'end':
                return (
                    <div className="night-phase">
                        <h2>Đêm kết thúc</h2>
                        <p>Hương Sư hãy chuẩn bị cho ngày mới.</p>
                        <button onClick={advanceToDay}>Bình minh đến</button>
                    </div>
                );
                
            default:
                return (
                    <div className="night-phase">
                        <h2>{currentPhase}</h2>
                        <p>Giai đoạn đang được phát triển...</p>
                        <button onClick={nextPhase}>Tiếp theo</button>
                    </div>
                );
        }
    };

    return (
        <div className="night-container">
            <div className="background">
                <img src={background} alt="Night background" />
            </div>
            
            <div className="night-content">
                <h1>Đêm {day}</h1>
                {renderPhaseContent()}
            </div>
            
            {/* Hiển thị thông tin trạng thái game cho Hương Sư */}
            <div className="game-status">
                <h3>Trạng thái người chơi:</h3>
                <div className="player-status-list">
                    {members.map(player => (
                        <div key={player.name} className={`player-status ${!player.alive ? 'dead' : ''}`}>
                            <span>{player.name} ({player.role})</span>
                            <span>Phe: {player.team}</span>
                            <span>Xu: {player.coins}</span>
                            <span>Uất ức: {player.frustration}</span>
                            <span>Rượu: {player.wine}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Night;
