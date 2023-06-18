import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <h1 className="text-6xl font-bold text-center">Flavory</h1>
          <div className="space-x-4">
            <Link href="/" className="text-xl">
              Restaurants
            </Link>
          </div>
          <div className="border-t border-gray-700 my-4 h-1 w-[30%]"></div>

          {children}
        </main>
      </body>
    </html>
  );
}
