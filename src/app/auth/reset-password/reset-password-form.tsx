"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Reset password
export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8).max(255),
  passwordAgain: z.string().min(8).max(255),
});
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordResponse = boolean;

export const useResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      payload: ResetPasswordPayload,
    ): Promise<ResetPasswordResponse> => {
      return await api.post("/auth/reset-password", {
        body: payload,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

interface ResetPasswordFormProps {}

export const ResetPasswordForm = ({}: ResetPasswordFormProps) => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", passwordAgain: "", token: token ?? "" },
    reValidateMode: "onChange",
  });

  const resetPassword = useResetPasswordMutation();
  const onSubmit: SubmitHandler<ResetPasswordPayload> = (data) => {
    resetPassword.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to send a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordAgain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Again</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                loading={resetPassword.isPending}
                type="submit"
                className="w-full"
              >
                Save
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/login" className="ml-1 underline">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
