'use client';

import type { ReactElement } from 'react';

// Define TransactionHistory component
export default function TransactionHistory(): ReactElement {
    const transactions = [
        { id: 1, date: '2024-01-01', amount: 100, type: 'Credit' },
        { id: 2, date: '2024-02-15', amount: -50, type: 'Debit' },
        { id: 3, date: '2024-03-10', amount: 200, type: 'Credit' },
    ];

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Transaction History</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-3 px-6 bg-purple-600 text-white">Date</th>
                        <th className="py-3 px-6 bg-purple-600 text-white">Amount</th>
                        <th className="py-3 px-6 bg-purple-600 text-white">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="text-center border-b border-gray-200">
                            <td className="py-3 px-6">{transaction.date}</td>
                            <td className="py-3 px-6">${transaction.amount}</td>
                            <td className="py-3 px-6">{transaction.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
