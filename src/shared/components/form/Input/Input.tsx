import { TextInput, type TextInputProps } from "@mantine/core";
import clsx from "clsx";

export const Input = ({ label, error, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={clsx(
          "relative p-[1px] rounded-full  transition-all",
          error
            ? "bg-red-500"
            : "bg-[linear-gradient(165deg,#2AA2FD,#835A5B,#835A5B)] bg-[length:100%_200%] hover:animate-gradient-move focus-within:animate-gradient-move",
        )}
      >
        <TextInput
          h={40}
          classNames={{
            input:
              "rounded-full border-none bg-[#1A1A1A] h-[40px] placeholder:text-[#CBF6FF50] placeholder:text-opacity-50 text-white focus:outline-none",
          }}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
