import React, { useEffect, useState, useRef } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

import background from "../../assets/background_day.png";
import Card from '../player/Card';
import PlayerMenu from '../player/PlayerMenu';

function Day(props) {
    const titleRef = useRef(null);
    const gameRef = useRef(null);

    const [filterTeam, setFilterTeam] = useState('all');
    const [players, setPlayers] = useState([]);
    const [playerToSee, setPlayerToSee] = useState(null);
    
    // Display day number as 1 instead of 0
    const displayDay = props.date + 1;

    useEffect(() => {
        // Animation for title
        const title = titleRef.current;
        const game_title = gameRef.current;

        if (title && game_title) {
            title.style.marginTop = '-50%';
            title.style.opacity = '0';

            setTimeout(() => {
                title.style.display = 'none';
                game_title.style.opacity = '1';
            }, 1000);
        }
    }, []);

    useEffect(() => {
        // Set players from props
        setPlayers(props.members);
    }, [props.members]);

    // Function to filter players by team
    const getFilteredPlayers = () => {
        if (filterTeam === 'all') return players;
        return players.filter(player => player.team === filterTeam);
    };

    // Group players by team for better organization
    const getPlayersByTeam = () => {
        const teams = {
            'Quyền Thế': [],
            'Công Lý': [],
            'Đội Tảo': [],
            'Lang Thang': []
        };

        players.forEach(player => {
            if (teams[player.team]) {
                teams[player.team].push(player);
            }
        });

        return teams;
    };

    const groupedPlayers = getPlayersByTeam();

    return (
        <div className='game'>
            <div className='background'>
                <img src={background} alt="Background" />
            </div>

            <div id='title' ref={titleRef}>
                <h2>NGÀY {displayDay}</h2>
            </div>

            <div id='game_title' ref={gameRef}>
                <h2>Danh sách người chơi</h2>
            </div>

            {/* Filter buttons */}
            <div className="player-filters">
                <button
                    className={filterTeam === 'all' ? 'active' : ''}
                    onClick={() => setFilterTeam('all')}
                >
                    Tất cả
                </button>
                <button
                    className={filterTeam === 'Quyền Thế' ? 'active' : ''}
                    onClick={() => setFilterTeam('Quyền Thế')}
                >
                    Phe Quyền Thế
                </button>
                <button
                    className={filterTeam === 'Công Lý' ? 'active' : ''}
                    onClick={() => setFilterTeam('Công Lý')}
                >
                    Phe Công Lý
                </button>
                <button
                    className={filterTeam === 'Đội Tảo' ? 'active' : ''}
                    onClick={() => setFilterTeam('Đội Tảo')}
                >
                    Phe Đội Tảo
                </button>
                <button
                    className={filterTeam === 'Lang Thang' ? 'active' : ''}
                    onClick={() => setFilterTeam('Lang Thang')}
                >
                    Những kẻ Lang Thang
                </button>
            </div>

            {/* Player list container */}
            <div id='player_cont'>
                {filterTeam === 'all' ? (
                    // Display by team groups
                    Object.entries(groupedPlayers).map(([team, teamPlayers]) => (
                        teamPlayers.length > 0 && (
                            <div key={team} className="team-section">
                                <h3 className="team-title">{team}</h3>
                                <div id="player_list">
                                    {teamPlayers.map((player, index) => (
                                        <Card
                                            key={`${player.name}-${index}`}
                                            player={player}
                                            seeMenu={() => { setPlayerToSee(player) }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    // Display filtered players
                    <div id="player_list">
                        {getFilteredPlayers().map((player, index) => (
                            <Card
                                key={`${player.name}-${index}`}
                                player={player}
                                seeMenu={() => { setPlayerToSee(player) }}
                            />
                        ))}
                    </div>
                )}

                {/* Show message if no players in selected filter */}
                {filterTeam !== 'all' && getFilteredPlayers().length === 0 && (
                    <div className="no-players">
                        <p>Không có người chơi nào thuộc phe {filterTeam}</p>
                    </div>
                )}
            </div>

            {playerToSee && <PlayerMenu player={playerToSee} back={() => {setPlayerToSee(null)}}></PlayerMenu>}

            {/* Game controls */}
            <div className="day-controls">
                <button 
                    className="next-phase-btn"
                    onClick={props.onEnd}
                >
                    Bắt đầu đêm {displayDay}
                </button>
            </div>
        </div>
    );
}

export default Day;
