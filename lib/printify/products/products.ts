interface PrintifyProducts {
    name: string;
    enabled: boolean;
    blueprintId: number;
    printProviderId: number;
}

const PRINT_CLEVER_PRINT_PROVIDED_ID = 72;

export const products = {
    tShirt: {
        name: "Unisex Heavy T Shirt Gildan 5000",
        enabled: true,
        blueprintId: 6,
        printProviderId: PRINT_CLEVER_PRINT_PROVIDED_ID,
    },
    hoodie: {
        name: "Unisex Heavy Blend Hooded Sweatshirt",
        enabled: true,
        blueprintId: 77,
        printProviderId: PRINT_CLEVER_PRINT_PROVIDED_ID,
    },
    mug: {
        name: "Mug",
        enabled: false,
        printProviderId: PRINT_CLEVER_PRINT_PROVIDED_ID,
        blueprintId: 1302,
    },
};
