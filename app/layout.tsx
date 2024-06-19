import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
    userScalable: false,
};

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
        <html lang="en" className="overflow-x-hidden">
            <body
                className={`${inter.className} relative overflow-x-hidden bg-black text-white`}
            >
                <main className="flex min-h-screen flex-col items-center space-y-4 py-8 lg:justify-center lg:py-16">
                    <div id="heading">
                        <h1 className="text-2xl font-bold">
                            AI Personalised Gift Shop
                        </h1>
                    </div>
                    {children}
                </main>
            </body>
        </html>
    );
}
