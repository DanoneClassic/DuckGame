import React, { useEffect, useState } from 'react';
import '../assets/css/common/stats.css';

const Stats = ({ goBack }) => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const storedStats = JSON.parse(localStorage.getItem('stats')) || [];
        setStats(storedStats);
    }, []);

    return (
        <div className="stats">
            <h2>Game Stats</h2>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        {stat.nickname}: {stat.score}
                    </div>
                ))}
            </div>
            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default Stats;
