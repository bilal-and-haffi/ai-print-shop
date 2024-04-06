import { emailFormAction } from "@/app/actions";

export function EmailForm() {
  return (
    <form action={emailFormAction} className="flex flex-col space-y-4">
      <label>
        Email: <input type="email" name="email" className="text-black" />
      </label>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
