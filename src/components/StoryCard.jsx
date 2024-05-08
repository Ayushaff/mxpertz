import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const StoryCard = ({ story }) => {
  return (
    <Card className="p-1">
      <Card.Img
        variant="top"
        src={`https://ik.imagekit.io/dev24/${story.Image}`}
      />
      <Card.Body>
        <Card.Text>{story.Title}</Card.Text>
        <Button variant="light" className="rounded-pill">
          {story.Status}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StoryCard;
