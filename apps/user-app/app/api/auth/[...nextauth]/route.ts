import NextAuth from 'next-auth';
import { Next_AUTH } from '../../../lib/auth';


const handler = NextAuth(Next_AUTH);

export { handler as GET, handler as POST };
