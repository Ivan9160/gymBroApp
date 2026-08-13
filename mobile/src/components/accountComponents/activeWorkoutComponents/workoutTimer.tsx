import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "../../style/accountStyles";

export const WorkoutTimer = () => {
    const createdAt = useSelector(
        (state: any) => state.workout.startTime
    );

    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        if (!createdAt) {
            return;
        }

        const startTime = new Date(createdAt).getTime();

        const updateTimer = () => {
            const diff = Math.floor(
                (Date.now() - startTime) / 1000
            );

            setSecondsElapsed(diff > 0 ? diff : 0);
        };

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [createdAt]);

    if (!createdAt) {
        return null;
    }

    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;

    const formattedTime = [
        hours,
        minutes,
        seconds,
    ]
        .map((value) => value.toString().padStart(2, "0"))
        .join(":");

    return (
        <Text style={styles.sectionLabel}>
            {formattedTime}
        </Text>
    );
};