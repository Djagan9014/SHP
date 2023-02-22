import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../../Store';

export function Payment(){
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: {  paymentMethod }} = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'UPI ID'
  );
  const submitHandler = (e:any) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
    return(
        <div className='wrapper' style={{ width: "30vw" }}>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="UPI ID"
              label="Using UPI ID"
              value="UPI ID"
              checked={paymentMethodName === 'UPI ID'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="CARD"
              label="Using Card"
              value="CARD"
              checked={paymentMethodName === 'CARD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
        </div>
    )
}