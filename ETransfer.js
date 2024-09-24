import React, { useState } from 'react';

function ETransfer({ accounts, onTransaction }) {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [eTransferTransactions, setETransferTransactions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
    if (!accounts[fromAccount] || accounts[fromAccount] < transferAmount) {
      setMessage('Insufficient funds in the from account');
      return;
    }

    const remainingBalance = accounts[fromAccount] - transferAmount;

    onTransaction('Withdraw', fromAccount, transferAmount);
    onTransaction('Deposit', toAccount, transferAmount);
    onTransaction('e-Transfer', fromAccount, transferAmount, toAccount, remainingBalance);

    const newTransaction = {
      fromAccount,
      toAccount,
      amount: transferAmount,
      balance: remainingBalance,
    };
    
    setETransferTransactions([...eTransferTransactions, newTransaction]);

    setMessage(`Transferred ${amount} from account ${fromAccount} to ${toAccount}`);

    // Clear form
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setReceiverName('');
    setPhoneNumber('');
  };

  const handleCancel = () => {
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setReceiverName('');
    setPhoneNumber('');
  };

  return (
    <div className="container col-md-6 mt-5 text-center" style={{ backgroundColor: '#ddd', color: 'darkred', width: '450px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '50px', marginBottom: '20px' }}>e-Transfer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fromAccount" className="form-label">From Account</label>
          <input
            type="text"
            className="form-control"
            id="fromAccount"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="toAccount" className="form-label">To Account</label>
          <input
            type="text"
            className="form-control"
            id="toAccount"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="receiverName" className="form-label">Receiver Name</label>
          <input
            type="text"
            className="form-control"
            id="receiverName"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn4 btn-primary me-2">Send Money</button>
        <button type="button" className="btn7 btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
      <ETransferTransactionList transactions={eTransferTransactions} />
    </div>
  );
}



function ETransferTransactionList({ transactions }) {
  return (
    <div className="mt-4">
      <h3 className="text-center">E-Transfer History</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.fromAccount}</td>
              <td>{transaction.toAccount}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>${transaction.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ETransfer;
