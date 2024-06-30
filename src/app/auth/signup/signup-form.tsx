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

export const SignUpWithPasswordSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string().toLowerCase(),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});
export type SignUpWithPasswordPayload = z.infer<
  typeof SignUpWithPasswordSchema
>;
export type SignUpWithPasswordResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  username: string;
  is_email_address_verified: boolean;
};

export const useSignupWithPassword = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await api.post("/auth/sign-up/password", { body: payload });
    },
  });
};

interface SignupFormProps {}

export const SignupForm = ({}: SignupFormProps) => {
  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(SignUpWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      username: "",
    },
    reValidateMode: "onChange",
  });

  const signup = useSignupWithPassword();
  const onSubmit: SubmitHandler<any> = (data) => {
    signup.mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={signup.isPending}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Continue with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
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
