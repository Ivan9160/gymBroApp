import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetWorkoutsQuery} from "../../api/workoutHistoryApi";
import type { Workout } from "../../types";
import { WorkoutHistoryItem } from "./historyItem";



const WorkoutHistory =  () => {
  const {data: workoutHistory = [], isLoading} = useGetWorkoutsQuery();

  
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
                &larr; Back
              </Button>
            </Link>
            <h2 className="fw-bold mb-0 text-white">Workout History</h2>
          </div>

          <AnimatePresence>
            {workoutHistory.length === 0 ? (
              <Card className="text-center p-5 border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="text-muted">No workouts found</h4>
                  <p>Time to hit the gym!</p>
                  <Link to="/account">
                    <Button variant="success" className="rounded-pill px-4">
                      Start First Workout
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