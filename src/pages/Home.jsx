import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import StoryNavbar from "../components/StoryNavbar";
import DesignOne from "./DesignOne";
import DesignTwo from "./DesignTwo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const handlePrevious = () => {
    nav(`/`);
  };

  const handleNext = () => {
    nav(`/design-two/`);
  };

  return (
    <Container className="" style={{ backgroundColor: "black" }}>
      <StoryNavbar />
      <div className="">
        <Row className="p-1">
          <Col>
            <Col>
              {currentPage === 1 && <DesignOne />}
              {currentPage === 2 && <DesignTwo />}
            </Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex justify-content-between">
              <p
                onClick={handlePrevious}
                className="text-color fs-2 font-semibold"
                style={{ cursor: "pointer" }}
              >
                Back
              </p>
              <p
                onClick={handleNext}
                className="text-color fs-2 font-semibold"
                style={{ cursor: "pointer" }}
              >
                Next
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          {error && (
            <p className="text-danger">
              Error fetching data. Please try again.
            </p>
          )}
        </Col>
      </Row>
      <p className="text-light text-center">
        <a
          href="https://github.com/Ayushaff/mxpertz-frontend-task"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light"
        >
          Github repo
        </a>
      </p>
    </Container>
  );
};

export default Home;
