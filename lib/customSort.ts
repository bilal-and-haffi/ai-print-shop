// Define the weights for sorting clothing sizes
const sizeWeightForSorting = new Map<ClothingSize, number>([
    ["S", 1],
    ["M", 2],
    ["L", 3],
    ["XL", 4],
    ["2XL", 5],
    ["3XL", 6],
    ["4XL", 7],
    ["5XL", 8],
]);

export type ClothingSize =
    | "S"
    | "M"
    | "L"
    | "XL"
    | "2XL"
    | "3XL"
    | "4XL"
    | "5XL";

export function customSort(a: string, b: string): number {
    const isClothingSize = (size: string): size is ClothingSize =>
        sizeWeightForSorting.has(size as ClothingSize);

    if (isClothingSize(a) && isClothingSize(b)) {
        return sizeWeightForSorting.get(a)! - sizeWeightForSorting.get(b)!;
    } else {
        // Default JavaScript string comparison if not both are clothing sizes
        return a.localeCompare(b);
    }
}
