import { Button } from "@/components/ui/button";
import { RetrieveProductResponse } from "@/interfaces/PrintifyTypes";
import Link from "next/link";
import { ImagesCarousel } from "./ImageCarousel";
import { T_SHIRT_PRICE_IN_GBP } from "@/app/data/consts";

const BLACK_COLOR_ID = 418;
const LARGE_SIZE_ID = 16;

export function ProductDetails({
  retrievedProduct,
  color = BLACK_COLOR_ID, // Default to black
  size = LARGE_SIZE_ID, // Default to large
  withBuyNow,
}: {
  retrievedProduct: RetrieveProductResponse;
  withBuyNow?: boolean;
  size?: number;
  color?: number;
}) {
  const colours = retrievedProduct.options[0].values;
  const sizes = retrievedProduct.options[1].values;
  const variant = retrievedProduct.variants.find(
    (variant) => variant.options[0] == color && variant.options[1] == size,
  );

  if (!variant) {
    // SHOULD NOT HAPPEN! FIX ELSE WHERE. DON'T LET CUSTOMER PICK A NON EXISTING VARIANT.
    color = BLACK_COLOR_ID;
    size = LARGE_SIZE_ID;
    return <div>Variant not found</div>;
  }

  const { images } = retrievedProduct;
  const filteredImages = images.filter((image) =>
    image.variant_ids.includes(variant.id),
  );

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-5/6 lg:w-1/3">
      <ImagesCarousel images={filteredImages} />
      <div>
        <p>Prompt: {retrievedProduct.title}</p>
        <p>{retrievedProduct.description}</p>
        <p>Colour/ size: {variant.title}</p>
        <p>Price: £{T_SHIRT_PRICE_IN_GBP}</p>
        <form>
          <label htmlFor="size">Size:</label>
          {/* TODO: handle invalid colour and size combination */}
          <select
            name="size"
            id="size"
            className="text-black"
            defaultValue={size}
          >
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.title}
              </option>
            ))}
          </select>
          <label htmlFor="color">Color:</label>
          <select
            name="color"
            id="color"
            className="text-black"
            defaultValue={color}
          >
            {colours.map((color) => (
              <option key={color.id} value={color.id}>
                {color.title}
              </option>
            ))}
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
      {withBuyNow && (
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
