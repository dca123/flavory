import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { auth } from './api/auth/[...nextauth]/route';
import { PropsWithChildren } from 'react';
import { db, eq, restaurants } from 'db';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Flavory - Restaurant',
  description: 'Restaurant Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
          <div className="flex flex-row  justify-between items-center w-full">
            <h1 className="text-lg text-center">Flavory - Restaurant</h1>
            <Menu />
          </div>
          <AuthWrapper>
            <RestaurantName />
            <div className="space-x-4">
              <Link href="/" className="text-xl">
                Orders
              </Link>
              <Link href="/menu" className="text-xl">
                Menu
              </Link>
            </div>
            {children}
          </AuthWrapper>
        </main>
      </body>
    </html>
  );
}
const Menu = async () => {
  const session = await auth();
  if (session !== null) {
    return (
      <div className="flex space-x-4 ">
        <h1 className="p-2">{session.user?.email}</h1>
        <Link href="/api/auth/signout" className="p-2">
          Sign Out
        </Link>
      </div>
    );
  }
  return <Link href="/api/auth/signin">Sign In</Link>;
};

const RestaurantName = async () => {
  const session = await auth();
  if (session === null) {
    throw new Error('Session is null');
  }
  const restaurant = await db.query.restaurants.findFirst({
    where: eq(restaurants.id, session.user.id),
  });

  if (restaurant === undefined) {
    throw new Error('Restaurant is null');
  }

  return <h1 className="text-6xl font-bold text-center">{restaurant.name}</h1>;
};

const AuthWrapper = async (props: PropsWithChildren) => {
  const session = await auth();
  if (session !== null) {
    return <>{props.children}</>;
  }
  return <h1>Not Authenticated</h1>;
};
