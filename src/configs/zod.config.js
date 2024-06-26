import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Yêu cầu là email. Ví dụ: example@gmail.com").min(1, "Yêu cầu là email. Ví dụ: example@gmail.com"),
  password: z.string()
    .min(1, "Nhập mật khẩu của bạn")
    .min(3, "Mật khẩu phải có nhiều hơn 3 ký tự")
});


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const usernameRegex = new RegExp(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const SignUpSchema = z
  .object({
    username:z.string().min(3, "Username tối thiểu 3 ký tự").regex(usernameRegex, "Kiểm tra lại username"),
    firstName: z.string().min(1, { message: "Nhập họ của bạn" }),
    lastName: z.string().min(1, { message: "Nhập tên của bạn" }),
    email: z.string().email("Yêu cầu là email. Ví dụ: example@gmail.com").min(1, "Yêu cầu là email. Ví dụ: example@gmail.com"),
    password: z.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(passwordRegex, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số, và một ký tự đặc biệt"),
    confirmPassword: z
      .string()
      .min(1, { message: "Nhập lại mật khẩu" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Bạn phải đồng ý các điều khoản & điều kiện" })
    }), phoneNumber: z.string().min(10, "Số điện thoại tối thiểu là 10 số").max(14, "Số điện thoại tối đa là 14 số").regex(phoneRegex, "Phải là số điện thoại")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu chưa trùng khớp"
  });

export const ResetPasswordSchema = z.object({
  token: z.string()
    .min(1, "Nhập token của bạn để xác nhận")
    .min(3, "Mã token phải có nhiều hơn 3 ký tự"),
  newPassword: z.string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .regex(passwordRegex, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số, và một ký tự đặc biệt"),
  confirmNewPassword: z
    .string()
    .min(1, { message: "Nhập lại mật khẩu" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Mật khẩu chưa trùng khớp"
});

export const VerifyToken = z.object({
  token: z.string()
    .min(1, "Nhập token của bạn để xác nhận")
    .min(3, "Mã token phải có nhiều hơn 3 ký tự")
});

export const ShippingSchema = z.object({
  firstName: z.string().min(1, "Yêu cầu nhập thông tin họ tên"),
  phone: z.string().min(10, "Số điện thoại tối thiểu là 10 số").max(14, "Số điện thoại tối đa là 14 số").regex(phoneRegex, "Phải là số điện thoại"),
  email: z.string().email("Yêu cầu là email. Ví dụ: example@gmail.com").min(1, "Yêu cầu là email. Ví dụ: example@gmail.com"),
  address: z.string().min(5, "Yêu cầu nhập đúng địa chỉ"),
  city: z.string().min(2, "Yêu cầu nhập đúng thông tin"),
  state: z.string().min(2, "Yêu cầu nhập thông tin"),
  country: z.string().min(2, "Yêu cầu nhập thông tin"),
  zip: z.string().min(2, "Yêu cầu nhập thông tin")
});

export const ChangePasswordSchema = z.object({
  old_password: z.string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .regex(passwordRegex, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số, và một ký tự đặc biệt"),
  new_password: z.string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .regex(passwordRegex, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một số, và một ký tự đặc biệt"),
  confirmNewPassword: z
    .string()
    .min(1, { message: "Nhập lại mật khẩu" })
}).refine((data) => data.new_password === data.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Mật khẩu chưa trùng khớp"
});
export const UpdateUserSchema = z.object({
  username: z.string().min(3, "Username tối thiểu 3 ký tự").regex(usernameRegex, "Kiểm tra lại username"),
  firstname: z.string()
  .min(1, "Nhập họ của bạn"),
  lastname: z.string()
  .min(1, "Nhập tên của bạn"),
  phoneNumber: z.string().min(10, "Số điện thoại tối thiểu là 10 số").max(14, "Số điện thoại tối đa là 14 số").regex(phoneRegex, "Phải là số điện thoại")
});
export const bookingSchema = z
  .object({
    user_name:z.string().min(3, "tối hiểu 3 ký tự"),
    service: z.string().min(3, { message: "tối hiểu 3 ký tự" }),
    description: z.string().min(3, { message: "tối hiểu 3 ký tự" }),
    phone_number: z.string().min(10, "Số điện thoại tối thiểu là 10 số").max(14, "Số điện thoại tối đa là 14 số").regex(phoneRegex, "Phải là số điện thoại")
  });