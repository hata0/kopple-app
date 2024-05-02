import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { ProfileFormInput, profileFormInputSchema } from "@/services/backend/profiles/[id]";
import { ProfileContent } from "@/types/ProfileContent";

type Props = Omit<ProfileContent, "imageUrl">;
export const useProfileForm = ({
  address,
  birthday,
  hashtags,
  hobbies,
  message,
  name,
  sex,
}: Props) => {
  const form = useForm<ProfileFormInput>({
    defaultValues: {
      address,
      birthday,
      hashtags,
      hobbies,
      image: undefined,
      message,
      name,
      sex,
    },
    resolver: zodResolver(profileFormInputSchema),
  });
  const hashtagFields = useFieldArray({
    control: form.control,
    name: "hashtags",
  });
  const hobbyFields = useFieldArray({
    control: form.control,
    name: "hobbies",
  });

  return { form, hashtagFields, hobbyFields };
};
