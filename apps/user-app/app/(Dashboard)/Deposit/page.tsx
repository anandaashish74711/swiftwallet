'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';

export default function DepositPage(): ReactElement {
    const [amount, setAmount] = useState<number>(0);

    const handleDeposit = () => {
        console.log(`Depositing $${amount}`);
        // Add logic to handle the deposit action
    };

    const handleWithdrawal = () => {
        console.log(`Withdrawing $${amount}`);
        // Add logic to handle the withdrawal action
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Deposit and Withdrawal</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <label className="block text-gray-700 text-lg mb-2" htmlFor="amount">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-600"
                />

                <div className="flex space-x-4">
                    <button
                        onClick={handleDeposit}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={handleWithdrawal}
                        className="flex-1 bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
}
