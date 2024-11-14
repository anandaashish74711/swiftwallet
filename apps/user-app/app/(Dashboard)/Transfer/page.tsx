'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';

export default function DepositPage(): ReactElement {
    const [amount, setAmount] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

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

    return (
        <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Transfer</h1>

            {/* Payment Options and Balance Section */}
            <div className="flex flex-wrap w-full max-w-4xl space-x-6">
                
                {/* Payment Options */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
                    {/* List of payment options */}
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2 text-blue-700"><span>UPI Options</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>Credit/Debit/ATM Card</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>Book Now Pay Later</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>Net Banking</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>Gift Cards & e-wallets</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>EMI</span></li>
                        <li className="flex items-center space-x-2 text-blue-700"><span>GooglePay</span></li>
                    </ul>
                </div>

                {/* Card Details */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                    <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full mb-2 p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full mb-2 p-3 border border-gray-300 rounded-lg"
                    />
                    <div className="flex space-x-2 mb-2">
                        <select value={expiryMonth} onChange={(e) => setExpiryMonth(e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-lg">
                            <option value="">Month</option>
                            {/* Populate months */}
                        </select>
                        <select value={expiryYear} onChange={(e) => setExpiryYear(e.target.value)} className="flex-1 p-3 border border-gray-300 rounded-lg">
                            <option value="">Year</option>
                            {/* Populate years */}
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Card CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleDeposit}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Pay Now
                    </button>
                </div>
            </div>

            {/* Balance and Transaction Info */}
            <div className="mt-8 w-full max-w-4xl grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">INR Balance</h2>
                    <p>Total balance: 0 BTC</p>
                    <p>Order balance: 0 BTC</p>
                    <p>Staking balance: 0 BTC</p>
                    <p>Available balance: 0 BTC</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Funding Limits</h2>
                    <p>Daily deposits: $0.00 of Unlimited USD</p>
                    <p>Monthly deposits: Unlimited USD</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
                    <button className="text-blue-600 hover:underline">View all transactions</button>
                </div>
            </div>
        </div>
    );
}
