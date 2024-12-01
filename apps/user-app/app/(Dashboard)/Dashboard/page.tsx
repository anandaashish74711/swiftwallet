'use client';

import type { ReactElement } from 'react';



// Components
const ActionButton = ({ label }: { label: string }): ReactElement => (
  <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition">
    {label}
  </button>
);







export default function Dashboard(): ReactElement {

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Good afternoon, User
          </h2>
         
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Portfolio Value</h3>
        </div>

        <div className="mt-6 flex space-x-4">
          
          <ActionButton label="Convert" />
          <ActionButton label="Deposit" />
          <ActionButton label="Withdraw" />
        </div>
      </main>

    
    </div>
  );
}
