"use server";
import { CountryCode } from "@/lib/stripe/createCheckoutSession";
import { getShippingData } from "./getShippingData";

export async function getShippingCostInCents({
    blueprint_id,
    print_provider_id,
    deliveryCountry,
}: {
    blueprint_id: number;
    print_provider_id: number;
    deliveryCountry: CountryCode;
}) {
    console.log({ blueprint_id, print_provider_id, deliveryCountry });
    const shippingData = await getShippingData({
        blueprint_id,
        print_provider_id,
    });
    const { profiles } = shippingData;
    console.log({ profiles });
    const countryProfile = profiles.find((profile: any) =>
        profile.countries.some(
            (country: string) => country === deliveryCountry,
        ),
    );
    console.log({ countryProfile });
    const countryFirstItem = countryProfile.first_item; // called first item becuase when ordering more that one there is a lower charge call additional item
    const costInCents = countryFirstItem.cost;

    if (countryFirstItem.currency !== "USD") {
        console.error({
            shippingData,
            ukProfile: countryProfile,
            ukFirstItem: countryFirstItem,
            costInCents,
        });
        throw new Error("Expected printify cost to be in USD but it is not");
    }

    return costInCents;
}
