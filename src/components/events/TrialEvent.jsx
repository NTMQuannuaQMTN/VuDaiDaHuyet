import React, { useState } from 'react';
import '../../styles/events.css';

function TrialEvent({ members, updateMembers, onFinish }) {
    const [votes, setVotes] = useState({});
    const [currentVoter, setCurrentVoter] = useState(null);
    const [votingComplete, setVotingComplete] = useState(false);
    const [votingResults, setVotingResults] = useState(null);
    const [executionResult, setExecutionResult] = useState(null);
    
    const aliveMembers = members.filter(m => m.alive);
    
    const startVoting = () => {
        if (aliveMembers.length > 0) {
            setCurrentVoter(aliveMembers[0]);
        }
    };
    
    const handleVote = (targetName) => {
        // Record this vote
        setVotes(prev => ({
            ...prev,
            [currentVoter.name]: targetName
        }));
        
        // Find the next voter
        const currentIndex = aliveMembers.findIndex(m => m.name === currentVoter.name);
        if (currentIndex < aliveMembers.length - 1) {
            setCurrentVoter(aliveMembers[currentIndex + 1]);
        } else {
            // Voting is complete, tally the results
            tallyVotes();
        }
    };
    
    const tallyVotes = () => {
        // Count votes for each player
        const voteCounts = {};
        
        Object.values(votes).forEach(targetName => {
            voteCounts[targetName] = (voteCounts[targetName] || 0) + 1;
        });
        
        // Find the player with the most votes
        let maxVotes = 0;
        let executedPlayers = [];
        
        Object.entries(voteCounts).forEach(([name, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                executedPlayers = [name];
            } else if (count === maxVotes) {
                executedPlayers.push(name);
            }
        });
        
        // If there's a tie, no one is executed
        const result = {
            voteCounts,
            executedPlayers: executedPlayers.length === 1 ? executedPlayers : []
        };
        
        setVotingResults(result);
        setVotingComplete(true);
        
        // If someone is executed, update the members array
        if (result.executedPlayers.length === 1) {
            const executed = result.executedPlayers[0];
            
            // Check if they have a Minh Oan card
            const executedPlayer = aliveMembers.find(m => m.name === executed);
            if (executedPlayer && executedPlayer.items.includes('minh-oan')) {
                // They use their Minh Oan card to avoid execution
                const updatedMembers = members.map(member => {
                    if (member.name === executed) {
                        return {
                            ...member,
                            items: member.items.filter(item => item !== 'minh-oan')
                        };
                    }
                    return member;
                });
                
                updateMembers(updatedMembers);
                setExecutionResult({
                    player: executed,
                    saved: true,
                    message: `${executed} đã sử dụng thẻ Minh Oan để thoát khỏi án tử hình!`
                });
            } else {
                // They are executed
                const updatedMembers = members.map(member => {
                    if (member.name === executed) {
                        return {
                            ...member,
                            alive: false
                        };
                    }
                    return member;
                });
                
                updateMembers(updatedMembers);
                setExecutionResult({
                    player: executed,
                    saved: false,
                    message: `${executed} đã bị treo cổ bởi dân làng!`
                });
            }
        } else if (result.executedPlayers.length > 1) {
            setExecutionResult({
                player: null,
                saved: true,
                message: `Có sự hoà trong cuộc bỏ phiếu, không ai bị xử tử!`
            });
        }
    };
    
    const skipTrial = () => {
        setVotingComplete(true);
        setVotingResults({
            voteCounts: {},
            executedPlayers: []
        });
        setExecutionResult({
            player: null,
            saved: true,
            message: "Dân làng quyết định không xét xử ai hôm nay."
        });
    };
    
    return (
        <div className="event-container trial-event">
            <h3>Phiên tòa Xét xử</h3>
            <p>Dân làng quyết định có nên xử tử ai đó không.</p>
            
            {!currentVoter && !votingComplete && (
                <div className="trial-intro">
                    <p>Từ ngày thứ 4 trở đi, dân làng có thể xét xử và treo cổ một người mỗi ngày.</p>
                    <div className="trial-buttons">
                        <button className="start-voting-button" onClick={startVoting}>
                            Bắt đầu bỏ phiếu
                        </button>
                        <button className="skip-trial-button" onClick={skipTrial}>
                            Bỏ qua phiên xét xử
                        </button>
                    </div>
                </div>
            )}
            
            {currentVoter && !votingComplete && (
                <div className="voting-phase">
                    <h4>{currentVoter.name} đang bỏ phiếu</h4>
                    <p>Chọn một người để kết tội:</p>
                    
                    <div className="voting-targets">
                        {aliveMembers.filter(m => m.name !== currentVoter.name).map(target => (
                            <div 
                                key={target.name}
                                className="voting-target"
                                onClick={() => handleVote(target.name)}
                            >
                                <p>{target.name}</p>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className="abstain-button"
                        onClick={() => handleVote("abstain")}
                    >
                        Bỏ phiếu trắng
                    </button>
                </div>
            )}
            
            {votingComplete && (
                <div className="trial-results">
                    <h4>Kết quả bỏ phiếu</h4>
                    
                    <div className="vote-tally">
                        {Object.entries(votingResults.voteCounts).filter(([name]) => name !== "abstain").map(([name, count]) => (
                            <div key={name} className="vote-count">
                                <p>{name}: {count} phiếu</p>
                            </div>
                        ))}
                        
                        {votingResults.voteCounts["abstain"] && (
                            <div className="vote-count">
                                <p>Bỏ phiếu trắng: {votingResults.voteCounts["abstain"]} phiếu</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="execution-result">
                        <p className={executionResult.saved ? "saved" : "executed"}>
                            {executionResult.message}
                        </p>
                    </div>
                    
                    <button className="finish-button" onClick={onFinish}>
                        Kết thúc phiên tòa
                    </button>
                </div>
            )}
        </div>
    );
}

export default TrialEvent;
