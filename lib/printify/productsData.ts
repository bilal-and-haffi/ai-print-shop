interface PrintifyProducts {
    enabled: boolean;
    name: string;
    displayName: string;
    blueprintId: number;
    printProviderId: number;
}

const printProviderIds = {
    printClever: 72,
    tShirtAndSons: 6,
};

export const products: Record<string, PrintifyProducts> = {
    tShirt: {
        enabled: true,
        name: "Gildan 64000 Unisex Softstyle Shirt",
        displayName: "T Shirt",
        blueprintId: 145,
        printProviderId: printProviderIds.tShirtAndSons,
    },
    hoodie: {
        enabled: true,
        name: "Unisex Heavy Blend Hooded Sweatshirt",
        displayName: "Hoodie",
        blueprintId: 77,
        printProviderId: printProviderIds.printClever,
    },
    mug: {
        enabled: true,
        name: "Mug",
        displayName: "Mug",
        printProviderId: printProviderIds.printClever,
        blueprintId: 1302,
    },
    baseballTee: {
        enabled: true,
        name: "Unisex 3\\4 Sleeve Baseball Tee",
        displayName: "Baseball Tee",
        blueprintId: 79,
        printProviderId: printProviderIds.tShirtAndSons,
    },

    disabledTShirt: {
        enabled: false,
        name: "Unisex Heavy T Shirt Gildan 5000", // tried and was hard and print felt tacky. supplier was print clever for the order
        displayName: "T Shirt",
        blueprintId: 6,
        printProviderId: printProviderIds.tShirtAndSons,
    },

    disabledTShirt2: {
        // TRY ME!
        enabled: false,
        name: "Unisex Jersey Short Sleeve Tee Bella+Canvas 3001",
        displayName: "T Shirt",
        blueprintId: 12,
        printProviderId: printProviderIds.tShirtAndSons,
    },
};
