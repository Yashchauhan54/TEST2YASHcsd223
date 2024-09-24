import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';
import BankTransactions from './BankTransactions';
import SurveyForm from './SurveyForm';
import myphoto from './myimg.jpg';
import mybank from './bank.jpg';
import ETransfer from './ETransfer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import myimg1 from './m1.jpg';
import myimg2 from './m2.jpg';
import myimg3 from './m3.jpg';
import myimg4 from './m4.jpg';
import myimg5 from './m5.jpg';
import myimg6 from './m6.jpg';


function App() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(''); 

  const handleTransaction = (type, accountNumber, amount, targetAccount = null) => {
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    const newAccounts = { ...accounts };

    if (!newAccounts[accountNumber]) {
      newAccounts[accountNumber] = 0;
    }

    if (type === 'Deposit') {
      newAccounts[accountNumber] += transactionAmount;
    } else if (type === 'Withdraw') {
      if (newAccounts[accountNumber] < transactionAmount) {
        setMessage('Insufficient funds');
        return;
      }
      newAccounts[accountNumber] -= transactionAmount;
    }

    setAccounts(newAccounts);

    setTransactions([
      ...transactions,
      {
        type,
        accountNumber,
        amount: transactionAmount,
        balance: newAccounts[accountNumber],
      },
    ]);

    if (type === 'Withdraw' && targetAccount) {
      handleTransaction('Deposit', targetAccount, transactionAmount);
    }

    setMessage(`Transaction successful: ${type} of ${transactionAmount} from account ${accountNumber}`);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container-fluid">
            <img src={mybank} className='img-fluid' alt="Bank Logo" style={{ height: '60px', }} />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/transactions">Bank Transactions</Link>
                </li>
                )}
                {isLoggedIn && (
                 <li className="nav-item">
                  <Link className="nav-link" to="/etransfer">e-Transfer</Link>
                   </li>
)}
                <li className="nav-item">
                  <Link className="nav-link" to="#">More Services</Link>
                </li>
              </ul>

              <form className="d-flex mb-3" style={{ width: '400px', height:'40px',marginTop:'15px'}} >
            <input className="form-control me-2" type="search" placeholder="Search Here!" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>
              
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="#">Location</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">Contact</Link>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light" to="/signup">Signup</Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                  </li>
                )}
              </ul>
            </div>
            
          </div>
          
        </nav>
        <div className='welcome'>
        <h1>Hey! Welcome to CIBC Bank</h1>
        </div>

        
      
        <div className="container mt-5">
        <Routes>
          
            <Route path="/" element={
              <div>
                <div className="container-fluid row hero-area mb-4">
                  <div className="col-md-6">
                    <img src={myphoto} alt="" className="img-fluid" />
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className='myedit'>
                      <h1>Banking made more easy</h1>
                      <p>Earn up to $100 when you signup with CIBC Bank banking package and an investment plan.</p>
                      <button className='btn2'>View our packages</button>
                    </div>
                  </div>
                  <div className="additional-nav2">
            <ul className="nav nav-pills">
            <li className="nav-item">
                <Link className="nav-link" to="#">Features</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Accounts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Credit Cards</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Borrowing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">investment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Learning</Link>
              </li>
            </ul>
           </div>
           <div className="container mt-5 text-center">
            <h1>Discover various opportunities with CIBC Bank</h1>
                    <div className="row">
                      <div className="col-md-3 text-center">
                        <i className="fas fa-piggy-bank fa-3x mb-3"></i>
                        <h4>Savings Accounts</h4>
                        <p>Explore our variety of savings accounts that help you grow your money securely.</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <i className="fas fa-chart-line fa-3x mb-3"></i>
                        <h4>Investment Plans</h4>
                        <p>Invest in our well-structured plans and secure your future with high returns.</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <i className="fas fa-home fa-3x mb-3"></i>
                        <h4>Mortgage Solutions</h4>
                        <p>Get the best mortgage solutions tailored to your needs and financial situation.</p>
                      </div>
                      <div className="col-md-3 text-center">
                        <i className="fas fa-lock fa-3x mb-3"></i>
                        <h4>Security Features</h4>
                        <p>Learn about our advanced security features that keep your accounts and transactions safe.</p>
                      </div>
                    </div>
                  </div>
           <div className='below'>
            <h1>More Feature available below</h1>
            <p>Secure your bright future with CIBC Bank</p>
            </div>

      <div className="container mt-5">
      <div className="row">
      <div className="col-md-4 text-center">
          <img src={myimg3} alt="Image 3" className="img-fluid mb-3" />
          <h4>New to Canada? know about our Plans.</h4>
          <p>New Comers can get upto $1000* in value in the first year with new comer plan 2024.</p>
          <a href="#" className="btn3 btn-primary">Offer details</a>
        </div>
        <div className="col-md-4 text-center">
          <img src={myimg5} alt="Image 5" className="img-fluid mb-3" />
          <h4>Know about your Credit card Rewards. </h4>
          <p>Enter your monthly spending details to compare our bank credit rewards.</p>
          <a href="#" className="btn3 btn-primary">Use the Reward calculator</a>
        </div>
        <div className="col-md-4 text-center">
          <img src={myimg4} alt="Image 4" className="img-fluid mb-3" />
          <h4>Change or reset your password online.</h4>
          <p>Locked out of your account? Need to change your password?</p>
          <a href="#" className="btn3 btn-primary">Learn to update your password</a>
        </div>
      
        
      </div>
    </div>
    <div className="container mt-5">
      <div className="row">

      <div className="col-md-4 text-center">
          <img src={myimg1} alt="Image 1" className="img-fluid mb-3" />
          <h4>Earn upto $10* rewards in value.</h4>
          <p>With CIBC Bank Credit Cards.More knowlwdge about cards.</p>
          <a href="#" className="btn3 btn-primary">Learn More</a>
        </div>
        <div className="col-md-4 text-center">
          <img src={myimg2} alt="Image 2" className="img-fluid mb-3" />
          <h4>Save your money fully secured. </h4>
          <p>To know more about different kinds of accounts.click below</p>
          <a href="#" className="btn3 btn-primary">Types of Account</a>
        </div>
       
        
        <div className="col-md-4 text-center">
          <img src={myimg6} alt="Image 6" className="img-fluid mb-3" />
          <h4>Plan and secure your future with CIBC Bank.</h4>
          <p>5 years $20 million, 1 program for future. It helps to promote your economy</p>
          <a href="#" className="btn3 btn-primary">See how we help</a>
        </div>
      </div>
    </div>
    <div className='searchbar'>
      <h1>HAVE ANY QUESTIONS? </h1>
    <form className="d-flex mb-3">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">ASK ME!</button>
          </form>

    </div>
   
                </div>
                <div className="container mt-5 col-md-5">
          <SurveyForm />
        </div>
              </div>
              

        
              
            } />
            
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />
            <Route path="/transactions" element={
              isLoggedIn ? <BankTransactions transactions={transactions} onTransaction={handleTransaction} /> : <Navigate to="/login" />
            } />
            <Route path="/etransfer" element={
  isLoggedIn ? <ETransfer accounts={accounts} onTransaction={handleTransaction} /> : <Navigate to="/login" />
} />
          </Routes>

        </div>
        <Footer /> {}
      </div>
    </Router>
    
  );

  
}


export default App;
