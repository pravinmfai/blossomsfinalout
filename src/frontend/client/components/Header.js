import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../assest/icon.svg';
import { Link } from 'react-router-dom';

const ShoppingBasket01Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo"> 
        <Link to="/">
        <img src={logo} alt="Blossoms Boutique" />
        </Link>
        </div>

        {/* Navbar Links (only in web/tablet view) */}
        <ul className="nav-links">
          <li><Link to="/aboutUs" id='bt-one'>About us</Link></li>
          <li><Link to="/shop" id='bt-two'>Shop</Link></li>
          <li><Link to="/user-orders" id='bt-three'>Orders</Link></li>
        </ul>

        {/* Icons (visible on tablet and web view) */}
        <div className="icons">
        <Link to="/cart"><ShoppingBasket01Icon /></Link>
        <Link to="/login"><UserIcon /></Link>
        </div>

        {/* Hamburger icon (mobile view only) */}
        <div className="menu-toggle" onClick={toggleMobileMenu}>
          &#9776; {/* Hamburger icon */}
        </div>

      </nav>
        {isMobileMenuOpen && (
          <ul className="mobile-menu">
            <li onClick={toggleMobileMenu}><Link to="/aboutUs" id='bt-one'>About us</Link></li>
            <li onClick={toggleMobileMenu}><Link to="/shop" id='bt-two'>Shop</Link></li>
            <li onClick={toggleMobileMenu}><Link to="/orders" id='bt-three'>Orders</Link></li>
            <li onClick={toggleMobileMenu}>
              <Link>
                Add to Cart <ShoppingBasket01Icon />
              </Link>
            </li>
            <li onClick={toggleMobileMenu}>
              <Link>
                Login <UserIcon />
              </Link>
            </li>
          </ul>
        )}
    </header>
  );
};

export default Header;