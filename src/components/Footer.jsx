import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerBrand">
          <p className="footerEyebrow">A FASHION EXPERIENCE</p>
          <h2>Style, reimagined<span>.</span></h2>
          <p>Discover your style. Define your story.</p>
        </div>

        <div className="footerColumn">
          <h3>EXPLORE</h3>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/beauty">Beauty</Link>
          <Link to="/">All Products</Link>
        </div>

        <div className="footerColumn">
          <h3>QUICK LINKS</h3>
          <Link to="/cart">Shopping Bag</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/">Home</Link>
        </div>

        <div className="footerColumn developerColumn">
          <h3>THE DEVELOPER</h3>
          <h2>Manisha Thakur</h2>
          <p>Full Stack Developer in progress</p>
          <p>Himachal Pradesh, India</p>

          <div className="footerSocials">
            <a
              href="https://github.com/manishathakur25-debug"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/manisha-thakur-8a16353a2/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="footerStatement">
        <p>Designed &amp; developed with curiosity.</p>
        <span>FASHION • CREATIVITY • CODE</span>
      </div>

      <div className="footerBottom">
        <p>© 2026 Manisha Thakur. Portfolio project.</p>
        <a href="https://github.com/manishathakur25-debug">
          Built with React ↗
        </a>
      </div>
    </footer>
  );
}

export default Footer;