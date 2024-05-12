import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import designtwo from "../pages/designtwo.css";

const DesignTwo = ({ selectedStory }) => {
  const [additionalDetails, setAdditionalDetails] = useState(null);
  const [stories, setStories] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // State to track selected card
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleReadMore = () => {
    setShowContent(!showContent);
  };
  useEffect(() => {
    fetchAdditionalDetails(id);
    fetchData();
  }, [selectedStory]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://child.onrender.com/api/sciencefiction/`)
      .then((res) => {
        setStories(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching stories:", err);
      });
  };

  const fetchAdditionalDetails = (storyId) => {
    axios
      .get(`https://child.onrender.com/api/sciencefiction/${storyId}`)
      .then((res) => {
        setAdditionalDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching additional details:", err);
      });
  };

  const handleCardClick = (storyId) => {
    if (storyId !== selectedCard) {
      setSelectedCard(storyId); // Update selected card state
      fetchAdditionalDetails(storyId); // Fetch additional details for the selected story
    } else {
      setSelectedCard(null); // Deselect the card if it's already selected
      setAdditionalDetails(null); // Clear additional details
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 text-light text-color">
        The Lost City of Future Earth
      </h1>
      <div className="d-flex justify-content-around my-2">
        <Button
          variant="primary"
          className="rounded-pill px-3 btn-gradient fs-4"
        >
          Word Explorer
        </Button>
        <Button variant="warning" className="rounded-pill px-3 fs-4">
          Story Adventure
        </Button>
        <Button
          variant="gray"
          className="rounded-pill border text-light px-4 fs-4"
        >
          Brain Quest
        </Button>
      </div>
      <Row className="mt-1" style={{ minHeight: "70vh" }}>
        <Col md={4}>
          <Card className="bg-card">
            <Card.Body>
              {additionalDetails ? (
                <>
                  <Card.Title className="text-light">
                    {additionalDetails.Title}
                  </Card.Title>

                  <Card.Img
                    variant="top"
                    src={`https://ik.imagekit.io/dev24/${additionalDetails.Image}`}
                  />
                  <Card.Text className="mt-3 text-light">
                    {additionalDetails.Status}
                  </Card.Text>
                  <h2>{additionalDetails.title}</h2>
                  <p>{additionalDetails.shortDescription}</p>
                  {showContent && (
                    <div>
                      <p>{additionalDetails.fullDescription}</p>
                      <p className="mt-3 text-light">
                        This is additional content that appears when you click
                        "Read More".
                      </p>
                      <p className="mt-3 text-light"> due to no content for story in given api </p>
                    </div>
                  )}
                  <button className="text-light mt-3 btn-gradient rounded-pill" onClick={handleReadMore}>
                    {showContent ? "Read Less" : "Read More"}
                  </button>
                </>
              ) : (
                <>
                  <Card.Img
                    variant="top"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQwCtK_jI6PiJmAn8qu05LoAxHo4NB-gp3RIwlBQWkA&s"
                  />
                  <Card.Title className="mt-3 text-light">
                    No Story selected{" "}
                  </Card.Title>
                  <Card.Text className="text-light">
                    select a story to read
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        {loading ? ( // Show spinner when loading is true
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Col className="unselected-card" md={7} style={{ overflowY: "auto" }}>
            <Row>
              {stories
                ?.filter((story) => story._id !== selectedStory?._id)
                .map((story) => (
                  <Col key={story._id} xs={6} md={4} lg={3} className="mb-4">
                    {story.Title && ( // Check if the story has content before rendering the card
                      <Card
                        className={`h-100 bg-card ${
                          selectedCard === story._id ? "selected" : ""
                        }`} // Apply 'selected' class if this card is selected
                        style={{
                          cursor: "pointer",
                          background:
                            " conic-gradient(rgb(48,136,199), rgb(87,52,196), rgb(36,154,198));",
                        }}
                        onClick={() => handleCardClick(story._id)} // Handle click event
                      >
                        <Card.Img
                          variant="top"
                          src={`https://ik.imagekit.io/dev24/${story.Image}`}
                        />
                        <Card.Body>
                          <Card.Title className="text-light">
                            {story.Title}
                          </Card.Title>
                          <Card.Text className="text-light">
                            {story.Status}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                ))}
            </Row>
          </Col>
        )}
      </Row>

      {/* Back button with SVG icon */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button className="rounded-pill btn-gradient" variant="secondary" onClick={() => navigate("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 512 512"
              width="40"
              height="40"
            >
              <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
          </Button>
        </Col>
      </Row>
      <p className="text-center text-light mt-3">
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

export default DesignTwo;
