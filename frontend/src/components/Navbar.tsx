import { Button, Container, Navbar as NavbarBs } from "react-bootstrap"
import Badge from "react-bootstrap/Badge";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Store } from "../Store";
import { SearchItem } from "./SearchItem";
export function Navbar(props: { len: any; }) { 
  const navigate = useNavigate()
  const { state } = useContext(Store);
  const { cart  } = state;  
  const User = localStorage.getItem("HasUser")?localStorage.getItem("HasUser"):null
  const Admin = localStorage.getItem("isAdmin")?true:false
  
 

  const SignoutHandler=()=>{
    navigate('/')
    localStorage.removeItem("HasUser")
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartitems")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    window.location.reload()
   
  }


  
  return (
    <NavbarBs sticky="top"  bg="dark" variant="dark" className=" shadow-sm ">
        
        <Nav style={{marginLeft:"25px"}} className="me-auto">
          <Button variant="dark">
                 <i className="fas fa-bars"></i>
          </Button>
          <Nav.Link className="me-3" to="/" as={NavLink}>
            Home
          </Nav.Link>
         
        </Nav>

        {
          User ? (
          <NavDropdown title={User} style={{color:"white",marginRight:"6px"}} className="  text-center " >
          <LinkContainer to="/profile">
            <NavDropdown.Item>User Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/orderlist">
            <NavDropdown.Item>My Orders</NavDropdown.Item>
          </LinkContainer>
          <Nav.Link to="/" className="mt-2" style={{marginLeft:15}}  onClick={SignoutHandler} as={NavLink}>
            Signout
          </Nav.Link>
          </NavDropdown>
          ) :
          (<Nav.Link style={{marginRight:10,color:"white"}}   to="/signup" as={NavLink}>
         SignUp
          </Nav.Link>)
        }

        {  cart.cartitems.length > 0 && (
          <Button  style={{color:"white"}} variant="dark">
         <Nav.Link to="/cart" as={NavLink}>
              Cart
              { <Badge style={{marginLeft:5}} bg="primary">{cart.cartitems.length}</Badge>}
          </Nav.Link>
        </Button>
        )}
        
        { Admin && (
                    <NavDropdown title="Admin" style={{marginRight:15, color:"white"}} className="text-center  " id="admin-nav-dropdown">
                       <LinkContainer to="/users">
                        <NavDropdown.Item>Users Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/pro">
                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
         <SearchItem />
      
    </NavbarBs>
  )
}
