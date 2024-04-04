import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Image from "next/image";
import Link from "next/link";
import { ImagesCarousel } from "./ImageCarousel";
import { T_SHIRT_PRICE_IN_GBP, products } from "@/app/data/consts";

export function ProductDetails(props: {
  retrievedProduct: RetrieveProductResponse;
  withBuyNow?: boolean;
}) {
  const { retrievedProduct } = props;
  const variant = retrievedProduct.variants.find(
    (variant) => variant.id === products.printClever.variants.blackLarge,
  );
  if (!variant) {
    return <div>Variant not found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-5/6 lg:w-1/3">
      {/* This layout logic does not belong here for suresies */}
      <ImagesCarousel images={retrievedProduct.images} />
      <div>
        <p>Prompt: {retrievedProduct.title}</p>
        <p>{retrievedProduct.description}</p>
        <p>Colour/ size: {variant.title}</p>
        <p>Price: £{T_SHIRT_PRICE_IN_GBP}</p>
      </div>
      {props.withBuyNow && (
        <div id="linkContainer" className="self-center w-full">
          <Link href={`/address/${retrievedProduct.id}`}>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Buy Now!
            </Button>
          </Link>
        </div>
      )}

      <div id="linkContainer" className="self-center w-full">
        <a href={`/image/${retrievedProduct.title}`}>
          {/* Using <Link> instead of <a> here caused a bug where this wouldn't work for many seconds after page load. */}
          <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Generate new image with same prompt
          </Button>
        </a>
      </div>

      <div id="linkContainer" className="self-center w-full">
        <Link href={`/`}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Generate new image with new prompt
          </Button>
        </Link>
      </div>
    </div>
  );
}
