import React, { useEffect, useState } from "react";
import { getTransactions } from "../../services/api";

const TransactionsList = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await getTransactions(accountId);
        setTransactions(data);
        setError("");
      } catch (e) {
        setError(e.message);
      }
    }
    fetchTransactions();
  }, [accountId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!transactions.length) return <p>No transactions found.</p>;

  return (
    <div className="bank-card">
      <h3>Transactions</h3>
      <ul className="transaction-list">
        {transactions.map((txn) => (
          <li key={txn.id}>
            {new Date(txn.timestamp).toLocaleString()} - {txn.type} - ₹
            {txn.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
