import React, { useContext, useEffect, useState, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../../Store';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function PlaceOrder(){
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { cart, userInfo } = state;
    cart.itemsPrice = cart.cartitems.reduce((a:any, c:any) => a + c.quantity * c.price, 0) ;
    cart.shippingPrice = cart.itemsPrice > 10000 ? 2000 : 0;
    cart.taxPrice = 0.15 * cart.itemsPrice;
    cart.totalPrice = cart.itemsPrice - cart.shippingPrice + cart.taxPrice;


    const placeOrderHandler = async () => {
        try {
               cart.cartitems?.map((item:any)=>{
              axios.put(`/api/items/${item._id}`,{countInStock: item.countInStock-item.quantity},
              {headers: {Authorization: `Bearer ${userInfo.token}`}}
              )
             .catch((err)=>{console.log(err);
              })
              })
              
          const { data } = await axios.post(
            '/api/orders',
            {
              orderItems: cart.cartitems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              itemsPrice: cart.itemsPrice,
              shippingPrice: cart.shippingPrice,
              taxPrice: cart.taxPrice, 
              totalPrice: cart.totalPrice,
            },
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`,
              },
            }
          );
          localStorage.removeItem('cartitems');
          localStorage.removeItem("shippingAddress")
          localStorage.removeItem("paymentMethod")
          navigate(`/orderlist`);
          window.location.reload()

        } catch (err) {
        console.log(err)
        }
      };

    return(
        <div className="wrapper" style={{width:"50vw"}}>
        <h1>Preview Order</h1>
        <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>&#8377;{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>&#8377;{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>&#8377;{cart.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartitems.length === 0}
                    > 
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
    )
}