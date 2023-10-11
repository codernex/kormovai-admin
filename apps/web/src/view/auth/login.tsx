import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { adminLoginSchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/utils";
import { IApiError, IApiResponse, IUser } from "@codernex/types";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useMemo } from "react";
export default function Login() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data: z.infer<typeof adminLoginSchema>) => {
    api
      .post("/auth/admin", data)
      .then(
        (
          res: AxiosResponse<
            IApiResponse<{
              accessToken: string;
              user: IUser;
            }>
          >
        ) => {
          if (res.data.data) {
            signIn({
              token: res.data.data.accessToken,
              tokenType: "Bearer",
              expiresIn: 60 * 24 * 365,
              authState: res.data.data.user,
            });
            navigate("/", { replace: true });
          }
        }
      )
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        toast.error(err.response?.data.error?.message as string);
      });
  };

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          className="min-w-[400px] p-4 space-y-3 shadow-white shadow-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-2xl font-semibold">login</h1>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username Or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username Or Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="usernameOrEmail"
          />
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="password"
          />
          <Button>Login</Button>
        </form>
      </Form>
    </div>
  );
}
