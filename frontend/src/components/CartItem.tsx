import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";
import {  useState } from "react";
import './Item.css'


export function CartItem({ item }: any) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart  } = state;
  const navigate = useNavigate();
  const getItemQuantity = (id: number) => {
    return (
      cart.cartitems.find((items: { _id: any }) => items._id === item._id)?.quantity || 0
    );
  };
  const [quantity, setquantity] = useState<number>(getItemQuantity(item._id));
  const removeFromCart = (item:any) => {
    item = (cart.cartitems.find((items: { _id: number }) => items._id == item._id));
    setquantity(0)
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: {...item} });
  };
  const incCartQuantity = (item:any) => {
    (cart.cartitems.find((items: { _id: number }) => items._id == item._id)).quantity+=1;
    item = (cart.cartitems.find((items: { _id: number }) => items._id == item._id)); 
    setquantity(getItemQuantity(item._id))
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {...item}
    })
  };
  const decCartQuantity = (item:any) => {
    (cart.cartitems.find((items: { _id: number }) => items._id == item._id)).quantity-=1;
    item = (cart.cartitems.find((items: { _id: number }) => items._id == item._id)); 
    setquantity(getItemQuantity(item._id))
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {...item}
    })
  };
 
  return (
    <div className="mb-3" style={{padding:10}}>
    <Card>
    <Card.Img variant="top" src={item.image} height="300px" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-1">
          {item.title}
        </Card.Title>
        <Card.Text>&#8377;{item.price}</Card.Text>
        <div
          
          className="mt-auto"
        >
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button variant="warning" onClick={() => decCartQuantity(item)} disabled={quantity===1}>
                  -
                </Button>

                <div>{quantity}</div>

                <Button variant="warning" onClick={() => incCartQuantity(item)} disabled={quantity===item.countInStock}>
                  +
                </Button>

                <Button
                  onClick={() => removeFromCart(item)}
                  style={{ marginLeft: 90 }}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
        </div>
      </Card.Body> 
    </Card>
    </div>

  );
}