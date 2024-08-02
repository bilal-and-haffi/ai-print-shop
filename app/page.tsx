import { SomethingWrongButton } from "@/components/buttons/SomethingWrongButton";
import { CreateLink } from "@/components/CreateLink";
import { ExamplesSection } from "@/components/sections/ExamplesSection";
import { track } from "@vercel/analytics/server";

export default function Home() {
    track("Landed on Home");
    return (
        <div className="flex w-full flex-col items-center gap-20">
            <div className="flex w-4/5 flex-col gap-20 pt-20 md:w-3/5">
                <h1 className="text-4xl md:text-5xl">
                    Create custom clothes with AI images
                </h1>

                <h2 className="text-xl text-muted-foreground">
                    Enter a prompt to generate your image. Order easily and
                    print on demand!
                </h2>

                <div className="flex flex-col gap-4">
                    <CreateLink />
                    <SomethingWrongButton />
                </div>
            </div>
            <ExamplesSection />
        </div>
    );
}
