import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardsData from "./CardsData";
import { useDispatch } from "react-redux";
import {ADD} from '../redux/actions/action.js'

import "./style.css";

function Cards() {
  const [data, setData] = useState(CardsData);
  const dispatch = useDispatch();

  const sendData = (e) => {
    // console.log(e);
    dispatch(ADD(e)); // Dispatch the action to add the selected project to the cart state.


  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Projects</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <Card
              style={{ width: "22rem", border: "none" }}
              className="mx-2 mt-3 card_style"
            >
              <Card.Img
                variant="top"
                src={element.imgdata}
                style={{ height: "18rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{element.rname}</Card.Title>
                <Card.Text>Price: ₹ {element.price}</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    onClick={() => sendData(element)}
                    variant="primary"
                    className="col-lg-12"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
