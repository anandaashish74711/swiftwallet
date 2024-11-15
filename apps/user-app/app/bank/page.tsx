"use client"

import React, { useState } from 'react';

const BankPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [amount, setAmount] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleRequestOtp = async () => {
        if (!email) {
            alert('Please enter a registered email.');
            return;
        }
        const response = await fetch('/api/send-deposit-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setIsOtpSent(true);
            alert('OTP sent to your email.');
        } else {
            alert('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || !amount) {
            alert('Please enter the OTP and deposit amount.');
            return;
        }
        const response = await fetch('/api/webhook/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, amount }),
        });

        const data = await response.json();
        if (response.ok && data.message === 'Deposit successful') {
            setIsVerified(true);
            alert(`Deposit successful! New balance: ${data.balance}`);
        } else {
            alert(data.error || 'Failed to verify OTP.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bank Deposit</h2>

                {!isOtpSent && (
                    <>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleRequestOtp}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {isOtpSent && (
                    <>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter deposit amount"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Verify OTP and Deposit
                        </button>
                    </>
                )}

                {isVerified && (
                    <p className="text-center text-green-600 font-semibold mt-6">
                        Deposit completed successfully!
                    </p>
                )}
            </div>
        </div>
    );
};

export default BankPage;
