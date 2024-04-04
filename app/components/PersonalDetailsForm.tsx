"use client";
import { processPersonalDetailsForm } from "../actions";
import { useFormStatus } from "react-dom";

// UK ONLY

export function PersonalDetailsForm(parmas: { productId: string }) {
  const { productId } = parmas;
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col space-y-4 w-4/6 lg:w-1/2" id="form-container">
      <h1>Please fill out your personal details</h1>
      <h2>Sorry we only deliver to UK at the moment</h2>
      <h2>Free Delivery!</h2>
      <form
        className="flex flex-col space-y-2 text-black "
        action={processPersonalDetailsForm}
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
        <label className="text-white" htmlFor="country" hidden>
          Country
        </label>
        <input
          required
          type="text"
          name="country"
          value="GB"
          aria-disabled
          hidden
        />
        <label className="text-white" htmlFor="region" hidden>
          Region
        </label>
        <input type="text" name="region" hidden />
        <label className="text-white" htmlFor="address1">
          Address 1
        </label>
        <input required type="text" name="address1" />
        <label className="text-white" htmlFor="address2">
          Address 2 (optional)
        </label>
        <input type="text" name="address2" />
        <label className="text-white" htmlFor="city">
          City
        </label>
        <input required type="text" name="city" />
        <label className="text-white" htmlFor="zip">
          Postcode
        </label>
        <input required type="text" name="zip" />
        <button
          type="submit"
          className="btn btn</label>-primary text-white bg-blue-800 hover:bg-blue-900 "
          aria-disabled={pending}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
