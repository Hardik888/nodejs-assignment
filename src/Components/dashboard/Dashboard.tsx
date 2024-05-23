import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import User from "../assets/user-icon-original.svg";
import "./Dashboard.css";
import fetch from "../../api/fetch";

export type Fetch = {
  username: string;
  email: string;
  dob: string;
};

const UserInfoDashboard = () => {
  const [userInfo, setUserInfo] = useState<Fetch | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch();
        setUserInfo(response);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container className="mt-5">
      <Row>
        <Card className="card">
          <Card.Header as="h5" className="card-header">
            User Information
          </Card.Header>
          <Card.Body className="card-body">
            {userInfo ? (
              <>
                <Row className="mb-3">
                  <Col md={3} className="text-center">
                    <img src={User} alt="User Icon" className="user-image" />
                  </Col>
                  <Col md={9}>
                    <Card.Title className="card-title">
                      {userInfo.username}
                    </Card.Title>
                    <Card.Text className="card-text">
                      <strong> Email - </strong>
                      {userInfo.email}
                    </Card.Text>
                    <Card.Text className="card-text">
                      <strong> Date of Birth - </strong> {userInfo.dob}
                    </Card.Text>
                  </Col>
                </Row>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default UserInfoDashboard;
