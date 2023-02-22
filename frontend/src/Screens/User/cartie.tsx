
import { CartItem } from "../../components/CartItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Store } from "../../Store";
import axios from "axios";

export function Cartie(props: any) {
  const { state } = useContext(Store);
  const { cart,userInfo  } = state;
  const navigate = useNavigate();
  const order = () => {
    navigate(`/order`);
  };
  if(cart.cartitems.length===0){
    navigate("/")
  }
  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartitems.reduce((a:any, c: any) => a + c.quantity * c.price, 0)
  );
  return (
    <div>
      <Row>
        {cart.cartitems?.map((item: any) => (
          <Col key={item._id} sm={6} md={4} lg={3}>
            <CartItem  item={item} />
          </Col>
        ))}
      </Row>

      <br></br>
      <h2 style={{paddingLeft:10}}>Total Price:{cart.itemsPrice}</h2>
      
      {cart.cartitems.length!=0 && <div style={{ marginLeft: 600 }}>
        <Button onClick={order} variant="dark">
         Place Order
        </Button>
      </div>}
    </div>
  );
}
