import React from 'react';
import GameObject from './GameObject';
import '../assets/css/entity/Obstacle.css';

const Obstacle = ({ type = 'obstacle1', x }) => (
    <GameObject className={`obstacle ${type}`} style={{ left: `${x}px` }} />
);

export default Obstacle;