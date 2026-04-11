import { motion, useAnimation } from "framer-motion";
import { ListGroup } from "react-bootstrap";
import type { Set } from "../../types";
import { useTranslation } from "react-i18next";

interface Props {
  set: Set;
  exerciseName: string | undefined;
  setNumber?: number;
  onDelete: (id: number) => void;
}

export const SwipeableSetItem = ({ set, exerciseName, setNumber, onDelete }: Props) => {
  const controls = useAnimation();
  const { t, i18n } = useTranslation();

  const handleDragEnd = async (_: any, info: any) => {
    if (info.offset.x < -150) {
      await controls.start({ x: "-100%", opacity: 0 });
      onDelete(set.id!);
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "8px", background: "#dc3545", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        paddingRight: "20px",
        color: "white",
        fontWeight: "bold"
      }}>
        {t('active_workout.swipe_to_delete')}
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -200, right: 0 }} 
        dragElastic={0.1} 
        animate={controls}
        onDragEnd={handleDragEnd}
        style={{ zIndex: 2, position: "relative" }}
      >
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center bg-white border shadow-sm m-0"
          style={{ minHeight: "60px", cursor: "grab" }}
        >
          <div className="text-start">
            <strong className="text-primary">{exerciseName}</strong>
            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
              {set.weight === 0 ? t('set_item.bodyweight') : `${set.weight} ${t('workout_details.table.kg')}`} x {set.reps}
            </div>
          </div>
          <span className="badge bg-primary rounded-pill">{t('set_item.set_label')} {setNumber}</span>
        </ListGroup.Item>
      </motion.div>
    </div>
  );
};