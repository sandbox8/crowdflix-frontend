import {
  Checkbox as MantineCheckbox,
  type CheckboxProps as MantineCheckboxProps,
} from "@mantine/core";
import clsx from "clsx";

export const Checkbox = (props: MantineCheckboxProps) => {
  return (
    <MantineCheckbox
      classNames={{
        input:
          "bg-inherit rounded-full border-white/50 w-[26px] h-[26px] border checked:bg-white checked:border-white checked:text-black",
        icon: "text-[#5D5D5D] translate-x-1 translate-y-0.5 size-3",
        label: clsx(" mt-1 text-white/50", props.checked && "text-white!"),
      }}
      {...props}
    />
  );
};
