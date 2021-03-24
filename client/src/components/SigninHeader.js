import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" className='brand'>
        MERN App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link className='navlink' as={Link} to="/users">
            Users
          </Nav.Link>
          <Nav.Link className='navlink' as={Link} to="/register">
            Register
          </Nav.Link> */}

          <Nav.Link className='navlink' as={Link} to="/posts">
            Posts
          </Nav.Link>
          <Nav.Link className='navlink' as={Link} to="/add-post">
            Add Post
          </Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          <Nav.Link className='navlink' as={Link} to="/signout">
            Sign Out
          </Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  );
};

export default Header;
