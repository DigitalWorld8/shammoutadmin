import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

const CountdownChip: React.FC = () => {
    const { expiresOn } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(0);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (!expiresOn) return;

        const targetTime = new Date(expiresOn).getTime();

        const updateTime = () => {
            const diff = targetTime - Date.now();
            if (diff <= 0) {
                setExpired(true);
                setTimeLeft(0);
                localStorage.removeItem('token');
                navigate('/auth/boxed-signin');
            } else {
                setTimeLeft(diff);
            }
        };

        updateTime(); // Run once immediately
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [expiresOn, navigate]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const days = Math.floor(totalSeconds / 86400);

        const parts = [];
        if (days) parts.push(`${days}d`);
        if (hours || days) parts.push(`${hours}h`);
        if (minutes || hours || days) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        return parts.join(' ');
    };

    return (
        <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold 
        ${expired ? 'bg-gray-400' : 'bg-rose-600'}`}>
            {expired ? 'Expired' : `Expires in: ${formatTime(timeLeft)}`}
        </div>
    );
};

export default CountdownChip;
