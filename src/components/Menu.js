import React from 'react';
import '../assets/css/common/menu.css';

const Menu = ({ startGame, viewStats }) => {
    const [nickname, setNickname] = React.useState(localStorage.getItem('nickname') || '');
    const [isChangingNickname, setIsChangingNickname] = React.useState(false);

    const handleStart = () => {
        if (nickname.trim()) {
            localStorage.setItem('nickname', nickname);
            startGame(nickname);
            window.history.pushState({ page: 'game' }, '', '/game');
        } else {
            alert('Please enter a nickname');
        }
    };

    const handleChangeNickname = () => {
        setIsChangingNickname(true);
        localStorage.removeItem('nickname');
    };

    const handleViewStats = () => {
        viewStats();
        window.history.pushState({ page: 'stats' }, '', '/stats');
    };

    return (
        <div className="menu">
            <h2>Dino Game</h2>
            {isChangingNickname || !nickname ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter your nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={handleStart}>Start Game</button>
                </>
            ) : (
                <>
                    <p>Welcome back, {nickname}!</p>
                    <button onClick={handleStart}>Start Game</button>
                    <button onClick={handleChangeNickname}>Change Nickname</button>
                </>
            )}
            <button onClick={handleViewStats}>View Stats</button>
        </div>
    );
};

export default Menu;