import { motion, useAnimation } from "framer-motion";
import type { ISet } from "../../../types";
import { useTranslation } from "react-i18next";

interface Props {
    set: ISet;
    exerciseName: string | undefined;
    setNumber?: number;
    onDelete: (id: number) => void;
}

export const SwipeableSetItem = ({
    set,
    exerciseName,
    setNumber,
    onDelete,
}: Props) => {
    const controls = useAnimation();
    const { t } = useTranslation();

    const handleDragEnd = async (_: unknown, info: { offset: { x: number } }) => {
        if (info.offset.x < -150) {
            await controls.start({
                x: "-100%",
                opacity: 0,
            });
            onDelete(set.id!);
            return;
        }

        controls.start({ x: 0 });
    };

    return (
        <div className="acct-swipe-item">
            <div className="acct-swipe-delete-label">
                {t("active_workout.swipe_to_delete")}
            </div>

            <motion.div
                className="acct-swipe-motion"
                drag="x"
                dragConstraints={{ left: -200, right: 0 }}
                dragElastic={0.1}
                animate={controls}
                onDragEnd={handleDragEnd}
            >
                <div className="acct-swipe-card">
                    <div className="acct-swipe-info">
                        <strong className="acct-swipe-title">
                            {t(`database.exercises.${exerciseName}`) || exerciseName}
                        </strong>

                        <div className="acct-swipe-details">
                            {set.weight === 0
                                ? t("set_item.bodyweight")
                                : `${set.weight} ${t("workout_details.table.kg")}`}{" "}
                            x {set.reps}
                        </div>
                    </div>

                    <span className="acct-swipe-badge">
                        {t("set_item.set_label")} {setNumber}
                    </span>
                </div>
            </motion.div>
        </div>
    );
};