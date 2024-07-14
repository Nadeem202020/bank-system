import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">The Bank System</h1>
      <div className="navbar__links">
        <a href="/" className="navbar__link">Home</a>
        <a href="/viewCustomers" className="navbar__link">View Customers</a>
      </div>
    </nav>
  );
};

export default Navbar;
