import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Separator } from "@/components/ui/separator";
import GoogleOauthButton from "../../features/authentication/components/google-oauth-button";
import { useLoginMutation } from "@/features/authentication/api/auth.api";
import { Link, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/lib/toastHandler";

export function SignIn() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Form schema validation
  const formSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await login(values).unwrap();
      console.log(res);
      showSuccessToast(res.message || "Login successfull");
      navigate(`/workspace/${res.user.currentWorkspace}`);
    } catch (err: any) {
      showErrorToast(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary ">
            ProjectPilot
          </CardTitle>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Login with your Email or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                        />
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
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>
            <GoogleOauthButton label="Signin" />
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?
            <Button
              variant="link"
              className="p-0 text-primary ml-1"
              disabled={isLoading}
            >
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
