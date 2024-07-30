import { string, z } from "zod";

export const productSchema = z.object({
  title: z.string().min(6, { message: "Tối thiểu 6 kí tự" }),
  price: z.number().min(0, { message: "Không được nhỏ hơn 0" }),
  quantity: z.number().min(1, { message: "Số lượng phải >= 1" }),
  description: z.string().optional(),
  images: z.string(),
  categoryId: string().optional(),
});

export const CategorySchema = z.object({
  name: z.string(),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Đây không phải email" }),
    password: z
      .string()
      .min(6, { message: "Password yếu! Vui lòng tăng độ cường" }),
    confirmPass: z.string(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Mật khẩu nhập lại không đúng",
    path: ["confirmPass"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Đây không phải email" }),
  password: z.string(),
});
