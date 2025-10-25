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
      opened={opened}
      centered
      onClose={onClose}
      withCloseButton={false}
      classNames={{
        body: "p-8",
        header: "hidden",
        overlay: "bg-black/80 backdrop-blur-sm",
        content: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10",
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="text-center mb-2">
          <h2 className="font-black text-3xl uppercase mb-2 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <p className="text-white/60 text-sm">
            Update your profile information
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            {...register("firstName")}
            className="w-full"
            placeholder="First Name"
            error={errors.firstName?.message}
          />
          <Input
            {...register("lastName")}
            className="w-full"
            placeholder="Last Name"
            error={errors.lastName?.message}
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex-1 h-12 border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider transition-all"
          >
            Cancel
          </Button>
          <Button 
            loading={isLoading} 
            onClick={onSubmit}
            className="flex-1 h-12 bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] text-white font-black uppercase tracking-wider transition-all hover:scale-[1.02]"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
