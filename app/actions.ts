"use server";

import {
  LineItemBase,
} from "@/interfaces/PrintifyTypes";
import { z } from "zod";
import { log } from "../utils/log";

import { redirect } from "next/navigation";
import { createPrintifyOrderForExistingProduct } from "@/lib/printify/service";

export async function emailFormAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const schema = z.object({
    email: z.string(),
  });
  const parsedFormData = schema.parse(rawFormData);
  const { email } = parsedFormData;
  log({ email });
  // ... send email
}

export async function processSizeAndColorFormAction(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log({ rawFormData });
  // const schema = z.object({
  //   productId: z.string(),
  // });
  // const parsedFormData = schema.parse(rawFormData);
  // const { productId } = parsedFormData;
  // log({ productId });
  // redirect(`/personal-details/${productId}`);
}

export async function processPersonalDetailsForm(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    country: z.string(),
    region: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    zip: z.string(),
    productId: z.string(),
  });
  const parsedFormData = schema.parse(rawFormData);
  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    region,
    address1,
    address2,
    city,
    zip,
    productId,
  } = parsedFormData;
  log({
    first_name,
    last_name,
    email,
    phone,
    country,
    region,
    address1,
    address2,
    city,
    zip,
    productId,
  });
  const address_to = {
    first_name,
    last_name,
    email,
    phone,
    country,
    region,
    address1,
    address2,
    city,
    zip,
  };

  log({ address_to });
  const line_items: LineItemBase[] = [
    {
      product_id: productId,
      variant_id: 12124, // make me dynamic
      quantity: 1,
    },
  ];
  const shipping_method = 1; // make me dynamic
  const orderId = await createPrintifyOrderForExistingProduct(
    line_items,
    shipping_method,
    address_to,
  );
  log({ orderId });
  redirect(`/payment/${orderId}`);
}

