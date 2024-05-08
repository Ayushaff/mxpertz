import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Spinner } from "react-bootstrap";
import DesignTwo from "./DesignTwo";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const DesignOne = ({}) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://child.onrender.com/api/sciencefiction")
      .then((res) => {
        setStories(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err, "err in fetching");
        setLoading(false);
        setError(err);
      });
  };

  const navigate = useNavigate();

  const filterStories = (status) => {
    setSelectedStory(null); // Reset selected story when filter changes
    setSelectedStatus(status?.toLowerCase()); // Convert to lowercase
  };

  const filteredStories = selectedStatus
    ? stories.filter((story) => story.Status?.toLowerCase() === selectedStatus)
    : stories;

  const handleClick = (story) => {
    setSelectedStory(story); // Set selected story when a card is clicked
    navigate(`/design-two/${story._id}`);
  };

  return (
    <Container>
      <div className="p-1 align-item-center">
        <h1 className="text-center mt-4 text-light">Science Fiction Stories</h1>
        <div className="d-flex justify-content-around">
          <Button
            variant="primary"
            className="px-3 fs-4 rounded-pill  "
            onClick={() => filterStories("New")}
          >
            New
          </Button>
          <Button
            variant="warning"
            className="rounded-pill text-light fs-4"
            onClick={() => filterStories("In Progress")}
          >
            In Progress
          </Button>
          <Button
            variant="success"
            className="rounded-pill fs-4"
            onClick={() => filterStories("Completed")}
          >
            Completed
          </Button>
          <Button
            variant="Info"
            className="rounded-pill text-light fs-4 btn-gradient"
            onClick={() => setSelectedStatus(null)}
          >
            Clear All
          </Button>
        </div>
      </div>
      <div style={{ minHeight: "67vh", alignContent: "center" }}>
        {loading ? ( // Show spinner when loading is true
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="mt-4 ">
            {filteredStories?.map((story) => (
              <div
                className="col-md-3 mb-4 d-flex align-items-stretch "
                key={story._id}
                style={{ cursor: "pointer" ,}}
                onClick={() => handleClick(story)}
              >
                <Card
                  className="custom-card bg-card rounded-5xl"
                  style={{
                    transform: "scale(0.9)",
                    transition: "all 0.3s ease-in-out",
                    
                    borderRadius: "20px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`https://ik.imagekit.io/dev24/${story.Image}`}
                    className="custom-card-img rounded-10xl p-2 mt-2 ml-2 mr-2 "
                    style={{ borderRadius: "20px" }}
                  />
                  <Card.Body>
                    <Card.Title className="custom-card-title text-light">
                      {story.Title||"no data found from api"}
                    </Card.Title>
                  </Card.Body>
                  <Button
                    variant="light"
                    className="rounded-pill custom-read-more-btn fw-bold m-2"
                  >
                    {story.Status}
                  </Button>
                </Card>
              </div>
            ))}
          </Row>
        )}
      </div>
      {selectedStory && <DesignTwo selectedStory={selectedStory} />}{" "}
    </Container>
  );
};

export default DesignOne;
