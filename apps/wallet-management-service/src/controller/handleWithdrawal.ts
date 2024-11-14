
import { permanentRedirect } from 'next/navigation'; 
export const handleWithdrawal=async()=>{
    permanentRedirect('/banks');
}