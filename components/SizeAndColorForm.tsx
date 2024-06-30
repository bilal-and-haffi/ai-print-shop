"use client";
import { Options } from "./ProductDetails";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const SizeAndColorSelector = ({
    sizes,
    colours,
    selectedSize: selectedSizeId,
    selectedColor: selectedColorId,
    setSelectedSize: setSelectedSize,
    setSelectedColor: setSelectedColor,
}: {
    sizes: string[];
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

    return (
        <div
            id="selectContainer"
            className="flex w-full flex-col items-center space-y-2 text-black"
        >
            <Select
                onValueChange={(value) => onSizeChange(value)}
                value={selectedSizeId}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => onColorChange(value)}
                value={selectedColorId}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                    {colours.map((colour) => (
                        <SelectItem key={colour} value={colour}>
                            {colour}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
