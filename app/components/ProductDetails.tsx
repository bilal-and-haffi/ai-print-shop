import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Image from "next/image";
import Link from "next/link";
import { T_SHIRT_PRICE_IN_GBP } from "../data/consts";

export function ProductDetails(props: {
  retrievedProduct: RetrieveProductResponse;
  withBuyNow?: boolean;
}) {
  const { retrievedProduct } = props;
  const variant = retrievedProduct.variants.find(
    (variant) => variant.id === 38192,
  );
  if (!variant) {
    return <div>Variant not found</div>;
  }

  return (
    <div className="space-y-4 w-5/6 lg:w-1/3">
      {/* This layout logic does not belong here for suresies */}
      <p>Your prompt: {retrievedProduct.title}</p>
      <p>{retrievedProduct.description}</p>
      <p>Colour/ size: {variant.title}</p>
      <p>Price: £{T_SHIRT_PRICE_IN_GBP}</p>
      <div
        id="image-container"
        className="flex space-x-4 overflow-x-auto snap-type-x-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {retrievedProduct.images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <Image
              src={image.src}
              alt="Product Image"
              width={1200}
              height={1200}
              style={{ height: "auto", width: "auto" }}
              priority
            />
          </div>
        ))}
      </div>
      {props.withBuyNow && (
        <div id="linkContainer" className="self-center w-full">
          <Link href={`/address/${retrievedProduct.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Buy Now!
            </button>
          </Link>
        </div>
      )}
      <div id="linkContainer" className="self-center w-full">
        <a href={`/image/${retrievedProduct.title}`}>
          {/* Using <Link> instead of <a> here caused a bug where this wouldn't work for many seconds after page load. */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Generate new image with same prompt
          </button>
        </a>
      </div>
      <div id="linkContainer" className="self-center w-full">
        <Link href={`/`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Generate new image with new prompt
          </button>
        </Link>
      </div>
    </div>
  );
}
