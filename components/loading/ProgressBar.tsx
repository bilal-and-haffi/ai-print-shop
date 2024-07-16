"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

const MAX_PROGRESS = 99;

export function ProgressBar({
    estimatedTimeInMs,
}: {
    estimatedTimeInMs: number;
}) {
    const [progress, setProgress] = React.useState(0);

    useProgressUpdater(setProgress, estimatedTimeInMs);

    return <Progress value={progress} className="w-[80%]" />;
}

function useProgressUpdater(
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    estimatedTimeInMs: number,
) {
    const progressRef = React.useRef(0);

    React.useEffect(() => {
        const incrementPercentage = 1;
        const interval = estimatedTimeInMs / (100 / incrementPercentage);

        const timer = setInterval(() => {
            if (progressRef.current > MAX_PROGRESS) {
                clearInterval(timer);
                return;
            }

            const newProgress = getNewProgress(
                progressRef.current,
                incrementPercentage,
            );
            if (newProgress !== progressRef.current) {
                progressRef.current = newProgress;
                setProgress(newProgress);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [estimatedTimeInMs, setProgress]);
}

function getNewProgress(progress: number, incrementPercentage: number) {
    if (progress < 0) throw new Error("Progress is less than 0");
    if (progress > 100) throw new Error("Progress is greater than 100");

    if (progress <= MAX_PROGRESS) {
        const newProgress = progress + incrementPercentage;
        return newProgress <= MAX_PROGRESS ? newProgress : MAX_PROGRESS;
    } else {
        return progress;
    }
}
