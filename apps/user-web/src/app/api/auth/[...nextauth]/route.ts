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
        console.log(user);
        if (user && user.passwordHash === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          console.log("🚀 ~ file: route.ts:15 ~ authorize ~ user:", user);
          const { id, ...rest } = user;

          return {
            id: String(id),
            email: user.email,
          };
        } else {
          console.log("password wrong");
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
