import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import {DELETE} from "../redux/actions/action"
import { useDispatch } from "react-redux";

function Header() {
  const getData = useSelector((state) => state.cartReducer.carts);
  const [price,setPrice]=useState(0);
  console.log(price);
  console.log(getData);
  const [cartMenu, setCartMenu] = useState(null);

  const handleCartClick = (event) => {
    setCartMenu(event.currentTarget); // Set anchorEl to the clicked element
    console.log("You clicked on cart icon", event);
  };
  const dispatch = useDispatch();

  const del=(id)=>{
    dispatch(DELETE(id))
  }
  const total=()=>{
    let price=0;
    getData.map((ele,key)=>{
      price+= ele.price;
    })
    setPrice(price);
  }

  useEffect(() =>{
    total();
  },[total]);

  const handleClose = () => {
    setCartMenu(null); // Close the menu
  };

  const open = Boolean(cartMenu); // Menu open condition based on cartMenu state

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <div>
            <Badge
              badgeContent={getData.length}
              color="primary"
              style={{ cursor: "pointer" }}
              onClick={handleCartClick} // Open the cart menu when clicked
            >
              <i
                className="fa-solid fa-cart-shopping text-light"
                style={{ fontSize: 25, cursor: "pointer" }}
              ></i>
            </Badge>
          </div>

          {/* Menu that opens when the cart icon is clicked */}
          <Menu
            id="basic-menu"
            anchorEl={cartMenu} // anchorEl is the element triggering the menu
            open={open} // Menu is open when cartMenu is set
            onClose={handleClose} // Close the menu when clicked outside
          >
            {getData.length ? (
              <div
                className="card_details"
                style={{ width: "24rem", padding: 10 }}
              >
                <Table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Restaurant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getData.map((e) => {
                      return (
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`}  onClick={handleClose}>    <img
                              src={e.imgdata}
                              alt="Card image cap"
                              style={{
                                height: "5rem",
                                width: "5rem",
                                objectFit: "cover",
                              }}
                              
                            /></NavLink>
                        
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price: ₹ {e.price}</p>
                            <p>Quantity: {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={()=>del(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={()=>del(e.id)}
                            >
                              {" "}
                              <i className="fas fa-trash largetrash"></i>
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                    <p className="text-center"> Total: ₹ {price}</p>
                  </tbody>
                </Table>
              </div>
            ) : (
              <div
                className="card_details d-flex justify-content-center align-items-center"
                style={{ width: "20rem", padding: 10, position: "relative" }}
              >
                <i
                  className="fas fa-close smallclose"
                  style={{
                    position: "absolute",
                    top: -5,
                    right: 10,
                    fontSize: 23,
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                ></i>

                <p style={{ fontSize: 22 }}>Your cart is empty</p>

                <img src="./cart.gif" className=" emptycart_img mx-4"></img>
              </div>
            )}
          </Menu>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
