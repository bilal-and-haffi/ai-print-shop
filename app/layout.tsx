import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Personalised Gift Shop",
  description: "Hoodies, T-shirts, Mugs, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <main className="flex min-h-screen flex-col items-center space-y-4 py-8 lg:justify-center lg:py-16">
          <div id="heading">
            <h1 className="text-2xl font-bold">AI Personalised Gift Shop</h1>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
