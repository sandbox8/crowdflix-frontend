import clsx from "clsx";
import { ArrowDown2 } from "iconsax-reactjs";
import { useState } from "react";

export const Accordion = ({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex p-5 rounded-[20px] bg-black w-full flex-col cursor-pointer hover:bg-[#1A1A1A] transition-all duration-300">
      <div
        className="flex w-full justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-[16px] font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-2">
          {badge && (
            <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
              <p className="text-black text-xs">{badge}</p>
            </div>
          )}
          <ArrowDown2
            size={20}
            className={clsx("text-white/50", {
              "rotate-180": isOpen,
            })}
          />
        </div>
      </div>
      {isOpen && <div className="flex w-full flex-col gap-2">{children}</div>}
    </div>
  );
};
