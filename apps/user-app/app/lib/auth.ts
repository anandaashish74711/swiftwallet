import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@repo/db';
import bcrypt from 'bcrypt';
import { AuthOptions, SessionStrategy } from 'next-auth';

export const Next_AUTH: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        console.log('Received Credentials:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          throw new Error('Please provide both email and password');
        }

        try {
          console.log(credentials.email)
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          console.log('Database User Response:', user);

          if (!user) {
            console.log('User not found');
            throw new Error('No user found with the given email');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.hashedpassword // Ensure correct field name here
          );
          

          console.log('Password Validation:', isPasswordValid);

          if (!isPasswordValid) {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials');
          }

          // Return user with ID converted to string
          const authenticatedUser = { id: user.id.toString(), email: user.email };
          console.log('Authenticated User:', authenticatedUser);
          return authenticatedUser;
        } catch (error) {
          console.error('Authorization Error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 24 * 60 * 60, // 1 day expiration
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log('JWT Token:', token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      console.log('Session Data:', session);
      return session;
    },
  },
  
};
