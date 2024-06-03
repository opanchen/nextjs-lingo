import Image from "next/image";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "@/components/sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/icons/mascot.svg" alt="Mascot" width={40} height={40} />
          <span className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem href="/learn" label="Learn" iconSrc="/icons/learn.svg" />

        <SidebarItem
          href="/leaderboard"
          label="Leaderboard"
          iconSrc="/icons/leaderboard.svg"
        />

        <SidebarItem
          href="/quests"
          label="Quests"
          iconSrc="/icons/quests.svg"
        />

        <SidebarItem href="/shop" label="Shop" iconSrc="/icons/shop.svg" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
