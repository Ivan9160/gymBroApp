import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup, Badge, Button, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Workout {
  id: number;
  createdAt: Date;
  finishedAt: Date;
  sets: {
    id: number;
    weight: number;
    reps: number;
    exercise: {
      id: number;
      name: string;
      exerciseGroup: {
        id: number;
        name: string;
      };
    };
  }[]
};



const WorkoutHistory =  () => {
  const user = useSelector((state: any) => state.user);
  const [history, setHistory] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/workout/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched workout history:", response.data);
        setHistory(response.data.sort((a: Workout, b: Workout) => 
          new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
        ));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user.id) fetchHistory();
  }, [user.id]);

  const displayDate = (startDateFromServer: string, endDateFromServer: string) => {
    const startDate = new Date(startDateFromServer);
    const endDate = new Date(endDateFromServer);
    const hours = Math.floor((endDate.getTime() - startDate.getTime()) / 3600000);
    const minutes = Math.round(((endDate.getTime() - startDate.getTime()) % 3600000) / 60000);
    return startDate.toLocaleDateString()+", Started at "
    +startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })+ ". Duration: "
    +(hours>0?hours+"h ": "")+minutes+"min";
  }


  if (loading) {
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
            {history.length === 0 ? (
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
              history.map((workout, index) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden">
                    <Card.Header className="bg-white border-bottom-0 pt-3 px-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small fw-bold text-uppercase tracking-wider">
                          {
                            
                         displayDate(workout.createdAt.toString(), workout.finishedAt.toString())

                          }
                        </span>
                        <Badge bg="primary" pill>
                          {workout.sets.length} Sets
                        </Badge>
                      </div>
                    </Card.Header>
                    <Card.Body className="px-4 pb-4">
                      <ListGroup variant="flush">
                        {workout.sets.length > 0 ? (
                          workout.sets.slice(0, 3).map((set, index) => (
                            <ListGroup.Item key={set.id} className="px-0 py-2 border-0 d-flex justify-content-between">
                              <span className="text-dark">Exercise# {index + 1}: {set.exercise.name}</span>
                              <span className="fw-bold">
                                {(set.weight>0 ? set.weight + " kg x ":"Bodyweight x ") +set.reps}
                              </span>
                            </ListGroup.Item>
                          ))
                        ) : (
                          <span className="text-muted italic">Empty workout</span>
                        )}
                        {workout.sets.length > 3 && (
                          <div className="text-center mt-2">
                            <small className="text-muted">and {workout.sets.length - 3} more...</small>
                          </div>
                        )}
                      </ListGroup>
                    </Card.Body>
                  </Card>
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