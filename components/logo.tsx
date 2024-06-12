import Image from "next/image";

export const Logo = () => {
  return (
    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
      <Image src="/icons/mascot.svg" alt="Mascot" width={40} height={40} />
      <span className="text-2xl font-extrabold text-green-600 tracking-wide">
        Lingo
      </span>
    </div>
  );
};
