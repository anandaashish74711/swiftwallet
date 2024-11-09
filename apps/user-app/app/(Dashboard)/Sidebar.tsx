import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <aside className="w-64 bg-white shadow-md px-6 py-8">
      <h1 className="text-2xl font-bold text-purple-600">Kraken</h1>
      <nav className="mt-10 space-y-6">
        <NavItem icon="home" label="Home" onClick={() => router.push('/Dashboard')}/>
        <NavItem icon="percent" label="Deposit" onClick={()=>router.push('/Deposit')} />
        <NavItem
          icon="arrows-left-right"
          label="Transfer"
          onClick={() => router.push('/Transfer')}
        />
        <NavItem 
        icon="clock" 
        label="Transactions"  
        onClick={() => router.push('/Transictions')}
          />
      </nav>
    </aside>
  );
}
