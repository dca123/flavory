import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db, eq, users } from "db";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "contact@devinda.me",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.log("no credentials");
          return null;
        }
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });
        if (user && user.passwordHash === credentials.password) {
          return {
            id: user.id,
            email: user.email,
          };
        } else {
          console.log("password wrong");
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
