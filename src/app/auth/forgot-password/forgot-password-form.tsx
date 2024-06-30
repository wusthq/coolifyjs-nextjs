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
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Forgot password
export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordResponse = true;

export const useForgotPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      payload: ForgotPasswordPayload,
    ): Promise<ForgotPasswordResponse> => {
      return await api.post("/auth/forgot-password", {
        body: payload,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

interface ForgotPasswordFormProps {}

export const ForgotPasswordForm = ({}: ForgotPasswordFormProps) => {
  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
    reValidateMode: "onChange",
  });

  const forgotPassword = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<ForgotPasswordPayload> = (data) => {
    forgotPassword.mutate(data);
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={forgotPassword.data === true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                isLoading={forgotPassword.isPending}
                disabled={forgotPassword.data === true}
                className="w-full"
              >
                {forgotPassword.data === true && "Link Sent"}

                {!forgotPassword.data && "Send Reset Link"}
              </Button>

              {forgotPassword.data === true && (
                <span className="text-center text-sm text-muted-foreground">
                  {`Please check your inbox (and also your spam box) for the link.`}
                </span>
              )}
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
