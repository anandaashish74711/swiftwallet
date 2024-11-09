"use client"; // This ensures the component is client-rendered

import { useState } from "react";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [sourceAccount, setSourceAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount && sourceAccount && destinationAccount) {
      setMessage(
        `Successfully transferred $${amount} from ${sourceAccount} to ${destinationAccount}.`
      );
      // Reset form fields
      setAmount("");
      setSourceAccount("");
      setDestinationAccount("");
    } else {
      setMessage("Please fill out all fields.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Transfer Funds</h1>

      <form onSubmit={handleTransfer} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="sourceAccount" className="block text-gray-700 font-medium mb-2">
            Source Account
          </label>
          <input
            type="text"
            id="sourceAccount"
            value={sourceAccount}
            onChange={(e) => setSourceAccount(e.target.value)}
            placeholder="Enter source account"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="destinationAccount" className="block text-gray-700 font-medium mb-2">
            Destination Account
          </label>
          <input
            type="text"
            id="destinationAccount"
            value={destinationAccount}
            onChange={(e) => setDestinationAccount(e.target.value)}
            placeholder="Enter destination account"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
        >
          Transfer
        </button>
      </form>

      {message && (
        <p className="mt-4 text-blue-600 font-medium">{message}</p>
      )}
    </div>
  );
}
