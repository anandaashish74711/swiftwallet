'use client';

import type { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ActionButton = ({ label }: { label: string }): ReactElement => (
  <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition">
    {label}
  </button>
);

export default function Dashboard(): ReactElement {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin'); 
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 px-8 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Good afternoon, {session.user?.id}
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
