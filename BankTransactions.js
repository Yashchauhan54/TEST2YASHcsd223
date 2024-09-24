import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BankTransactions = () => {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [nextId, setNextId] = useState(1); // State for the next transaction ID

  // API key and bin ID
  const apiKey = "$2a$10$TRg9uhpN518zGFmD8frOc.BinTYz0ProIsQzjfvDUiFGBcm7ExPYq";
  const binId = "66f2fdebacd3cb34a88a8fa9";

  useEffect(() => {
    // Fetch existing transactions from JSON bin on component mount
    fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      method: "GET",
      headers: {
        "X-Master-Key": apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the data to check its structure
        const existingTransactions = Array.isArray(data.record) ? data.record : []; // Ensure it's an array
        setTransactions(existingTransactions);

        // Set the next ID based on existing transactions
        if (existingTransactions.length > 0) {
          const maxId = Math.max(...existingTransactions.map((t) => t.id));
          setNextId(maxId + 1); // Increment from the max existing ID
        }
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleDeposit = () => {
    setShowDepositForm(true);
    setShowWithdrawForm(false);
  };

  const handleWithdraw = () => {
    setShowWithdrawForm(true);
    setShowDepositForm(false);
  };

  const handleTransactionSubmit = async (type) => {
    const newAmount = parseFloat(amount);
    const transactionId = nextId; // Use the current next ID

    // Calculate the current balance
    const currentBalance = Array.isArray(transactions) ? transactions.reduce((acc, transaction) => {
      return acc + (transaction.Type === "Deposit" ? parseFloat(transaction.Amount) : -parseFloat(transaction.Amount));
    }, 0) : 0; // Fallback to 0 if transactions is not an array

    // Create new transaction object
    let newTransaction = {
      id: transactionId,
      Type: type,
      Account: accountNumber,
      Amount: newAmount.toString(),
      Balance: type === "Deposit" ? currentBalance + newAmount : currentBalance - newAmount,
    };

    // Store transaction data in JSON bin
    fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: "PUT", // Use PUT to update the existing bin
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey,
      },
      body: JSON.stringify([...transactions, newTransaction]), // Send the updated transactions array
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data stored successfully:", data);
        setTransactions((prev) => [...prev, newTransaction]); // Update local state with new transaction
        setNextId(transactionId + 1); // Increment the next ID for future transactions
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });

    // Reset form fields
    setAccountNumber("");
    setAmount("");
    setShowDepositForm(false);
    setShowWithdrawForm(false);
  };

  const handleCancel = () => {
    setShowDepositForm(false);
    setShowWithdrawForm(false);
    setAccountNumber("");
    setAmount("");
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Transaction Page</h2>
      <div className="text-center">
        <button className="btn btn-success mx-2" onClick={handleDeposit}>
          Deposit
        </button>
        <button className="btn btn-danger mx-2" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>

      {/* Deposit Form */}
      {showDepositForm && (
        <div className="mt-4">
          <h4>Deposit Form</h4>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              className="form-control"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={() => handleTransactionSubmit("Deposit")}>
            Deposit
          </button>
          <button className="btn btn-secondary mt-2 mx-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {/* Withdraw Form */}
      {showWithdrawForm && (
        <div className="mt-4">
          <h4>Withdraw Form</h4>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              className="form-control"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={() => handleTransactionSubmit("Withdraw")}>
            Withdraw
          </button>
          <button className="btn btn-secondary mt-2 mx-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {/* Transaction Output */}
      <div className="mt-5">
        {transactions.length > 0 ? (
          <>
            <h4>Transactions</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Account</th>
                    <th>Amount</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.Type}</td>
                      <td>{transaction.Account}</td>
                      <td>{transaction.Amount}</td>
                      <td>{transaction.Balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default BankTransactions;
