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
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center py-8 space-y-4 justify-between md:py-96">
                    {children}
                </main>
            </body>
        </html>
    );
}
