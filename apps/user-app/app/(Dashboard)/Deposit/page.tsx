'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';

export default function DepositPage(): ReactElement {
    const [amount, setAmount] = useState<number>(0);

    const handleDeposit = async () => {
        console.log(`Depositing $${amount}`);
        try {
            const response = await fetch('http://localhost:5000/api/deposit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount })
            });
            if (response.ok) {
                const message = await response.text();
                console.log("Server response:", message);
            } else {
                console.log("Deposit failed with status:", response.status);
            }
        } catch (err) {
            console.error("Error during deposit:", err);
        }
    };

    const handleWithdrawal = async () => {
        console.log(`Withdrawing $${amount}`);
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
                console.log("Server response:", message);
            } else {
                console.log("Withdrawal failed with status:", response.status);
            }
        } catch (error) {
            console.error("Unexpected error during withdrawal:", error);
        }
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
