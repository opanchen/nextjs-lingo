import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { navLinks } from "@/constants";

import { Logo } from "@/components/logo";
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
        <Logo />
      </Link>

      <ul className="flex flex-col gap-y-2 flex-1">
        {navLinks.map(({ href, label, iconSrc }, idx) => (
          <li key={idx} className="w-full flex flex-col">
            <SidebarItem href={href} label={label} iconSrc={iconSrc} />
          </li>
        ))}
      </ul>

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
