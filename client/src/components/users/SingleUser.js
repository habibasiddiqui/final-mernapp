import React from "react";
import { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/users/" + id)
      .then((res) => res.json())
      .then((data) => setUser(data.data))
      .catch((err) => console.log(err));
  }, [id]);
  // console.log(user);

  return (
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          <ListGroup.Item variant="primary" className="col-headers">
            Selected User information
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Row>
              <Col className="col-headers">ID</Col>
              <Col>{user?._id}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Name</Col>
              <Col>{user?.name}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Email</Col>
              <Col>{user?.email}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Password</Col>
              <Col>{user?.pwd}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
  );
};

export default SingleUser;
