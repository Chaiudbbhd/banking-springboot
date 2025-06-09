import React, { useState } from "react";
import { deposit } from "../../services/api";

const Deposit = ({ accountId, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await deposit(accountId, parseFloat(amount));
      setMessage(`Deposited ₹${amount} successfully!`);
      setAmount("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
   <form onSubmit={handleDeposit} className="bank-card">
  <h3>Deposit Money</h3>
  {error && <p className="bank-error">{error}</p>}
  {message && <p className="bank-success">{message}</p>}
  <input
    type="number"
    min="0"
    step="0.01"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Amount"
    required
  />
  <button type="submit">Deposit</button>
</form>

  );
};

export default Deposit;
