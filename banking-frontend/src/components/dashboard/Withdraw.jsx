import React, { useState } from "react";
import { withdraw } from "../../services/api";

const Withdraw = ({ accountId, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await withdraw(accountId, parseFloat(amount));
      setMessage(`Withdrawn ₹${amount} successfully!`);
      setAmount("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleWithdraw}>
      <h3>Withdraw Money</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default Withdraw;
