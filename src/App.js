import React, { useState } from 'react';
import './assets/css/App.css';
import './assets/css/common/footer.css';
import './assets/css/common/header.css';
import Game from './components/Game';
import Menu from './components/Menu';
import Stats from './components/Stats';

function App() {
    const [showMenu, setShowMenu] = useState(true);
    const [showStats, setShowStats] = useState(false);
    const [nickname, setNickname] = useState('');

    const startGame = (nickname) => {
        setNickname(nickname);
        setShowMenu(false);
        setShowStats(false);
    };

    const viewStats = () => {
        setShowStats(true);
        setShowMenu(false);
    };

    const goBackToMenu = () => {
        setShowMenu(true);
        setShowStats(false);
    };

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/src/components/server-worker.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Duck Game</h1>
                {!showMenu && !showStats && <button onClick={() => setShowMenu(true)}>Exit</button>}
            </header>
            <main>
                {showMenu ? (
                    <Menu startGame={startGame} viewStats={viewStats} />
                ) : showStats ? (
                    <Stats goBack={goBackToMenu} />
                ) : (
                    <Game nickname={nickname} showMenu={goBackToMenu} />
                )}
            </main>
            <footer>
                <p>Kaj Danil Krapivin</p>
            </footer>
        </div>
    );
}

export default App;
