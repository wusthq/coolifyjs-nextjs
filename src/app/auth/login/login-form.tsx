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
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

// Login with email and password
export const LoginWithEmailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});
export type LoginWithEmailPasswordPayload = z.infer<
  typeof LoginWithEmailPasswordSchema
>;
export type LoginWithEmailPasswordResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  username: string;
  is_email_address_verified: boolean;
};

export const useLoginWithEmailAndPassword = () => {
  const mutation = useMutation({
    mutationFn: async (
      payload: LoginWithEmailPasswordPayload,
    ): Promise<LoginWithEmailPasswordResponse> => {
      return await api.post("/auth/login/email-and-password", {
        body: payload,
      });
    },
  });

  return mutation;
};

interface LoginFormProps {}

export const LoginForm = ({}: LoginFormProps) => {
  const router = useRouter();

  const form = useForm<LoginWithEmailPasswordPayload>({
    resolver: zodResolver(LoginWithEmailPasswordSchema),
    defaultValues: { email: "", password: "" },
    reValidateMode: "onChange",
  });

  const login = useLoginWithEmailAndPassword();
  const onSubmit: SubmitHandler<LoginWithEmailPasswordPayload> = (data) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={login.isPending}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {`Don't have an account?`}
              <Link href="/auth/signup" className="ml-1 underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
