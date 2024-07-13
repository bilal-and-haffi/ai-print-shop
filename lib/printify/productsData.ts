interface PrintifyProducts {
    name: string;
    blueprintId: number;
    printProviderId: number;
}

const printProviderIds = {
    printClever: 72,
    tShirtAndSons: 6,
};

export const products: Record<string, PrintifyProducts> = {
    tShirt: {
        name: "Gildan 64000 Unisex Softstyle Shirt",
        blueprintId: 145,
        printProviderId: printProviderIds.tShirtAndSons,
    },
    hoodie: {
        name: "Unisex Heavy Blend Hooded Sweatshirt",
        blueprintId: 77,
        printProviderId: printProviderIds.printClever,
    },
    mug: {
        name: "Mug",
        printProviderId: printProviderIds.printClever,
        blueprintId: 1302,
    },

    disabledTShirt: {
        name: "Unisex Heavy T Shirt Gildan 5000",
        blueprintId: 6,
        printProviderId: printProviderIds.printClever,
    },

    disabledTShirt2: { // TRY ME!
        name: "Unisex Jersey Short Sleeve Tee Bella+Canvas 3001",
        blueprintId: 12,
        printProviderId: printProviderIds.tShirtAndSons,
    },
};
