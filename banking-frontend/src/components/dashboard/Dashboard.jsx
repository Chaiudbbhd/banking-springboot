                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
import React from 'react';
import Balance from './Balance';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import TransactionsList from './TransactionsList';
import './AuthForm.css'; // reuse styles for cards

const Dashboard = ({ accountId }) => {
  return (
    <div className="dashboard-container">
      <div className="left-panel">
        <Balance accountId={accountId} />
        <Deposit accountId={accountId} />
        <Withdraw accountId={accountId} />
        <Transfer accountId={accountId} />
      </div>

      <div className="right-panel">
        <TransactionsList accountId={accountId} />
      </div>
    </div>
  );
};

export default Dashboard;
