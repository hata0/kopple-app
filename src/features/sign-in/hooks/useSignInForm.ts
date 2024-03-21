import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SignInInput, signInInputSchema } from "../services/api/session";

export const useSignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<SignInInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInInputSchema),
  });

  return {
    errorMessage,
    form,
    setErrorMessage,
  };
};
