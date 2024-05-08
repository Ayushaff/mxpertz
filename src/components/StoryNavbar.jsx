import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const StoryNavbar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="justify-content-between"
    >
      <Navbar.Brand href="/">BrainyLingo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto ">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Leaderboard</Nav.Link>
          <Nav.Link href="#link">Word Explorer</Nav.Link>
          <Nav.Link href="#link">Daily Quest</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <div>       
        <Button variant="outline-primary btn-gradient text-white rounded-pill px-3">
          Sign Out
        </Button>
      </div>
    </Navbar>
  );
};

export default StoryNavbar;
