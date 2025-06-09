import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Balance from "./components/dashboard/Balance";
import Deposit from "./components/dashboard/Deposit";
import Withdraw from "./components/dashboard/Withdraw";
import Transfer from "./components/dashboard/Transfer";
import TransactionsList from "./components/dashboard/TransactionsList";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import './index.css'; 


// Add this console.log here
console.log({
  AuthProvider,
  LoginForm,
  SignupForm,
  ProtectedRoute,
  Balance,
  Deposit,
  Withdraw,
  Transfer,
  TransactionsList,
  Navbar,
  Footer,
});

function Dashboard() {
  const accountId = 1; // Replace this with real account ID logic later
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard">Balance</Link> |{" "}
        <Link to="/dashboard/deposit">Deposit</Link> |{" "}
        <Link to="/dashboard/withdraw">Withdraw</Link> |{" "}
        <Link to="/dashboard/transfer">Transfer</Link> |{" "}
        <Link to="/dashboard/transactions">Transactions</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Balance accountId={accountId} key={refreshKey} />}
        />
        <Route
          path="deposit"
          element={<Deposit accountId={accountId} onSuccess={() => setRefreshKey(k => k + 1)} />}
        />
        <Route
          path="withdraw"
          element={<Withdraw accountId={accountId} onSuccess={() => setRefreshKey(k => k + 1)} />}
        />
        <Route
          path="transfer"
          element={<Transfer accountId={accountId} onSuccess={() => setRefreshKey(k => k + 1)} />}
        />
        <Route
          path="transactions"
          element={<TransactionsList accountId={accountId} key={refreshKey} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen p-4">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
