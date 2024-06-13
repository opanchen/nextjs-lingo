import Image from "next/image";

import { quests } from "@/constants";

import { cn } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";

type Props = {
  variant: "page" | "side";
  points: number;
};

export const QuestItemList = ({ variant, points }: Props) => {
  const isSideComponent = variant === "side";
  return (
    <ul className="w-full">
      {quests.map((quest) => {
        const progress = (points / quest.value) * 100;

        return (
          <li
            key={quest.title}
            className={cn(
              "flex items-center w-full",
              isSideComponent ? "pb-4 gap-x-3" : "p-4 gap-x-4 border-t-2"
            )}
          >
            <Image
              src="/icons/points.svg"
              alt="Points"
              width={isSideComponent ? 40 : 60}
              height={isSideComponent ? 40 : 60}
            />

            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-neutral-700 text-xl font-bold">
                {quest.title}
              </p>

              <Progress
                value={progress}
                className={isSideComponent ? "h-2" : "h-3"}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
