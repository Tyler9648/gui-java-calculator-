import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function Navbar1() {
  
        return(
 <div>
  <Navbar bg="dark" variant="dark" > 
      
      <Container>
        <Navbar.Brand className = "babyblackjack" href="/" >Babyblackjack  </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link className = "login" href="/login">login</Nav.Link>
           
            
            <Nav.Link href="/registration">signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>




 </div>
        );
    }


export default Navbar1;







