import React from 'react';

const Home = () => {
  return (
    <div className="home bg-light-blue">
      <div className="credit-card">
        <div className="credit-card__title"> Hey There!</div>
        <div className="credit-card font-bold">
        Welcome to your personal banking hub. Here you can manage your finances, view transactions, and explore our easy-to-use features. We’re here to make banking simple and enjoyable!
        </div>
      </div>
      <div className="links mt-5">
        <a href="/viewCustomers" className="link-btn">View Customers</a>
      </div>
      <footer>
        © 2024 Banking System. All rights reserved.
      </footer>
    </div>
    
  );
};

export default Home;
