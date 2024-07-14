import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const Transfer = () => {
  const { id } = useParams();
  const history = useHistory();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const { error, isPending, data } = useFetch('http://localhost:8000/customers');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/customers/${id}`);
        const user = await response.json();
        setCurrentBalance(user.currentBalance);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchCurrentUser();
  }, [id]);

  if (isPending) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredData = data.filter((customer) => customer.id.toString() !== id);

  const handleTransfer = async () => {
    setValidationError('');
    setErrorMessage('');
    setSuccessMessage(''); 

    const parsedTransferAmount = parseFloat(transferAmount);
    console.log('Parsed Transfer Amount:', parsedTransferAmount);
    console.log('Current Balance:', currentBalance);

    if (!selectedCustomerId) {
      setValidationError('Please select a customer to transfer to.');
      return;
    }

    if (parsedTransferAmount <= 0 || !parsedTransferAmount) {
      setValidationError('Please enter a valid transfer amount.');
      return;
    }

    if (parsedTransferAmount > currentBalance) {
      setValidationError('Transfer amount exceeds current balance. Please change the amount and try again.');
      return;
    }

    try {
      const senderResponse = await fetch(`http://localhost:8000/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentBalance: currentBalance - parsedTransferAmount }),
      });
      if (!senderResponse.ok) throw new Error('Failed to update sender balance');
      const updatedSenderBalance = await senderResponse.json();
      console.log('Updated sender balance:', updatedSenderBalance);

      const receiver = data.find((customer) => customer.id.toString() === selectedCustomerId);
      const receiverResponse = await fetch(`http://localhost:8000/customers/${selectedCustomerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentBalance: receiver.currentBalance + parsedTransferAmount }),
      });
      if (!receiverResponse.ok) throw new Error('Failed to update receiver balance');
      const updatedReceiverBalance = await receiverResponse.json();
      console.log('Updated receiver balance:', updatedReceiverBalance);

      setSuccessMessage('Transfer successful!'); 

      setTimeout(() => {
        history.push('/viewCustomers');
      }, 4000); 

    } catch (error) {
      setErrorMessage(error.message);
      console.error('Transfer failed:', error);
    }
  };

  return (
    <div className="credit-card">
      <div className="credit-card__title font-bold text-primary mt-5">Transfer</div>
      {validationError && (
        <div className="validation-error text-red-500 mb-2">{validationError}</div>
      )}
      {errorMessage && (
        <div className="error-message text-red-500 mb-2">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="success-message text-green-500 mb-2">{successMessage}</div>
      )}
      <div className="transfer__customer mt-5">
        <select
          className="bg-gray-100 p-2 my-2 border-b border-gray-50 text-left shadow-md hover:shadow-lg rounded-lg transition-all duration-200 ease-in-out"
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        >
          <option value={null}>Select a customer</option>
          {filteredData && filteredData.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>

      <div className="transfer__amount mt-5">
        <input
          type="number"
          placeholder="Enter amount"
          className="bg-gray-100 p-2 my-2 border-b border-gray-50 text-left shadow-md hover:shadow-lg rounded-lg transition-all duration-200 ease-in-out"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
      </div>
      <div className="links mt-5 ">
        <button
          className="link-btn hover:text-[#35a6f1]"
          onClick={handleTransfer}
        >
          Transfer
        </button>
      </div>
      <footer>
        © 2024 Banking System. All rights reserved.
      </footer>
    </div>
  );
};

export default Transfer;
