import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, ListGroup, Button } from "react-bootstrap";
import LogoutButton from "./logout";

function Account() {
    const user = useSelector((state: any) => state.user);

        return (
        <Container className="py-5 ">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                        <Card.Header className="bg-primary text-white text-center py-4">
                            <h2 className="mb-0">Profile</h2>
                        </Card.Header>
                        
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h3 className="fw-bold">{user.name}</h3>
                                <p className="text-muted">{user.email}</p>
                            </div>

                            <ListGroup variant="flush" className="mb-4">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">Age:</span>
                                    <span className="fw-bold">{user.age || '—'} years</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">Gender:</span>
                                    <span className="fw-bold text-capitalize">{user.gender || '—'}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">Height:</span>
                                    <span className="fw-bold">{user.height || '—'} cm</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">Weight:</span>
                                    <span className="fw-bold">{user.weight || '—'} kg</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">Goal:</span>
                                    <span className="fw-bold text-success text-capitalize">{user.goal || '—'}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <div className="d-grid gap-2">
                                <Link to="/exercise-creator" className="text-decoration-none d-grid">
                                    <Button variant="outline-primary" className="rounded-pill">
                                        + Create Exercise
                                    </Button>
                                </Link>
                                <Link to="/editProfile" className="text-decoration-none d-grid">
                                    <Button variant="outline-primary" className="rounded-pill">
                                        Edit Profile
                                    </Button>
                                </Link>
                                <hr />
                                <LogoutButton />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;