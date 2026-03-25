import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export const WorkoutTimer = () => {
    const createdAt = useSelector((state: any) => state.workout.startTime);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    useEffect(() => {
        if (!createdAt) return;
        const startTime = new Date(createdAt).getTime();
        const updateTimer = () =>{
            const now = Date.now();
            const diff = Math.floor((now - startTime) / 1000);
            setSecondsElapsed(diff>0? diff : 0);
        }
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [createdAt])
    if (!createdAt) return null;
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.2rem', 
            color: '#ff4757',
            fontWeight: 'bold' 
        }}>
            {formatTime(secondsElapsed)}
        </div>
    )
}