import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const CustomerDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: customer, error, isPending } = useFetch('http://localhost:8000/customers/' + id);

  const handleTransferClick = () => {
    history.push(`/transfers/${id}`);
  };

  return (
    <div className="customer-details">
      {isPending && <div className='text-center'>Loading...</div>}
      {error && <div className="text-center">Error: {error.message}</div>}
      {customer && (
        <div className="credit-card">
          <h2 className="credit-card__title  text-center font-bold text-primary">Customer Details</h2>
          <p className="name text-center">Customer Name: {customer.name}</p>
          <p className="email text-center">Customer Email: {customer.email}</p>
          <p className="balance text-center font-bold">Customer Balance: {customer.currentBalance}</p>
          <button
            onClick={handleTransferClick}
            className="link-btn mt-2 hover:text-[#35a6f1]">Make a Transfer</button>
        </div>
      )}
      <footer>
        © 2024 Banking System. All rights reserved.
      </footer>
    </div>
  );
};

export default CustomerDetails;
