import { Button as MantineButton, type ButtonProps } from "@mantine/core";

export const Button = ({
  ...props
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <MantineButton
      classNames={{ root: "bg-[#2AA2FD] rounded-full font-normal" }}
      {...props}
    />
  );
};
