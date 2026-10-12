
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useCart from './Hooks/UseCart';

function Navbar({ image, search, setSearch }) {
  const { totalItems } = useCart();

  const navItems = [
    ['Men', '/men'],
    ['Women', '/women'],
    ['Kids', '/kids'],
    ['Home', '/home'],
    ['Genz', '/genz'],
    ['Studio', '/studio'],
    ['Beauty', '/beauty'],
  ];

  return (
    <header className="navbar">
      <Link to="/" className="logoLink">
        <img className="logo" src={image} alt="Myntra logo" />
      </Link>

      <nav className="navLinks">
        {navItems.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `links ${isActive ? 'activeLink' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <input
        type="search"
        className="search"
        value={search}
        placeholder="Search for products..."
        aria-label="Search products"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="navActions">
        <Link className="too" to="/wishlist">
          Wishlist ♡
        </Link>

        <Link className="too" to="/cart">
          Bag ({totalItems})
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
