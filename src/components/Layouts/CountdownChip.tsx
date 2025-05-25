import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CountdownChipProps {
    expiresOn: string; // ISO string
}

const CountdownChip: React.FC<CountdownChipProps> = ({ expiresOn }) => {
    const targetTime = new Date(expiresOn).getTime();

    const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());
    const [expired, setExpired] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (timeLeft <= 0) {
            setExpired(true);
            localStorage.removeItem('token')
            navigate('/auth/boxed-signin')
            return;
        }

        const interval = setInterval(() => {
            const newTimeLeft = targetTime - Date.now();

            if (newTimeLeft <= 0) {
                clearInterval(interval);
                setExpired(true);
                localStorage.removeItem('token')
                navigate('/auth/boxed-signin')
            } else {
                setTimeLeft(newTimeLeft);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

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
