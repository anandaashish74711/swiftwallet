'use client';

import { useState } from 'react';

export default function DepositPage() {
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleDeposit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/deposit', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount })
      });

      if (response.ok) {
        const { redirectUrl } = await response.json();
        window.location.href = redirectUrl;
      } else {
        setStatus({
          type: 'error',
          message: `Deposit failed with status: ${response.status}`
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Failed to process deposit'
      });
    }
  };

  

  const handleWithdrawal = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/withdraw', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount })
      });

      if (response.ok) {
        const message = await response.text();
        setStatus({
          type: 'success',
          message
        });
      } else {
        setStatus({
          type: 'error',
          message: `Withdrawal failed with status: ${response.status}`
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to process withdrawal'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Deposit and Withdrawal</h2>
      </div>
      
      <div className="space-y-4">
        {status.type && (
          <div className={`p-4 rounded-lg ${
            status.type === 'error' 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            <h3 className="font-semibold mb-1">
              {status.type === 'error' ? 'Error' : 'Success'}
            </h3>
            <p className="text-sm">{status.message}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDeposit}
          className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdrawal}
          className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}