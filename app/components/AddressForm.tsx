"use client";
import { PrintifyShippingResponse } from "@/interfaces/PrintifyTypes";
import { processAddressForm } from "../actions";
import { useFormStatus } from "react-dom";

export function AddressForm(parmas: { productId: string }) {
  const { productId } = parmas;
  const { pending } = useFormStatus();

  return (
    <form
      className="flex flex-col space-y-2 text-black"
      action={processAddressForm}
    >
      <input type="hidden" name="productId" value={productId} />
      <label className="text-white" htmlFor="first_name">
        First Name
      </label>{" "}
      <input required type="text" name="first_name" />
      <label className="text-white" htmlFor="last_name">
        Last Name{" "}
      </label>
      <input required type="text" name="last_name" />
      <label className="text-white" htmlFor="email">
        Email
      </label>
      <input required type="email" name="email" />
      <label className="text-white" htmlFor="phone">
        Phone
      </label>
      <input required type="phone" name="phone" />
      <label className="text-white" htmlFor="country">
        Country
      </label>
      <input required type="text" name="country" />
      <label className="text-white" htmlFor="region">
        Region
      </label>
      <input required type="text" name="region" />
      <label className="text-white" htmlFor="address1">
        Address 1
      </label>
      <input required type="text" name="address1" />
      <label className="text-white" htmlFor="address2">
        Address 2
      </label>
      <input type="text" name="address2" />
      <label className="text-white" htmlFor="city">
        City
      </label>
      <input required type="text" name="city" />
      <label className="text-white" htmlFor="zip">
        zip
      </label>
      <input required type="text" name="zip" />
      <button
        type="submit"
        className="btn btn</label>-primary text-white bg-blue-800 hover:bg-blue-900 "
        aria-disabled={pending}
      >
        Submit Order
      </button>
    </form>
  );
}
