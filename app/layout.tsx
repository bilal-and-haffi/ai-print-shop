import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/toaster";

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
        <html
            lang="en"
            className="h-full overflow-x-hidden"
            suppressHydrationWarning
        >
            <body className={`${inter.className} flex h-full flex-col`}>
                <Toaster />
                <SiteHeader />
                <main className="flex min-h-full flex-col items-center justify-center space-y-4 py-8 lg:py-16">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </main>
                <footer className="mt-auto w-full">
                    <CardFooter className="p-0">
                        <Button
                            asChild
                            className="focus:shadow-outline w-full rounded-none focus:outline-none"
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
