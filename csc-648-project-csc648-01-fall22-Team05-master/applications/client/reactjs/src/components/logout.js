import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



function NavbarLogout() {
  const logout = () => {
  if(localStorage.getItem("authenticated")){
  localStorage.setItem("authenticated".false);
  localStorage.removeItem("user");
  } else {
  console.log("why are u trying to logout? youre not even logged in!");
  }

  }

        return(
 <div>
  <Navbar bg="dark" variant="dark" > 
      
      <Container>
        <Navbar.Brand className = "babyblackjack" href="/" >Babyblackjack  </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
           
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item href="/">
                
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>




 </div>
        );
    }


export default NavbarLogout;