import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useApi } from "../api/use-api";
import { MainButton } from "./main-button";
import { TextInput } from "./text-input";

type Props = PropsWithChildren<{
  vacancyId?: string;
}>;

const userFormSchema = z.object({
  name: z.string().min(3, "Full name is required, min 3 characters"),
  email: z.email("Enter a valid email address"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export function UserForm({ children, vacancyId }: Props) {
  const navigate = useNavigate();
  const { mutationFn, onError } = useApi();

  const { mutate: createInterview, isPending } = useMutation({
    mutationFn,
    onError,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = (formData: UserFormValues) => {
    createInterview(
      {
        path: "interview",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          vacancy_id: vacancyId,
        }),
      },
      {
        onSuccess: (data) => {
          navigate("/voice-check", {
            state: { interviewId: data.id },
          });
        },
      },
    );
  };

  return (
    <>
      <form className="my-4">
        <TextInput
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="e.g John Smith"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="john.smith@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </form>
      {children}
      <MainButton
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
        text="Start interview"
        theme="light"
      />
    </>
  );
}
