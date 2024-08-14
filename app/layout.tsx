import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/SiteHeader";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "AI Print Shop",
    applicationName: "AI Print Shop",
    description:
        "Create personalized custom clothes with AI-generated images. Easy to order, print-on-demand T-shirts and apparel.",
    keywords: ["AI", "image", "print", "T-shirt", "clothes"],
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
            <body
                className={`${inter.className} flex h-full w-full flex-col overflow-x-hidden`}
            >
                <Toaster />

                <SiteHeader />
                <main className="flex w-11/12 flex-col items-center justify-center space-y-4 self-center pb-8 text-center">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Analytics />
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
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '807492701225783');
          fbq('track', 'PageView');
        `}
                </Script>
                <noscript>
                    <Image
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src={`https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1`}
                        alt="Facebook pixel"
                    />
                </noscript>
            </body>
        </html>
    );
}
