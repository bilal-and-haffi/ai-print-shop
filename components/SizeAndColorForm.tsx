"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type Size = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";

export const SizeAndColorSelector = ({
    sizes,
    colours,
    selectedSize: selectedSizeId,
    selectedColor: selectedColorId,
    setSelectedSize: setSelectedSize,
    setSelectedColor: setSelectedColor,
}: {
    sizes: Size[];
    colours: string[];
    selectedSize: string;
    selectedColor: string;
    setSelectedSize: (size: string) => void;
    setSelectedColor: (color: string) => void;
}) => {
    function onSizeChange(value: string) {
        setSelectedSize(value);
    }

    function onColorChange(value: string) {
        setSelectedColor(value);
    }

    const weights = new Map<Size, number>([
        ["S", 1],
        ["M", 2],
        ["L", 3],
        ["XL", 4],
        ["2XL", 5],
        ["3XL", 6],
        ["4XL", 7],
        ["5XL", 8],
    ]);

    return (
        <>
            <Select
                onValueChange={(value) => onColorChange(value)}
                value={selectedColorId}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                    {colours.sort().map((colour) => (
                        <SelectItem key={colour} value={colour}>
                            {colour}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => onSizeChange(value)}
                value={selectedSizeId}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {sizes
                        .sort(
                            (a: Size, b: Size) =>
                                weights.get(a)! - weights.get(b)!,
                        )
                        .map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </>
    );
};
