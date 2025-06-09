import React, { useState } from "react";
import { transfer } from "../../services/api";

const Transfer = ({ accountId, onSuccess }) => {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await transfer(accountId, toAccountId, parseFloat(amount));
      setMessage(`Transferred ₹${amount} to account ${toAccountId} successfully!`);
      setToAccountId("");
      setAmount("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="bank-card">
  <h3>Transfer Money</h3>
  {error && <p className="bank-error">{error}</p>}
  {message && <p className="bank-success">{message}</p>}
  <input
    type="text"
    value={toAccountId}
    onChange={(e) => setToAccountId(e.target.value)}
    placeholder="To Account ID"
    required
  />
  <input
    type="number"
    min="0"
    step="0.01"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Amount"
    required
  />
  <button type="submit">Transfer</button>
</form>

  );
};

export default Transfer;
