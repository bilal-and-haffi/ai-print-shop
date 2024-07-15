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
            <body className={`${inter.className} flex h-full flex-col `}>
                <Toaster />

                <SiteHeader />
                <main className="flex w-11/12 flex-col items-center justify-center space-y-4 self-center pb-4 text-center md:w-1/3 lg:py-20">
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
                            <Link href="mailto:customer-service@ai-print-shop.com">
                                Contact us at customer-service@ai-print-shop.com
                            </Link>
                        </Button>
                    </CardFooter>
                </footer>
            </body>
        </html>
    );
}
