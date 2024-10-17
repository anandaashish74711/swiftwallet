"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function Dashboard() {
  const [portfolioValue, setPortfolioValue] = useState(0.0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-8">
        <h1 className="text-2xl font-bold text-purple-600">Kraken</h1>
        <nav className="mt-10 space-y-6">
          <NavItem icon="home" label="Home" />
          <NavItem icon="search" label="Explore" />
          <NavItem icon="percent" label="Rewards" />
          <NavItem icon="arrows-left-right" label="Transfer" />
          <NavItem icon="clock" label="Transactions" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Good afternoon, User
          </h2>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition">
            Buy crypto
          </button>
        </div>

        {/* Portfolio Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Portfolio Value</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            ${portfolioValue.toFixed(2)}
          </p>
          <div className="mt-4 border-t pt-4">
            <GraphPlaceholder />
            <TimeRangeSelector />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex space-x-4">
          <ActionButton label="Buy" />
          <ActionButton label="Sell" />
          <ActionButton label="Convert" />
          <ActionButton label="Deposit" />
          <ActionButton label="Withdraw" />
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-80 bg-white shadow-md p-6">
        <PromotionCard />
      </aside>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-4 text-gray-600 hover:text-purple-600 cursor-pointer">
      <span className={`icon-${icon} text-xl`}></span>
      <span className="text-lg">{label}</span>
    </div>
  );
}

// Graph Placeholder Component
function GraphPlaceholder() {
  return (
    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
      Graph Placeholder
    </div>
  );
}

// Time Range Selector Component
function TimeRangeSelector() {
  const ranges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];
  return (
    <div className="mt-4 flex space-x-4">
      {ranges.map((range) => (
        <button
          key={range}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-purple-100"
        >
          {range}
        </button>
      ))}
    </div>
  );
}

// Quick Action Button Component
function ActionButton({ label }) {
  return (
    <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition">
      {label}
    </button>
  );
}

// Promotion Card Component
function PromotionCard() {
  return (
    <div className="bg-purple-50 p-4 rounded-lg shadow-md text-center">
      <h4 className="text-xl font-semibold text-purple-800 mb-2">Set up recurring buys</h4>
      <p className="text-sm text-gray-700 mb-4">
        Schedule regular crypto purchases to balance market fluctuations.
      </p>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700">
        Get started
      </button>
    </div>
  );
}
