import React, { useState } from 'react';
import "./EMICalculator.css"

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2000000);  
  const [interestRate, setInterestRate] = useState(8);    
  const [tenure, setTenure] = useState(1);               
  const [range, setRange] = useState('0-1Cr');            

  const formatToINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(amount);
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
    if (event.target.value === '0-1Cr') {
      setLoanAmount(2000000); 
    } else if (event.target.value === '1-5Cr') {
      setLoanAmount(30000000); 
    } else if (event.target.value === '5-30Cr') {
      setLoanAmount(150000000); 
    }
  };

  const calculateEMI = (principal, rate, tenureYears) => {
    const monthlyRate = rate / (12 * 100); 
    const numberOfMonths = tenureYears * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
    ).toFixed(2);
  };

  const totalInterest = (loanAmount * interestRate * tenure) / 100;
  const totalPayable = loanAmount + totalInterest;
  const monthlyEMI = calculateEMI(loanAmount, interestRate, tenure);

  return (
    <div className="emi-calculator">
        <div className="main">
        <div className='head'>
      <h2>Home Loan EMI Calculator</h2>
      </div>
      <div className="content">
      <div className="slider-section">
        <div className="range-selector">
          <label>
            <input
              type="radio"
              value="0-1Cr"
              checked={range === '0-1Cr'}
              onChange={handleRangeChange}
            />
            0 - 1 Crore
          </label>
          <label>
            <input
              type="radio"
              value="1-5Cr"
              checked={range === '1-5Cr'}
              onChange={handleRangeChange}
            />
            1 Crore - 5 Crore
          </label>
          <label>
            <input
              type="radio"
              value="5-30Cr"
              checked={range === '5-30Cr'}
              onChange={handleRangeChange}
            />
            5 Crore - 30 Crore
          </label>
        </div>

        
        <div>
          <label>Loan Amount: <span className='span'>{formatToINR(loanAmount)}</span></label>
          <input
            type="range"
            min={range === '0-1Cr' ? 0 : range === '1-5Cr' ? 10000000 : 50000000}
            max={range === '0-1Cr' ? 10000000 : range === '1-5Cr' ? 50000000 : 300000000}
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>

      
        <div>
          <label>Interest Rate: <span className='span'>{interestRate}%</span></label>
          <input
            type="range"
            min="1"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

 
        <div>
          <label>Tenure: <span className='span'>{tenure} years</span></label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="results-section">
        <p>Principal Amount: <span className='span' >{formatToINR(loanAmount)}</span></p>
        <p>Interest Amount: <span className='span'>{formatToINR(totalInterest)}</span></p>
        <p>Total Amount Payable: <span className='span'>{formatToINR(totalPayable)}</span></p>
        <div className="total">
        <p>Your Monthly EMI: <span className='tot'>{formatToINR(monthlyEMI)}</span></p>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default EMICalculator;
