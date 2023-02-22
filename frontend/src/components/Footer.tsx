import React from "react";
import playStore from "./images/playstore.png";
import appStore from "./images/Appstore.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <div style={{paddingTop:"10vh"}}>
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ShopForHome</h1>
        <p>One stop destination for shopping</p>

        <p>Copyrights 2023 &copy; DAZN</p>
      </div>

      <div className="rightFooter" >
        <h4>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://instagram.com">Facebook</a>
      </div>
    </footer>
    </div>
  );
};


