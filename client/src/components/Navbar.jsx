import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">Kanjo</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Ana Sayfa</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">Hakkımızda</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Ürünler
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/products/1">Ürün 1</Link></li>
                <li><Link className="dropdown-item" to="/products/2">Ürün 2</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/products">Diğer</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">İletişim</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-light me-2">Giriş Yap</Link>
            <Link to="/register" className="btn btn-light">Kayıt Ol</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
