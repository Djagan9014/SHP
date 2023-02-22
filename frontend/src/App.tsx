import React, { useState } from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Producreate } from './Screens/Admin/Producreate';
import { Home } from "./Screens/Home"
import { Order } from "./Screens/User/Order"
import { Signup } from "./Screens/Auth/Signup"
import { Login } from "./Screens/Auth/Login"
import { Cartie } from "./Screens/User/cartie"
import { Navbar } from "./components/Navbar"
import { UserList } from './Screens/Admin/UserList';
import { EditUsers } from './Screens/Admin/EditUsers';
import { Profile } from './Screens/User/UserProfile';
import { Product } from './Screens/Product';
import { Search } from './Screens/SearchScreen';
import { Footer } from './components/Footer';
import { Payment } from './Screens/User/Payment';
import { PlaceOrder } from './Screens/User/PlaceOrder';
import { OrderList } from './Screens/User/OrderList';
import "./App.css"

function App() {
  const [area,setArea]=useState(localStorage.cartItems?JSON.parse(localStorage.cartItems).length:0)
  function lengthy(area: any){
    setArea(area)
  }
  return (
    <><Navbar len={area} />
    <Container  className="App" fluid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order  />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cartie  prep={lengthy} prep1={area} />} />
        <Route path="/pro" element={<Producreate />} />
        <Route path="/users" element={<UserList />} />
        <Route path='/editusers/:id' element={<EditUsers />} />
        <Route path='/profile/' element={<Profile />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/search' element={<Search />} />
        <Route path='/order' element={<Order />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/orderlist' element={<OrderList />} />
      </Routes>
      <Footer />
    </Container></>
  );
}

export default App;
