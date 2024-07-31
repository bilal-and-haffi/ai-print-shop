import { ProductSwitcher } from "@/components/ProductSwitcher";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-4 md:w-1/2">
            <ProductSwitcher />
            {children}
        </div>
    );
}
