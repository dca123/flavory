import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'User App - Flavory',
  description: 'App used by Flavory customers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24 space-y-8">
          <div className="flex flex-row  justify-between items-center w-full">
            <h1 className="text-lg text-center">Flavory - Customer</h1>
            <Menu />
          </div>
          <div className="space-x-4">
            <Link href="/" className="text-xl">
              Restaurants
            </Link>
          </div>
          <div className="border-t border-gray-700 my-4 h-1 w-[30%]" />
          <AuthWrapper>{children}</AuthWrapper>
        </main>
      </body>
    </html>
  );
}

const Menu = async () => {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return (
      <div className="flex space-x-4 ">
        <Link href="/orders" className="border p-2 rounded">
          My Orders
        </Link>
        <h1 className="p-2">{session.user?.email}</h1>
        <Link href="/api/auth/signout" className="p-2">
          Sign Out
        </Link>
      </div>
    );
  }
  return <Link href="/api/auth/signin">Sign In</Link>;
};

type AuthWrapperProps = {
  children: React.ReactNode;
};
const AuthWrapper = async (props: AuthWrapperProps) => {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    return <>{props.children}</>;
  }
  return <h1>Not Authenticated</h1>;
};
