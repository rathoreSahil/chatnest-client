"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-provider";
import { Fetch } from "@/lib/fetch";

const formSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9]*$/, "Must be alphanumeric"),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
  profilePhoto: z.instanceof(File).optional(),
});

export function SignupForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      profilePhoto: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.profilePhoto);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("passwordConfirm", values.passwordConfirm);
    formData.append("image", values.profilePhoto as File);

    try {
      const responseJson = await Fetch.POST("/users/signup", formData, {});
      setUser(responseJson.data);
      toast.success("Signed Up successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={undefined}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing Up..." : "SignUp"}
        </Button>
      </form>
    </Form>
  );
}
