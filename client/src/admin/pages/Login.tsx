import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "@/store";
import { login } from "@/store/slices/userSlice";
import { useEffect } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      dispatch(login({ email: values.email, password: values.password }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-1/2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-6">
        <div className="space-y-4 justify-items-center">
          <img src={logo} alt="logo" className="w-24" />
          <h3 className="font-semibold text-xl">Welcome to SoundZone</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel required>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right -mt-2">
              <Link
                to="/admin/forgot-password"
                className="primary-hover underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="w-full flex justify-center mt-6">
              <Button type="submit" size="lg">
                {isLoading ? <ClipLoader size={20} /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
