import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import type { Workout } from "../../types";
import { useNavigate } from "react-router-dom";

export const WorkoutHistoryItem = ({ workout }: { workout: Workout }) => {
  const navigate = useNavigate();
  const displayDate = (startDateFromServer: string, endDateFromServer: string) => {
      const startDate = new Date(startDateFromServer);
      const endDate = new Date(endDateFromServer);
      const hours = Math.floor((endDate.getTime() - startDate.getTime()) / 3600000);
      const minutes = Math.round(((endDate.getTime() - startDate.getTime()) % 3600000) / 60000);
      return startDate.toLocaleDateString()+", Started at "
      +startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })+ ". Duration: "
      +(hours>0?hours+"h ": "")+minutes+"min";
    }
  return (
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
                      workout.sets.slice(0, 3).map((set: any, index: number) => (
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
                  <Card.Footer className="bg-white border-top-0 px-4 pb-3 d-grid">
                  <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="rounded-pill fw-bold"
                      onClick={() => navigate(`/history/review`, { state: { workout } })}
                  >
                      View Detailed Review
                  </Button>
            </Card.Footer>
              </Card>
    )
};