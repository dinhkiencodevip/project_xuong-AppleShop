import User from "../models/User.js";
import { comparePassword, hassPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res, next) => {
  try {
    //Kiểm tra email có dky trong hệ thống chưa
    const { email, password } = req.body;
    const useExits = await User.findOne({ email });
    if (useExits) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hassPass = hassPassword(password);
    if (!hassPass) {
      return res.status(400).json({
        message: "Mã hóa mật khẩu thật bại!",
      });
    }

    const user = await User.create({
      email,
      password: hassPass,
    });
    return res.status(201).json({
      success: true,
      user,
      message: "Đăng kí thành công!",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const useExits = await User.findOne({ email });
    if (!useExits) {
      return res.status(400).json({
        message: "Email chưa đăng kí",
      });
    }

    const isMatch = comparePassword(password, useExits.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng!",
      });
    }
    const token = generateToken({ _id: useExits._id }, "10d");
    useExits.password = undefined;

    return res.status(201).json({
      success: true,
      user: useExits,
      accessToken: token,
      message: "Login successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};
