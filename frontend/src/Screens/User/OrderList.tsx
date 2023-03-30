import axios from 'axios';
import React, { useContext, useEffect,useState } from 'react';
import { BASE_URL } from '../../helper';
import { Store } from '../../Store';


export function OrderList(){
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [orders,setdata1]  = useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.get(`${BASE_URL}/api/orders/mine`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }).then((res)=>{
                setdata1(res.data)
            })
          } catch (err) {
           console.log(err)
          }
        }; 
        fetchData()
      }, [userInfo]);
    console.log(orders)
    return( <div>
        <h1>Orders</h1>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ITEM Quantity</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order:any) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.orderItems.map((item:any) =>( <tr key={item.title}><td align="left"><strong>{item.title}</strong> : {item.quantity}</td></tr>))}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'no'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  }
  