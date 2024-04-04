import { TextAreaAndButton } from "../components/TextAreaAndButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <TextAreaAndButton />
      <Image src="./icon.svg" alt="Gifts" width={200} height={200} />
    </>
  );
}
