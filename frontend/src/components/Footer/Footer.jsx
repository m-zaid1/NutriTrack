import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo-wrapper">
        <img src={assets.newlogo2} alt="Logo" className="footer-logo" />
      </div>

      <ul className="footer-links">
        {/* <li><a href="/terms">Terms & conditions</a></li>
        <li><a href="/privacy">Privacy policy</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/cookies">Cookie policy</a></li>
        <li><a href="/support">Support</a></li> */}
      </ul>

      <hr className="footer-divider" />
    </footer>
  );
};

export default Footer;
