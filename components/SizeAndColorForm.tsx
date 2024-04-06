"use client";
import { Button } from "@/components/ui/button";
import { Options } from "./ProductDetails";

export const SizeAndColorForm = ({
    sizes,
    colours,
    sizeId,
    colorId,
}: {
    sizes: Options[];
    colours: Options[];
    sizeId: number;
    colorId: number;
}) => (
    <div className="my-4 flex flex-col text-center">
        <form>
            <div className="mb-4">
                <label htmlFor="size">Size:</label>
                {/* TODO: handle invalid colour and size combination */}
                <select
                    name="size"
                    id="size"
                    className="text-black"
                    defaultValue={sizeId}
                >
                    {sizes.map((size) => (
                        <option key={size.id} value={size.id}>
                            {size.title}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="color">Color:</label>
                <select
                    name="color"
                    id="color"
                    className="text-black"
                    defaultValue={colorId}
                >
                    {colours.map((color) => (
                        <option key={color.id} value={color.id}>
                            {color.title}
                        </option>
                    ))}
                </select>
            </div>

            <Button className="mt-4" type="submit">
                Update
            </Button>
        </form>
    </div>
);
