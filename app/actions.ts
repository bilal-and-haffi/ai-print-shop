"use server";

import { z } from "zod";
import { log } from "../utils/log";

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
