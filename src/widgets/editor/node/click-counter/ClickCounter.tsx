import React, { useState, useEffect } from 'react';
import { FaMousePointer } from 'react-icons/fa';
import './ClickCounter.scss';

interface ClickCounterProps {
    userName: string;
}

export const ClickCounter: React.FC<ClickCounterProps> = ({ userName }) => {
    const [clickCount, setClickCount] = useState<number>(0);
    const [showTooltip, setShowTooltip] = useState(false);


    useEffect(() => {
        // Start session when component mounts
        fetch('http://localhost:3000/start-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        })
            .then(response => response.json())
            .then(data => setClickCount(data.clicks))
            .catch(error => console.error('Error starting session:', error));

        // End session when component unmounts
        return () => {
            fetch('http://localhost:3000/end-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            }).catch(error => console.error('Error ending session:', error));
        };
    }, [userName]);

    const handleClick = async () => {
        await fetch('http://localhost:3000/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        })
            .then(response => response.json())
            .then(data => setClickCount(data.clicks))
            .catch(error => console.error('Error updating clicks:', error));
    };

    return (
        <button
            className="click-counter-button"
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 1000
            }}
        >
            <FaMousePointer />
            <div className={`count-tooltip ${showTooltip ? 'visible' : ''}`}>
                Total Clicks: {clickCount}
            </div>
        </button>
    );
};
