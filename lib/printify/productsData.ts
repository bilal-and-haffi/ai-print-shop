import { CountryCode } from "../stripe/createCheckoutSession";

export type DisplayName =
    | "T Shirt"
    | "Hoodie"
    | "Mug"
    | "Baseball Tee"
    | "Phone Case"
    | "Canvas"
    | "Sweatshirt"
    | "Poster";

interface PrintifyProductsData {
    enabled: boolean;
    country: "GB" | "US";
    name: string;
    displayName: DisplayName;
    blueprintId: number;
    printProviderId: number;
}

const printProviderIds = {
    printClever: 72,
    tShirtAndSons: 6,
    monsterDigital: 29,
    districtPhoto: 28,
    jondo: 105,
    woyc: 23,
    stokedOnPrinting: 43,
    marcoFineArts: 3,
};

const blueprintIds = {
    gildan64000UnisexSoftstyleShirt: 145,
    gildan18500UnisexHeavyBlendHoodedSweatshirt: 77,
    ceramicMug: 635, // https://printify.com/app/products/635/generic-brand/accent-coffee-mug-11-15oz
    canvas: 937, //  https://printify.com/app/products/937/generic-brand/matte-canvas-stretched-075
    phoneCases: 421, // https://printify.com/app/products/421/generic-brand/tough-cases
    baseballTee: 79,
    sweatshirt: 49, // https://printify.com/app/products/49/gildan/unisex-heavy-blend-crewneck-sweatshirt
    poster: 1220, // https://printify.com/app/products/1220/generic-brand/rolled-posters
};

// TODO: add these
/* 
https://printify.com/app/products/421/generic-brand/tough-cases
*/

export function getEnabledProductsForCountry(
    country: CountryCode,
): PrintifyProductsData[] {
    return productData.filter(
        (product) => product.country === country && product.enabled,
    );
}

const productData: PrintifyProductsData[] = [
    // UK
    {
        enabled: true,
        name: "Gildan 64000 Unisex Softstyle Shirt",
        displayName: "T Shirt",
        blueprintId: 145,
        printProviderId: printProviderIds.tShirtAndSons,
        country: "GB",
    },
    {
        enabled: true,
        name: "Unisex Heavy Blend Hooded Sweatshirt",
        displayName: "Hoodie",
        blueprintId: 77,
        printProviderId: printProviderIds.printClever,
        country: "GB",
    },
    {
        enabled: true,
        name: "Mug",
        displayName: "Mug",
        printProviderId: printProviderIds.printClever,
        blueprintId: 1302,
        country: "GB",
    },
    {
        enabled: true,
        name: "Unisex 3\\4 Sleeve Baseball Tee",
        displayName: "Baseball Tee",
        blueprintId: blueprintIds.baseballTee,
        printProviderId: printProviderIds.tShirtAndSons,
        country: "GB",
    },
    {
        enabled: true,
        name: "Gildan Sweatshirt",
        displayName: "Sweatshirt",
        blueprintId: blueprintIds.sweatshirt,
        printProviderId: printProviderIds.printClever,
        country: "GB",
    },
    {
        enabled: true,
        name: "Rolled poster",
        displayName: "Poster",
        blueprintId: blueprintIds.poster,
        printProviderId: printProviderIds.jondo,
        country: "GB",
    },
    {
        enabled: false,
        name: "Unisex Heavy T Shirt Gildan 5000", // tried and was hard and print felt tacky. supplier was print clever for the order
        displayName: "T Shirt",
        blueprintId: 6,
        printProviderId: printProviderIds.tShirtAndSons,
        country: "GB",
    },
    {
        // TRY ME!
        enabled: false,
        name: "Unisex Jersey Short Sleeve Tee Bella+Canvas 3001",
        displayName: "T Shirt",
        blueprintId: 12,
        printProviderId: printProviderIds.tShirtAndSons,
        country: "GB",
    },
    {
        enabled: true,
        name: "Tough Cases",
        displayName: "Phone Case",
        blueprintId: blueprintIds.phoneCases,
        printProviderId: printProviderIds.woyc,
        country: "GB",
    },
    {
        enabled: true,
        name: "Canvas",
        displayName: "Canvas",
        blueprintId: blueprintIds.canvas,
        printProviderId: printProviderIds.jondo,
        country: "GB",
    },

    // US
    {
        enabled: true,
        displayName: "T Shirt",
        printProviderId: printProviderIds.monsterDigital,
        blueprintId: blueprintIds.gildan64000UnisexSoftstyleShirt,
        name: "Unisex Softstyle T-Shirt Gildan 64000",
        country: "US",
    },

    {
        enabled: true,
        displayName: "Hoodie",
        printProviderId: printProviderIds.monsterDigital,
        blueprintId: blueprintIds.gildan18500UnisexHeavyBlendHoodedSweatshirt,
        name: "Unisex Heavy Blend Hooded Sweatshirt",
        country: "US",
    },

    {
        enabled: true,
        displayName: "Mug",
        printProviderId: printProviderIds.districtPhoto,
        blueprintId: blueprintIds.ceramicMug,
        name: "Ceramic Mug",
        country: "US",
    },
    {
        enabled: true,
        name: "Tough Cases",
        displayName: "Phone Case",
        blueprintId: blueprintIds.phoneCases,
        printProviderId: printProviderIds.woyc,
        country: "US",
    },
    {
        enabled: true,
        name: "Canvas",
        displayName: "Canvas",
        blueprintId: blueprintIds.canvas,
        printProviderId: printProviderIds.jondo,
        country: "US",
    },
    {
        enabled: true,
        name: "Unisex 3\\4 Sleeve Baseball Tee",
        displayName: "Baseball Tee",
        blueprintId: blueprintIds.baseballTee,
        printProviderId: printProviderIds.stokedOnPrinting,
        country: "US",
    },
    {
        enabled: true,
        name: "Gildan Sweatshirt",
        displayName: "Sweatshirt",
        blueprintId: blueprintIds.sweatshirt,
        printProviderId: printProviderIds.marcoFineArts,
        country: "US",
    },
    {
        enabled: true,
        name: "Rolled poster",
        displayName: "Poster",
        blueprintId: blueprintIds.poster,
        printProviderId: printProviderIds.jondo,
        country: "US",
    },
];
