import React, { useState, useEffect, useRef, useCallback } from 'react';
import Dino from './Dino';
import Obstacle from './Obstacle';
import './../assets/css/Game.css';
import jumpSound from '../assets/jump.mp3';

const Game = ({ nickname, showMenu }) => {
    const [isJumping, setIsJumping] = useState(false);
    const [isOnGround, setIsOnGround] = useState(true);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(5);
    const [MIN_DISTANCE_BETWEEN_OBSTACLES, setMIN_DISTANCE_BETWEEN_OBSTACLES] = useState(500);
    const [isGameRunning, setIsGameRunning] = useState(true);
    const dinoRef = useRef();
    const audioRef = useRef(null);

    const handleKeyDown = useCallback((e) => {
        if ((e.code === 'Space' || e.code === 'ArrowUp') && isOnGround && !isJumping) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsJumping(true);
            setIsOnGround(false);
            setTimeout(() => setIsJumping(false), 350);
        }
    }, [isOnGround, isJumping]);

    useEffect(() => {
        if (!isJumping && !isOnGround) {
            setTimeout(() => setIsOnGround(true), 350);
        }
    }, [isJumping, isOnGround]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (isGameRunning) {
            const interval = setInterval(() => {
                setObstacles((prev) => {
                    const newObstacles = prev
                        .map(obstacle => ({
                            ...obstacle,
                            x: obstacle.x - speed
                        }))
                        .filter(obstacle => obstacle.x > -50);

                    const lastObstacle = newObstacles[newObstacles.length - 1];
                    const distanceToLastObstacle = lastObstacle ? window.innerWidth - lastObstacle.x : Infinity;

                    if (Math.random() < 0.02 && distanceToLastObstacle > MIN_DISTANCE_BETWEEN_OBSTACLES) {
                        newObstacles.push({
                            type: `obstacle${Math.floor(Math.random() * 3) + 1}`,
                            x: window.innerWidth
                        });
                    }

                    return newObstacles;
                });

                setScore((prev) => prev + 0.01);
            }, 15);

            return () => clearInterval(interval);
        }
    }, [MIN_DISTANCE_BETWEEN_OBSTACLES, isGameRunning, speed]);

    useEffect(() => {
        const dino = dinoRef.current;
        if (dino) {
            const dinoRect = dino.getBoundingClientRect();
            const collision = obstacles.some(obstacle => {
                const obstacleRect = document.querySelector(`.${obstacle.type}`).getBoundingClientRect();
                return (
                    dinoRect.x < obstacleRect.x + obstacleRect.width - 10 &&
                    dinoRect.x + dinoRect.width - 10  > obstacleRect.x &&
                    dinoRect.y < obstacleRect.y + obstacleRect.height - 10 &&
                    dinoRect.y + dinoRect.height - 10  > obstacleRect.y
                );
            });

            if (collision) {
                const finalScore = Math.floor(score);
                const stats = JSON.parse(localStorage.getItem('stats')) || [];
                stats.push({ nickname, score: finalScore });
                localStorage.setItem('stats', JSON.stringify(stats));

                alert(`Game Over, ${nickname}! Your score was ${finalScore}.`);
                setIsGameRunning(false);
                setScore(0);
                setObstacles([]);
                setSpeed(5);
                showMenu();
            }
        }
    }, [obstacles, nickname, score, showMenu]);

    useEffect(() => {
        setSpeed(3 + Math.floor(score / 5));
        setMIN_DISTANCE_BETWEEN_OBSTACLES(500 + Math.floor(score / 50));
    }, [score]);

    return (
        <div className="game">
            <audio ref={audioRef} src={jumpSound} />
            {isGameRunning && (
                <>
                    <Dino isJumping={isJumping} ref={dinoRef} />
                    {obstacles.map((obstacle, index) => (
                        <Obstacle key={index} type={obstacle.type} x={obstacle.x} />
                    ))}
                    <div className="score">Score: {Math.floor(score)}</div>
                </>
            )}
        </div>
    );
};

export default Game;