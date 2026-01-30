import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type User = {
  email: string;
  username: string;
};

type Props = {
  isLogin?: boolean;
  setUser: (user: User) => void; 
};

const registerSchema = z.object({
  username: z.string().min(1, "Username là bắt buộc").min(3, "Username phải > 2 ký tự"),
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(1, "Password là bắt buộc").min(7, "Password phải > 6 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(1, "Password là bắt buộc"),
});

type FormValues = z.infer<typeof registerSchema>;

function AuthPage({ isLogin, setUser }: Props) {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema) as any,
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  useEffect(() => {
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }, [isLogin, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const url = isLogin ? "http://localhost:3000/login" : "http://localhost:3000/register";
      
      let payload;
      if (isLogin) {
        payload = { email: values.email, password: values.password };
      } else {
        const { confirmPassword, ...registerData } = values;
        payload = registerData;
      }

      const { data } = await axios.post(url, payload);

      if (isLogin) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setUser(data.user); 
        toast.success("Đăng nhập thành công");
        nav("/list");
      } else {
        toast.success("Đăng ký thành công");
        nav("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg bg-white text-left">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isLogin ? "Login" : "Register"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block font-medium mb-1 text-gray-700">Username</label>
            <input
              {...register("username")}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
              }`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
        )}

        <div>
          <label className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Password</label>
          <input
            {...register("password")}
            type="password"
            className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {!isLogin && (
          <div>
            <label className="block font-medium mb-1 text-gray-700">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {isLogin ? "Đăng nhập" : "Đăng ký ngay"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;