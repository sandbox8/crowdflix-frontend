import {
  PasswordInput as MantinePasswordInput,
  type PasswordInputProps,
} from "@mantine/core";
import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-reactjs";

export const PasswordInput = ({
  label,
  error,
  ...props
}: PasswordInputProps) => {
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
        <MantinePasswordInput
          h={40}
          classNames={{
            input:
              "rounded-full border-none bg-[#1A1A1A] h-[40px] placeholder:text-[#CBF6FF50] placeholder:text-opacity-50 text-white focus:outline-none",
            innerInput:
              "rounded-full border-none bg-transparent h-[40px] placeholder:text-[#CBF6FF50] placeholder:text-opacity-50 text-white focus:outline-none",
            visibilityToggle: " mr-2",
          }}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? (
              <EyeSlash size="20" className="text-[#CBF6FF] opacity-50" />
            ) : (
              <Eye size="20" className="text-[#CBF6FF] opacity-50 " />
            )
          }
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
