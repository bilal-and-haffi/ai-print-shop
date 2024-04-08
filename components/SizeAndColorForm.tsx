"use client";
import { useState } from "react";
import { Options } from "./ProductDetails";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

export const SizeAndColorSelector = ({
    sizes,
    colours,
    sizeId,
    colorId,
}: {
    sizes: Options[];
    colours: Options[];
    sizeId: number;
    colorId: number;
}) => {
    const basePathname = usePathname();
    const [selectedSize, setSelectedSize] = useState(sizeId.toString());
    const [selectedColor, setSelectedColor] = useState(colorId.toString());

    function onSizeChange(value: string) {
        setSelectedSize(value);
        window.location.href = `${basePathname}?size=${value}&color=${selectedColor}`; // temprorary fix
    }

    function onColorChange(value: string) {
        setSelectedColor(value);
        window.location.href = `${basePathname}?size=${selectedSize}&color=${value}`; // temprorary fix
    }

    return (
        <div
            id="selectContainer"
            className="flex w-full flex-col items-center space-y-2 text-black"
        >
            <Select
                onValueChange={(value) => onSizeChange(value)}
                value={selectedSize}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                    {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id.toString()}>
                            {size.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => onColorChange(value)}
                value={selectedColor}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                    {colours.map((colour) => (
                        <SelectItem
                            key={colour.id}
                            value={colour.id.toString()}
                        >
                            {colour.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
