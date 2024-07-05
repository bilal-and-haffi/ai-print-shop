import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "AI Print Shop",
    description: "Hoodies, T-shirts, Mugs, and more!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={`${inter.className} flex h-full flex-col bg-black text-white`}
            >
                <main className="flex flex-1 flex-col items-center space-y-4 py-8 lg:justify-center lg:py-16">
                    <div id="heading">
                        <h1 className="text-2xl font-bold">AI Print Shop</h1>
                    </div>
                    {children}
                </main>
                <footer className="mt-auto w-full">
                    <CardFooter className="p-0">
                        <Button
                            asChild
                            className="focus:shadow-outline w-full rounded-none bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                        >
                            <Link href="mailto:ai-print-shop@mail.com">
                                Contact us at ai-print-shop@mail.com
                            </Link>
                        </Button>
                    </CardFooter>
                </footer>
            </body>
        </html>
    );
}
