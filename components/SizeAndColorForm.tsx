"use client";
import Link from "next/link";
import { Options } from "./ProductDetails";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { ChevronLeft, RefreshCw } from "lucide-react";

export const SizeAndColorSelector = ({
    sizes,
    colours,
    selectedSizeId,
    selectedColorId,
    setSelectedSizeId,
    setSelectedColorId,
    prompt,
}: {
    sizes: Options[];
    colours: Options[];
    selectedSizeId: string;
    selectedColorId: string;
    setSelectedSizeId: (sizeId: string) => void;
    setSelectedColorId: (colorId: string) => void;
    prompt: string;
}) => {
    function onSizeChange(value: string) {
        setSelectedSizeId(value);
    }

    function onColorChange(value: string) {
        setSelectedColorId(value);
    }

    return (
        <div className="flex w-full justify-between">
            <Link href={`/`}>
                <Button data-testid="Go back">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div
                id="selectContainer"
                className="flex w-full flex-col items-center space-y-2 text-black md:flex-row md:justify-around md:space-y-0"
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
                            <SelectItem
                                key={size.id}
                                value={size.id.toString()}
                            >
                                {size.title}
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
            {/* needs to be an a because otherwise causes bugs */}
            <a href={`/image/${prompt}?model=openai`}>
                <Button data-testid="Generate new image with same prompt button">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </a>
        </div>
    );
};
