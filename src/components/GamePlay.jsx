import { useEffect, useState } from 'react'
import "../styles/home.css"

import background from "../assets/image.png";
import Character from './game/Characters';
import Day from './game/Day';
import Night from './game/Night';

function GamePlay(props) {
    const [members, setMembers] = useState([]);
    const [isDay, setIsDay] = useState(false);
    const [day, setDay] = useState(0);
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    // Function to handle player setup completion
    const handleSetupComplete = (playerArray) => {
        setMembers(playerArray);
        setIsDay(true);
        setIsSetupComplete(true);
    };

    // Function to toggle between day and night phases
    const toggleDayNight = () => {
        if (isDay) {
            setDay(day + 1);
        }
        setIsDay(!isDay);
    };

    return (
        <div className='home'>
            {!isSetupComplete ? (
                // Character selection screen
                <Character setPlayers={handleSetupComplete} />
            ) : (
                // Game screen (Day or Night)
                isDay ? (
                    <Day date={day} members={members} onEnd={() => toggleDayNight()} />
                ) : (
                    <Night date={day} members={members} onEnd={() => toggleDayNight()} />
                )
            )}
        </div>
    );
}

export default GamePlay;
