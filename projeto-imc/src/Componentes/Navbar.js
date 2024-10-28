import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importando o CSS da Navbar
import LogoutButton from "./LogoutButton";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/calculo">Calculadora IMC</Link>
        </li>
        <li>
          <Link to="/sobre-nos">Sobre nós</Link>
        </li>
        <li>
          <Link to="/historico">Histórico</Link>
        </li>
      </ul>
      <div className="historico">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
