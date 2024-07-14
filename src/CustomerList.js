const CustomerList = ({ customers }) => {
  return (
    <div className="customer-list">
      <div className="credit-card__title font-bold text-primary">Customers</div>
      <div className="customer-list__container">
        {customers.map((customer) => (
          <div className="credit-card" key={customer.id}>
            <a href={`/viewCustomers/${customer.id}`} className="link-btn">
              {customer.name}
            </a>
          </div>
        ))}
      </div>
      <footer>
        © 2024 Banking System. All rights reserved.
      </footer>
    </div>
  );
};

export default CustomerList;
