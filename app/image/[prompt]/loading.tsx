import { EmailForm } from "../../components/EmailForm";

export default function ImageLoading() {
  return (
    <>
      <p>Your image is loading</p>
      <p>
        While you are waiting, enter your email to get a link so you can resume
        your purchase later
      </p>
      <EmailForm />
    </>
  );
}
