import { emailFormAction } from "@/app/actions";

export function EmailForm() {
  return (
    <form action={emailFormAction} className="flex flex-col space-y-4">
      <label>
        Email: <input type="email" name="email" className="text-black" />
      </label>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
