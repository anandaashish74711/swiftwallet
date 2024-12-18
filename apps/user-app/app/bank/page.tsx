"use client"
import React, { useState } from 'react';
import { useSearchParams } from "next/navigation";

const BankPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");


    const handleRequestOtp = async () => {
        if (!email) {
            alert('Please enter a registered email.');
            return;
        }
        const response = await fetch('http://localhost:5000/api/send-deposit-otp', {
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
        if (!otp ) {
            alert('Please enter the OTP .');
            return;
        }
        try{
        const response = await fetch('http://localhost:5000/api/webhook/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
            ,
            body: JSON.stringify({ email, otp ,amount}),
        });

        const data = await response.json();
       
      
        if (response.ok) {
            setIsVerified(true);
            alert("Deposit sucessful")
        } else {
            alert(data.message);
        }}catch(error:any){
            console.error('Error verifying OTP:', error);
            alert('Something went wrong. Please try again later.');
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
