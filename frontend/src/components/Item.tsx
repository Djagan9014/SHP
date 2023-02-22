import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";
import {  useState } from "react";
import './Item.css'
import { isTemplateExpression } from "typescript";


export function StoreItem({ item }: any) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart  } = state;
  const [isshown,setisshown] = useState(false)
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
  
  const submitHandler = () => {
    if (localStorage.getItem("HasUser") !== null) {
      const existItem = cart.cartitems.find((x:any) => x._id === item._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      axios.get(`/api/items/${item._id}`).then((res) => {
        const data = res.data;
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...data, quantity },
        });
      });
      setquantity(quantity)
    } else {
      navigate("/signup");
    }
  };
  //console.log(quantity);
  let Classe = "rounded-30 text-white card  shadow  rounded cardie"
  return (
    <div className="mb-3 car ">
      <Card onMouseEnter={()=>{setisshown(true);}} onMouseLeave={()=>{setisshown(false)}} className={Classe}>
      <Card.Img className="rounded-30 cimg" src={item.image} height="275px" />
      {isshown && 
          <Card.ImgOverlay className="bottom" style={{backgroundImage: "linear-gradient(to top, black,black, transparent)"}}  >
          <Card.Title className="d-flex justify-content-between align-items-baseline">
           <Link to={`/product/${item._id}`} className="text-decoration-none text-light">
           {item.title}
           </Link>
          </Card.Title>
          <Card.Text className="mb-0">&#8377;{item.price}</Card.Text>
          <div>
            {item.countInStock === 0 ? <p>OutofStock</p> : quantity === 0 ? (
              <Button className="w-100" style={{fontSize:"10px"}}  variant="warning" onClick={submitHandler}>
                Add To Cart
              </Button>
            ) : <div
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
                style={{ marginLeft: 4 }}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div> }
          </div>
        </Card.ImgOverlay>
      }
    </Card>
    </div>

  );
}



