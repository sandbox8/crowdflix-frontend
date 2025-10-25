import { Input } from "@/shared/components/form/Input";
import { Modal } from "@mantine/core";
import { editProfileSchema, type EditProfileSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useRedux";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/common/Button/Button";
import { getAuth, updateProfile } from "firebase/auth";
import { updateUser } from "@/store/slices/userSlice";

export const EditProfileModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    mode: "onChange",
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name,
        lastName: user.last_name,
      });
    }
  }, [user, reset]);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const firebaseAuth = getAuth();
    const user = firebaseAuth.currentUser;

    if (user) {
      await updateProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      dispatch(
        updateUser({
          first_name: data.firstName,
          last_name: data.lastName,
        }),
      );
      onClose();
      setIsLoading(false);
    }
  });

  return (
    <Modal
      title="Edit Profile"
      opened={opened}
      centered
      onClose={onClose}
      classNames={{
        body: "  ",
        header: "bg-transparent",
        title: "text-white",
        close: "text-white hover:bg-transparent",
        overlay: "bg-[#1A1A1AB2]/70 ",
        content: "backdrop-blur-xs rounded-[30px]  bg-[#1A1A1AB2]/70",
      }}
    >
      <div className="flex flex-col gap-4">
        <Input
          {...register("firstName")}
          className=" w-full "
          placeholder="First Name"
          error={errors.firstName?.message}
        />
        <Input
          {...register("lastName")}
          className=" w-full "
          placeholder="Last Name"
          error={errors.lastName?.message}
        />
        <Button loading={isLoading} className="w-full" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
