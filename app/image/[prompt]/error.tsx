"use client";

import { EmailForm } from "@/app/components/EmailForm";

export default function ErrorPage() {
  return (
    <div>
      <p>Sorry we seem to be down. We are looking into it.</p>
      <p>
        Please leave us your email and we will get back to you with a resume
        link.
      </p>
      <EmailForm />
    </div>
  );
}
