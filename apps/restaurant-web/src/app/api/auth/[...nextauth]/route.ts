import NextAuth, { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db, eq, restaurants } from 'db';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'contact@devinda.me',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.log('no credentials');
          return null;
        }
        console.log({ credentials });
        const restaurant = await db.query.restaurants.findFirst({
          where: eq(restaurants.email, credentials.email),
        });
        if (restaurant && restaurant.passwordHash === credentials.password) {
          return {
            id: restaurant.id,
            email: restaurant.email,
          };
        } else {
          console.log('password wrong');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        token.id = user?.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
