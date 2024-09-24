import React, { useState } from 'react';

function Deposit({ onTransaction }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTransaction('Deposit', accountNumber, amount);
    setAccountNumber('');
    setAmount('');
  };

  const handleCancel = () => {
    setAccountNumber('');
    setAmount('');
  };

  return (
    <div className="card p-3 mb-3" style={{ width: '950px', margin: '0 auto' }}>
      <h3 className="card-title text-center">Deposit</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className='btn text-center'></div>
        <button type="submit" className="btn5 btn-primary me-2">Deposit</button>
        <button type="button" className="btn7 btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default Deposit;
