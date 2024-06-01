import React, {useEffect, useRef} from 'react';
import groundImage from '../assets/images/Ground.png';
import skyImage from '../assets/images/Sky.png';

const BackgroundCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        const ctx = canvas.getContext('2d');

        const ground = new Image();
        const sky = new Image();

        ground.src = groundImage;
        sky.src = skyImage;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = ctx.createPattern(sky, 'repeat-x');
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);


            ctx.fillStyle = ctx.createPattern(ground, 'repeat-x');
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} height={200}></canvas>;
};

export default BackgroundCanvas;
