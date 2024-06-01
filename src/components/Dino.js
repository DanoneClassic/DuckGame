import React, { useEffect, forwardRef } from 'react';
import GameObject from './GameObject';
import '../assets/css/entity/Dino.css';

const Dino = forwardRef(({ isJumping }, ref) => {
    useEffect(() => {
        if (isJumping) {
            ref.current.style.transition = 'bottom 0.4s ease-out';
            ref.current.style.bottom = '150px';
        } else {
            ref.current.style.transition = 'bottom 0.4s ease-in';
            ref.current.style.bottom = '48px';
        }
    }, [isJumping, ref]);

    return (
        <GameObject ref={ref} className="dino" />
    );
});

export default Dino;