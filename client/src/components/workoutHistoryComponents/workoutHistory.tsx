import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetWorkoutsQuery} from "../../api/workoutHistoryApi";
import type { Workout } from "../../types";
import { WorkoutHistoryItem } from "./historyItem";
import { useTranslation } from "react-i18next";



const WorkoutHistory =  () => {
  const {data: workoutHistory = [], isLoading} = useGetWorkoutsQuery();
  const {t} = useTranslation();
  
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="d-flex align-items-center mb-4">
            <Link to="/account">
              <Button variant="link" className="text-decoration-none p-0 me-3 text-primary">
                &larr; {t('workout_history.back_to_account')}
              </Button>
            </Link>
            <h2 className="fw-bold mb-0 text-white">{t('workout_history.title')}</h2>
          </div>

          <AnimatePresence>
            {workoutHistory.length === 0 ? (
              <Card className="text-center p-5 border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="text-muted">{t('workout_history.empty_title')}</h4>
                  <p>{t('workout_history.empty_message')}</p>
                  <Link to="/account">
                    <Button variant="success" className="rounded-pill px-4">
                      {t('workout_history.start_first_workout')}
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ) : (
              workoutHistory.map((workout: Workout, index : number) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WorkoutHistoryItem workout={workout} />
                  
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkoutHistory;