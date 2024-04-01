import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { profileFormInputSchema } from "../services/backend/profiles/[id]/schema";
import { ProfileFormInput } from "../services/backend/profiles/[id]/type";

import { ProfileContent } from "@/types/ProfileContent";

export const useProfileForm = ({
  address,
  age,
  birthday,
  hashtags,
  hobbies,
  message,
  name,
  sex,
}: ProfileContent) => {
  const form = useForm<ProfileFormInput>({
    defaultValues: {
      address,
      age,
      birthday: birthday === null ? undefined : birthday,
      hashtags,
      hobbies,
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
