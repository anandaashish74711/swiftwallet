import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

type NavItemProps = {
  icon: string;
  label: string;
  onClick?: () => void;
};

const NavItem = ({ icon, label, onClick }: NavItemProps): ReactElement => (
  <div
    className="flex items-center space-x-4 text-gray-600 hover:text-purple-600 cursor-pointer"
    onClick={onClick}
  >
    <span className={`icon-${icon} text-xl`}></span>
    <span className="text-lg">{label}</span>
  </div>
);

export default function DashboardSidebar(): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false }); // Prevent automatic redirect
      router.replace("/"); // Redirect to home page after sign-out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8 flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-2xl font-bold text-purple-600">Kraken</h1>
        <nav className="mt-10 space-y-6">
          <NavItem icon="home" label="Home" onClick={() => router.push('/Dashboard')} />
          <NavItem icon="percent" label="Deposit" onClick={() => router.push('/Deposit')} />
          <NavItem icon="arrows-left-right" label="Transfer" onClick={() => router.push('/Transfer')} />
          <NavItem icon="clock" label="Transactions" onClick={() => router.push('/Transictions')} />
        </nav>
      </div>

      {/* Profile and Logout Section */}
      <div className="flex items-center space-x-4">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/path/to/default-profile.jpg" // Replace with a default image path
            alt="Default Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">{session?.user?.name || "John Doe"}</span>
          <button
            onClick={handleSignOut}
            aria-label="Sign Out"
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
