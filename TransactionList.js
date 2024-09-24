import React from 'react';

function TransactionList({ transactions }) {
  return (
    <div className="mt-4">
      <h3 className="text-center1">Transaction History</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.type}</td>
              <td>{transaction.accountNumber}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>${transaction.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
