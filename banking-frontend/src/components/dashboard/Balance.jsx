                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Balance = ({ accountId }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext); // Get user with token

  useEffect(() => {
  async function fetchBalance() {
    try {
      const res = await fetch(`http://localhost:8080/api/user/balance/${accountId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await res.text(); // because your API returns a raw double (not JSON)
      setBalance(parseFloat(data));
      setError("");
    } catch (e) {
      console.error("Fetch balance error:", e);
      setError(e.message || "Something went wrong");
    }
  }

  if (user?.token && accountId) {
    fetchBalance();
  }
}, [accountId, user]);


  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (balance === null) return <p>Loading balance...</p>;

  return (
  <div className="bank-card">
    <h3>Your Balance</h3>
    <p>{balance.toFixed(2)}</p>
    {error && <p className="bank-error">{error}</p>}
  </div>
);

};

export default Balance;
